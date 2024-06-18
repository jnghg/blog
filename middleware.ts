import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const pathName = req.nextUrl.pathname || "";
    const isLoginPath = pathName === "/login";
    const protectedPages = ["/management", "/signup"];

    // token이 존재하면 main 페이지로
    if (isLoginPath && req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!req.nextauth.token && protectedPages.includes(pathName)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      // authorized: ({ token }) => token?.role === "admin",
      authorized: ({ token }) => {
        return true;
      },
    },
  }
);

export const config = { matcher: ["/signup", "/login", "/management"] };
