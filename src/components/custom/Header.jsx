import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FcGoogle } from "react-icons/fc";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

function Header() {
  const [user, setUser] = React.useState(null);
  const [openDailog, setOpenDialog] = useState(false);
  useEffect(() => {
    const storeduser = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setUser(storeduser);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

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
        window.location.reload();
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" />
      <div>
        {user && user.picture ? (
          <div className="flex items-center gap-x-3">
            <a href='/create-trip'>
            <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            
            <Popover>
              <PopoverTrigger>
                <img src={user.picture} className="h-[35px] w-[35px] rounded-full"
                alt="User Profile"
                onError={(e) => {
                  e.target.src = '/person2.png';
                }}
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : 
          <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
        }
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
  )
}

export default Header;
