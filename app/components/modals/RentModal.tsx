/** @format */
"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySlect from "../inputs/CountrySelect";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
// import Map from "../Map";

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}
const RentModal = () => {
	const rentModal = useRentModal();

	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch("category");
	const location = watch("location");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc");

	const Map = useMemo(() => dynamic(() => import('../Map'),{
		ssr:false
	}),[location])

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};
	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Create";
		}
		return "Next ";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}
		return "Back ";
	}, [step]);

	let bodyContent = (
		<div className='flex flex-col gap-8 '>
			<Heading
				title='which of these best describes your place? '
				subtitle='Pick a category'
			/>
			<div
				className='
               grid 
               grid-cols-1
               md:grid grid-cols-2
               gap-3
               max-h-[50vh] 
               overflow-y-auto
               '>
				{categories.map((item) => (
					<div key={item.label} className='col-span-1'>
						<CategoryInput
							onClick={(category) => {
								setCustomValue("category", category);
							}}
							selected={category === item.label}
							label={item.label}
							icon={item.icon}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STEPS.LOCATION) {
		bodyContent = (
		  <div className="flex flex-col gap-8">
			<Heading
			  title="Where is your place located?"
			  subtitle="Help guests find you!"
			/>
			<CountrySelect 
			  value={location} 
			  onChange={(value) => setCustomValue('location', value)} 
			/>
			<Map center={location?.latlng} />
		  </div>
		);
	  }
	if (step === STEPS.INFO) {
		bodyContent = (
		  <div className="flex flex-col gap-8">
			<Heading
			  title="Share some basics about your place"
			  subtitle="What amenities do you have?"
			/>
			<Counter
			   title="Guests"
			   subtitle="how many guests do you allow ?"
			   value={guestCount}
			   onChange={(value) => setCustomValue('guestCount',value)}
			/>
		<hr/>	
			<Counter
			   title="Rooms"
			   subtitle="how many rooms do you have ?"
			   value={roomCount}
			   onChange={(value) => setCustomValue('roomCount',value)}
			/>
		<hr/>	
			<Counter
			   title="Bathrooms"
			   subtitle="how many bathrooms do you have ?"
			   value={bathroomCount}
			   onChange={(value) => setCustomValue('bathroomCount',value)}
			/>
		  </div>
		);
	  }
	  if (step === STEPS.IMAGES) {
		bodyContent = (
		  <div className="flex flex-col gap-8">
			<Heading
			  title="Add a photo of your place"
			  subtitle="Show gusts what your place looks like"
			/>
			<ImageUpload
			   value={imageSrc}
			   onChange={(value)=> setCustomValue('imageSrc',value)}
			/>
		  </div>
		);
	  }
	  if (step === STEPS.DESCRIPTION) {
		bodyContent = (
		  <div className="flex flex-col gap-8">
			<Heading
			  title="How would you describe your place?"
			  subtitle="Short qnd sweet works best !"
			/>
			<Input
			   id='title'
			   label='Title'
			   disabled={isLoading}
			   register={register}
			   errors={errors}
			   required
			/>
			<hr/>
			<Input
			   id='description'
			   label='Description'
			   disabled={isLoading}
			   register={register}
			   errors={errors}
			   required
			/>
		  </div>
		);
	  }
	return (
		<Modal
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={onNext}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			title='Airbnb your Home'
			body={bodyContent}
		/>
	);
};

export default RentModal;
