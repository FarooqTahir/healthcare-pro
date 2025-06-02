"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Plus, Filter } from "lucide-react"
import { AppointmentCalendar } from "@/components/appointments/appointment-calendar"
import { mockAppointments, findUserById, findAppointmentsByPatientId, findAppointmentsByDoctorId } from "@/lib/data"
import { format } from "date-fns"

export default function AppointmentsPage() {
  const { data: session } = useSession()
  const [view, setView] = useState<"calendar" | "list">("calendar")

  if (!session) {
    return <div>Please sign in to view appointments.</div>
  }

  const userAppointments =
    session.user.role === "PATIENT"
      ? findAppointmentsByPatientId(session.user.id)
      : session.user.role === "DOCTOR"
        ? findAppointmentsByDoctorId(session.user.id)
        : mockAppointments

  const calendarEvents = userAppointments.map((apt) => {
    const patient = findUserById(apt.patientId)
    const doctor = findUserById(apt.doctorId)

    return {
      id: apt.id,
      title: session.user.role === "PATIENT" ? `Dr. ${doctor?.name}` : patient?.name || "Unknown",
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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">
            {session.user.role === "PATIENT"
              ? "Manage your upcoming appointments"
              : "View and manage patient appointments"}
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
          {session.user.role === "PATIENT" && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          )}
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
                      {session.user.role === "PATIENT" ? `Dr. ${doctor?.name}` : patient?.name}
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
                    {session.user.role === "DOCTOR" && (
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{patient?.email}</span>
                      </div>
                    )}
                  </div>
                  {appointment.notes && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm">{appointment.notes}</p>
                    </div>
                  )}
                  <div className="flex space-x-2 mt-4">
                    {appointment.status === "PENDING" && session.user.role === "DOCTOR" && (
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
  )
}
