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
  DollarSign,
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
  CreditCard,
  Receipt,
  Shield,
  Send
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"

interface Bill {
  id: string
  patientName: string
  patientId: string
  serviceType: string
  amount: number
  insuranceCoverage: number
  patientResponsibility: number
  status: "Pending" | "Paid" | "Overdue" | "Disputed"
  dueDate: string
  issuedDate: string
  doctorName: string
}

interface InsuranceClaim {
  id: string
  patientName: string
  patientId: string
  serviceType: string
  amount: number
  status: "Submitted" | "Under Review" | "Approved" | "Denied" | "Paid"
  submittedDate: string
  processedDate: string
  insuranceProvider: string
  claimNumber: string
  denialReason?: string
}

const mockBills: Bill[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    patientId: "P001",
    serviceType: "Cardiology Consultation",
    amount: 250.00,
    insuranceCoverage: 200.00,
    patientResponsibility: 50.00,
    status: "Paid",
    dueDate: "2024-02-15",
    issuedDate: "2024-01-15",
    doctorName: "Dr. Michael Chen"
  },
  {
    id: "2",
    patientName: "Michael Chen",
    patientId: "P002",
    serviceType: "Neurology Examination",
    amount: 300.00,
    insuranceCoverage: 240.00,
    patientResponsibility: 60.00,
    status: "Pending",
    dueDate: "2024-02-20",
    issuedDate: "2024-01-16",
    doctorName: "Dr. Emily Rodriguez"
  },
  {
    id: "3",
    patientName: "Emily Rodriguez",
    patientId: "P003",
    serviceType: "Laboratory Tests",
    amount: 150.00,
    insuranceCoverage: 120.00,
    patientResponsibility: 30.00,
    status: "Overdue",
    dueDate: "2024-01-30",
    issuedDate: "2024-01-10",
    doctorName: "Dr. James Wilson"
  }
]

const mockInsuranceClaims: InsuranceClaim[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    patientId: "P001",
    serviceType: "Consultation",
    amount: 150.00,
    status: "Paid",
    submittedDate: "2024-01-15",
    processedDate: "2024-01-18",
    insuranceProvider: "Blue Cross Blue Shield",
    claimNumber: "CLM001234"
  },
  {
    id: "2",
    patientName: "Michael Chen",
    patientId: "P002",
    serviceType: "Laboratory Test",
    amount: 85.00,
    status: "Under Review",
    submittedDate: "2024-01-16",
    processedDate: "2024-01-17",
    insuranceProvider: "Kaiser Permanente",
    claimNumber: "CLM001235"
  },
  {
    id: "3",
    patientName: "Emily Rodriguez",
    patientId: "P003",
    serviceType: "X-Ray",
    amount: 120.00,
    status: "Denied",
    submittedDate: "2024-01-10",
    processedDate: "2024-01-12",
    insuranceProvider: "Aetna",
    claimNumber: "CLM001236",
    denialReason: "Service not covered under current plan"
  },
  {
    id: "4",
    patientName: "James Wilson",
    patientId: "P004",
    serviceType: "Surgery",
    amount: 2500.00,
    status: "Submitted",
    submittedDate: "2024-01-20",
    processedDate: "2024-01-21",
    insuranceProvider: "UnitedHealth Group",
    claimNumber: "CLM001237"
  }
]

const getBillStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Paid':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Overdue':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'Disputed':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'Cancelled':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getClaimStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Submitted':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Under Review':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'Approved':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Denied':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'Paid':
      return 'bg-green-100 text-green-800 border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [billStatusFilter, setBillStatusFilter] = useState("all")
  const [claimStatusFilter, setClaimStatusFilter] = useState("all")
  const [insuranceFilter, setInsuranceFilter] = useState("all")

  const filteredBills = mockBills.filter(bill => {
    const matchesSearch = bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = billStatusFilter === "all" || bill.status === billStatusFilter
    
    return matchesSearch && matchesStatus
  })

  const filteredClaims = mockInsuranceClaims.filter(claim => {
    const matchesStatus = claimStatusFilter === "all" || claim.status === claimStatusFilter
    const matchesInsurance = insuranceFilter === "all" || claim.insuranceProvider === insuranceFilter
    
    return matchesStatus && matchesInsurance
  })

  const stats = {
    totalBills: mockBills.length,
    pending: mockBills.filter(b => b.status === "Pending").length,
    paid: mockBills.filter(b => b.status === "Paid").length,
    overdue: mockBills.filter(b => b.status === "Overdue").length,
    disputed: mockBills.filter(b => b.status === "Disputed").length,
    totalClaims: mockInsuranceClaims.length,
    submitted: mockInsuranceClaims.filter(c => c.status === "Submitted").length,
    underReview: mockInsuranceClaims.filter(c => c.status === "Under Review").length,
    approved: mockInsuranceClaims.filter(c => c.status === "Approved").length,
    denied: mockInsuranceClaims.filter(c => c.status === "Denied").length,
    totalRevenue: mockBills.filter(b => b.status === "Paid").reduce((sum, b) => sum + b.amount, 0),
    pendingRevenue: mockBills.filter(b => b.status === "Pending").reduce((sum, b) => sum + b.amount, 0),
    overdueRevenue: mockBills.filter(b => b.status === "Overdue").reduce((sum, b) => sum + b.amount, 0)
  }

  const insuranceProviders = ["Blue Cross Blue Shield", "Kaiser Permanente", "Aetna", "UnitedHealth Group", "Cigna", "Anthem"]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Billing & Insurance</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive billing management and insurance claims processing system
        </p>
      </div>

      {/* Revenue Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">${stats.pendingRevenue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Pending Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">${stats.overdueRevenue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Overdue Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Receipt className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalBills}</p>
                <p className="text-sm text-muted-foreground">Total Bills</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.paid}</p>
                <p className="text-sm text-muted-foreground">Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.overdue}</p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{stats.disputed}</p>
                <p className="text-sm text-muted-foreground">Disputed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Claims Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalClaims}</p>
                <p className="text-sm text-muted-foreground">Total Claims</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.submitted}</p>
                <p className="text-sm text-muted-foreground">Submitted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.approved}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.denied}</p>
                <p className="text-sm text-muted-foreground">Denied</p>
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
                  placeholder="Search by patient name or claim number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={billStatusFilter} onValueChange={setBillStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by bill status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bill Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Disputed">Disputed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={insuranceFilter} onValueChange={setInsuranceFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by insurance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Insurance</SelectItem>
                {insuranceProviders.map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Link href="/billing/create-bill">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Bill
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Bills Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBills.map((bill) => (
          <Card key={bill.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{bill.serviceType}</CardTitle>
                  <CardDescription className="text-sm">
                    {bill.patientName} • {bill.doctorName}
                  </CardDescription>
                </div>
                <Badge className={getBillStatusColor(bill.status)}>
                  {bill.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Bill Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Patient ID:</span>
                  <span className="font-medium">{bill.patientId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">${bill.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Insurance Coverage:</span>
                  <span className="font-medium">${bill.insuranceCoverage.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Patient Responsibility:</span>
                  <span className="font-medium">${bill.patientResponsibility.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span className="font-medium">{new Date(bill.dueDate).toLocaleDateString()}</span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {bill.status === "Paid" && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insurance Claims Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Insurance Claims
              </CardTitle>
              <CardDescription>
                Track and manage insurance claim submissions
              </CardDescription>
            </div>
            <Select value={claimStatusFilter} onValueChange={setClaimStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by claim status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Claim Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Denied">Denied</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClaims.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-semibold">{claim.serviceType}</h4>
                      <p className="text-sm text-muted-foreground">
                        {claim.patientName} • {claim.insuranceProvider}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p><strong>Amount:</strong> ${claim.amount.toFixed(2)}</p>
                      <p><strong>Claim #:</strong> {claim.claimNumber}</p>
                    </div>
                    <div className="text-sm">
                      <p><strong>Submitted:</strong> {new Date(claim.submittedDate).toLocaleDateString()}</p>
                      {claim.processedDate && (
                        <p><strong>Processed:</strong> {new Date(claim.processedDate).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                  {claim.denialReason && (
                    <div className="mt-2 text-sm text-red-600">
                      <strong>Denial Reason:</strong> {claim.denialReason}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getClaimStatusColor(claim.status)}>
                    {claim.status}
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
      {filteredBills.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No bills found</h3>
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
