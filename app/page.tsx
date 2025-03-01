import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a MenuChats</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        La plataforma inteligente para gestionar tu restaurante con IA
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Iniciar Sesión</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Crear Cuenta</Link>
        </Button>
      </div>
    </main>
  )
}

