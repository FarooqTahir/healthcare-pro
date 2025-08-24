"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Plus, Filter } from "lucide-react"
import { AppointmentCalendar } from "@/components/appointments/appointment-calendar"
import { mockAppointments, findUserById } from "@/lib/data"
import { format } from "date-fns"
import { Navbar } from "@/components/navigation/navbar"

export default function AppointmentsPage() {
  const [view, setView] = useState<"calendar" | "list">("calendar")

  // Use mock data for demonstration
  const userAppointments = mockAppointments

  const calendarEvents = userAppointments.map((apt) => {
    const patient = findUserById(apt.patientId)
    const doctor = findUserById(apt.doctorId)

    return {
      id: apt.id,
      title: `Dr. ${doctor?.name || "Unknown"} - ${patient?.name || "Unknown Patient"}`,
      start: apt.datetime,
      end: new Date(apt.datetime.getTime() + apt.duration * 60000),
      resource: {
        patientName: patient?.name || "Unknown",
        doctorName: doctor?.name || "Unknown",
        status: apt.status,
        reason: apt.reason,
        notes: apt.notes,
      },
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      case "COMPLETED":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-muted-foreground">
              View and manage healthcare appointments
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant={view === "calendar" ? "default" : "outline"} onClick={() => setView("calendar")}>
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button variant={view === "list" ? "default" : "outline"} onClick={() => setView("list")}>
              <Filter className="h-4 w-4 mr-2" />
              List
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </div>
        </div>

        {view === "calendar" ? (
          <AppointmentCalendar appointments={calendarEvents} />
        ) : (
          <div className="grid gap-4">
            {userAppointments.map((appointment) => {
              const patient = findUserById(appointment.patientId)
              const doctor = findUserById(appointment.doctorId)

              return (
                <Card key={appointment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {`Dr. ${doctor?.name || "Unknown"} - ${patient?.name || "Unknown Patient"}`}
                      </CardTitle>
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    </div>
                    <CardDescription>{appointment.reason || "General consultation"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{format(appointment.datetime, "PPP")}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(appointment.datetime, "p")} ({appointment.duration} min)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{patient?.email}</span>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm">{appointment.notes}</p>
                      </div>
                    )}
                    <div className="flex space-x-2 mt-4">
                      {appointment.status === "PENDING" && (
                        <>
                          <Button size="sm" variant="default">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="destructive">
                            Decline
                          </Button>
                        </>
                      )}
                      {appointment.status === "CONFIRMED" && (
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
