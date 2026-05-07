import Link from 'next/link'

interface Props {
    text?: string
    href: string
}
const LinkToHomeButton = ({ href, text }: Props) => {
    return (
        <Link
            className='text-blue-500 hover:underline'
            href={href}
        >{text}</Link>
    )
}

export default LinkToHomeButton