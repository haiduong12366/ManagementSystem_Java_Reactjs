import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProjectForm from "../ProjectCard/CreateProjectForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/Auth/Action";
import UpdateProfile from "../Auth/UpdateProfile";
import { useState } from "react";

const Navbar = () => {
  const { auth } = useSelector((store) => store);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="border-b py-4 px-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p onClick={() => navigate("/")} className="cursor-pointer">
          Project Managment
        </p>
        <Dialog>
          <DialogTrigger>
            <Button variant="ghost">New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Create New Project</DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
        <Button onClick={() => navigate("/upgrade_plan")} variant="ghost">
          Upgrade
        </Button>
      </div>
      <div className="flex gap-3 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border-2 border-gray-500"
            >
              <PersonIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                setOpen(!open);
              }}
            >
              <span>Update</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>{auth.user?.fullName}</p>
      </div>
      <Dialog open={open}>
        <DialogContent open={open} setOpen={setOpen}>
          <DialogHeader className={"flex justify-between"}>
            <span>Update profile</span>
          </DialogHeader>
          <UpdateProfile open={open} setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
