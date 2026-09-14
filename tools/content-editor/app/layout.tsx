import { notFound } from 'next/navigation'
import Link from 'next/link'
import './globals.css'
import { appSans } from '@/app/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Pokeori Content Studio',
  description: 'Local authoring tools for Pokeori game data',
}

export default async function DevLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.POKEORI_CONTENT_EDITOR !== '1'
  ) {
    notFound()
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${appSans.variable} font-sans antialiased`}>
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
                  <Link className="mr-6 flex items-center space-x-2 font-bold" href="/">
                    Content Studio
                  </Link>
                  <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link
                      href="/battles"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Battles
                    </Link>
                    <Link
                      href="/locations"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Locations
                    </Link>
                    <Link
                      href="/tasks"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Tasks
                    </Link>
                    <Link
                      href="/shops"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Shops
                    </Link>
                    <Link
                      href="/voyages"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Voyages
                    </Link>
                    <Link
                      href="/moves"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Moves
                    </Link>
                    <Link
                      href="/abilities"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Abilities
                    </Link>
                    <Link
                      href="/rarities"
                      className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                      Rarities
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
