import { auth } from "@/auth"; // Import your auth configuration
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { Locale } from "next-intl";

const publicPages = ["/", "/login"];

const handleI18nRouting = createMiddleware(routing);

export default auth((req) => {
  // Create regex to match public pages with locale prefixes
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // If it's a public page, just handle i18n routing
  if (isPublicPage) {
    return handleI18nRouting(req);
  }

  // For protected pages, check if user is authenticated
  if (!req.auth) {
    // User is not authenticated, redirect to login with locale
    const locale = req.nextUrl.pathname.split("/")[1];
    const isValidLocale = routing.locales.includes(locale as Locale);
    const loginPath = isValidLocale ? `/${locale}/login` : `/login`;

    return Response.redirect(new URL(loginPath, req.url));
  }

  // User is authenticated, handle i18n routing
  return handleI18nRouting(req);
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
