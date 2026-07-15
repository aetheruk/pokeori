import Link from 'next/link'
import '../../styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'Pokemon App Dev Tools',
  description: 'Developer tools for Pokemon App',
}

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mx-auto flex h-14 w-full max-w-none items-center px-4 md:px-8">
                <div className="mr-4 hidden md:flex">
                  <Link className="mr-6 flex items-center space-x-2 font-bold" href="/dev">
                    Dev Tools
                  </Link>
                  <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link
                      href="/dev/battles"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Battles
                    </Link>
                    <Link
                      href="/dev/locations"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Locations
                    </Link>
                    <Link
                      href="/dev/tasks"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Tasks
                    </Link>
                    <Link
                      href="/dev/shops"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Shops
                    </Link>
                    <Link
                      href="/dev/voyages"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Voyages
                    </Link>
                    <Link
                      href="/dev/moves"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Moves
                    </Link>
                    <Link
                      href="/dev/abilities"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Abilities
                    </Link>
                  </nav>
                </div>
              </div>
            </header>
            <main className="flex-1 flex w-full flex-col px-4 py-8 md:px-8">{children}</main>
            <Toaster position="top-center" />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
