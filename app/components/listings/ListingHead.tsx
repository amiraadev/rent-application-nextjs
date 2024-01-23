/** @format */

"use client ";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
	title: string;
	locationValue: string;
	imageSrc: string;
	id: string;
	currentUser?: SafeUser | null;
}
export const ListingHead: React.FC<ListingHeadProps> = ({
	title,
	locationValue,
	imageSrc,
	id,
	currentUser,
}) => {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);
	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region},${location?.label}`}
			/>
			<div
				className='
                        w-full
                        h-[60vh]
                        overflow-hidden
                        rounded-xl
                        relative
             '>
                <Image alt="image" src={imageSrc} fill className="object-cover w-full" />
                <div className="absolute top-5 right-5">
                    <HeartButton 
                       listingId={id}
                       currentUser={currentUser}
                    />
                </div>
             </div>
		</>
	);
};
