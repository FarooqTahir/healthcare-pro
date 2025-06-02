import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import {
  findUserById,
  findAppointmentsByPatientId,
  findAppointmentsByDoctorId,
  findMedicalRecordsByPatientId,
  countUsersByRole,
  countAppointmentsByDateRange,
  mockUsers,
} from "@/lib/data"
import { StatsCard } from "@/components/dashboard/stats-card"
import { AppointmentCalendar } from "@/components/appointments/appointment-calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, FileText, Clock, TrendingUp, Activity } from "lucide-react"
import { format } from "date-fns"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  // Fetch dashboard data based on user role
  const dashboardData = getDashboardData(session.user.id, session.user.role)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {session.user.name}!</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {session.user.role === "PATIENT" && (
          <>
            <StatsCard
              title="Upcoming Appointments"
              value={dashboardData.upcomingAppointments}
              icon={Calendar}
              description="Next 30 days"
            />
            <StatsCard
              title="Medical Records"
              value={dashboardData.medicalRecords}
              icon={FileText}
              description="Total records"
            />
            <StatsCard
              title="Last Visit"
              value={dashboardData.lastVisit || "Never"}
              icon={Clock}
              description="Days ago"
            />
            <StatsCard title="Health Score" value="Good" icon={Activity} description="Based on recent visits" />
          </>
        )}

        {session.user.role === "DOCTOR" && (
          <>
            <StatsCard
              title="Today's Appointments"
              value={dashboardData.todayAppointments}
              icon={Calendar}
              description="Scheduled for today"
            />
            <StatsCard
              title="Total Patients"
              value={dashboardData.totalPatients}
              icon={Users}
              description="Under your care"
            />
            <StatsCard
              title="This Month"
              value={dashboardData.monthlyAppointments}
              icon={TrendingUp}
              description="Appointments completed"
            />
            <StatsCard
              title="Pending Reviews"
              value={dashboardData.pendingAppointments}
              icon={Clock}
              description="Awaiting approval"
            />
          </>
        )}

        {session.user.role === "ADMIN" && (
          <>
            <StatsCard
              title="Total Users"
              value={dashboardData.totalUsers}
              icon={Users}
              description="All registered users"
            />
            <StatsCard
              title="Total Appointments"
              value={dashboardData.totalAppointments}
              icon={Calendar}
              description="This month"
            />
            <StatsCard
              title="Active Doctors"
              value={dashboardData.activeDoctors}
              icon={Activity}
              description="Currently available"
            />
            <StatsCard
              title="System Health"
              value="Excellent"
              icon={TrendingUp}
              description="All systems operational"
            />
          </>
        )}
      </div>

      {/* Calendar and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-4">
          <AppointmentCalendar appointments={dashboardData.calendarEvents || []} />
        </div>
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivity?.map((activity: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(activity.createdAt), "MMM d, h:mm a")}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function getDashboardData(userId: string, role: string) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  switch (role) {
    case "PATIENT":
      const patientAppointments = findAppointmentsByPatientId(userId)
      const upcomingAppointments = patientAppointments.filter((apt) => apt.datetime >= now)
      const patientRecords = findMedicalRecordsByPatientId(userId)

      return {
        upcomingAppointments: upcomingAppointments.length,
        medicalRecords: patientRecords.length,
        lastVisit: patientRecords[0]
          ? Math.floor((now.getTime() - patientRecords[0].visitDate.getTime()) / (1000 * 60 * 60 * 24))
          : null,
        calendarEvents: upcomingAppointments.map((apt) => {
          const doctor = findUserById(apt.doctorId)
          return {
            id: apt.id,
            title: `Dr. ${doctor?.name || "Unknown"}`,
            start: apt.datetime,
            end: new Date(apt.datetime.getTime() + apt.duration * 60000),
            resource: {
              patientName: "You",
              doctorName: doctor?.name || "Unknown",
              status: apt.status,
              reason: apt.reason,
              notes: apt.notes,
            },
          }
        }),
        recentActivity: patientRecords.slice(0, 5).map((record) => {
          const doctor = findUserById(record.doctorId)
          return {
            title: `Visit with Dr. ${doctor?.name || "Unknown"}`,
            createdAt: record.createdAt,
            type: "Medical Record",
          }
        }),
      }

    case "DOCTOR":
      const doctorAppointments = findAppointmentsByDoctorId(userId)
      const todayAppointments = doctorAppointments.filter((apt) => apt.datetime.toDateString() === now.toDateString())
      const monthlyAppointments = doctorAppointments.filter(
        (apt) => apt.datetime >= startOfMonth && apt.datetime <= endOfMonth && apt.status === "COMPLETED",
      )
      const uniquePatients = new Set(doctorAppointments.map((apt) => apt.patientId))

      return {
        todayAppointments: todayAppointments.length,
        totalPatients: uniquePatients.size,
        monthlyAppointments: monthlyAppointments.length,
        pendingAppointments: doctorAppointments.filter((apt) => apt.status === "PENDING").length,
        calendarEvents: doctorAppointments.map((apt) => {
          const patient = findUserById(apt.patientId)
          return {
            id: apt.id,
            title: patient?.name || "Unknown Patient",
            start: apt.datetime,
            end: new Date(apt.datetime.getTime() + apt.duration * 60000),
            resource: {
              patientName: patient?.name || "Unknown Patient",
              doctorName: "You",
              status: apt.status,
              reason: apt.reason,
              notes: apt.notes,
            },
          }
        }),
        recentActivity: doctorAppointments.slice(0, 5).map((apt) => {
          const patient = findUserById(apt.patientId)
          return {
            title: `Appointment with ${patient?.name || "Unknown Patient"}`,
            createdAt: apt.createdAt,
            type: "Appointment",
          }
        }),
      }

    case "ADMIN":
      const totalUsers = mockUsers.length
      const totalAppointments = countAppointmentsByDateRange(startOfMonth, endOfMonth)
      const activeDoctors = countUsersByRole("DOCTOR")

      return {
        totalUsers,
        totalAppointments,
        activeDoctors,
        calendarEvents: [],
        recentActivity: [],
      }

    default:
      return {
        calendarEvents: [],
        recentActivity: [],
      }
  }
}
