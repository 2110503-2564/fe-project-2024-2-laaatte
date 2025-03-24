import { revalidateTag } from "next/cache"

export default async function createReservation(campgroundId:string, token:string, reservationDate:Date, userId:string) {
    const respone = await fetch(`${process.env.BACKEND_URL}/api/v1/campgrounds/${campgroundId}/reserves`, {
        method : "POST",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            rDate : reservationDate,
            user : userId
        }),
    })

    console.log(respone)

    if (!respone.ok)
        throw new Error('Failed to create reservation')

    
    return respone.json()
}   