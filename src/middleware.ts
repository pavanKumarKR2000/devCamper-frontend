import { NextRequest, NextResponse } from "next/server";
import { getMe } from "./api/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/home"];
  const publisherProtectedRoutes = ["/createBootcamp"];
  const authRoutes = ["/auth/login", "/auth/register"];

  const authToken = req.cookies.get("token")?.value;
  let user;

  try {
    user = await getMe(authToken);
    user = user?.data;
  } catch (err) {}

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (
    publisherProtectedRoutes.includes(pathname) &&
    user.role !== "publisher" &&
    user.role !== "admin"
  ) {
    console.log("user", user);
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (protectedRoutes.includes(pathname)) {
    if (!user) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      return NextResponse.redirect(loginUrl);
    }
  } else if (authRoutes.includes(pathname)) {
    if (user) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/home";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/home", "/", "/createBootcamp"],
};
