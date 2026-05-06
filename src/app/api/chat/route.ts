import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { Product } from '@/types'

type ChatRequest = {
    messages: {
        role: string;
        content: string;
    }[];
    products: Product[];
}

const OFF_TOPIC_KEYWORDS = ['weather', 'clima', 'news', 'noticias', 'sports score', 'temperature', 'hora exacta']

const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const extractBudget = (query: string) => {
    const match = normalize(query).match(/(?:under|below|less than|up to|budget of|under\s*\$|menos de|hasta)\s*\$?(\d+(?:\.\d+)?)/)
    if (match) {
        return Number(match[1])
    }

    const fallbackMatch = query.match(/\$\s?(\d+(?:\.\d+)?)/)
    return fallbackMatch ? Number(fallbackMatch[1]) : null
}

const scoreProduct = (product: Product, query: string, budget: number | null) => {
    const normalizedQuery = normalize(query)
    const haystack = normalize(`${product.name} ${product.category} ${product.description} ${product.features}`)
    const tokens = normalizedQuery.split(/\s+/).filter(token => token.length > 2)

    let score = product.rating * 8

    for (const token of tokens) {
        if (haystack.includes(token)) {
            score += 18
        }
    }

    if (normalizedQuery.includes(normalize(product.category))) {
        score += 22
    }

    if (budget !== null) {
        if (product.price <= budget) {
            score += 28
            score += Math.max(0, 12 - (budget - product.price) / 10)
        } else {
            score -= Math.min(35, product.price - budget)
        }
    }

    if (normalizedQuery.includes('gift') || normalizedQuery.includes('regalo')) {
        score += product.rating >= 4.4 ? 10 : 0
    }

    if (normalizedQuery.includes('premium') || normalizedQuery.includes('pro')) {
        score += product.price >= 80 ? 10 : 0
    }

    if (normalizedQuery.includes('daily') || normalizedQuery.includes('daily use') || normalizedQuery.includes('everyday')) {
        score += product.rating >= 4.2 ? 8 : 0
    }

    return score
}

const buildFallbackReply = (query: string, products: Product[]) => {
    if (!products.length) {
        return {
            reply: 'I cannot recommend a product right now because the catalog is empty.',
            product: null,
        }
    }

    const normalizedQuery = normalize(query)

    if (OFF_TOPIC_KEYWORDS.some(keyword => normalizedQuery.includes(keyword))) {
        return {
            reply: 'I can help with product discovery, recommendations, budgets, and category comparisons. Ask me about what you want to buy and I will narrow the catalog down.',
            product: null,
        }
    }

    const budget = extractBudget(query)
    const rankedProducts = [...products]
        .map(product => ({ product, score: scoreProduct(product, query, budget) }))
        .sort((left, right) => right.score - left.score)

    const recommended = rankedProducts[0]?.product ?? products[0]
    const featureList = recommended.features.split(',').map(feature => feature.trim()).filter(Boolean).slice(0, 3)
    const budgetLine = budget !== null && recommended.price <= budget
        ? ` It stays within the $${budget.toFixed(2)} budget you mentioned.`
        : ''

    return {
        reply: `A strong match from the current catalog is ${recommended.name}. It stands out for ${featureList.join(', ')} and is priced at $${recommended.price.toFixed(2)}.${budgetLine} If you want, I can help you compare it against another style, category, or budget range.`,
        product: recommended,
    }
}

export const POST = async (req: NextRequest) => {
    const { messages, products }: ChatRequest = await req.json()
    const latestUserMessage = [...messages].reverse().find(message => message.role === 'user')?.content ?? ''

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
        const fallback = buildFallbackReply(latestUserMessage, products)
        return NextResponse.json({ ...fallback, source: 'catalog-fallback' }, { status: 200 })
    }

    const openai = new OpenAI({ apiKey })
    const productContext = products.map(p => `• ${p.name} (${p.category}): ${p.description} - $${p.price}`)
        .join('\n')
    const systemMessage: ChatCompletionMessageParam = {
        role: 'system',
        content: `Sos un asistente de compras. Estos son los productos disponibles:\n${productContext}\nUsa esta informacion para recomendar productos o responder consultas.
        Siempre que recomiendes un producto, asegurate de mencionarlo por su nombre real en el idioma original, no lo traduzcas ni lo modifiques. Si el cliente te pide que le recomiendes otro producto, asegurate de que sea uno de los productos disponibles en la lista y no repitas el mismo producto que ya le recomendaste. Solo recomendale de a un producto por vez, no le digas "te recomiendo estos productos" o "te recomiendo este y este otro", solo uno a la vez. Si no hay productos disponibles, decile que no hay productos disponibles en este momento.
        Si el cliente te hace una pregunta que no esta relacionada con los productos, responde de manera amigable y educada, pero sin ofrecer recomendaciones de productos. Por ejemplo, si te pregunta "Cual es el clima hoy?", podes responder "Lo siento, no tengo informacion sobre el clima. En que puedo ayudarte con nuestros productos?".
        `,
    }
    const lastMessages: ChatCompletionMessageParam[] = messages.slice(-5).map(m => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
    }))
    const payload: ChatCompletionMessageParam[] = [
        systemMessage,
        ...lastMessages,
    ]
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: payload,
            temperature: 0.7,
            max_tokens: 150,
        })

        const reply = completion.choices[0]?.message.content
        if (!reply) {
            return NextResponse.json({ reply: 'Sorry, I could not find a useful recommendation. Please try again.' },
                { status: 400 })
        }
        const recommendedProduct = (products as Product[]).find(p =>
            reply.toLowerCase().includes(p.name.toLowerCase())
        )
        return NextResponse.json({ reply, product: recommendedProduct ?? null, source: 'openai' }, { status: 200 })
    } catch (error) {
        console.error('OpenAI Error:', error)
        const fallback = buildFallbackReply(latestUserMessage, products)
        return NextResponse.json({ ...fallback, source: 'catalog-fallback' }, { status: 200 })
    }
}
