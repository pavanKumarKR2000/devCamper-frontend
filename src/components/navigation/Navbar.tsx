"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { useGetMe, useLogout } from "@/api/auth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropDownMenu";
import { RiUser3Line, RiSunLine, RiMoonLine } from "@remixicon/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { mutate, isSuccess, isError } = useLogout();
  const { data, isLoading } = useGetMe();
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
      <div className="container mx-auto py-4 flex items-center justify-end gap-4">
        <Button variant="secondary" onClick={handleChangeTheme}>
          {theme === "light" ? (
            <RiSunLine className="h-5 w-5" />
          ) : (
            <RiMoonLine className="h-5 w-5" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" isLoading={isLoading}>
              <RiUser3Line className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>User name</DropdownMenuLabel>
            <DropdownMenuItem>
              <span className="flex items-center gap-x-2">
                <span>{data?.data?.name}</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>User email</DropdownMenuLabel>
            <DropdownMenuItem>
              <span className="flex items-center gap-x-2">
                <span>{data?.data?.email}</span>
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
        {pathname !== "/createBootcamp" && (
          <Button
            variant="primary"
            onClick={() => router.push("/createBootcamp")}
          >
            Add Bootcamp
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
