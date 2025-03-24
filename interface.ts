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
    _id: string
    rDate : Date
    user : string
    campground : {
        _id: string;
        name: string;
        province: string;
        telephone: string;
        picture: string
    }
    createdAt : Date
}

export interface ReservationJson {
    count : number
    data : ReservationItem[]
}

export interface LogItem {
    action : string
    user : ObjectId
    reserve : ObjectId
    timestamp : Date
}