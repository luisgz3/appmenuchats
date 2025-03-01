import { NextResponse } from "next/server"

// Simularemos una base de datos simple para almacenar los datos
const chatData: any[] = []

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validación básica de los datos recibidos
    if (!data || typeof data !== "object") {
      return NextResponse.json({ success: false, error: "Datos inválidos" }, { status: 400 })
    }

    // Añadir timestamp a los datos
    const dataWithTimestamp = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    // Almacenar los datos en nuestra "base de datos" simulada
    chatData.push(dataWithTimestamp)

    console.log("Datos recibidos y almacenados:", dataWithTimestamp)

    return NextResponse.json({ success: true, message: "Datos recibidos y almacenados correctamente" }, { status: 200 })
  } catch (error) {
    console.error("Error al procesar los datos de n8n:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  // Endpoint para obtener todos los datos almacenados
  return NextResponse.json({ success: true, data: chatData }, { status: 200 })
}

