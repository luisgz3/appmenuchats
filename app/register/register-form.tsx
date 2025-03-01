"use client"

import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"

export default function RegisterForm() {
  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(buttonVariants({ variant: "ghost" }), "absolute right-4 top-4 md:right-8 md:top-8")}
      >
        Iniciar sesión
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src="/menuchats-logo.png" alt="MenuChats Logo" width={40} height={40} className="mr-2" />
          MenuChats
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;MenuChats ha revolucionado la forma en que gestionamos nuestro restaurante. Es fácil de usar y ha
              mejorado significativamente nuestra eficiencia.&rdquo;
            </p>
            <footer className="text-sm">Sofia Rodríguez - Dueña de La Trattoria</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Crear una cuenta</h1>
            <p className="text-sm text-muted-foreground">Ingresa tus datos para crear una cuenta</p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Al hacer clic en continuar, aceptas nuestros{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Términos de servicio
            </Link>{" "}
            y{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Política de privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

