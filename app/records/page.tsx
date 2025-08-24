"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, User, Download } from "lucide-react"
import { findMedicalRecordsByPatientId, findUserById } from "@/lib/data"
import { format } from "date-fns"
import { Navbar } from "@/components/navigation/navbar"

export default function MedicalRecordsPage() {
  // User data for the application
  const user = {
    id: "user-1",
    name: "John Doe",
    role: "PATIENT" as const
  }

  // Mock medical records data for demonstration
  const mockMedicalRecords = [
    {
      id: "1",
      patientId: "user-1",
      doctorId: "2",
      visitDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15), // Current month, 15th
      diagnosis: "Hypertension - Stage 1",
      symptoms: "Elevated blood pressure readings, occasional headaches, mild fatigue",
      treatment: "Lifestyle modifications, blood pressure monitoring, reduced sodium intake",
      prescription: "Lisinopril 10mg daily, Amlodipine 5mg daily",
      notes: "Patient shows good response to medication. BP reduced from 150/95 to 130/85. Follow-up in 3 months.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      patientId: "user-1",
      doctorId: "3",
      visitDate: new Date(new Date().getFullYear(), new Date().getMonth(), 22), // Current month, 22nd
      diagnosis: "Type 2 Diabetes - Well controlled",
      symptoms: "Asymptomatic - routine checkup",
      treatment: "Continued diabetes management, regular blood glucose monitoring",
      prescription: "Metformin 500mg twice daily, Glipizide 5mg daily",
      notes: "HbA1c improved to 6.2% (down from 7.1%). Excellent glycemic control maintained.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      patientId: "user-1",
      doctorId: "2",
      visitDate: new Date(new Date().getFullYear(), new Date().getMonth(), 28), // Current month, 28th
      diagnosis: "Annual Physical Examination",
      symptoms: "No acute symptoms reported",
      treatment: "Preventive care, health counseling, vaccination updates",
      prescription: "No new medications",
      notes: "Overall health status: Good. BMI: 24.5, BP: 128/82, Heart rate: 72 bpm. All systems within normal limits.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      patientId: "user-1",
      doctorId: "4",
      visitDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5), // Next month, 5th
      diagnosis: "Mild Depression - Improved",
      symptoms: "Decreased energy, sleep disturbances, mild anxiety",
      treatment: "Cognitive behavioral therapy, stress management techniques",
      prescription: "Sertraline 50mg daily, Melatonin 3mg at bedtime",
      notes: "Patient reports significant improvement in mood and sleep quality. Continuing therapy sessions bi-weekly.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      patientId: "user-1",
      doctorId: "2",
      visitDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 12), // Next month, 12th
      diagnosis: "Upper Respiratory Infection",
      symptoms: "Sore throat, nasal congestion, mild fever (100.2°F), cough",
      treatment: "Rest, increased fluid intake, over-the-counter symptom relief",
      prescription: "Acetaminophen 500mg as needed, Saline nasal spray",
      notes: "Viral infection, no antibiotics needed. Symptoms resolved within 7 days.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      patientId: "user-1",
      doctorId: "5",
      visitDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 18), // Next month, 18th
      diagnosis: "Carpal Tunnel Syndrome - Right wrist",
      symptoms: "Numbness and tingling in right hand, especially at night, weakness in grip",
      treatment: "Wrist splinting, ergonomic modifications, physical therapy",
      prescription: "Ibuprofen 400mg three times daily, Vitamin B6 100mg daily",
      notes: "Symptoms improved with splinting. Physical therapy exercises recommended. Surgery not required at this time.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "7",
      patientId: "user-1",
      doctorId: "2",
      visitDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 25), // Next month, 25th
      diagnosis: "Seasonal Allergies",
      symptoms: "Sneezing, runny nose, itchy eyes, post-nasal drip",
      treatment: "Allergen avoidance, nasal irrigation, antihistamine therapy",
      prescription: "Cetirizine 10mg daily, Fluticasone nasal spray",
      notes: "Symptoms well controlled with current regimen. Continue through allergy season.",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]

  const medicalRecords = mockMedicalRecords

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <p className="text-muted-foreground">
              View your medical history and records
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {medicalRecords.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No medical records found</h3>
                <p className="text-muted-foreground text-center">
                  Your medical records will appear here after your first visit.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {medicalRecords.map((record) => {
                const doctor = findUserById(record.doctorId)

                return (
                  <Card key={record.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            Visit with Dr. {doctor?.name || "Unknown"}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{format(record.visitDate, "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>Dr. {doctor?.name}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {format(record.visitDate, "MMM d")}
                        </Badge>
                      </div>
                      <CardDescription className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {record.diagnosis}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {record.symptoms && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            Symptoms
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                            {record.symptoms}
                          </p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          Diagnosis
                        </h4>
                        <p className="text-sm bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                          {record.diagnosis}
                        </p>
                      </div>

                      {record.treatment && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Treatment Plan
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                            {record.treatment}
                          </p>
                        </div>
                      )}

                      {record.prescription && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Prescriptions
                          </h4>
                          <p className="text-sm bg-purple-50 dark:bg-purple-950/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                            {record.prescription}
                          </p>
                        </div>
                      )}

                      {record.notes && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            Clinical Notes
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                            {record.notes}
                          </p>
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Record ID: {record.id}</span>
                          <span>Last updated: {format(record.updatedAt, "MMM d, yyyy 'at' h:mm a")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
