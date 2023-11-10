"use client";
import { ThemeProvider } from "next-themes";

export default function ThemeContext({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
