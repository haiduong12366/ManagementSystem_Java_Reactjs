import { login } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { auth } = useSelector((store) => store);

  const formDataProject = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    if (data.email && data.password) {
      dispatch(login(data));
      console.log("login", data);
    }
  };
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Login
      </h1>
      <Form {...formDataProject}>
        <form
          className="space-y-3"
          onSubmit={formDataProject.handleSubmit(onSubmit)}
        >
          <FormField
            control={formDataProject.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Email ..."
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formDataProject.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex w-full max-w-sm items-center space-x-2 relative">
                    <Input
                      className="border w-full border-gray-700 py-5 px-5"
                      placeholder="Password ..."
                      {...field}
                      type={!showPassword ? "password" : "text"}
                    />
                    <Button
                      type="button"
                      className="absolute right-0 rounded-full"
                      variant={"ghost"}
                      size="icon"
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-5" disabled={auth.loading}>
            {auth.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {auth.loading ? "Please wait" : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
