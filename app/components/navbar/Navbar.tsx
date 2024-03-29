/** @format */
"use client";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";


interface NavbarProps {
	currentUser?:SafeUser | null
}
const Navbar:React.FC<NavbarProps> = ({currentUser}) => {
	console.log(currentUser);
	
	return (
		<div className='fixed w-full bg-slate-900 shadow-sm z-10 text-slate-300'>
			<div className='py-4 border-b-[1px] border-slate-700'>
				<Container>
					<div className='flex flex-row items-center justify-between gap-3 md:gap-0 '>
                       <Logo/> 
                       <Search/> 
                       <UserMenu currentUser={currentUser}/> 
                    </div>
				</Container>
			</div>
			<Categories/>
		</div>
	);
}

export default Navbar;
