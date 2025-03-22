export default async function userLogIN(userEmail:string, userPassword : string) {
    const respone = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
        method : "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
    })

    if (!respone.ok)
        throw new Error('Failed to Log-in')

    return respone.json()
}   