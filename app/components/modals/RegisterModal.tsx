"use client"
import axios from "axios";
import { useCallback, useState } from "react";
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { log } from "console";
import Modal from "./Modal";

const RegisterModal = () => {
   const registerModal = useRegisterModal();
   const [isLoading, setIsLoading] = useState(false)
   const {
    register,
    handleSubmit,
    formState:{errors}
   } = useForm<FieldValues>({
    defaultValues:{
        name:'',
        email:'',
        password:'',
    }
   })

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios.post('/api/register',data)
    .then(() => {
        registerModal.onClose()
    })
    .catch((error) => {
        console.log(error);
        
    })
    .finally(() => {
        setIsLoading(false);
        
    })
}
  return (
    <Modal 
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModal