const PageTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="text-6xl py-4 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mx-auto text-center">
            {children}
        </h1>
    )
}

export default PageTitle