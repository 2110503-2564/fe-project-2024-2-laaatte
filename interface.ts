import { Date, ObjectId } from "mongoose"

export interface CampgroundItem {
    id : string
    name: string
    address: string
    province: string
    telephone: string
    picture: string
}

export interface CampgroundJson {
    count : number
    data : CampgroundItem[]
}

export interface ReservationItem {
    rDate : Date
    user : ObjectId
    campground : ObjectId
    createdAt : Date
}

export interface LogItem {
    action : string
    user : ObjectId
    reserve : ObjectId
    timestamp : Date
}