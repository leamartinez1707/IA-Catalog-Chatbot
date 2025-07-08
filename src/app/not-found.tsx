import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="bg-gradient text-white min-h-screen flex items-center">
            <div className="container mx-auto p-4 flex flex-wrap items-center">
                <div className="w-full md:w-5/12 text-center p-4">
                    <Image
                        width={400}
                        height={400}
                        className="mx-auto mb-4"
                        src="/not-found.jpg" alt="Not Found" />
                </div>
                <div className="w-full md:w-7/12 text-center md:text-left p-4">
                    <div className="text-6xl font-medium">404</div>
                    <div className="text-xl md:text-3xl font-medium mb-4">
                        Oops. This page has gone missing.
                    </div>
                    <div className="text-lg mb-8">
                        You may have mistyped the address or the page may have moved.
                    </div>
                    <Link href="/" replace className="border border-white hover:bg-white/20 rounded p-4">Go Home</Link>
                </div>
            </div>
        </div>
    )
}