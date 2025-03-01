"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Table = {
  id: number
  number: number
  seats: number
  isOccupied: boolean
  order: string
}

export function TableManagement() {
  const [tables, setTables] = useState<Table[]>([
    { id: 1, number: 1, seats: 4, isOccupied: false, order: "" },
    { id: 2, number: 2, seats: 2, isOccupied: true, order: "Pizza Margherita, 2x Coca-Cola" },
    { id: 3, number: 3, seats: 6, isOccupied: false, order: "" },
  ])

  const [newTable, setNewTable] = useState({ number: "", seats: "" })

  const addTable = () => {
    if (newTable.number && newTable.seats) {
      setTables([
        ...tables,
        {
          id: Date.now(),
          number: Number.parseInt(newTable.number),
          seats: Number.parseInt(newTable.seats),
          isOccupied: false,
          order: "",
        },
      ])
      setNewTable({ number: "", seats: "" })
    }
  }

  const toggleTableOccupancy = (id: number) => {
    setTables(
      tables.map((table) =>
        table.id === id
          ? { ...table, isOccupied: !table.isOccupied, order: table.isOccupied ? "" : table.order }
          : table,
      ),
    )
  }

  const updateTableOrder = (id: number, order: string) => {
    setTables(tables.map((table) => (table.id === id ? { ...table, order, isOccupied: order !== "" } : table)))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Mesas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div>
              <Label htmlFor="tableNumber">Número de Mesa</Label>
              <Input
                id="tableNumber"
                value={newTable.number}
                onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                placeholder="Ej: 1"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="tableSeats">Número de Asientos</Label>
              <Input
                id="tableSeats"
                value={newTable.seats}
                onChange={(e) => setNewTable({ ...newTable, seats: e.target.value })}
                placeholder="Ej: 4"
                type="number"
              />
            </div>
            <Button onClick={addTable} className="mt-8">
              Agregar Mesa
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado de las Mesas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <Card key={table.id} className={table.isOccupied ? "bg-red-100" : "bg-green-100"}>
                <CardHeader>
                  <CardTitle>
                    Mesa {table.number} ({table.seats} asientos)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{table.isOccupied ? "Ocupada" : "Libre"}</p>
                  {table.isOccupied && <p>Pedido: {table.order}</p>}
                  <div className="mt-2 space-x-2">
                    <Button onClick={() => toggleTableOccupancy(table.id)}>
                      {table.isOccupied ? "Liberar Mesa" : "Ocupar Mesa"}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Actualizar Pedido</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Actualizar Pedido - Mesa {table.number}</DialogTitle>
                        </DialogHeader>
                        <Input
                          value={table.order}
                          onChange={(e) => updateTableOrder(table.id, e.target.value)}
                          placeholder="Ingrese el pedido"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

