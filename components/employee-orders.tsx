"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo (en una aplicación real, estos vendrían de una API)
const initialOrders = [
  {
    id: 1,
    customer: "Juan Pérez",
    items: [
      { name: "Pizza Margherita", quantity: 1, price: 12.99 },
      { name: "Coca-Cola", quantity: 2, price: 2.5 },
    ],
    total: 17.99,
    status: "Pendiente",
  },
  {
    id: 2,
    customer: "María García",
    items: [
      { name: "Hamburguesa Clásica", quantity: 1, price: 9.99 },
      { name: "Papas Fritas", quantity: 1, price: 3.5 },
      { name: "Refresco", quantity: 1, price: 2.0 },
    ],
    total: 15.49,
    status: "En preparación",
  },
  {
    id: 3,
    customer: "Carlos Rodríguez",
    items: [
      { name: "Ensalada César", quantity: 2, price: 8.99 },
      { name: "Agua Mineral", quantity: 2, price: 1.5 },
    ],
    total: 20.98,
    status: "Listo para entrega",
  },
]

const statusOptions = ["Pendiente", "En preparación", "Listo para entrega", "Entregado", "Cancelado"]

export function EmployeeOrders() {
  const [orders, setOrders] = useState(initialOrders)

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-500"
      case "En preparación":
        return "bg-blue-500"
      case "Listo para entrega":
        return "bg-green-500"
      case "Entregado":
        return "bg-gray-500"
      case "Cancelado":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Actuales</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Detalles del Pedido</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={order.status === status ? "secondary" : "outline"}
                        onClick={() => handleStatusChange(order.id, status)}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

