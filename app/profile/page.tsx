"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'

interface Profile {
  name: string,
  city: string,
  education: string
}

const ProfilePage = () => {
  const {
    data,
    isLoading,
  } = useQuery<Profile[]>({
    queryKey: ["profile"],
    queryFn: () =>
      fetch("/api/profile").then((res) =>
        res.json()
      ),
 
  });
  
  if(isLoading) {
    return(
      <div>Loading...</div>
    )
  }
  
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>{`Halo Perkenalkan nama saya ${data?.name} asal ${data?.city} dengan pendidikan ${data?.education}`}</h1>
    </div>
  )
}

export default ProfilePage