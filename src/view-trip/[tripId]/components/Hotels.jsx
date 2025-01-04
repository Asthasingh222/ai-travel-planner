import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

function Hotels({trip}) {
  return (
    <div className="mt-12 mx-auto md:mx-16 lg:mx-32 p-6 rounded-lg shadow-lg">
      <div className="text-4xl font-bold text-center mb-8">
        Hotel Recommendations
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.trip?.hotels.map((hotel,index)=>(
          <div key={index} className="p-2">
            <HotelCardItem hotel={hotel} />
            </div>
      ))}
      </div>
    </div>
  );
}

export default Hotels;
