/** @format */

"use client";
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import { SafeUser } from "@/app/types";

interface UserMenuProps {
	currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const [isOpen, setIsOpen] = useState(Boolean);

	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const rentModal = useRentModal();

	const toggle1open = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		// Open Rent model
		rentModal.onOpen()
	}, [currentUser, loginModal,rentModal]);

	return (
		<div className='flex flex-row items-center gap-3'>
			<div
				onClick={onRent}
				className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
				Airbnb your home
			</div>
			<div
				onClick={toggle1open}
				className='p-4 md:py-1 md:px-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
				<AiOutlineMenu />
				<div className='hidden md:block'>
					<Avatar src={currentUser?.image} />
				</div>
			</div>

			{isOpen && (
				<div
					className=' absolute 
                                rounded-xl 
                                shadow-md
                                w-[40vw]
                                md:w-3/4 
                                bg-white 
                                overflow-hidden 
                                right-0 
                                top-12 
                                text-sm'>
					<div className='flex flex-col cursor-pointer'>
						{currentUser ? (
							<>
								<MenuItem onClick={() => {}} label='My trips' />
								<MenuItem onClick={() => {}} label='My favorites' />
								<MenuItem onClick={() => {}} label='My reservations' />
								<MenuItem onClick={() => {}} label='My properties' />
								<MenuItem onClick={rentModal.onOpen} label='Airbnb my home' />
								<hr />
								<MenuItem onClick={() => signOut()} label='Logout' />
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label='login' />
								<MenuItem onClick={registerModal.onOpen} label='Sign up' />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
