import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getReservation from "@/libs/getReservations";
import ReservationCatalog from "@/components/ReservationCatalog";
import { ReservationJson } from "../../../interface";

export default async function MyReservation() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    return (
      <main className="text-center p-5">
        <h1 className="text-xl font-medium">Please log in to view your reservations.</h1>
      </main>
    );
  }

  let reservations: ReservationJson | null = null;

  try {
    reservations = await getReservation(session.user.token);
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
  }

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium">Your Camping Trip Details</h1>

      {reservations && reservations.count > 0 ? (
        <ReservationCatalog ReservationJson={reservations} />
      ) : (
        <p className="mt-4">No reservations found.</p>
      )}
    </main>
  );
}
