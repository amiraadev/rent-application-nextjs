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

import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  category?: string;
  roomCount?: number;
  bathroomCount?: number;
  guestCount?: number;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue,
      startDate,
      endDate,
    } = params;

    // Define a static query object
    const query: any = {};

    // Apply static conditions to the query
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

    // If both startDate and endDate are provided, apply static conditions for reservations
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

    // Format and return the listings
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
