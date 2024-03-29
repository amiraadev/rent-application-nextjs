"use client"
import Image from 'next/image'
import React from 'react'


interface AvatarProps {
  src:string |null| undefined
}

const Avatar:React.FC<AvatarProps> = ({src}) => {
    
  return (
    <Image className='rounded-full' height="30" width="30" alt="Avatar" src={src || "/images/profile-10.jpg"} />
  )
}

export default Avatar