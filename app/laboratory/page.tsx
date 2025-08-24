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
  Microscope,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Users,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Download,
  Printer,
  Activity,
  TrendingDown
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"

interface LabTest {
  id: string
  name: string
  category: string
  description: string
  preparation: string
  turnaroundTime: string
  price: number
  status: "Available" | "Unavailable" | "Maintenance"
  patientName?: string
  testType?: string
  priority?: "Routine" | "Urgent" | "Emergency"
}

interface LabResult {
  id: string
  testName: string
  patientName: string
  patientId: string
  doctorName: string
  testType: string
  result: string
  unit: string
  referenceRange: string
  resultStatus: "Normal" | "High" | "Low" | "Critical"
  completedDate: string
  technician: string
  notes?: string
}

const mockLabTests: LabTest[] = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    description: "Measures red blood cells, white blood cells, and platelets",
    preparation: "Fasting required for 8-12 hours",
    turnaroundTime: "24 hours",
    price: 45.00,
    status: "Available",
    patientName: "Sarah Johnson",
    testType: "Hematology",
    priority: "Routine"
  },
  {
    id: "2",
    name: "Comprehensive Metabolic Panel (CMP)",
    category: "Chemistry",
    description: "Measures kidney function, liver function, and electrolyte levels",
    preparation: "Fasting required for 8-12 hours",
    turnaroundTime: "24 hours",
    price: 65.00,
    status: "Available",
    patientName: "Michael Chen",
    testType: "Chemistry",
    priority: "Urgent"
  },
  {
    id: "3",
    name: "Lipid Panel",
    category: "Chemistry",
    description: "Measures cholesterol and triglyceride levels",
    preparation: "Fasting required for 8-12 hours",
    turnaroundTime: "24 hours",
    price: 35.00,
    status: "Available",
    patientName: "Emily Rodriguez",
    testType: "Chemistry",
    priority: "Routine"
  }
]

const mockLabResults: LabResult[] = [
  {
    id: "1",
    testName: "Complete Blood Count (CBC)",
    patientName: "Sarah Johnson",
    patientId: "P001",
    doctorName: "Dr. Michael Chen",
    testType: "Hematology",
    result: "12.5",
    unit: "10^9/L",
    referenceRange: "4.5-11.0",
    resultStatus: "High",
    completedDate: "2024-01-16",
    technician: "Lab Tech Smith",
    notes: "Elevated white blood cell count, possible infection"
  },
  {
    id: "2",
    testName: "Hemoglobin",
    patientName: "Sarah Johnson",
    patientId: "P001",
    doctorName: "Dr. Michael Chen",
    testType: "Hematology",
    result: "14.2",
    unit: "g/dL",
    referenceRange: "12.0-15.5",
    resultStatus: "Normal",
    completedDate: "2024-01-16",
    technician: "Lab Tech Smith"
  },
  {
    id: "3",
    testName: "Glucose (Fasting)",
    patientName: "Michael Chen",
    patientId: "P002",
    doctorName: "Dr. Emily Rodriguez",
    testType: "Chemistry",
    result: "95",
    unit: "mg/dL",
    referenceRange: "70-100",
    resultStatus: "Normal",
    completedDate: "2024-01-16",
    technician: "Lab Tech Johnson"
  },
  {
    id: "4",
    testName: "Creatinine",
    patientName: "Michael Chen",
    patientId: "P002",
    doctorName: "Dr. Emily Rodriguez",
    testType: "Chemistry",
    result: "0.8",
    unit: "mg/dL",
    referenceRange: "0.6-1.2",
    resultStatus: "Normal",
    completedDate: "2024-01-16",
    technician: "Lab Tech Johnson"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Completed':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Cancelled':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Routine':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Urgent':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Emergency':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getResultStatusColor = (status: string) => {
  switch (status) {
    case 'Normal':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'High':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'Low':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Critical':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function LaboratoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [testTypeFilter, setTestTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredLabTests = mockLabTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (test.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    const matchesTestType = testTypeFilter === "all" || test.testType === testTypeFilter
    const matchesStatus = statusFilter === "all" || test.status === statusFilter
    const matchesPriority = priorityFilter === "all" || test.priority === priorityFilter
    
    return matchesSearch && matchesTestType && matchesStatus && matchesPriority
  })

  const stats = {
    totalTests: mockLabTests.length,
    available: mockLabTests.filter(t => t.status === "Available").length,
    unavailable: mockLabTests.filter(t => t.status === "Unavailable").length,
    maintenance: mockLabTests.filter(t => t.status === "Maintenance").length,
    urgent: mockLabTests.filter(t => t.priority === "Urgent").length,
    emergency: mockLabTests.filter(t => t.priority === "Emergency").length,
    routine: mockLabTests.filter(t => t.priority === "Routine").length,
    totalResults: mockLabResults.length,
    normal: mockLabResults.filter(r => r.resultStatus === "Normal").length,
    abnormal: mockLabResults.filter(r => r.resultStatus !== "Normal").length
  }

  const testTypes = ["Hematology", "Chemistry", "Endocrinology", "Urinalysis", "Microbiology", "Immunology"]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Laboratory Management</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive laboratory testing and results management system
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Microscope className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalTests}</p>
                <p className="text-sm text-muted-foreground">Total Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{stats.available}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.unavailable}</p>
                <p className="text-sm text-muted-foreground">Unavailable</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.maintenance}</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{stats.urgent}</p>
                <p className="text-sm text-muted-foreground">Urgent Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.normal}</p>
                <p className="text-sm text-muted-foreground">Normal Results</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.abnormal}</p>
                <p className="text-sm text-muted-foreground">Abnormal Results</p>
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
                  placeholder="Search tests by name or patient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={testTypeFilter} onValueChange={setTestTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by test type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Test Types</SelectItem>
                {testTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Routine">Routine</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
            
            <Link href="/laboratory/add-test">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Test
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Lab Tests Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLabTests.map((test) => (
          <Card key={test.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{test.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {test.category} • {test.patientName || "General Test"}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(test.status)}>
                    {test.status}
                  </Badge>
                  {test.priority && (
                    <Badge className={getPriorityColor(test.priority)}>
                      {test.priority}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Test Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{test.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Preparation:</span>
                  <span className="font-medium">{test.preparation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Turnaround:</span>
                  <span className="font-medium">{test.turnaroundTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">${test.price.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {test.status === "Available" && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lab Results Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Lab Results
          </CardTitle>
          <CardDescription>
            View and manage laboratory test results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLabResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-semibold">{result.testName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {result.testType} • {result.patientName}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p><strong>Result:</strong> {result.result} {result.unit}</p>
                      <p><strong>Reference:</strong> {result.referenceRange}</p>
                    </div>
                    <div className="text-sm">
                      <p><strong>Technician:</strong> {result.technician}</p>
                      <p><strong>Completed:</strong> {new Date(result.completedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {result.notes && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <strong>Notes:</strong> {result.notes}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getResultStatusColor(result.resultStatus)}>
                    {result.resultStatus}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* No Results */}
      {filteredLabTests.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No lab tests found</h3>
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
