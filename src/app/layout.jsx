import NavBar from "./components/UI/NavBar";
import { UserProvider } from "./components/contexts/userContext";
import "./globals.css";
import TanstackProvider from "./TanstackProvider";
import { Toaster } from "react-hot-toast";
import Footer from "./components/UI/Footer";

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
          <UserProvider>
            <Toaster />
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </UserProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
