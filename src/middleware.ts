import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
 

  const protectedRoutes = [ "/home"];
  const authRoutes=["/auth/login", "/auth/register"]

  const authToken = req.cookies.get("token")?.value;

  if (protectedRoutes.includes(pathname)) {
    if (!authToken&&authToken!=="none") {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  else if(authRoutes.includes(pathname)){
    if (authToken&&authToken!=="none") {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/home";
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/home"],
};
