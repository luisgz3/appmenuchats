"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import {
  Settings,
  Moon,
  Sun,
  DollarSign,
  Users,
  LayoutDashboard,
  ShoppingBag,
  BookOpen,
  ChevronLeft,
  MenuIcon,
  Upload,
  Grid,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EmployeeOrders } from "@/components/employee-orders"
import { TableManagement } from "@/components/table-management" // Importación de gestión de mesas

// Datos de ejemplo (en una aplicación real, estos vendrían de una API)
const data = [
  { name: "Pizza", ventas: 120 },
  { name: "Hamburguesa", ventas: 95 },
  { name: "Sushi", ventas: 75 },
  { name: "Pasta", ventas: 50 },
  { name: "Ensalada", ventas: 30 },
]

const salesModes = [
  { name: "Delivery", value: 55 },
  { name: "Take Away", value: 28 },
  { name: "Reservas", value: 15 },
]

const COLORS = ["#4F46E5", "#FFBB28", "#FF8042"]
const DARK_MODE_COLORS = ["#818cf8", "#fbbf24", "#f87171"]

const recentOrders = [
  { id: 1, customer: "Juan Pérez", total: "$45.00", status: "Entregado", type: "Delivery" },
  { id: 2, customer: "María García", total: "$32.50", status: "En camino", type: "Delivery" },
  { id: 3, customer: "Carlos Rodríguez", total: "$28.75", status: "Preparando", type: "Take Away" },
  { id: 4, customer: "Ana Martínez", total: "$50.25", status: "Entregado", type: "Take Away" },
  { id: 5, customer: "Luis Sánchez", total: "$37.00", status: "En camino", type: "Delivery" },
]

const deliveryData = [
  { hour: "10:00", orders: 5 },
  { hour: "12:00", orders: 8 },
  { hour: "14:00", orders: 12 },
  { hour: "16:00", orders: 9 },
  { hour: "18:00", orders: 15 },
  { hour: "20:00", orders: 10 },
]

const takeAwayData = [
  { hour: "10:00", orders: 3 },
  { hour: "12:00", orders: 6 },
  { hour: "14:00", orders: 9 },
  { hour: "16:00", orders: 7 },
  { hour: "18:00", orders: 11 },
  { hour: "20:00", orders: 8 },
]

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("general")
  const [timeFilter, setTimeFilter] = useState("day")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return <VistaGeneralSection darkMode={darkMode} timeFilter={timeFilter} />
      case "pedidos":
        return <PedidosSection darkMode={darkMode} timeFilter={timeFilter} />
      case "reservas":
        return <ReservasSection darkMode={darkMode} timeFilter={timeFilter} />
      case "ventas":
        return <VentasSection darkMode={darkMode} timeFilter={timeFilter} />
      case "menu":
        return <MenuSection />
      case "configuracion":
        return <ConfiguracionSection />
      case "empleados":
        return <EmployeeOrders />
      case "mesas": // Nuevo caso para la gestión de mesas
        return <TableManagement />
      default:
        return <VistaGeneralSection darkMode={darkMode} timeFilter={timeFilter} />
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark bg-gray-900 text-white" : ""}`}>
      {/* Top Bar */}
      <header className="bg-background border-b border-border p-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <MenuIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold">MenuChats</h1>
        <div className="flex items-center space-x-2">
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <span>{darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}</span>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="absolute top-4 right-4">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <nav className="space-y-2 mt-8">
            {[
              { icon: LayoutDashboard, label: "General" },
              { icon: ShoppingBag, label: "Pedidos" },
              { icon: BookOpen, label: "Reservas" },
              { icon: DollarSign, label: "Ventas" },
              { icon: MenuIcon, label: "Menú" },
              { icon: Settings, label: "Configuración" },
              { icon: Users, label: "Empleados" },
              { icon: Grid, label: "Mesas" }, // Nuevo ítem para la gestión de mesas
            ].map((item, index) => (
              <Button
                key={index}
                variant={activeSection === item.label.toLowerCase() ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setActiveSection(item.label.toLowerCase())
                  setSidebarOpen(false)
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-x-hidden">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
          {activeSection !== "menu" && (
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Hoy</SelectItem>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="month">Mes</SelectItem>
                <SelectItem value="year">Año</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        {renderSection()}
      </main>
    </div>
  )
}

function VistaGeneralSection({ darkMode, timeFilter }) {
  const [chatData, setChatData] = useState([])
  const colors = darkMode ? DARK_MODE_COLORS : COLORS

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await fetch("/api/n8n-webhook")
        const result = await response.json()
        if (result.success) {
          setChatData(result.data)
        }
      } catch (error) {
        console.error("Error al obtener datos del chat:", error)
      }
    }

    fetchChatData()
    // Actualizar datos cada 5 minutos
    const interval = setInterval(fetchChatData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Procesar datos para gráficos
  const conversationsByDate = chatData.reduce((acc, chat) => {
    const date = new Date(chat.timestamp).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const conversationData = Object.entries(conversationsByDate).map(([date, count]) => ({
    date,
    conversaciones: count,
  }))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {[
          { title: "Total Ventas", value: "$357,000", change: "+20.1%" },
          { title: "Nuevos Clientes", value: "203", change: "+15.3%" },
          { title: "Pedidos Delivery", value: "55", change: "+8.2%" },
          { title: "Para Llevar", value: "28", change: "+5.7%" },
          { title: "Reservas", value: "15", change: "+12.5%" },
        ].map((item, index) => (
          <Card key={index} className="p-3 text-center shadow-md bg-background border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.change} vs período anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funnel de Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesModes}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Productos más vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill={colors[1]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modalidades de Venta</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={salesModes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {salesModes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversaciones del Chatbot por Día</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversationData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="conversaciones" stroke={colors[2]} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function PedidosSection({ darkMode, timeFilter }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Pedidos</h3>
      <Tabs defaultValue="delivery">
        <TabsList>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="takeaway">Take Away</TabsTrigger>
        </TabsList>
        <TabsContent value="delivery">
          <DeliverySection darkMode={darkMode} timeFilter={timeFilter} />
        </TabsContent>
        <TabsContent value="takeaway">
          <TakeAwaySection darkMode={darkMode} timeFilter={timeFilter} />
        </TabsContent>
      </Tabs>
      <RecentOrdersSection />
    </div>
  )
}

function DeliverySection({ darkMode, timeFilter }) {
  const colors = darkMode ? DARK_MODE_COLORS : COLORS

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Total Pedidos Delivery", value: "58", change: "+12%" },
          { title: "Tiempo Promedio de Entrega", value: "28 min", change: "-5%" },
          { title: "Valoración Promedio", value: "4.7 / 5", change: "+0.2" },
        ].map((item, index) => (
          <Card key={index} className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.change} vs período anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Delivery por Hora</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={deliveryData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke={colors[0]} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Últimos Pedidos Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders
                .filter((order) => order.type === "Delivery")
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function TakeAwaySection({ darkMode, timeFilter }) {
  const colors = darkMode ? DARK_MODE_COLORS : COLORS

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Total Pedidos Take Away", value: "42", change: "+8%" },
          { title: "Tiempo Promedio de Preparación", value: "15 min", change: "-2%" },
          { title: "Valoración Promedio", value: "4.8 / 5", change: "+0.1" },
        ].map((item, index) => (
          <Card key={index} className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.change} vs período anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pedidos Take Away por Hora</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={takeAwayData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke={colors[1]} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Últimos Pedidos Take Away</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders
                .filter((order) => order.type === "Take Away")
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function RecentOrdersSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={order.customer} />
                <AvatarFallback>
                  {order.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{order.customer}</p>
                <p className="text-sm text-muted-foreground">
                  {order.total} - {order.type}
                </p>
              </div>
              <div className="ml-auto font-medium">{order.status}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ReservasSection({ darkMode, timeFilter }) {
  const colors = darkMode ? DARK_MODE_COLORS : COLORS

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-foreground">Reservas</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Total Reservas", value: "32", change: "+15%" },
          { title: "Ocupación Promedio", value: "78%", change: "+5%" },
          { title: "Tiempo Promedio de Estancia", value: "1h 45min", change: "-10min" },
        ].map((item, index) => (
          <Card key={index} className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.change} vs período anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reservas por Hora</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                { hour: "12:00", reservas: 5 },
                { hour: "13:00", reservas: 8 },
                { hour: "14:00", reservas: 12 },
                { hour: "19:00", reservas: 10 },
                { hour: "20:00", reservas: 15 },
                { hour: "21:00", reservas: 9 },
              ]}
            >
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="reservas" stroke={colors[2]} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function VentasSection({ darkMode, timeFilter }) {
  const colors = darkMode ? DARK_MODE_COLORS : COLORS

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-foreground">Ventas</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Ventas", value: "$357,000", change: "+20.1%", icon: DollarSign },
          { title: "Nuevos Clientes", value: "203", change: "+15.3%", icon: Users },
          { title: "Ticket Promedio", value: "$42.50", change: "+5.2%", icon: DollarSign },
          { title: "Tasa de Conversión", value: "3.2%", change: "+0.5%", icon: Users },
        ].map((item, index) => (
          <Card key={index} className="bg-background border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.change} vs período anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ventas por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function MenuSection() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Pizza Margherita",
      price: 12.99,
      category: "Pizzas",
      image: "/placeholder.svg?height=100&width=100",
      inStock: true,
      available: true,
      description: "Tomate, mozzarella y albahaca",
    },
    {
      id: 2,
      name: "Hamburguesa Clásica",
      price: 9.99,
      category: "Hamburguesas",
      image: "/placeholder.svg?height=100&width=100",
      inStock: true,
      available: true,
      description: "Carne de res, lechuga, tomate y queso",
    },
    {
      id: 3,
      name: "Ensalada César",
      price: 8.99,
      category: "Ensaladas",
      image: "/placeholder.svg?height=100&width=100",
      inStock: true,
      available: true,
      description: "Lechuga romana, crutones, parmesano y aderezo César",
    },
  ])

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
    inStock: true,
    available: true,
    description: "",
  })

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      setMenuItems([
        ...menuItems,
        { ...newItem, id: Date.now(), image: newItem.image || "/placeholder.svg?height=100&width=100" },
      ])
      setNewItem({ name: "", price: "", category: "", image: null, inStock: true, available: true, description: "" })
    }
  }

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateItem = (id, field, value) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Plato al Menú</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="itemName">Nombre del Plato</Label>
              <Input
                id="itemName"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Ej: Pizza Margherita"
              />
            </div>
            <div>
              <Label htmlFor="itemPrice">Precio</Label>
              <Input
                id="itemPrice"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) || "" })}
                placeholder="Ej: 12.99"
                type="number"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="itemCategory">Categoría</Label>
              <Input
                id="itemCategory"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                placeholder="Ej: Pizzas"
              />
            </div>
            <div>
              <Label htmlFor="itemDescription">Descripción</Label>
              <Input
                id="itemDescription"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Breve descripción del plato"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="itemInStock"
                checked={newItem.inStock}
                onCheckedChange={(checked) => setNewItem({ ...newItem, inStock: checked })}
              />
              <Label htmlFor="itemInStock">En Stock</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="itemAvailable"
                checked={newItem.available}
                onCheckedChange={(checked) => setNewItem({ ...newItem, available: checked })}
              />
              <Label htmlFor="itemAvailable">Disponible</Label>
            </div>
            <div>
              <Label htmlFor="itemImage">Imagen del Plato</Label>
              <div className="flex items-center space-x-2">
                <Input id="itemImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Label
                  htmlFor="itemImage"
                  className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg"
                >
                  {newItem.image ? (
                    <img
                      src={newItem.image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400" />
                  )}
                </Label>
                <span className="text-sm text-gray-500">Click para subir imagen</span>
              </div>
            </div>
            <Button onClick={handleAddItem}>Agregar Plato</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Menú Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Card key={item.id}>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-sm">{item.description}</p>
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`inStock-${item.id}`}
                        checked={item.inStock}
                        onCheckedChange={(checked) => handleUpdateItem(item.id, "inStock", checked)}
                      />
                      <Label htmlFor={`inStock-${item.id}`}>En Stock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`available-${item.id}`}
                        checked={item.available}
                        onCheckedChange={(checked) => handleUpdateItem(item.id, "available", checked)}
                      />
                      <Label htmlFor={`available-${item.id}`}>Disponible</Label>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)} className="mt-2">
                    Eliminar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ConfiguracionSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Configuración</h3>
      <Card>
        <CardHeader>
          <CardTitle>Ajustes del Restaurante</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="restaurantName">Nombre del Restaurante</Label>
              <Input id="restaurantName" placeholder="Ingrese el nombre de su restaurante" />
            </div>
            <div>
              <Label htmlFor="restaurantAddress">Dirección</Label>
            </div>
            <div>
              <Label htmlFor="restaurantAddress">Dirección</Label>
              <Input id="restaurantAddress" placeholder="Ingrese la dirección de su restaurante" />
            </div>
            <div>
              <Label htmlFor="restaurantPhone">Teléfono</Label>
              <Input id="restaurantPhone" placeholder="Ingrese el teléfono de su restaurante" />
            </div>
            <div>
              <Label htmlFor="restaurantEmail">Email</Label>
              <Input id="restaurantEmail" type="email" placeholder="Ingrese el email de su restaurante" />
            </div>
            <div>
              <Label>Horario de Atención</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="openTime">Hora de Apertura</Label>
                  <Input id="openTime" type="time" />
                </div>
                <div>
                  <Label htmlFor="closeTime">Hora de Cierre</Label>
                  <Input id="closeTime" type="time" />
                </div>
              </div>
            </div>
            <div>
              <Label>Días de Atención</Label>
              <div className="flex flex-wrap gap-2">
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                  <div key={day} className="flex items-center">
                    <Checkbox id={day} />
                    <Label htmlFor={day} className="ml-2">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Button>Guardar Cambios</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

