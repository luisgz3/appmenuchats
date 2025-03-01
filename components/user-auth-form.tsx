"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
})

// Usuario de ejemplo
const EXAMPLE_USER = {
  email: "usuario@ejemplo.com",
  password: "password123",
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log("Intentando iniciar sesión con:", values)

    try {
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (values.email === EXAMPLE_USER.email && values.password === EXAMPLE_USER.password) {
        console.log("Credenciales correctas, iniciando sesión...")
        // Registrar el inicio de sesión
        await registerLogin(values.email)

        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido de vuelta a MenuChats.",
        })
        console.log("Redirigiendo al dashboard...")
        router.push("/dashboard")
      } else {
        console.log("Credenciales incorrectas")
        throw new Error("Credenciales inválidas")
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error)
      toast({
        title: "Error de autenticación",
        description: "Email o contraseña incorrectos.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function registerLogin(email: string) {
    console.log(`Registrando inicio de sesión para: ${email}`)
    // En una implementación real, aquí se haría una llamada a la API para registrar el inicio de sesión
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="nombre@ejemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Contraseña
            </Label>
            <Input
              id="password"
              placeholder="Contraseña"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Iniciar sesión
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          toast({
            title: "Inicio de sesión con Google",
            description: "Esta función aún no está implementada.",
          })
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  )
}

