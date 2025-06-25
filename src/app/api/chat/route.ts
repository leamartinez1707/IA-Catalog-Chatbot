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
        content: `Sos un asistente de compras. Estos son los productos disponibles:\n${productContext}\nUsá esta información para recomendar productos o responder consultas.`,
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
        console.log('OpenAI Response:', reply)
        return NextResponse.json({ reply })
    } catch (error) {
        console.error('OpenAI Error:', error)
        return NextResponse.json({ error: 'Error generating response' }, { status: 500 })
    }
}
