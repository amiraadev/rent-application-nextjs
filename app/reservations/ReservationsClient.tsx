/** @format */

import axios from "axios";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { SafeReservation, SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";

interface ReservationsClientProps {
	reservation: SafeReservation[];
	currentUser?: SafeUser | null;
}
const ReservationsClient: React.FC<ReservationsClientProps> = ({
	reservation,
	currentUser,
}) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);
			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success("Reservation canceled");
					router.refresh();
				})
				.catch(() => {
					toast.error("Something went wrong !");
				})
				.finally(() => {
					setDeletingId("");
				});
		},
		[router]
	);
	return (
		<Container>
			<Heading title='Reservations' subtitle='Booking on your properties' />
		</Container>
	);
};

export default ReservationsClient;
