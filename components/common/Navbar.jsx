"use client";
import Link from "next/link";
import Image from "next/image";
import AuthMenu from './AuthMenu';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import {
  ChevronRight,
  EllipsisVertical,
  HandHelping,
  HelpCircle,
  Home,
  SquareChartGantt,
  SunMoon,
} from "lucide-react";
import { isActive } from "../../utils/active-link";

const navLinks = [
  { path: "/", label: "Home", icon: Home },
  { path: "/categories/Moving", label: "Services", icon: HandHelping },
  { path: "/my-booking", label: "My Booking", icon: SquareChartGantt },
  { path: "/about-us", label: "About Us", icon: HelpCircle },
];

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNavLinks, setShowLinks] = useState(false); // Changed to false by default
  const [animate, setAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { setTheme } = useTheme();
  const { data } = useSession();
  const pathname = usePathname();

  // Check if the screen is mobile/tablet size
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint in Tailwind is 1024px
      setIsMobile(mobile);
      
      // If not mobile, ensure nav links are visible
      if (!mobile) {
        setShowLinks(true);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Effect to lock/unlock body scroll when mobile menu is open/closed (only for mobile)
  useEffect(() => {
    if (isMobile) {
      if (showNavLinks) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showNavLinks, isMobile]);

  const handleSwitchTheme = () => {
    setAnimate(true);
    setTheme(darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
    setTimeout(() => {
      setAnimate(false);
    }, 300);
  };

  const HandleShowAndCloseNavlinks = () => {
    setShowLinks((prev) => !prev);
  };

  return (
    <header className="flex fixed top-0 w-[100vw] bg-background-color py-3 px-6 sm:px-12 lg:px-32 shadow-sm items-center rounded-b-md justify-between z-10 transition-all duration-500">
      {/* Logo Section */}
      <Link href={"/"} className="flex items-center cursor-pointer relative sm:top-[9px]">
        <div className="flex items-center sm:p-2 sm:absolute sm:w-[200px] sm:h-[65px] sm:rounded-ee-[35px] sm:rounded-tl-[35px] z-20 sm:pl-5 sm:shadow shodow-sm sm:bg-background-secondary-color">
          <Image src={"/logo.svg"} height={25} width={25} alt="logo" />
          <h3 className="text-primary md:text-lg font-bold ml-2 md:ml-3 md:tracking-wider text-nowrap">
            Magic Touch
          </h3>
        </div>
      </Link>

      {/* Theme Switch and Navigation */}
      <div className="flex items-center">
        {/* Theme Switch Button */}
        <button
          className="bg-sky-400 p-1 rounded-full outline-none"
          onClick={handleSwitchTheme}
        >
          <SunMoon
            className={`text-secondary h-7 w-7 cursor-pointer ${
              animate ? "scale-50" : "scale-100"
            } transition-all duration-300`}
          />
        </button>

        {/* Navigation Links */}
        <nav className={`${showNavLinks ? "right-0" : "right-[-3000px]"} text-primary text-opacity-50 flex flex-col lg:flex-row items-start lg:items-center gap-16 lg:gap-0 ${data?.user ? 'top-[9px]' : 'top-[3px]'} lg:top-[0px] bg-background-color/95 lg:bg-background-secondary-color h-[100vh] mt-[56px] pl-20 sm:pl-64 pt-24 lg:py-1 w-[80vw] lg:w-[100%] right-0 lg:mt-0 lg:h-[100%] transition-all duration-300 opacity-95 absolute lg:relative lg:rounded-full lg:justify-center z-10 lg:ml-3 lg:px-0`}>
          {navLinks.map(({ path, label, icon: Icon }, index) => (
            <Link
              key={path}
              href={path}
              className={`${
                isActive(path, pathname)
                  ? "text-primary md:bg-background-color rounded-full font-semibold"
                  : "hover:text-primary"
                } ${
                 index === 0 && data?.user ? 'ml-0' : 'ml-1.5'
                } ${
                 index === navLinks.length - 1 && data?.user ? 'mr-0' : 'mr-1.5'
                } flex items-center tracking-wide gap-5 font-medium transition-all md:p-1 md:px-3 hover:rounded-full hover:bg-background-color duration-300`}
              onClick={() => isMobile && setShowLinks(false)}
            >
              <Icon className="lg:hidden" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User Authentication Section */}
        <AuthMenu />

        {/* Mobile Menu Toggle Button */}
        <button
          role="menu-button"
          onClick={HandleShowAndCloseNavlinks}
          className="ml-1 w-9 h-9 flex items-center justify-center lg:hidden text-white bg-cyan-500 dark:bg-cyan-600 cursor-pointer rounded-full"
        >
          {showNavLinks ? <ChevronRight /> : <EllipsisVertical />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;