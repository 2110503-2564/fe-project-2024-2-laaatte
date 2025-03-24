export default async function updateReservation(reserve_id:string, token:string, reservationDate:Date) {
    const respone = await fetch(`${process.env.BACKEND_URL}/api/v1/reserves/${reserve_id}`, {
        method : "PUT",
        headers: {
            authorization : `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            rDate : reservationDate
        }),
    })

    console.log(respone)

    if (!respone.ok)
        throw new Error('Failed to update reservation')

    return respone.json()
}   