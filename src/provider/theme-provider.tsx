import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useMemo } from "react";
import { ThemeProvider as ContextProvider } from "../context/theme-context";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get the theme and set the theme
  const { theme, setTheme } = useTheme();

  // Set the theme to light mode by default
  useMemo(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <HeroUIProvider>
      <ToastProvider placement="bottom-right" />
      <ContextProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme={theme}
        >
          {children}
        </NextThemesProvider>
      </ContextProvider>
    </HeroUIProvider>
  );
}
