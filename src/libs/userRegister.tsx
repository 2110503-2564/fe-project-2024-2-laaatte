export default async function userRegister(userName:string, userEmail:string, userPassword:string, userTelephone:string) {
    const respone = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method : "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: userPassword,
            telephone: userTelephone,
            role : "user"
        }),
    })

    console.log(respone)

    if (!respone.ok)
        throw new Error('Failed to Log-in')

    return respone.json()
}   