export default async function getCampgrounds() {

    // await new Promise((resolve)=> setTimeout(resolve,300))

    const respone = await fetch(`${process.env.BACKEND_URL}/api/v1/campgrounds`, {next: {tags: ['campgrounds']}})

    if(!respone.ok) {
        throw new Error('Failed to fetch campgrounds');
    }
    
    return await respone.json()
}