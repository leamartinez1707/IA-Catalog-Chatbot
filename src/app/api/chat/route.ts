import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { Product } from '@/types'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const POST = async (req: NextRequest) => {
    const { messages, products }: {
        messages: {
            role: string;
            content: string;
        }[], products: Product[]
    } = await req.json()

    const productContext = products.map(p => `• ${p.name} (${p.category}): ${p.description} - $${p.price}`)
        .join('\n')
    const systemMessage: ChatCompletionMessageParam = {
        role: 'system',
        content: `Sos un asistente de compras. Estos son los productos disponibles:\n${productContext}\nUsá esta información para recomendar productos o responder consultas.
        Siempre que recomiendes un producto, asegurate de mencionarlo por su nombre real en el idioma original, no lo traduzcas ni lo modifiques. Si el cliente te pide que le recomiendes otro producto, asegurate de que sea uno de los productos disponibles en la lista y no repitas el mismo producto que ya le recomendaste.
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
        // Try to find a recommended product based on the reply
        if (!reply) {
            return NextResponse.json({ reply: 'Sorry, I couldnt find what you are searching for.. try again please.' },
                { status: 400 })
        }
        const recommendedProduct = (products as Product[]).find(p =>
            reply.toLowerCase().includes(p.name.toLowerCase())
        )
        return NextResponse.json({ reply, product: recommendedProduct ?? null }, { status: 200 })
    } catch (error) {
        console.error('OpenAI Error:', error)
        return NextResponse.json({ error: 'Error generating response' }, { status: 500 })
    }
}
