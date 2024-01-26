import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";

const ListingPage = async () => {
    return(
        <ClientOnly>
            <EmptyState
              title="No favorites found"
              subtitle="Looks like you have no favorite listings"
            />
        </ClientOnly>
    )
}