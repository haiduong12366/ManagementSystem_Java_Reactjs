import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { updateProfile } from "@/Redux/Auth/Action";

const UpdateProfile = ({open,setOpen}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { auth } = useSelector((store) => store);

  const dispatch = useDispatch();
  const [inputs,setInputs] = useState({
      email: auth.user?.email,
      password: "",
      fullName: auth.user?.fullName,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputs.email && inputs.fullName) {
      dispatch(updateProfile(inputs));
      console.log("Update profile", inputs);
    }
    setOpen(!open)
  };
  return (
    <div className="space-y-5">
      <form 
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        <Input
          className="border w-full border-gray-700 py-5 px-5"
          placeholder="FullName ..."
          type="text"
          value={inputs.fullName}
          onChange={(e) => {
            setInputs({ ...inputs, fullName: e.target.value });
          }}
        />

        <Input
          className="border w-full border-gray-700 py-5 px-5"
          placeholder="Email ..."
          type="text"
          value={inputs.email}
          onChange={(e) => {
            setInputs({ ...inputs, email: e.target.value });
          }}
        />

        <div className="flex w-full relative">
          <Input
            className="border w-full border-gray-700 py-5 px-5"
            placeholder="Password ..."
            type={!showPassword ? "password" : "text"}
            value={inputs.password}
            onChange={(e) => {
              setInputs({ ...inputs, password: e.target.value });
            }}
          />
          <Button
            type="button"
            className="absolute right-0 top-1 rounded-full"
            variant={"ghost"}
            size="icon"
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={auth.loading}
        >
          {auth.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {auth.loading ? "Please wait" : "Update profile"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
