import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
  title: "Iniciar sesión - MenuChats",
  description: "Inicia sesión en tu cuenta de MenuChats",
}

export default function LoginPage() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={cn(buttonVariants({ variant: "ghost" }), "absolute right-4 top-4 md:right-8 md:top-8")}
        >
          Crear cuenta
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src="/menuchats-logo.png" alt="MenuChats Logo" width={40} height={40} className="mr-2" />
            MenuChats
          </div>
          <div className="relative z-20 mt-auto">
            <Image src="/menuchats-bot.png" alt="MenuChats Bot" width={200} height={200} className="mx-auto mb-4" />
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;¡Bienvenido de vuelta! Estoy aquí para ayudarte a gestionar tu restaurante de la manera más
                eficiente posible.&rdquo;
              </p>
              <footer className="text-sm">- Bot de MenuChats</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
              <p className="text-sm text-muted-foreground">Ingresa tus credenciales para acceder a tu cuenta</p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link href="/forgot-password" className="underline underline-offset-4 hover:text-primary">
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

