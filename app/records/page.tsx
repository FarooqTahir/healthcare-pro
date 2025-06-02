"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, User, Plus, Download } from "lucide-react"
import { findMedicalRecordsByPatientId, findMedicalRecordsByDoctorId, findUserById } from "@/lib/data"
import { format } from "date-fns"

export default function MedicalRecordsPage() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Please sign in to view medical records.</div>
  }

  const medicalRecords =
    session.user.role === "PATIENT"
      ? findMedicalRecordsByPatientId(session.user.id)
      : findMedicalRecordsByDoctorId(session.user.id)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Medical Records</h1>
          <p className="text-muted-foreground">
            {session.user.role === "PATIENT"
              ? "View your medical history and records"
              : "Manage patient medical records"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {session.user.role === "DOCTOR" && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          )}
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
                {session.user.role === "PATIENT"
                  ? "Your medical records will appear here after your first visit."
                  : "Start adding medical records for your patients."}
              </p>
            </CardContent>
          </Card>
        ) : (
          medicalRecords.map((record) => {
            const patient = findUserById(record.patientId)
            const doctor = findUserById(record.doctorId)

            return (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {session.user.role === "PATIENT"
                        ? `Visit with Dr. ${doctor?.name}`
                        : `${patient?.name} - Medical Record`}
                    </CardTitle>
                    <Badge variant="outline">{format(record.visitDate, "MMM d, yyyy")}</Badge>
                  </div>
                  <CardDescription>{record.diagnosis}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Visit Date: {format(record.visitDate, "PPP")}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{session.user.role === "PATIENT" ? `Dr. ${doctor?.name}` : patient?.name}</span>
                    </div>
                  </div>

                  {record.symptoms && (
                    <div>
                      <h4 className="font-semibold mb-2">Symptoms</h4>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{record.symptoms}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Diagnosis</h4>
                    <p className="text-sm bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">{record.diagnosis}</p>
                  </div>

                  {record.treatment && (
                    <div>
                      <h4 className="font-semibold mb-2">Treatment</h4>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{record.treatment}</p>
                    </div>
                  )}

                  {record.prescription && (
                    <div>
                      <h4 className="font-semibold mb-2">Prescription</h4>
                      <p className="text-sm bg-green-50 dark:bg-green-950 p-3 rounded-lg">{record.prescription}</p>
                    </div>
                  )}

                  {record.notes && (
                    <div>
                      <h4 className="font-semibold mb-2">Additional Notes</h4>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{record.notes}</p>
                    </div>
                  )}

                  {session.user.role === "DOCTOR" && (
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        Edit Record
                      </Button>
                      <Button size="sm" variant="outline">
                        Add Follow-up
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
