import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/Redux/Auth/Action";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { auth } = useSelector((store) => store);

  const dispatch = useDispatch();
  const formDataProject = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = (data) => {

      if (data.email && data.password && data.fullName) {
        dispatch(register(data));
        console.log("signup", data);
      }

  };
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Register
      </h1>
      <Form {...formDataProject}>
        <form
          className="space-y-3"
          onSubmit={formDataProject.handleSubmit(onSubmit)}
        >
          <FormField
            control={formDataProject.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FullName</FormLabel>

                <FormControl>
                  <Input
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="FullName ..."
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
            {auth.loading ? "Please wait" : "Sign up"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
