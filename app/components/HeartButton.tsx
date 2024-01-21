/** @format */

"use client";
import React from "react";
import { SafeUser } from "../types";
import { AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	const hasFavorited = false;
	const toggleFavorite = () => {};
	return (
		<div
			onClick={toggleFavorite}
			className='
      relative 
      hover:opacity-80 
      transition 
      cursor-pointer'>
			<AiOutlineHeart
              size={28}
              className='fill-white absolute -top-[2px] -right-[2px]'
            />
		</div>
	);
};

export default HeartButton;
