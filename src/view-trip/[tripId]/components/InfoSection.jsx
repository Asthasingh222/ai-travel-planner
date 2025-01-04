import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
function InfoSection({trip}) {
  
  const[photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace("{NAME}",resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <div className='flex  items-center mt-12 md:mx-16 lg:mx-32 p-5 rounded-lg shadow-lg'>
        <img className="h-60 w-3/5  object-cover rounded-lg " src={photoUrl?photoUrl:'/tripinfo2.avif'}/>
        <div className="flex flex-col ml-5">
        <div className="text-4xl font-bold mb-2 flex items-center">
        {trip?.userSelection?.location?.label}
        </div>
        <div className="text-xl mb-1 flex items-center">
          📅 <span className="font-semibold ml-2">Duration:</span>
          {trip?.userSelection?.noOfDays} days
        </div>
        <div className="text-xl mb-1 flex items-center">
          💰 <span className="font-semibold ml-2">Budget: </span>
          {trip?.userSelection?.budget}
        </div>
        <div className="text-xl flex items-center">
          👥 <span className="font-semibold ml-2">Traveling with : </span>
          {trip?.userSelection?.travelers}
        </div>
        </div>
    </div>
  )
}

export default InfoSection