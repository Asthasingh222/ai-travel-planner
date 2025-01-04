
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
const HotelCardItem = ({ hotel}) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    console.log("hotel info=>",hotel);
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery:hotel?.name,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[1].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[0].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <div>
     <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+","+hotel?.address} target="_blank">
            <div className="hover:scale-105 transition-all cursor-pointer">

                <img src={photoUrl?photoUrl:'/tripinfo2.avif'} className="rounded-xl h-[160px]"/>
                <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{hotel?.name}</h2>
                    <h2 className="text-xs text-gray-700 ">📍{hotel?.address}</h2>
                    <h2 className="text-sm">💵 {hotel?.price}</h2>
                    <h2 className="text-sm">⭐ {hotel?.rating}</h2>
                </div>
            </div>
           </Link> 
    </div>
  );
};

export default HotelCardItem;