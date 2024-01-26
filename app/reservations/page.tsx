/** @format */

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title='Unauthorized' subtitle='Please login    ' />
			</ClientOnly>
		);
	}

	const reservations = await getReservations({
		authorId: currentUser.id,
	});
	// console.log(reservations);

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No reservations found'
					subtitle='Looks like you have no reservations on your properties'
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ReservationsClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default ReservationsPage;
