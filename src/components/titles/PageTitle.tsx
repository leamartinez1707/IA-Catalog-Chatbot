const PageTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="font-display mx-auto bg-gradient-to-r from-slate-950 via-blue-700 to-cyan-500 bg-clip-text py-4 text-center text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
            {children}
        </h1>
    )
}

export default PageTitle