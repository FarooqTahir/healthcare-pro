"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Calendar as CalendarIcon, 
  FileText, 
  TrendingUp, 
  Activity,
  Stethoscope,
  Pill,
  Microscope,
  DollarSign,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react"
import Link from "next/link"
import { format, addDays, parseISO } from "date-fns"
import { StatsCard } from "@/components/dashboard/stats-card"

// Mock data for dashboard
const getDashboardData = () => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  
  return {
    totalPatients: 1247,
    totalAppointments: 89,
    completedAppointments: 67,
    pendingAppointments: 22,
    totalRevenue: 45680,
    monthlyGrowth: 12.5,
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        message: "New appointment scheduled with Dr. Sarah Johnson",
        time: "2 hours ago",
        patient: "Michael Chen"
      },
      {
        id: 2,
        type: "patient",
        message: "New patient registration completed",
        time: "4 hours ago",
        patient: "Emily Rodriguez"
      },
      {
        id: 3,
        type: "lab",
        message: "Lab results uploaded for patient",
        time: "6 hours ago",
        patient: "James Wilson"
      },
      {
        id: 4,
        type: "prescription",
        message: "Prescription renewed for patient",
        time: "8 hours ago",
        patient: "Lisa Thompson"
      },
      {
        id: 5,
        type: "billing",
        message: "Payment received for consultation",
        time: "10 hours ago",
        patient: "Robert Kim"
      }
    ],
    upcomingAppointments: [
      {
        id: 1,
        patientName: "Sarah Johnson",
        doctorName: "Dr. Michael Chen",
        time: "09:00 AM",
        date: format(addDays(today, 1), 'yyyy-MM-dd'),
        type: "Consultation"
      },
      {
        id: 2,
        patientName: "Michael Chen",
        doctorName: "Dr. Emily Rodriguez",
        time: "10:30 AM",
        date: format(addDays(today, 1), 'yyyy-MM-dd'),
        type: "Follow-up"
      },
      {
        id: 3,
        patientName: "Emily Rodriguez",
        doctorName: "Dr. James Wilson",
        time: "02:00 PM",
        date: format(addDays(today, 2), 'yyyy-MM-dd'),
        type: "Laboratory Test"
      }
    ],
    calendarAppointments: [
      {
        id: "1",
        title: "Dr. Sarah Johnson - Regular Checkup",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
        resource: {
          patientName: "Michael Chen",
          doctorName: "Dr. Sarah Johnson",
          status: "CONFIRMED",
          reason: "Regular checkup",
          notes: "Patient reports feeling well"
        }
      },
      {
        id: "2",
        title: "Dr. Emily Rodriguez - Follow-up",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
        resource: {
          patientName: "Sarah Johnson",
          doctorName: "Dr. Emily Rodriguez",
          status: "CONFIRMED",
          reason: "Follow-up consultation",
          notes: "Review previous treatment"
        }
      },
      {
        id: "3",
        title: "Dr. James Wilson - Lab Review",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30),
        resource: {
          patientName: "Emily Rodriguez",
          doctorName: "Dr. James Wilson",
          status: "PENDING",
          reason: "Lab results review",
          notes: "Review recent blood work"
        }
      },
      {
        id: "4",
        title: "Dr. Michael Chen - Consultation",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 45),
        resource: {
          patientName: "James Wilson",
          doctorName: "Dr. Michael Chen",
          status: "CONFIRMED",
          reason: "Cardiology consultation",
          notes: "Annual heart health review"
        }
      },
      {
        id: "5",
        title: "Dr. Lisa Thompson - Surgery",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 8, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0),
        resource: {
          patientName: "Robert Kim",
          doctorName: "Dr. Lisa Thompson",
          status: "CONFIRMED",
          reason: "Minor surgery",
          notes: "Pre-operative consultation completed"
        }
      }
    ]
  }
}

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
  { name: "Appointments", href: "/appointments", icon: CalendarIcon },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Doctors", href: "/doctors", icon: Stethoscope },
  { name: "Records", href: "/records", icon: FileText },
  { name: "Pharmacy", href: "/pharmacy", icon: Pill },
  { name: "Laboratory", href: "/laboratory", icon: Microscope },
  { name: "Billing", href: "/billing", icon: DollarSign },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const data = getDashboardData()

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">HealthCare Pro</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  item.active
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                admin@healthcare.com
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1 lg:hidden"></div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Healthcare Management System
              </Badge>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
                              Welcome back! Here&apos;s what&apos;s happening with your healthcare facility today.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Patients"
              value={data.totalPatients}
              icon={Users}
              trend="+5.2%"
              trendDirection="up"
            />
            <StatsCard
              title="Total Appointments"
              value={data.totalAppointments}
              icon={CalendarIcon}
              trend="+12.1%"
              trendDirection="up"
            />
            <StatsCard
              title="Completed Today"
              value={data.completedAppointments}
              icon={Activity}
              trend="+8.4%"
              trendDirection="up"
            />
            <StatsCard
              title="Monthly Revenue"
              value={`$${data.totalRevenue.toLocaleString()}`}
              icon={TrendingUp}
              trend={`+${data.monthlyGrowth}%`}
              trendDirection="up"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest updates from your healthcare facility
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.time} • Patient: {activity.patient}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Appointments */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Upcoming Appointments
                  </CardTitle>
                  <CardDescription>
                    Next scheduled appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {appointment.patientName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {appointment.doctorName} • {appointment.type}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {format(parseISO(appointment.date), 'MMM dd')} at {appointment.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Dashboard Calendar */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>
                  View and manage appointments for the current month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {data.calendarAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {appointment.resource.patientName}
                        </h4>
                        <Badge 
                          variant={appointment.resource.status === "CONFIRMED" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {appointment.resource.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {appointment.resource.doctorName}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {appointment.resource.reason}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {format(appointment.start, 'MMM dd, h:mm a')}
                        </span>
                        <span>
                          {format(appointment.start, 'MMM dd')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
