import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div className="mt-12 md:mx-16 lg:mx-32 p-5 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-3">Places to Visit</h2>
      <div className="">
        {trip.tripData?.trip?.itinerary &&
          Object.entries(trip.tripData?.trip?.itinerary).map(
            ([day, places], i) => (
              <div key={i} className="my-3 flex flex-col  p-6 ">
                {/* Display the day heading */}
                <h3 className="text-2xl font-bold  text-gray-800">{day.toUpperCase()}</h3>
                {/* Iterate over places for each day */}
                {places.map((place, index) => (
                  <div key={index} className="mt-3">
                    {/* Display place details */}
                    <PlaceCardItem place={place}/>
                  </div>
                ))}
              </div>
            )
          )}
      </div>
    </div>
  );
}

export default PlacesToVisit;

