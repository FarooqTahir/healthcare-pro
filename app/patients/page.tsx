"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Filter, Plus, Calendar, Phone, Mail, MapPin, User, FileText } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ageFilter, setAgeFilter] = useState("all")

  // Mock patients data
  const mockPatients = [
    {
      id: "1",
      name: "Sarah Johnson",
      age: 28,
      gender: "Female",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      status: "Active",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-20",
      medicalHistory: ["Hypertension", "Diabetes Type 2"],
      allergies: ["Penicillin", "Shellfish"],
      medications: ["Lisinopril", "Metformin"],
      image: "/placeholder-user.jpg"
    },
    {
      id: "2",
      name: "Michael Chen",
      age: 35,
      gender: "Male",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, City, State 12345",
      status: "Active",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-02-15",
      medicalHistory: ["Asthma", "Seasonal Allergies"],
      allergies: ["Dust", "Pollen"],
      medications: ["Albuterol", "Fluticasone"],
      image: "/placeholder-user.jpg"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      age: 42,
      gender: "Female",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      address: "789 Pine Rd, City, State 12345",
      status: "Inactive",
      lastVisit: "2023-12-20",
      nextAppointment: null,
      medicalHistory: ["Depression", "Anxiety"],
      allergies: ["None"],
      medications: ["Sertraline", "Benzodiazepines"],
      image: "/placeholder-user.jpg"
    },
    {
      id: "4",
      name: "James Wilson",
      age: 55,
      gender: "Male",
      email: "james.wilson@email.com",
      phone: "+1 (555) 456-7890",
      address: "321 Elm St, City, State 12345",
      status: "Active",
      lastVisit: "2024-01-20",
      nextAppointment: "2024-03-01",
      medicalHistory: ["Heart Disease", "High Cholesterol"],
      allergies: ["Sulfa Drugs"],
      medications: ["Atorvastatin", "Aspirin"],
      image: "/placeholder-user.jpg"
    },
    {
      id: "5",
      name: "Lisa Thompson",
      age: 31,
      gender: "Female",
      email: "lisa.thompson@email.com",
      phone: "+1 (555) 567-8901",
      address: "654 Maple Dr, City, State 12345",
      status: "Active",
      lastVisit: "2024-01-18",
      nextAppointment: "2024-02-25",
      medicalHistory: ["Migraines", "Insomnia"],
      allergies: ["None"],
      medications: ["Sumatriptan", "Melatonin"],
      image: "/placeholder-user.jpg"
    },
    {
      id: "6",
      name: "Robert Kim",
      age: 48,
      gender: "Male",
      email: "robert.kim@email.com",
      phone: "+1 (555) 678-9012",
      address: "987 Cedar Ln, City, State 12345",
      status: "Active",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-02-18",
      medicalHistory: ["Diabetes Type 1", "Hypertension"],
      allergies: ["Latex"],
      medications: ["Insulin", "Lisinopril"],
      image: "/placeholder-user.jpg"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return "🟢"
      case "Inactive":
        return "⚪"
      case "Pending":
        return "🟡"
      default:
        return "🔵"
    }
  }

  const getGenderIcon = (gender: string) => {
    return gender === "Female" ? "👩" : "👨"
  }

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    const matchesAge = ageFilter === "all" || 
                      (ageFilter === "young" && patient.age < 30) ||
                      (ageFilter === "adult" && patient.age >= 30 && patient.age < 50) ||
                      (ageFilter === "senior" && patient.age >= 50)
    
    return matchesSearch && matchesStatus && matchesAge
  })

  const stats = [
    { label: "Total Patients", value: mockPatients.length, icon: Users },
    { label: "Active Patients", value: mockPatients.filter(p => p.status === "Active").length, icon: User },
    { label: "This Month", value: mockPatients.filter(p => p.lastVisit?.startsWith("2024-01")).length, icon: Calendar },
    { label: "Next Appointments", value: mockPatients.filter(p => p.nextAppointment).length, icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Patient Management</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive patient records and management system for healthcare professionals
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Age Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="young">Under 30</SelectItem>
                  <SelectItem value="adult">30-49</SelectItem>
                  <SelectItem value="senior">50+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="grid gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={patient.image} alt={patient.name} />
                    <AvatarFallback className="text-lg">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{patient.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{getGenderIcon(patient.gender)} {patient.age} years</span>
                          <span>•</span>
                          <span>{patient.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(patient.status)}>
                          {getStatusIcon(patient.status)} {patient.status}
                        </Badge>
                        <Link href={`/patients/${patient.id}/records`}>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            View Records
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{patient.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Last: {patient.lastVisit}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-1">Medical History</h4>
                        <div className="flex flex-wrap gap-1">
                          {patient.medicalHistory.slice(0, 2).map((condition, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                          {patient.medicalHistory.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{patient.medicalHistory.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Allergies</h4>
                        <div className="flex flex-wrap gap-1">
                          {patient.allergies.slice(0, 2).map((allergy, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {allergy}
                            </Badge>
                          ))}
                          {patient.allergies.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{patient.allergies.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Current Medications</h4>
                        <div className="flex flex-wrap gap-1">
                          {patient.medications.slice(0, 2).map((medication, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {medication}
                            </Badge>
                          ))}
                          {patient.medications.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{patient.medications.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
