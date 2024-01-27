// /** @format */

// import prisma from "@/app/libs/prismadb";

// export interface IListingsParams {
// 	userId?: string;
// 	guestCount?: number;
// 	roomCount?: number;
// 	bathroomCount?: number;
// 	startDate?: string;
// 	endDate?: string;
// 	locationValue?: string;
// 	category?: string;
// }

// export default async function getListings(params: IListingsParams) {
// 	try {
// 		const {
// 			userId,
// 			guestCount,
// 			roomCount,
// 			bathroomCount,
// 			startDate,
// 			endDate,
// 			locationValue,
// 			category
// 		} = params;

// 		let query: any = {};
// 		if (userId) {
// 			query.userId = userId;
// 		}
// 		if (category) {
// 			query.category = category;
// 		}
// 		if (roomCount) {
// 			query.roomCount = {gte:+roomCount};
// 		}
// 		if (bathroomCount) {
// 			query.bathroomCount = {gte:+bathroomCount};
// 		}
// 		if (guestCount) {
// 			query.guestCount = {gte:+guestCount};
// 		}
// 		if (locationValue) {
// 			query.locationValue =locationValue;
// 		}
// 		if(startDate && endDate){
// 			query.NOT = {reservations:{
// 				some:{
// 					OR:[
// 						{
// 						endDate:{gte:startDate},
// 						startDate:{lte:startDate},
// 					},
// 					{
// 						startDate:{lte:endDate},
// 						endDate:{gte:endDate},
// 					}
// 				]
// 				}
// 			}}
// 		}
// 		const listings = await prisma.listing.findMany({
// 			where: query,
// 			orderBy: {
// 				createdAt: "desc",
// 			},
// 		});

// 		const safeListings = listings.map((listing) => ({
// 			...listing,
// 			createdAt: listing.createdAt.toISOString(),
// 		}));
// 		return safeListings;
// 	} catch (error: any) {
// 		throw new Error(error);
// 	}
// }


// Import necessary modules
import prisma from "@/app/libs/prismadb";

// Define the interface for listing parameters
export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

// Function to fetch listings
export default async function getListings(params: IListingsParams) {
  try {
    // Destructure parameters
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    // Build a static query object
    const query: any = {};

    // Add static conditions to the query
    if (category) {
      query.category = category;
    }
    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }
    if (bathroomCount) {
      query.bathroomCount = { gte: +bathroomCount };
    }
    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }

    // If startDate and endDate are provided, add static conditions for reservations
    if (startDate && endDate) {
      query.reservations = {
        none: {
          OR: [
            {
              endDate: { gte: startDate },
              startDate: { lte: startDate },
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
            },
          ],
        },
      };
    }

    // Fetch listings using the static query
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map and format the listings
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    // Return the formatted listings
    return safeListings;
  } catch (error: any) {
    // Handle errors
    throw new Error(error);
  }
}

