import { resolve } from "path";

export default async function getCars() {

    // await new Promise((resolve)=> setTimeout(resolve,300))

    const respone = await fetch(`${process.env.BACKEND_URL}/api/v1/cars`, {next: {tags: ['cars']}})

    if(!respone.ok) {
        throw new Error('Failed to fetch cars');
    }
    
    return await respone.json()
}