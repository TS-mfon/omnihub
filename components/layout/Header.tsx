"use client";

import Link from "next/link";
import { WalletButton } from "@/components/shared/WalletButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-200 bg-white/80 backdrop-blur-lg">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-initia-500 to-initia-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-lg font-bold text-surface-900">
              OmniHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/portfolio">Portfolio</NavLink>
            <NavLink href="/bridge">Bridge</NavLink>
            <NavLink href="/swap">Swap</NavLink>
            <NavLink href="/yield">Yield</NavLink>
            <NavLink href="/explore">Explore</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <WalletButton />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-50 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}
