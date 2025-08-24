"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Stethoscope, MapPin, Phone, Mail, Star, Clock, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"

export default function DoctorsPage() {
  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.9,
      patients: 1200,
      location: "Downtown Medical Center",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@healthcare.com",
      availability: "Mon-Fri, 9AM-5PM",
      image: "/placeholder-user.jpg",
      services: ["Heart Disease", "Hypertension", "Cardiac Surgery", "Echocardiography"],
      education: "Harvard Medical School",
      languages: ["English", "Spanish"],
      description: "Experienced cardiologist specializing in preventive cardiology and interventional procedures."
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      experience: "12 years",
      rating: 4.8,
      patients: 950,
      location: "Neurology Institute",
      phone: "+1 (555) 234-5678",
      email: "michael.chen@healthcare.com",
      availability: "Mon-Thu, 8AM-4PM",
      image: "/placeholder-user.jpg",
      services: ["Neurological Disorders", "Stroke Treatment", "Epilepsy", "Multiple Sclerosis"],
      education: "Stanford Medical School",
      languages: ["English", "Mandarin"],
      description: "Board-certified neurologist with expertise in complex neurological conditions and treatments."
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      experience: "10 years",
      rating: 4.9,
      patients: 800,
      location: "Children's Hospital",
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@healthcare.com",
      availability: "Mon-Fri, 9AM-6PM",
      image: "/placeholder-user.jpg",
      services: ["Child Development", "Vaccinations", "Acute Illness", "Well-Child Care"],
      education: "UCLA Medical School",
      languages: ["English", "Spanish"],
      description: "Compassionate pediatrician dedicated to providing comprehensive care for children of all ages."
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "18 years",
      rating: 4.7,
      patients: 1500,
      location: "Orthopedic Center",
      phone: "+1 (555) 456-7890",
      email: "james.wilson@healthcare.com",
      availability: "Mon-Fri, 7AM-3PM",
      image: "/placeholder-user.jpg",
      services: ["Joint Replacement", "Sports Medicine", "Trauma Surgery", "Arthroscopy"],
      education: "Johns Hopkins Medical School",
      languages: ["English"],
      description: "Skilled orthopedic surgeon specializing in minimally invasive procedures and sports medicine."
    },
    {
      id: "5",
      name: "Dr. Lisa Thompson",
      specialty: "Dermatologist",
      experience: "14 years",
      rating: 4.8,
      patients: 1100,
      location: "Dermatology Clinic",
      phone: "+1 (555) 567-8901",
      email: "lisa.thompson@healthcare.com",
      availability: "Mon-Fri, 10AM-6PM",
      image: "/placeholder-user.jpg",
      services: ["Skin Cancer", "Acne Treatment", "Cosmetic Dermatology", "Surgical Procedures"],
      education: "Yale Medical School",
      languages: ["English", "French"],
      description: "Expert dermatologist providing comprehensive skin care and treatment for all skin conditions."
    },
    {
      id: "6",
      name: "Dr. Robert Kim",
      specialty: "Psychiatrist",
      experience: "16 years",
      rating: 4.9,
      patients: 900,
      location: "Mental Health Center",
      phone: "+1 (555) 678-9012",
      email: "robert.kim@healthcare.com",
      availability: "Mon-Fri, 9AM-5PM",
      image: "/placeholder-user.jpg",
      services: ["Depression", "Anxiety", "Bipolar Disorder", "Psychotherapy"],
      education: "Columbia Medical School",
      languages: ["English", "Korean"],
      description: "Compassionate psychiatrist specializing in mood disorders and evidence-based treatments."
    }
  ]

  const stats = [
    { label: "Total Doctors", value: doctors.length, icon: Stethoscope },
    { label: "Average Rating", value: "4.8", icon: Star },
    { label: "Total Patients", value: "6,450+", icon: Users },
    { label: "Years Experience", value: "14+", icon: Clock }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Our Medical Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our experienced healthcare professionals dedicated to providing exceptional care and innovative treatments
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex justify-center mb-3">
                  <Stethoscope className="h-6 w-6 text-blue-500" />
                </div>
                
                <CardTitle className="text-xl">{doctor.name}</CardTitle>
                <CardDescription className="text-base font-medium text-blue-600">
                  {doctor.specialty}
                </CardDescription>
                <Badge variant="outline" className="w-fit mx-auto">
                  {doctor.specialty}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Rating and Experience */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(doctor.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{doctor.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {doctor.experience}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {doctor.description}
                </p>

                {/* Services */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Services
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {doctor.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {doctor.services.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{doctor.services.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
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

                {/* Languages */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    {/* <Languages className="h-4 w-4" /> */}
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                {/* Assuming awards are not part of the mock data or removed if not needed */}
                {/* {doctor.awards.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Awards
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {doctor.awards.slice(0, 2).map((award, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {award}
                        </Badge>
                      ))}
                      {doctor.awards.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{doctor.awards.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )} */}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Link href={`/doctors/${doctor.id}/book`} className="flex-1">
                    <Button className="w-full" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">Our Medical Team Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
