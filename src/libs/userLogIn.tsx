export default async function userLogIn(userEmail:string, userPassword : string) {
    const resonse = await fetch('https://a08-venue-explorer-backend-3.vercel.app/api/v1/auth/login', {
        method : "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
    })
    
    if (!resonse.ok)
        throw new Error("Failed to Log-in")

    return resonse.json()
}