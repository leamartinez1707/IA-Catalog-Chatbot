import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto grid w-full max-w-6xl items-center gap-8 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.35)] md:grid-cols-[0.92fr_1.08fr] md:p-10">
                <div className="relative overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.22),_transparent_40%),linear-gradient(180deg,_#0f172a_0%,_#172554_100%)] p-6 text-center">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.12),_transparent_55%)]" />
                    <Image
                        width={400}
                        height={400}
                        className="relative mx-auto"
                        src="/not-found.jpg" alt="Not Found" />
                </div>
                <div className="p-2 text-center md:text-left">
                    <div className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Error 404</div>
                    <div className="font-display text-6xl font-medium tracking-tight text-slate-950">Page not found</div>
                    <div className="mt-4 text-xl font-medium text-slate-700 md:text-3xl">
                        Oops. This page has gone missing.
                    </div>
                    <div className="mb-8 mt-4 max-w-xl text-lg text-slate-500">
                        You may have mistyped the address or the page may have moved.
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                        <Link href="/" replace className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Go Home</Link>
                        <Link href="/#catalog" className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50">Browse catalog</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}