import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatSlot from "@/components/ChatSlot";
import { org, mission } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-opensans",
  display: "swap",
});

export const metadata = {
  title: {
    default: `${org.name} — ${org.tagline}`,
    template: `%s · ${org.name}`,
  },
  description: mission.slice(0, 155),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${openSans.variable}`}>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ChatSlot />
      </body>
    </html>
  );
}
