/** @format */

"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		axios
			.post("/api/register", data)
			.then(() => {
				registerModal.onClose();
				loginModal.onOpen();
			})
			.catch((error) => {
				toast.error("something went wrong. Please try again");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const Toggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading
				title='Welcome'
				subtitle='Create an account !'
				center
			/>
			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='name'
				label='Name'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='password'
				label='Password'
				type='password'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr className="border-b-[2px] border-slate-700"/>
			<Button
				outline
				label='Continue with google'
				icon={FcGoogle}
				onClick={() => {
					signIn("google");
				}}
			/>
			<Button
				outline
				label='Continue with github'
				icon={AiFillGithub}
				onClick={() => {
					signIn("github");
				}}
			/>
			<div className='justify-center text-center text-slate-300 text-center mt-4 font-light'>
				<div className='flex flex-row items-center gap-2'>
					<div>Already have an account?</div>
					<div
						onClick={Toggle}
						className='text-slate-500 cursor-pointer hover:underline'>
						Login
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Register'
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
