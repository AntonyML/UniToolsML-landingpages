import { Github, Twitter } from 'lucide-react';

const footerLinks = [
  {
    label: 'Producto',
    links: [
      { label: 'Caracteristicas', href: '#features' },
      { label: 'Distribucion', href: '#stack' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Terminos', href: '/terms' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/icono.ico"
                alt="UniToolsML logo"
                width="28"
                height="28"
                className="w-7 h-7 rounded-md object-cover"
              />
              <span className="text-sm font-semibold text-zinc-100">
                UniTools<span className="text-indigo-400">ML</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Suite de productividad para estudiantes universitarios. Mas de 40 herramientas. Construida con Rust. Funciona offline. Hecha por un Tico 🇨🇷.
            </p>
            <p className="mt-3 text-xs text-zinc-600">
              Pagos: SINPE Movil + PayPal (escritorio y APK)
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/UniToolsML"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/unitoolsml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-200"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4 font-mono">
                {group.label}
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            &copy; {year} UniToolsML. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs text-zinc-600">Beta cerrada — v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
