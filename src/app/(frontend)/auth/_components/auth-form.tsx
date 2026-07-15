'use client'

import Image from 'next/image'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { BrandLockup } from '@/components/game/shared/BrandLockup'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { login, register } from '../actions'
import { InstallHelpDialog } from './install-help-dialog'
import { ProjectInfoDialog } from './project-info-dialog'

const initialState = {
  error: '',
}

export function AuthForm() {
  const [activeTab, setActiveTab] = useState('login')
  const [loginState, loginAction, isLoginPending] = useActionState(
    login,
    initialState,
  )
  const [registerState, registerAction, isRegisterPending] = useActionState(
    register,
    initialState,
  )

  useEffect(() => {
    if (loginState?.error) {
      toast.error(loginState.error)
    }
  }, [loginState])

  useEffect(() => {
    if (registerState?.error) {
      toast.error(registerState.error)
    }
  }, [registerState])

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-game-night-canvas p-4 antialiased">
      <Image
        src="/backgrounds/pokeori-auth-mobile.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center md:hidden"
        aria-hidden="true"
      />
      <Image
        src="/backgrounds/pokeori-auth-desktop.avif"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-center md:block"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#172733]/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#172733]/20 via-transparent to-[#172733]/82" />
      <div className="absolute top-[calc(1rem+env(safe-area-inset-top))] left-4 z-20 sm:top-[calc(1.5rem+env(safe-area-inset-top))] sm:left-6">
        <ProjectInfoDialog />
      </div>
      <div className="absolute top-[calc(1rem+env(safe-area-inset-top))] right-4 z-20 sm:top-[calc(1.5rem+env(safe-area-inset-top))] sm:right-6">
        <InstallHelpDialog />
      </div>

      <BrandLockup
        className={`pointer-events-none absolute bottom-4 left-1/2 z-10 w-[220px] -translate-x-1/2 sm:bottom-6 sm:w-[260px] md:bottom-auto md:left-[max(2rem,calc(50%-30rem))] md:top-1/2 md:block md:w-[280px] md:translate-x-0 md:-translate-y-1/2 ${activeTab === 'register' ? 'hidden' : ''}`}
      />

      <div className="relative z-10 flex w-full max-w-[400px] flex-col items-center py-14 md:translate-x-[min(18vw,14rem)] md:py-8">
        <Tabs
          defaultValue="login"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 border-game-border bg-game-surface/92 text-game-muted shadow-[0_8px_24px_rgb(23_39_51_/_0.16)] backdrop-blur-md">
            <TabsTrigger value="login">Log in</TabsTrigger>
            <TabsTrigger value="register">New trainer</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="gap-5 border-game-border bg-game-surface/96 py-5 text-game-ink shadow-[0_18px_50px_rgb(23_39_51_/_0.2)] backdrop-blur-md">
              <CardHeader>
                <p className="game-field-label">Trainer access</p>
                <CardTitle className="font-display text-2xl font-semibold">
                  Welcome back
                </CardTitle>
                <CardDescription>
                  Continue your Pokeori expedition.
                </CardDescription>
              </CardHeader>
              <form action={loginAction}>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-xs font-semibold text-game-ink"
                    >
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="trainer@example.com"
                      autoComplete="email"
                      required
                      className="border-game-border bg-game-surface-raised/80"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="password"
                      className="text-xs font-semibold text-game-ink"
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="border-game-border bg-game-surface-raised/80"
                    />
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    className="w-full bg-game-clay text-game-cream hover:bg-game-clay/90"
                    type="submit"
                    disabled={isLoginPending}
                  >
                    {isLoginPending ? 'Logging in…' : 'Log in'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="gap-5 border-game-border bg-game-surface/96 py-5 text-game-ink shadow-[0_18px_50px_rgb(23_39_51_/_0.2)] backdrop-blur-md">
              <CardHeader>
                <p className="game-field-label">New field record</p>
                <CardTitle className="font-display text-2xl font-semibold">
                  Begin an expedition
                </CardTitle>
                <CardDescription>
                  Create your trainer record and enter the field.
                </CardDescription>
              </CardHeader>
              <form action={registerAction}>
                <CardContent className="space-y-3.5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="trainer-name"
                      className="text-xs font-semibold text-game-ink"
                    >
                      Trainer name
                    </Label>
                    <Input
                      id="trainer-name"
                      name="trainerName"
                      type="text"
                      placeholder="How other trainers see you"
                      autoComplete="nickname"
                      required
                      className="border-game-border bg-game-surface-raised/80"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="register-email"
                      className="text-xs font-semibold text-game-ink"
                    >
                      Email address
                    </Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="trainer@example.com"
                      autoComplete="email"
                      required
                      className="border-game-border bg-game-surface-raised/80"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="register-password"
                      className="text-xs font-semibold text-game-ink"
                    >
                      Password
                    </Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="border-game-border bg-game-surface-raised/80"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="confirm-password"
                      className="text-xs font-semibold text-game-ink"
                    >
                      Confirm password
                    </Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="border-game-border bg-game-surface-raised/80"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="beta-code"
                      className="text-xs font-semibold text-game-ink"
                    >
                      Beta access code
                    </Label>
                    <Input
                      id="beta-code"
                      name="betaCode"
                      type="text"
                      placeholder="Your invitation code"
                      required
                      className="border-game-border bg-game-surface-raised/80"
                    />
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    className="w-full bg-game-clay text-game-cream hover:bg-game-clay/90"
                    type="submit"
                    disabled={isRegisterPending}
                  >
                    {isRegisterPending ? 'Creating trainer…' : 'Create trainer'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
