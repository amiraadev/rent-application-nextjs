/** @format */

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

 const Logo = () => {
	const router = useRouter();

	return (
		<Image
		onClick={() => router.push('/')}
			// src='/images/logo-ftw.png'
			src='/images/logo-yellow.png'
			alt='logo'
			height='110'
			width='110'
			className='hidden md:block cursor-pointer hover:scale-105'
		/>
	);
};
export default Logo;