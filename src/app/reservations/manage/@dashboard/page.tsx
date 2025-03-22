import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import Car from "@/db/models/Car";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const addCar = async (addCarForm:FormData) => {
        "use server"
        const model = addCarForm.get('model')
        const description = addCarForm.get('desc')
        const picture = addCarForm.get('picture')
        const seats = addCarForm.get('seats')
        const doors = addCarForm.get('doors')
        const automatic = true
        const largebags = addCarForm.get('largebags')
        const smallbags = addCarForm.get('smallbags')
        const dayRate = addCarForm.get('dayRate')

        try {
            await dbConnect()
            const car = await Car.create({
                "model" : model,
                "description" : description,
                "picture" : picture,
                "seats" : seats,
                "doors" : doors,
                "largebags" : largebags,
                "smallbags" : smallbags,
                "automatic" : automatic,
                "dayRate" : dayRate,
            })
        } catch (error) {
            console.log(error)
        }
        revalidateTag('cars')
        redirect('/car')
    }

    const session = await getServerSession(authOptions)

    if (!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createAt = new Date(profile.data.createdAt)


    return (
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createAt.toString()}</td></tr>
            </tbody></table>

            {
                (profile.data.role == 'admin') ? 
                <form action={addCar}>
                    <div className="text-xl text-blue-700">
                        Create Car Model
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="model">Model</label>
                        <input type="text" required id="model" name="model" placeholder="Car Model"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="desc">Description</label>
                        <input type="text" required id="desc" name="desc" placeholder="Car Description"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">Picture</label>
                        <input type="text" required id="picture" name="picture" placeholder="URL"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="seats">Seats</label>
                        <input type="number" required id="seats" name="seats" placeholder="4"
                        min={0} max={50}
                        className="bg-white border-2 border-gray-200 rounded w-auto p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"/>
                        <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor="doors">Doors</label>
                        <input type="number" required id="doors" name="doors" placeholder="4"
                        min={0} max={8}
                        className="bg-white border-2 border-gray-200 rounded w-auto p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"/>
                        <input type="checkbox" id="automatic" name="automatic"
                        className="ml-5 mr-2"/><span>Auto</span>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="largebags">Large Bags</label>
                        <input type="number" required id="largebags" name="largebags" placeholder="2"
                        min={0} max={10}
                        className="bg-white border-2 border-gray-200 rounded w-auto p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"/>
                        <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor="smallbags">Small Bags</label>
                        <input type="number" required id="smallbags" name="smallbags" placeholder="2"
                        min={0} max={10}
                        className="bg-white border-2 border-gray-200 rounded w-auto p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="dayRate">Rate</label>
                        <input type="text" required id="dayRate" name="dayRate" placeholder="Daily Rate (including insurance)"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add New Car</button>
                </form> 
                : null
            }
        </main>
    );
}