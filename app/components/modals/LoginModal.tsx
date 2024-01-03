/** @format */

"use client";

import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
	const router = useRouter();

	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		signIn("credentials", { ...data, redirect: false })
			.then((callback) => {
				console.log(callback);
				setIsLoading(false);
				if (callback?.ok) {
					toast.success("Logged in");
					router.refresh();
					loginModal.onClose();
				}
				if (callback?.error) {
					toast.error(callback.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const Toggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Welcome back' subtitle='Login to your account' center />
			<Input
				id='email'
				label='Email'
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
			<hr />
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
			<div className='justify-center text-center text-neutral-500 text-center mt-4 font-light'>
				<div className='flex flex-row items-center gap-2'>
					<div>First Time using Airbnb?</div>
					<div
						onClick={Toggle}
						className='text-neutral-800 cursor-pointer hover:underline'>
						Create an account
					</div>
				</div>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
