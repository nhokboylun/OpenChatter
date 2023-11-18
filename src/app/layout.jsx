import NavBar from "./components/UI/NavBar";
import { UserProvider } from "./components/contexts/userContext";
import "./globals.css";
import TanstackProvider from "./TanstackProvider";
import { Toaster } from "react-hot-toast";
import Footer from "./components/UI/Footer";
import ThemeContext from "./components/contexts/themeContext";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata = {
  title: { default: "OpenChatter", template: `%s | OpenChatter` },
  description:
    "OpenChatter provide you a anonymous forum where you can post, comment, share anything without being identified.",
  alternates: {
    canonical: "https://openchatter.netlify.app/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-gray-100 min-h-screen">
        <TanstackProvider>
          <ThemeContext>
            <UserProvider>
              <Toaster />

              <Link href="/Message">
                <ChatBubbleLeftRightIcon className="w-16 h-16 fixed right-4 z-50 bottom-4 hover:bg-gray-500 rounded-full p-2 duration-300 transition" />
              </Link>

              <NavBar />

              <main className="flex-grow dark:bg-gray-900">{children}</main>

              <Footer />
            </UserProvider>
          </ThemeContext>
        </TanstackProvider>
      </body>
    </html>
  );
}
