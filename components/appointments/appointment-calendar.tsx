"use client"

import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { enUS } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface AppointmentEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource: {
    patientName: string
    doctorName: string
    status: string
    reason?: string
    notes?: string
  }
}

interface AppointmentCalendarProps {
  appointments: AppointmentEvent[]
  onSelectEvent?: (event: AppointmentEvent) => void
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void
}

export function AppointmentCalendar({ appointments, onSelectEvent, onSelectSlot }: AppointmentCalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null)

  const eventStyleGetter = (event: AppointmentEvent) => {
    let backgroundColor = "#3174ad"

    switch (event.resource.status) {
      case "CONFIRMED":
        backgroundColor = "#10b981"
        break
      case "PENDING":
        backgroundColor = "#f59e0b"
        break
      case "CANCELLED":
        backgroundColor = "#ef4444"
        break
      case "COMPLETED":
        backgroundColor = "#6b7280"
        break
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    }
  }

  const handleSelectEvent = (event: AppointmentEvent) => {
    setSelectedEvent(event)
    onSelectEvent?.(event)
  }

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
    <>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: "600px" }}>
            <Calendar
              localizer={localizer}
              events={appointments}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              onSelectSlot={onSelectSlot}
              selectable
              eventPropGetter={eventStyleGetter}
              views={["month", "week", "day"]}
              defaultView="week"
              step={30}
              timeslots={2}
              min={new Date(2024, 0, 1, 8, 0)} // 8 AM
              max={new Date(2024, 0, 1, 18, 0)} // 6 PM
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>{selectedEvent && format(selectedEvent.start, "PPP p")}</DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Patient</h4>
                <p>{selectedEvent.resource.patientName}</p>
              </div>
              <div>
                <h4 className="font-semibold">Doctor</h4>
                <p>{selectedEvent.resource.doctorName}</p>
              </div>
              <div>
                <h4 className="font-semibold">Status</h4>
                <Badge className={getStatusColor(selectedEvent.resource.status)}>{selectedEvent.resource.status}</Badge>
              </div>
              {selectedEvent.resource.reason && (
                <div>
                  <h4 className="font-semibold">Reason</h4>
                  <p>{selectedEvent.resource.reason}</p>
                </div>
              )}
              {selectedEvent.resource.notes && (
                <div>
                  <h4 className="font-semibold">Notes</h4>
                  <p>{selectedEvent.resource.notes}</p>
                </div>
              )}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Mark Complete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
