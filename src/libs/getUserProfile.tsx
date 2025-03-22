export default async function getUserProfile(token:string) {

    const response = await fetch("https://a08-venue-explorer-backend-3.vercel.app/api/v1/auth/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`, // ใช้ Bearer Token เพื่อยืนยันตัวตน
        }
    });

    if (!response.ok)
        throw new Error("Cannot get user profile")

    return await response.json()
}