import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { LenisProvider } from "./lenis-provider";
import NextTopLoader from "nextjs-toploader";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps): React.JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextTopLoader color="red" />
      <LenisProvider />
      <Toaster richColors position="top-right" closeButton />
      {children}
    </ThemeProvider>
  );
}
