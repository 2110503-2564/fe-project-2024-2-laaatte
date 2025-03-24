export default async function getCampgrounds() {

    // await new Promise((resolve)=> setTimeout(resolve,300))

    const respone = await fetch(`${process.env.BACKEND_URL}/api/v1/campgrounds`, {next: {tags: ['campgrounds']}})

    if(!respone.ok) {
<<<<<<< HEAD
        throw new Error('Failed to fetch campground');
=======

>>>>>>> 34bf1cd6363c341c195393014fda19ee7b972ef5
    }
    
    return await respone.json()
}