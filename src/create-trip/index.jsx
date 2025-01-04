import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { chatSession } from "@/service/AIModal";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate} from "react-router-dom";

//generate trip --->Authentication--->google Auth---->save to local storage---> create Prompt(Pass to AI Modal) ----> google gemini AI Modal ---->Save AI Results in Firebase---->viewTrip(new page)
function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // whenever the component is loaded or value changes
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
  //if no. of days are greater than 5
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.travelers
    ) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    // console.log(formData);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{travelers}", formData?.travelers)
      .replace("{budget}", formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    console.log(result?.response?.text());
    saveTrip(result?.response?.text());
  };

  const GetUserProfile = (tokenInfo) => {
    console.log(tokenInfo);
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };
  const saveTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some bsic information, and our trip planner will generate a
        customized itinerary based on your preferences.{" "}
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {/* destination */}
        <div>
          <h2 className="text-xl mt-3 font-medium mb-3">
            What is destination of your choice ?{" "}
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        {/* No. of days        */}
        <div>
          <h2 className="text-xl mt-3 font-medium mb-3">
            How many days are you planning your trip ?{" "}
          </h2>
          <Input
            placeholder="Ex-2"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl mt-3 font-medium mb-3">
            What is your Budget?{" "}
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg
                     hover:shadow-green-700 cursor-pointer
                     ${
                       formData?.budget == item.title &&
                       "shadow-lg border-black"
                     }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold mt-2 text-l">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* travel with whom */}
        <div>
          <h2 className="text-xl mt-3 font-medium mb-3">
            Who do you plan on traveling with on your next adventure?{" "}
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("travelers", item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg
                     hover:shadow-blue-700 cursor-pointer
                      ${
                        formData?.travelers == item.people &&
                        "shadow-lg border-black"
                      }
                     `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold mt-2 text-l">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-4 justify-end flex">
        <Button onClick={onGenerateTrip} disable={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-row gap-0 items-center">
                <img src="/logo.svg" />
                <h1 className="font-bold text-xl text-[#296556]">
                  Beyond Boundaries
                </h1>
              </div>

              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="mt-5 w-full flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7"></FcGoogle>
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
