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
import { Clock, User, Stethoscope, Calendar as CalendarIcon } from "lucide-react"

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
}

export function AppointmentCalendar({ appointments, onSelectEvent }: AppointmentCalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null)

  const eventStyleGetter = (event: AppointmentEvent) => {
    let backgroundColor = "#3b82f6"
    let borderColor = "#1d4ed8"
    let textColor = "#ffffff"

    switch (event.resource.status) {
      case "CONFIRMED":
        backgroundColor = "#10b981"
        borderColor = "#059669"
        textColor = "#ffffff"
        break
      case "PENDING":
        backgroundColor = "#f59e0b"
        borderColor = "#d97706"
        textColor = "#ffffff"
        break
      case "CANCELLED":
        backgroundColor = "#ef4444"
        borderColor = "#dc2626"
        textColor = "#ffffff"
        break
      case "COMPLETED":
        backgroundColor = "#6b7280"
        borderColor = "#4b5563"
        textColor = "#ffffff"
        break
    }

    return {
      style: {
        backgroundColor,
        border: `2px solid ${borderColor}`,
        borderRadius: "12px",
        opacity: 0.95,
        color: textColor,
        display: "block",
        padding: "4px 8px",
        fontSize: "12px",
        fontWeight: "500",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        minHeight: "24px",
        lineHeight: "1.2",
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
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200"
      case "COMPLETED":
        return "bg-slate-50 text-slate-700 border-slate-200"
      default:
        return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "✓"
      case "PENDING":
        return "⏳"
      case "CANCELLED":
        return "✕"
      case "COMPLETED":
        return "✓"
      default:
        return "•"
    }
  }

  return (
    <>
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <CalendarIcon className="w-6 h-6" />
            Appointment Calendar
          </CardTitle>
          <p className="text-blue-100 text-sm font-medium">
            Manage and view all scheduled appointments
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-gray-600">Confirmed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Cancelled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {appointments.length} appointments scheduled
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div style={{ height: "700px" }}>
                <Calendar
                  localizer={localizer}
                  events={appointments}
                  startAccessor="start"
                  endAccessor="end"
                  onSelectEvent={handleSelectEvent}
                  selectable
                  eventPropGetter={eventStyleGetter}
                  views={["month", "week", "day"]}
                  defaultView="month"
                  step={30}
                  timeslots={2}
                  min={new Date(new Date().getFullYear(), new Date().getMonth(), 1, 8, 0)} // Current month, 1st, 8 AM
                  max={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 18, 0)} // Next month, last day, 6 PM
                  tooltipAccessor={() => "Click to view details"}
                  className="modern-calendar"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Appointment Details
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedEvent && format(selectedEvent.start, "EEEE, MMMM do 'at' h:mm a")}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Patient</h4>
                    <p className="text-gray-600">{selectedEvent.resource.patientName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Doctor</h4>
                    <p className="text-gray-600">{selectedEvent.resource.doctorName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Duration</h4>
                    <p className="text-gray-600">
                      {format(selectedEvent.start, "h:mm a")} - {format(selectedEvent.end, "h:mm a")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                  <Badge className={`${getStatusColor(selectedEvent.resource.status)} border px-3 py-1.5 text-sm font-medium`}>
                    <span className="mr-2">{getStatusIcon(selectedEvent.resource.status)}</span>
                    {selectedEvent.resource.status}
                  </Badge>
                </div>
                
                {selectedEvent.resource.reason && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Reason for Visit</h4>
                    <p className="text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      {selectedEvent.resource.reason}
                    </p>
                  </div>
                )}
                
                {selectedEvent.resource.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {selectedEvent.resource.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="flex-1">
                  <Clock className="w-4 h-4 mr-2" />
                  Reschedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  ✕ Cancel
                </Button>
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  ✓ Complete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .modern-calendar {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .modern-calendar .rbc-header {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-bottom: 2px solid #e2e8f0;
          font-weight: 600;
          color: #475569;
          padding: 12px 8px;
          font-size: 14px;
        }
        
        .modern-calendar .rbc-time-header {
          border-radius: 8px 8px 0 0;
          overflow: hidden;
        }
        
        .modern-calendar .rbc-time-content {
          border-top: none;
        }
        
        .modern-calendar .rbc-time-gutter {
          background: #f8fafc;
          border-right: 1px solid #e2e8f0;
          font-weight: 500;
          color: #64748b;
        }
        
        .modern-calendar .rbc-timeslot-group {
          border-bottom: 1px solid #f1f5f9;
        }
        
        .modern-calendar .rbc-day-slot .rbc-time-slot {
          border-top: 1px solid #f1f5f9;
        }
        
        .modern-calendar .rbc-current-time-indicator {
          background-color: #ef4444;
          height: 2px;
          border-radius: 1px;
        }
        
        .modern-calendar .rbc-today {
          background-color: #fef3c7;
        }
        
        .modern-calendar .rbc-off-range-bg {
          background-color: #f8fafc;
        }
        
        .modern-calendar .rbc-off-range {
          color: #94a3b8;
        }
        
        .modern-calendar .rbc-toolbar {
          margin-bottom: 20px;
          padding: 16px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }
        
        .modern-calendar .rbc-toolbar button {
          background: #ffffff;
          border: 1px solid #d1d5db;
          color: #374151;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .modern-calendar .rbc-toolbar button:hover {
          background: #f9fafb;
          border-color: #9ca3af;
          border-color: #9ca3af;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .modern-calendar .rbc-toolbar button.rbc-active {
          background: #3b82f6;
          border-color: #2563eb;
          color: #ffffff;
        }
        
        .modern-calendar .rbc-month-view {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        
        .modern-calendar .rbc-month-header {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .modern-calendar .rbc-month-row {
          border-bottom: 1px solid #f1f5f9;
        }
        
        .modern-calendar .rbc-date-cell {
          padding: 8px;
          font-weight: 500;
        }
        
        .modern-calendar .rbc-day-bg {
          border-right: 1px solid #f1f5f9;
        }
        
        .modern-calendar .rbc-day-bg:hover {
          background-color: #f8fafc;
        }
      `}</style>
    </>
  )
}
