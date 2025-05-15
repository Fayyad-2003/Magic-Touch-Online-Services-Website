'use client';
// ------------ Hooks ----------------
import {  useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
// ------------ Icons ----------------
import { LogOut, User } from "lucide-react";
// ------------ Components ----------------
import Image from "next/image";
import { Button } from "../ui/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/shadcn/dropdown-menu"

const AuthMenu = () => {

    const { data } = useSession();

    // Function to handle user sign-in (using Descope)
    const handleSignIn = () => {
      signIn("descope");
    };
    // Function to handle user sign-out (using Descope)
    const handleLogout = () => {
      signOut("descope");
    };
    return (
        <DropdownMenu className={`mx-2 w-9 h-9 lg:w-[45px] ${!data?.user && "mr-9"}`}>
            {data ? (
              // Authenticated User Dropdown
              <div >
                <DropdownMenuTrigger className='!outline-0'>
                  <Image
                    src={data?.user?.image}
                    width={37}
                    height={37}
                    alt="user icon"
                    className="cursor-pointer rounded-full hover:scale-105 opacity-90 hover:opacity-100 transition-all duration-200 translate-y-0.5 ml-2 mr-1"
                  />
                </DropdownMenuTrigger>
                
                {/* Dropdown Menu */}
                <DropdownMenuContent className='bg-background-color border-none translate-y-5'>
                  <DropdownMenuLabel className="text-center bg-primary text-secondary rounded-lg tracking-wider">
                    {data?.user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className='bg-primary mb-2' />
                  <DropdownMenuItem className={`flex text-sky-400 tracking-widest font-medium items-center gap-3 text-sm mb-0 mr-2 hover:text-primary transition-all duration-500 cursor-pointer`}>
                    <User className="h-5 w-5 self-end" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout} // Handles logout action
                    className={`flex text-primary/55 tracking-widest font-medium items-center gap-3 text-sm mb-2 mr-2 hover:text-primary transition-all duration-500 cursor-pointer`}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </DropdownMenuItem>
                </ DropdownMenuContent>
                </div>
            ) : (
              // Login Button for Unauthenticated Users
              <Button
                onClick={handleSignIn} // Handles sign-in action
                className="rounded-full text-white hover:bg-sky-600 shadow-none cursor-pointer !md:mr-2 ml-1 !md:ml-3"
              >
                Login
              </Button>
            )}
        </DropdownMenu>
    );
}

export default AuthMenu;