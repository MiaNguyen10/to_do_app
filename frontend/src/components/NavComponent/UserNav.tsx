import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useNavigate } from "react-router";

export type UserType = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
};

const UserNav = () => {
  const navigate = useNavigate();
  const userString = sessionStorage.getItem("user");
  const user: UserType = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.location.href = "/login"; // Redirect to login page
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex float-right items-center rounded-full p-3 hover:bg-gray-100 focus:outline-none"
        >
          <User className="w-8 h-8 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {" "}
              {user ? `${user.firstname} ${user.lastname}` : ""}
            </p>
            <p className="text-muted-foreground text-xs leading-none mt-1">
              {user ? user.email : "No email available"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => navigate("/profile")}
            className="cursor-pointer"
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleLogout()}
            className="cursor-pointer"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
