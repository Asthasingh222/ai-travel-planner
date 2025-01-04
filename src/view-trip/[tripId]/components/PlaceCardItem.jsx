import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
      place && GetPlacePhoto();
    }, [place]);
  
    const GetPlacePhoto = async () => {
      const data = {
        textQuery:place.placeName,
      };
      const result = await GetPlaceDetails(data).then((resp) => {
        console.log(resp.data.places[0].photos[3].name);
  
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}",resp.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      });
    };
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target="_blank">
        <div className='mt-2 flex p-3 gap-5 border rounded-xl hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
         <img src={photoUrl?photoUrl:'/tripinfo2.avif'} className='w-[200px] h-48 object-cover rounded-xl'/>
         <div>
<h4 className="text-xl font-bold text-gray-700">{place.placeName}</h4>
            <p className='text-m text-gray-500'>Place Details: {place.placeDetails}</p>
            <p className='text-m text-gray-500'>Ticket Pricing: 💵 {place.ticketPricing}</p>
            <p className='text-m text-gray-500'>Time Spent: ⏱️ {place.timeSpent}</p>
            <p className='text-m text-gray-500'>Rating: ⭐ {place.rating}</p>
           
         </div>
    </div>
    </Link>
    
   
  )
}

export default PlaceCardItem