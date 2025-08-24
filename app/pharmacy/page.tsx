"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search,
  Filter,
  Plus,
  Pill,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  ShoppingCart,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"

interface Medication {
  id: string
  name: string
  genericName: string
  category: string
  strength: string
  form: string
  manufacturer: string
  price: number
  stockQuantity: number
  minStockLevel: number
  expiryDate: string
  requiresPrescription: boolean
  status: "In Stock" | "Low Stock" | "Out of Stock" | "Expired"
}

interface Prescription {
  id: string
  patientName: string
  doctorName: string
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  quantity: number
  status: "Pending" | "Filled" | "Dispensed" | "Cancelled"
  prescribedDate: string
  filledDate?: string
}

const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Lisinopril",
    genericName: "Lisinopril",
    category: "Cardiovascular",
    strength: "10mg",
    form: "Tablet",
    manufacturer: "Generic Pharma",
    price: 15.99,
    stockQuantity: 150,
    minStockLevel: 20,
    expiryDate: "2025-12-31",
    requiresPrescription: true,
    status: "In Stock"
  },
  {
    id: "2",
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    category: "Diabetes",
    strength: "500mg",
    form: "Tablet",
    manufacturer: "Diabetes Care Inc",
    price: 12.50,
    stockQuantity: 200,
    minStockLevel: 30,
    expiryDate: "2026-03-15",
    requiresPrescription: true,
    status: "In Stock"
  },
  {
    id: "3",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    category: "Pain Relief",
    strength: "400mg",
    form: "Tablet",
    manufacturer: "Pain Relief Co",
    price: 8.99,
    stockQuantity: 8,
    minStockLevel: 25,
    expiryDate: "2025-08-20",
    requiresPrescription: false,
    status: "Low Stock"
  },
  {
    id: "4",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    category: "Antibiotics",
    strength: "500mg",
    form: "Capsule",
    manufacturer: "Antibiotic Labs",
    price: 22.75,
    stockQuantity: 0,
    minStockLevel: 15,
    expiryDate: "2025-11-10",
    requiresPrescription: true,
    status: "Out of Stock"
  },
  {
    id: "5",
    name: "Omeprazole",
    genericName: "Omeprazole",
    category: "Gastrointestinal",
    strength: "20mg",
    form: "Capsule",
    manufacturer: "GI Health",
    price: 18.50,
    stockQuantity: 45,
    minStockLevel: 20,
    expiryDate: "2024-12-01",
    requiresPrescription: true,
    status: "Expired"
  }
]

const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    doctorName: "Dr. Michael Chen",
    medicationName: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    quantity: 30,
    status: "Pending",
    prescribedDate: "2024-01-15"
  },
  {
    id: "2",
    patientName: "Michael Chen",
    doctorName: "Dr. Emily Rodriguez",
    medicationName: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "90 days",
    quantity: 180,
    status: "Filled",
    prescribedDate: "2024-01-10",
    filledDate: "2024-01-12"
  },
  {
    id: "3",
    patientName: "Emily Rodriguez",
    doctorName: "Dr. James Wilson",
    medicationName: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    duration: "7 days",
    quantity: 21,
    status: "Dispensed",
    prescribedDate: "2024-01-08",
    filledDate: "2024-01-09"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Out of Stock':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'Expired':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getPrescriptionStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Filled':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Dispensed':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Cancelled':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [prescriptionStatusFilter, setPrescriptionStatusFilter] = useState("all")

  const filteredMedications = mockMedications.filter(medication => {
    const matchesSearch = medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medication.genericName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || medication.category === categoryFilter
    const matchesStatus = statusFilter === "all" || medication.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesStatus = prescriptionStatusFilter === "all" || prescription.status === prescriptionStatusFilter
    return matchesStatus
  })

  const stats = {
    totalMedications: mockMedications.length,
    inStock: mockMedications.filter(m => m.status === "In Stock").length,
    lowStock: mockMedications.filter(m => m.status === "Low Stock").length,
    outOfStock: mockMedications.filter(m => m.status === "Out of Stock").length,
    expired: mockMedications.filter(m => m.status === "Expired").length,
    totalPrescriptions: mockPrescriptions.length,
    pending: mockPrescriptions.filter(p => p.status === "Pending").length,
    filled: mockPrescriptions.filter(p => p.status === "Filled").length,
    dispensed: mockPrescriptions.filter(p => p.status === "Dispensed").length
  }

  const categories = ["Cardiovascular", "Diabetes", "Pain Relief", "Antibiotics", "Gastrointestinal"]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Pharmacy Management</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive medication inventory and prescription management system
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Pill className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalMedications}</p>
                <p className="text-sm text-muted-foreground">Total Medications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.inStock}</p>
                <p className="text-sm text-muted-foreground">In Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{stats.lowStock}</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.outOfStock}</p>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalPrescriptions}</p>
                <p className="text-sm text-muted-foreground">Prescriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medications by name or generic name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            
            <Link href="/pharmacy/add-medication">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Medication
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Medications Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMedications.map((medication) => (
          <Card key={medication.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{medication.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {medication.genericName} • {medication.strength} {medication.form}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(medication.status)}>
                  {medication.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Medication Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{medication.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Manufacturer:</span>
                  <span className="font-medium">{medication.manufacturer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">${medication.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className={`font-medium ${medication.stockQuantity <= medication.minStockLevel ? 'text-red-600' : ''}`}>
                    {medication.stockQuantity} units
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Expires:</span>
                  <span className="font-medium">{new Date(medication.expiryDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Prescription Required */}
              {medication.requiresPrescription && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <FileText className="h-4 w-4" />
                  Prescription Required
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prescriptions Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Prescriptions
              </CardTitle>
              <CardDescription>
                Manage patient prescriptions and dispensing
              </CardDescription>
            </div>
            <Select value={prescriptionStatusFilter} onValueChange={setPrescriptionStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Filled">Filled</SelectItem>
                <SelectItem value="Dispensed">Dispensed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <div key={prescription.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-semibold">{prescription.medicationName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {prescription.dosage} • {prescription.frequency} • {prescription.duration}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p><strong>Patient:</strong> {prescription.patientName}</p>
                      <p><strong>Doctor:</strong> {prescription.doctorName}</p>
                    </div>
                    <div className="text-sm">
                      <p><strong>Quantity:</strong> {prescription.quantity}</p>
                      <p><strong>Prescribed:</strong> {new Date(prescription.prescribedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPrescriptionStatusColor(prescription.status)}>
                    {prescription.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* No Results */}
      {filteredMedications.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No medications found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
    </div>
  )
}
