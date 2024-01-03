/** @format */

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

 const Logo = () => {
	const router = useRouter();
	return (
		<Image
			src='/images/logo.png'
			alt='logo'
			height='100'
			width='100'
			className='hidden md:block cursor-pointer'
		/>
	);
};
export default Logo;