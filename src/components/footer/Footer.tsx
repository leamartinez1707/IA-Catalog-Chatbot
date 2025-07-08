import Link from 'next/link'
const Footer = () => {
    return (
        <footer className="bg-gradient border-gray-200 bottom-0 z-50 min-h-52 h-fit shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-white text-sm w-full flex flex-col items-center gap-y-4">
                    &copy; {new Date().getFullYear()} ShopSmart AI. All rights reserved.
                    <p className="text-white text-sm">
                        Crafted and designed by <a
                            className='text-gray-800 font-bold hover:underline'
                            target='_blank'
                            rel='noopener noreferrer'
                            href="https://www.linkedin.com/in/leandromartinezuy/">Leandro Martinez</a>, a Full Stack Developer from Uruguay.
                    </p>
                </div>
                <div className='flex flex-col h-full w-full items-center justify-between'>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <Link href="/#" className="text-white hover:text-gray-800">Privacy Policy</Link>
                        <Link href="/#" className="text-white hover:text-gray-800">Terms of Service</Link>
                    </div>
                    <p className='text-2xl text-center text-black font-bold mt-4'>
                        Would you like to have an eCommerce with AI Powered Chatbot?
                    </p>
                    <a href='https://www.linkedin.com/in/leandromartinezuy/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-black hover:bg-black/80 transition-colors duration-200 p-4 rounded-md text-white'>
                        Contact me
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer