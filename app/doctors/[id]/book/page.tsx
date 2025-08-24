"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { 
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"
import { format, addDays, startOfDay, isSameDay, parseISO } from "date-fns"
import { Navbar } from "@/components/navigation/navbar"

interface Doctor {
  id: string
  name: string
  specialty: string
  department: string
  experience: number
  education: string
  certifications: string[]
  languages: string[]
  location: string
  phone: string
  email: string
  availability: string
  rating: number
  patientCount: number
  image?: string
  bio: string
  services: string[]
  awards: string[]
}

interface AppointmentSlot {
  id: string
  date: string
  time: string
  duration: number
  isAvailable: boolean
  type: "consultation" | "follow-up" | "emergency" | "routine"
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    department: "Cardiovascular Medicine",
    experience: 15,
    education: "MD - Harvard Medical School, Fellowship - Johns Hopkins",
    certifications: ["Board Certified Cardiologist", "Fellow of American College of Cardiology"],
    languages: ["English", "Spanish"],
    location: "Main Hospital - Floor 3",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@healthcarepro.com",
    availability: "Mon-Fri: 8:00 AM - 5:00 PM",
    rating: 4.9,
    patientCount: 2500,
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in diagnosing and treating cardiovascular diseases. She specializes in interventional cardiology and has performed over 1,000 cardiac procedures.",
    services: ["Echocardiogram", "Cardiac Catheterization", "Stress Testing", "Heart Failure Management"],
    awards: ["Top Cardiologist 2023", "Excellence in Patient Care Award", "Research Innovation Prize"]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    department: "Neurological Sciences",
    experience: 12,
    education: "MD - Stanford University, Residency - Mayo Clinic",
    certifications: ["Board Certified Neurologist", "Fellow of American Academy of Neurology"],
    languages: ["English", "Mandarin"],
    location: "Neurology Center - Floor 2",
    phone: "+1 (555) 234-5678",
    email: "michael.chen@healthcarepro.com",
    availability: "Mon-Thu: 9:00 AM - 6:00 PM",
    rating: 4.8,
    patientCount: 1800,
    bio: "Dr. Michael Chen is a leading neurologist specializing in movement disorders and neurodegenerative diseases. He has extensive experience in treating Parkinson's disease, multiple sclerosis, and epilepsy.",
    services: ["Neurological Examinations", "EMG Testing", "Sleep Studies", "Movement Disorder Treatment"],
    awards: ["Neurology Excellence Award", "Patient Choice Award", "Clinical Research Grant"]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    department: "Pediatric Medicine",
    experience: 8,
    education: "MD - University of California, Residency - Children's Hospital",
    certifications: ["Board Certified Pediatrician", "Pediatric Advanced Life Support"],
    languages: ["English", "Spanish", "Portuguese"],
    location: "Children's Wing - Floor 1",
    phone: "+1 (555) 345-6789",
    email: "emily.rodriguez@healthcarepro.com",
    availability: "Mon-Fri: 8:00 AM - 4:00 PM, Sat: 9:00 AM - 1:00 PM",
    rating: 4.9,
    patientCount: 3200,
    bio: "Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She focuses on preventive medicine and family-centered care.",
    services: ["Well-Child Visits", "Vaccinations", "Sick Child Care", "Developmental Screening"],
    awards: ["Pediatrician of the Year 2023", "Community Service Award", "Excellence in Child Care"]
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    department: "Orthopedic Surgery",
    experience: 20,
    education: "MD - Yale University, Fellowship - Hospital for Special Surgery",
    certifications: ["Board Certified Orthopedic Surgeon", "Fellow of American Academy of Orthopedic Surgeons"],
    languages: ["English"],
    location: "Orthopedic Center - Floor 4",
    phone: "+1 (555) 456-7890",
    email: "james.wilson@healthcarepro.com",
    availability: "Mon-Fri: 7:00 AM - 6:00 PM",
    rating: 4.7,
    patientCount: 4100,
    bio: "Dr. James Wilson is a highly skilled orthopedic surgeon with expertise in joint replacement, sports medicine, and trauma surgery. He has performed over 2,000 successful surgeries.",
    services: ["Joint Replacement", "Arthroscopic Surgery", "Sports Medicine", "Fracture Treatment"],
    awards: ["Surgical Excellence Award", "Sports Medicine Pioneer", "Patient Safety Award"]
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialty: "Psychiatry",
    department: "Mental Health Services",
    experience: 10,
    education: "MD - Columbia University, Residency - NYU Langone",
    certifications: ["Board Certified Psychiatrist", "Child and Adolescent Psychiatry"],
    languages: ["English", "French"],
    location: "Mental Health Center - Floor 1",
    phone: "+1 (555) 567-8901",
    email: "lisa.thompson@healthcarepro.com",
    availability: "Mon-Fri: 10:00 AM - 7:00 PM",
    rating: 4.8,
    patientCount: 1500,
    bio: "Dr. Lisa Thompson is a compassionate psychiatrist specializing in mood disorders, anxiety, and trauma-related conditions. She combines medication management with psychotherapy approaches.",
    services: ["Psychiatric Evaluations", "Medication Management", "Psychotherapy", "Crisis Intervention"],
    awards: ["Mental Health Advocate Award", "Excellence in Psychiatry", "Community Outreach Award"]
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    specialty: "Ophthalmology",
    department: "Eye Care Services",
    experience: 18,
    education: "MD - Johns Hopkins University, Fellowship - Bascom Palmer Eye Institute",
    certifications: ["Board Certified Ophthalmologist", "Fellow of American Academy of Ophthalmology"],
    languages: ["English", "Korean"],
    location: "Eye Care Center - Floor 2",
    phone: "+1 (555) 678-9012",
    email: "robert.kim@healthcarepro.com",
    availability: "Mon-Fri: 8:00 AM - 5:00 PM",
    rating: 4.9,
    patientCount: 2800,
    bio: "Dr. Robert Kim is a renowned ophthalmologist specializing in cataract surgery, retinal diseases, and glaucoma treatment. He has performed over 3,000 successful eye surgeries.",
    services: ["Cataract Surgery", "Retinal Surgery", "Glaucoma Treatment", "Eye Examinations"],
    awards: ["Ophthalmologist of the Year", "Surgical Innovation Award", "Patient Care Excellence"]
  }
]

const generateAppointmentSlots = (doctorId: string): AppointmentSlot[] => {
  const slots: AppointmentSlot[] = []
  const today = startOfDay(new Date())
  
  // Generate slots for the next 30 days
  for (let i = 0; i < 30; i++) {
    const date = addDays(today, i)
    const dayOfWeek = date.getDay()
    
    // Skip weekends for most doctors (except Dr. Rodriguez who works Saturdays)
    if (dayOfWeek === 0 || (dayOfWeek === 6 && doctorId !== "3")) continue
    
    // Generate time slots based on doctor's availability
    let startHour = 8
    let endHour = 17
    
    if (doctorId === "2") { // Dr. Chen
      startHour = 9
      endHour = 18
    } else if (doctorId === "3") { // Dr. Rodriguez
      startHour = 8
      endHour = 16
    } else if (doctorId === "4") { // Dr. Wilson
      startHour = 7
      endHour = 18
    } else if (doctorId === "5") { // Dr. Thompson
      startHour = 10
      endHour = 19
    }
    
    // Generate 30-minute slots
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const slotDate = format(date, 'yyyy-MM-dd')
        
        // Ensure some slots are always available for better user experience
        let isAvailable = false
        const dayOffset = i
        
        // Guarantee availability for today and next few days
        if (dayOffset === 0) { // Today
          // Make morning slots (8:00-12:00) more likely to be available
          if (hour < 12) {
            isAvailable = Math.random() > 0.2 // 80% chance of availability
          } else {
            isAvailable = Math.random() > 0.4 // 60% chance of availability
          }
        } else if (dayOffset === 1) { // Tomorrow
          // Make afternoon slots (12:00-17:00) more likely to be available
          if (hour >= 12) {
            isAvailable = Math.random() > 0.1 // 90% chance of availability
          } else {
            isAvailable = Math.random() > 0.3 // 70% chance of availability
          }
        } else if (dayOffset <= 3) { // Next 3 days
          // High availability for immediate future
          isAvailable = Math.random() > 0.2 // 80% chance of availability
        } else if (dayOffset <= 7) { // Next week
          // Good availability for next week
          isAvailable = Math.random() > 0.3 // 70% chance of availability
        } else if (dayOffset <= 14) { // Next 2 weeks
          // Moderate availability for 2 weeks out
          isAvailable = Math.random() > 0.4 // 60% chance of availability
        } else { // Beyond 2 weeks
          // Lower availability for distant dates
          isAvailable = Math.random() > 0.6 // 40% chance of availability
        }
        
        // Ensure at least 2-3 slots per day are available
        if (dayOffset <= 7) {
          const daySlots = slots.filter(s => s.date === slotDate)
          const availableDaySlots = daySlots.filter(s => s.isAvailable).length
          if (availableDaySlots < 2) {
            isAvailable = true
          }
        }
        
        const slotTypes: ("consultation" | "follow-up" | "emergency" | "routine")[] = [
          "consultation", "follow-up", "routine"
        ]
        
        slots.push({
          id: `${slotDate}-${time}-${doctorId}`,
          date: slotDate,
          time,
          duration: 30,
          isAvailable,
          type: slotTypes[Math.floor(Math.random() * slotTypes.length)]
        })
      }
    }
  }
  
  return slots
}

const getSlotTypeColor = (type: string) => {
  switch (type) {
    case 'consultation':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'follow-up':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'emergency':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'routine':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function BookAppointmentPage() {
  const params = useParams()
  const router = useRouter()
  const doctorId = params.id as string
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [appointmentSlots, setAppointmentSlots] = useState<AppointmentSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  
  const doctor = mockDoctors.find(d => d.id === doctorId)
  
  useEffect(() => {
    if (doctorId) {
      const slots = generateAppointmentSlots(doctorId)
      setAppointmentSlots(slots)
    }
  }, [doctorId])
  
  if (!doctor) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Doctor not found</h1>
          <Button onClick={() => router.push('/doctors')} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Doctors
          </Button>
        </div>
      </div>
    )
  }
  
  const filteredSlots = appointmentSlots.filter(slot => 
    selectedDate ? isSameDay(parseISO(slot.date), selectedDate) : true
  )
  
  const availableSlots = filteredSlots.filter(slot => slot.isAvailable)
  const unavailableSlots = filteredSlots.filter(slot => !slot.isAvailable)
  
  const handleBookAppointment = async (slot: AppointmentSlot) => {
    setIsBooking(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update slot availability
    setAppointmentSlots(prev => 
      prev.map(s => s.id === slot.id ? { ...s, isAvailable: false } : s)
    )
    
    setSelectedSlot(null)
    setIsBooking(false)
    
    // Show success message (you can add a toast notification here)
    alert(`Appointment booked successfully for ${format(parseISO(slot.date), 'MMMM dd, yyyy')} at ${slot.time}`)
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => router.push('/doctors')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Doctors
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Book Appointment</h1>
          <p className="text-muted-foreground">Select a convenient time slot</p>
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Doctor Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{doctor.name}</CardTitle>
              <CardDescription className="text-base font-medium text-blue-600">
                {doctor.specialty}
              </CardDescription>
              <Badge variant="outline">{doctor.department}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.availability}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Services Offered</h4>
                <div className="flex flex-wrap gap-1">
                  {doctor.services.slice(0, 4).map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {doctor.services.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{doctor.services.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Appointment Booking */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Select Date
              </CardTitle>
              <CardDescription>
                Choose a date to view available appointment slots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => {
                  const day = date.getDay()
                  // Disable weekends for most doctors (except Dr. Rodriguez)
                  if (day === 0 || (day === 6 && doctorId !== "3")) return true
                  // Disable past dates
                  return date < startOfDay(new Date())
                }}
              />
            </CardContent>
          </Card>
          
          {/* Quick Available Slots Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Quick Preview - Upcoming Available Slots
              </CardTitle>
              <CardDescription>
                Here are some available slots in the next few days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const nextFewDays = appointmentSlots
                  .filter(slot => slot.isAvailable)
                  .slice(0, 8) // Show first 8 available slots
                
                if (nextFewDays.length === 0) {
                  return (
                    <div className="text-center py-4 text-muted-foreground">
                      <p>Loading available slots...</p>
                    </div>
                  )
                }
                
                return (
                  <div className="grid gap-2 md:grid-cols-2">
                    {nextFewDays.map((slot) => (
                      <div
                        key={slot.id}
                        className="p-3 border border-gray-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedDate(parseISO(slot.date))
                          setSelectedSlot(slot)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium">
                              {format(parseISO(slot.date), 'MMM dd')}
                            </div>
                            <div className="text-lg font-semibold text-green-700">
                              {slot.time}
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getSlotTypeColor(slot.type)}`}
                          >
                            {slot.type}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Click to select this slot
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </CardContent>
          </Card>
          
          {/* Available Slots */}
          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Available Slots for {format(selectedDate, 'MMMM dd, yyyy')}
                </CardTitle>
                <CardDescription>
                  {availableSlots.length} slots available
                </CardDescription>
              </CardHeader>
              <CardContent>
                {availableSlots.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {availableSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedSlot?.id === slot.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-semibold">{slot.time}</div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getSlotTypeColor(slot.type)}`}
                            >
                              {slot.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {slot.duration} min
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No available slots for this date</p>
                    <p className="text-sm">Please select another date</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Booking Confirmation */}
          {selectedSlot && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Confirm Appointment
                </CardTitle>
                <CardDescription>
                  Review your appointment details before confirming
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{format(parseISO(selectedSlot.date), 'EEEE, MMMM dd, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Time:</span>
                    <span>{selectedSlot.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Duration:</span>
                    <span>{selectedSlot.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <Badge className={getSlotTypeColor(selectedSlot.type)}>
                      {selectedSlot.type}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Doctor:</span>
                    <span>{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Location:</span>
                    <span>{doctor.location}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    onClick={() => handleBookAppointment(selectedSlot)}
                    disabled={isBooking}
                  >
                    {isBooking ? 'Booking...' : 'Confirm Appointment'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedSlot(null)}
                    disabled={isBooking}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Unavailable Slots (for reference) */}
          {selectedDate && unavailableSlots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Unavailable Slots
                </CardTitle>
                <CardDescription>
                  These slots are already booked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-3">
                  {unavailableSlots.slice(0, 9).map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{slot.time}</span>
                        <Badge variant="outline" className="text-xs text-gray-500">
                          Booked
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {unavailableSlots.length > 9 && (
                    <div className="text-center py-3 text-muted-foreground">
                      +{unavailableSlots.length - 9} more booked slots
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}
