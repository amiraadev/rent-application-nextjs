import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoriteClient from "./FavoriteClient";

const ListingPage = async () => {

    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                  title="No favorites found"
                  subtitle="Looks like you have no favorite listings"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoriteClient 
            listings = {listings}
            currentUser = {currentUser}         
            />
        </ClientOnly>
    )
}

export default ListingPage;