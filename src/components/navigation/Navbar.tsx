"use client";
import React, {useEffect, useState} from "react";
import {Button} from "../ui/Button";
import {useGetMe, useLogout} from "@/api/auth";
import {usePathname, useRouter} from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropDownMenu";
import {RiAddFill, RiMoonLine, RiSunLine, RiTerminalBoxFill, RiUser3Line,} from "@remixicon/react";
import Link from "next/link";

const Navbar = () => {
  const { mutate, isSuccess, isError } = useLogout();
  const { data, isLoading } = useGetMe();
  const userData = data?.data;
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const router = useRouter();
  const auth_routes = ["/auth/register", "/auth/login"];
  const pathname = usePathname();
  
  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace("/auth/login");
    }
    if (isError) {
      //todo
    }
  }, [isSuccess, isError]);

  const handleClick = () => {
    mutate();
  };

  if (auth_routes.includes(pathname)) {
    return null;
  }

  return (
    <nav className="border-b border-gray-300 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-950 z-[100]">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <Link href="/home">
          <div className="flex items-center gap-1 dark:text-white">
            <h2 className="font-bold">DevCamper</h2>
            <RiTerminalBoxFill className="h-6 w-6" />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={handleChangeTheme}>
            {theme === "light" ? (
              <RiSunLine className="h-5 w-5" />
            ) : (
              <RiMoonLine className="h-5 w-5" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" isLoading={isLoading} className="flex items-center gap-2">
                {userData?.name?.length>=15?`${userData?.name?.substring(0,15)}...`:userData?.name}
                <RiUser3Line className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[1000]">
              <DropdownMenuLabel>User name</DropdownMenuLabel>
              <DropdownMenuItem>
                <span className="flex items-center gap-x-2">
                  <span>{userData?.name}</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>User email</DropdownMenuLabel>
              <DropdownMenuItem>
                <span className="flex items-center gap-x-2">
                  <span>{userData?.email}</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Role</DropdownMenuLabel>
              <DropdownMenuItem>
                <span className="flex items-center gap-x-2">
                  <span>{userData?.role}</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={handleClick} className="w-full">
                  logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {pathname !== "/createBootcamp" &&
            (userData?.role === "publisher" || userData?.role === "admin") && (
              <Button
                variant="primary"
                onClick={() => router.push("/addBootcamp")}
                className="flex items-center gap-2"
              >
                <RiAddFill className="h-5 w-5" />
                Add Bootcamp
              </Button>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
