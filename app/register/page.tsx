import type { Metadata } from "next"
import RegisterForm from "./register-form"

export const metadata: Metadata = {
  title: "Crear cuenta - MenuChats",
  description: "Crea una cuenta para comenzar a usar MenuChats",
}

export default function RegisterPage() {
  return <RegisterForm />
}

