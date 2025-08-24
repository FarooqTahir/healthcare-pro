"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Plus, 
  FileText, 
  Activity, 
  Heart, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Stethoscope,
  Edit,
  Share2,
  AlertCircle,
  Pill
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  email: string
  phone: string
  address: string
  bloodType: string
  image?: string
}

export default function PatientRecordsPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string

  // Mock patient data
  const patient: Patient = {
    id: patientId,
    name: "Sarah Johnson",
    age: 28,
    gender: "Female",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    bloodType: "O+",
    image: "/placeholder-user.jpg"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push('/patients')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Patients
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Patient Records</h1>
            <p className="text-muted-foreground">Comprehensive medical information for {patient.name}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Patient Information Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={patient.image} alt={patient.name} />
                    <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{patient.name}</CardTitle>
                <CardDescription className="text-base font-medium text-blue-600">
                  Patient ID: {patient.id}
                </CardDescription>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Active
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Information */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{patient.age} years • {patient.gender}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span>Blood Type: {patient.bloodType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    <span>Primary Doctor: Dr. Sarah Johnson</span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{patient.address}</span>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="pt-2 border-t">
                  <h4 className="font-semibold text-sm mb-2">Emergency Contact</h4>
                  <div className="space-y-1 text-sm">
                    <div>Emergency Contact: Michael Johnson</div>
                    <div className="text-muted-foreground">Phone: +1 (555) 123-4568</div>
                  </div>
                </div>

                {/* Insurance */}
                <div className="pt-2 border-t">
                  <h4 className="font-semibold text-sm mb-2">Insurance</h4>
                  <div className="text-sm text-muted-foreground">Blue Cross Blue Shield</div>
                </div>

                {/* Appointments */}
                <div className="pt-2 border-t">
                  <h4 className="font-semibold text-sm mb-2">Appointments</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Visit:</span>
                      <span>Jan 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next:</span>
                      <span className="text-green-600 font-medium">
                        Feb 20, 2024
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Medical Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Medical Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Medical History */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Medical History</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge key="Hypertension" variant="secondary">
                      Hypertension
                    </Badge>
                    <Badge key="Diabetes" variant="secondary">
                      Type 2 Diabetes
                    </Badge>
                    <Badge key="Asthma" variant="secondary">
                      Asthma
                    </Badge>
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    Allergies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge key="Penicillin" variant="outline" className="text-red-600 border-red-200">
                      Penicillin
                    </Badge>
                    <Badge key="Shellfish" variant="outline" className="text-red-600 border-red-200">
                      Shellfish
                    </Badge>
                  </div>
                </div>

                {/* Current Medications */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Pill className="h-4 w-4 text-blue-600" />
                    Current Medications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge key="Metformin" variant="outline">
                      Metformin
                    </Badge>
                    <Badge key="Lisinopril" variant="outline">
                      Lisinopril
                    </Badge>
                    <Badge key="Albuterol" variant="outline">
                      Albuterol
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Records Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="records" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="records">Medical Records</TabsTrigger>
                    <TabsTrigger value="labs">Lab Results</TabsTrigger>
                    <TabsTrigger value="vitals">Vitals</TabsTrigger>
                  </TabsList>

                  {/* Medical Records Tab */}
                  <TabsContent value="records" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Medical Records</h3>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Record
                      </Button>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Stethoscope className="h-5 w-5 text-blue-600" />
                            <div>
                              <CardTitle className="text-base">Consultation</CardTitle>
                              <CardDescription>
                                Jan 15, 2024 • Dr. Sarah Johnson
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline">Consultation</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm">Diagnosis</h4>
                          <p className="text-sm text-muted-foreground">Hypertension management</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Treatment</h4>
                          <p className="text-sm text-muted-foreground">Lisinopril 10mg daily, lifestyle modifications</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Notes</h4>
                          <p className="text-sm text-muted-foreground">Patient reports good compliance with medication. Blood pressure readings improved.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Lab Results Tab */}
                  <TabsContent value="labs" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Laboratory Results</h3>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Result
                      </Button>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">Complete Blood Count (CBC)</CardTitle>
                            <CardDescription>
                              Jan 15, 2024 • Dr. Sarah Johnson
                            </CardDescription>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Normal
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-sm">Result</h4>
                            <p className="text-sm text-muted-foreground">Normal</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">Notes</h4>
                            <p className="text-sm text-muted-foreground">All values within normal limits</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Vitals Tab */}
                  <TabsContent value="vitals" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Vital Signs</h3>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vitals
                      </Button>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-600" />
                            Blood Pressure
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-red-600">120/80</div>
                          <p className="text-sm text-muted-foreground">mmHg • Normal</p>
                          <p className="text-xs text-muted-foreground mt-1">Last updated: Jan 15, 2024</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Activity className="h-5 w-5 text-blue-600" />
                            Heart Rate
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">72</div>
                          <p className="text-sm text-muted-foreground">bpm • Normal</p>
                          <p className="text-xs text-muted-foreground mt-1">Last updated: Jan 15, 2024</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
