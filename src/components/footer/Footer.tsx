import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-xl space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">ShopSmart AI</p>
          <h2 className="text-2xl font-semibold text-white">
            Smarter product discovery, powered by conversational AI.
          </h2>
          <p className="text-sm leading-7 text-slate-400">
            Browse the catalog, save favorites, review your cart, and ask the assistant for tailored recommendations when you need a faster path to the right product.
          </p>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Leandro Martinez. Designed and built in Uruguay.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:min-w-[420px]">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-white">Explore</p>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <Link href="/#catalog" className="transition-colors hover:text-white">
                Browse catalog
              </Link>
              <Link href="/favorites" className="transition-colors hover:text-white">
                View saved favorites
              </Link>
              <Link href="/checkout" className="transition-colors hover:text-white">
                Review checkout
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-white">Contact</p>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <a
                href="mailto:leandromartinez.dev@gmail.com"
                className="transition-colors hover:text-white"
              >
                leandromartinez.dev@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/leandromartinezuy/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/leamartinez1707"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;