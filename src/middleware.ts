import { auth } from "@/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { Locale } from "next-intl";

const publicPages = ["/", "/signin", "/signup"];

const handleI18nRouting = createMiddleware(routing);

export default auth((req) => {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return handleI18nRouting(req);
  }

  if (!req.auth) {
    const locale = req.nextUrl.pathname.split("/")[1];
    const isValidLocale = routing.locales.includes(locale as Locale);
    const loginPath = isValidLocale ? `/${locale}/signin` : `/signin`;

    return Response.redirect(new URL(loginPath, req.url));
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
