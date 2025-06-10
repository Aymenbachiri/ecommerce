import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { LenisProvider } from "./lenis-provider";
import NextTopLoader from "nextjs-toploader";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
  children: React.ReactNode;
};

export async function Providers({
  children,
}: ProvidersProps): Promise<React.JSX.Element> {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextTopLoader color="red" />
        <LenisProvider />
        <Toaster richColors position="top-right" closeButton />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
