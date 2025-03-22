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