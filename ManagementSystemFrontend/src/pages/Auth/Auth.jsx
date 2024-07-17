import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Button } from "@/components/ui/button";



const Auth = () => {
  const [active, setActive] = useState(true);
  return (
    <div className='p-4 h-screen  flex items-center justify-center'>
    <div className="flex flex-col items-center justify-center min-w-[30rem] mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <div className="">
          <div className=" w-full px-10 space-y-5">
            {!active ? <Signup /> : <Login />}
            <div>
              <Button variant="ghost" onClick={() => setActive(!active)}>
              {!active ? "Already have account ?" : "Create New Account"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Auth;
