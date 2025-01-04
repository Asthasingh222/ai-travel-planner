import { GoogleGenerativeAI} from "@google/generative-ai";


  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
   export  const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for couple with a cheap budget , Give me a Hotel options list of atleast 3 hotels  with HotelName , Hotel address , Price ,hotel image url , geo coordinates , rating ,description and suggest itinerary with placeName, Place Details, Place Image Url , Geo Coordinates, Ticket Pricing , rating, Time travel each of the loaction for 3 days with each day plan with best time to visit according to weather and temperature also show these details in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot directly access and display real-time information like hotel prices, availability, images, and geo-coordinates.  Hotel prices are highly dynamic and image URLs change.  Therefore, I can't provide the JSON with all those elements included.  However, I can give you a JSON template and a detailed itinerary that you can then populate with information from online travel agencies (like Booking.com, Expedia, Kayak) and Google Maps.\n\n**JSON Template:**\n\n```json\n{\n  \"trip\": {\n    \"destination\": \"Las Vegas, NV\",\n    \"duration\": \"3 Days\",\n    \"budget\": \"Cheap\",\n    \"travelers\": 2,\n    \"hotels\": [\n      {\n        \"name\": \"Hotel Name\",\n        \"address\": \"Hotel Address\",\n        \"price\": \"Price (e.g., $50/night)\",\n        \"imageUrl\": \"Hotel Image URL\",\n        \"geoCoordinates\": {\n          \"latitude\": 00.0000,\n          \"longitude\": 00.0000\n        },\n        \"rating\": 4.0,\n        \"description\": \"Hotel Description\"\n      }\n    ],\n    \"itinerary\": {\n      \"day1\": [\n        {\n          \"placeName\": \"Place Name\",\n          \"placeDetails\": \"Place Description\",\n          \"imageUrl\": \"Place Image URL\",\n          \"geoCoordinates\": {\n            \"latitude\": 00.0000,\n            \"longitude\": 00.0000\n          },\n          \"ticketPricing\": \"Ticket Price (or 'Free')\",\n          \"rating\": 4.5,\n          \"timeSpent\": \"Time spent (e.g., 2 hours)\"\n        }\n      ],\n      \"day2\": [],\n      \"day3\": []\n    }\n  }\n}\n```\n\n**3-Day Cheap Las Vegas Itinerary for Couples:**\n\nThis itinerary focuses on free and low-cost activities, assuming you'll be eating at budget-friendly places (food trucks, casual diners).  Always check for updated hours and ticket prices on official websites.\n\n**Day 1: Strip Exploration & Fremont Street**\n\n* **Morning (8:00 AM - 12:00 PM):** Walk the Las Vegas Strip.  See the Bellagio fountains (free), admire the architecture of various casinos, and take photos.  Best time to visit: Early morning to avoid the midday heat.\n    * **Place:** Las Vegas Strip (various casinos and attractions)\n    * **Details:** Walking tour of iconic casinos, Bellagio fountains show.\n    * **Time:** 4 hours\n* **Afternoon (12:00 PM - 4:00 PM):** Lunch at an inexpensive food court or grab something from a food truck. Head to the Downtown area and explore Fremont Street Experience.  See the Viva Vision light show (free). Best time: Midday to early afternoon.\n    * **Place:** Fremont Street Experience\n    * **Details:** Viva Vision light show, street performers, vintage casinos.\n    * **Time:** 4 hours\n* **Evening (4:00 PM - Late):** Enjoy happy hour at a casino bar (many offer discounted drinks). Walk around Fremont Street at night to see the lights in a different perspective.  Best time: Evening for the lights and cooler temperatures.\n    * **Place:** Fremont Street Experience (Night) & Casino happy hour\n    * **Details:** Nighttime ambiance, light show, cheap drinks\n    * **Time:** 4+ hours\n\n\n**Day 2: Nature & Red Rock Canyon**\n\n* **Morning (8:00 AM - 12:00 PM):** Visit Red Rock Canyon National Conservation Area.  Drive the scenic 13-mile loop (there's an entrance fee, ~$15/vehicle). Hike a short trail. Best time: Morning before it gets too hot.\n    * **Place:** Red Rock Canyon National Conservation Area\n    * **Details:** Scenic drive, hiking trails (choose short, easy ones).\n    * **Time:** 4 hours\n* **Afternoon (12:00 PM - 4:00 PM):** Picnic lunch at Red Rock Canyon (pack your own to save money) or grab a bite at a nearby restaurant outside the park. Best time: Cooler part of the day.\n    * **Place:** Red Rock Canyon or nearby eatery\n    * **Details:** Relaxing break, enjoying the scenery.\n    * **Time:** 2-3 hours\n* **Evening (4:00 PM - Late):** Return to the Strip for a free show (check the schedules for free concerts or performances) or relax at your hotel.  Best time:  Late afternoon to early evening to avoid the heat.\n    * **Place:** Las Vegas Strip (Free Shows) or Hotel Pool (if available)\n    * **Details:** Free entertainment, relaxing.\n    * **Time:** 4+ hours\n\n\n**Day 3: Pool Day & Souvenir Shopping**\n\n* **Morning (9:00 AM - 12:00 PM):** Relax by the hotel pool (if your hotel has one). Best time: Morning for less crowds.\n    * **Place:** Hotel Pool (if your hotel has one)\n    * **Details:** Relax, swim, sunbathe.\n    * **Time:** 3 hours\n* **Afternoon (12:00 PM - 4:00 PM):** Lunch at a budget-friendly eatery. Do some souvenir shopping at the souvenir shops along the Strip (haggle for prices). Best time: Midday, less crowds than later in the day.\n    * **Place:** Souvenir shops on the Strip.\n    * **Details:** Cheap souvenirs, shopping.\n    * **Time:** 4 hours\n* **Evening (4:00 PM - Late):** Enjoy a final stroll along the Strip, watch the sunset, and find a cheap dinner spot before heading to the airport/your next destination. Best time: Evening for the sunset.\n    * **Place:** Las Vegas Strip (Sunset)\n    * **Details:** Final views, farewell dinner.\n    * **Time:** 4+ hours\n\n\n\nRemember to fill in the JSON template with specific details once you've researched hotel and attraction options.  Las Vegas weather can be extremely hot in summer, so plan your outdoor activities for early mornings and evenings.  Check the forecast before you go!\n"},
          ],
        },
      ],
    });