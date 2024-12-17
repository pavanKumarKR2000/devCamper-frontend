export interface Bootcamp {
    location: Location
    _id: string
    name: string
    description: string
    website: string
    phone: string
    email: string
    careers: string[]
    photo: string
    housing: boolean
    jobAssistance: boolean
    jobGuarantee: boolean
    acceptGi: boolean
    user: string
    createdAt: string
    slug: string
    __v: number
    averageCost: number
    averageRating: number
    courses: Course[]
    id: string
  }
  
  export interface Location {
    type: string
    coordinates: number[]
    formattedAddress: string
    street: string
    city: string
    state: string
    zipcode: string
    country: string
  }
  
  export interface Course {
    _id: string
    title: string
    description: string
    weeks: string
    tuition: number
    minimumSkill: string
    scholarshipAvailable: boolean
    bootcamp: string
    createdAt: string
    __v: number
  }
  