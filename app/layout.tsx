import "./globals.css";
import Navbar from "@/components/Navbar";
import TopNotification from "@/components/TopNotification";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import GoogleReviews from "@/components/GoogleReviews";

export const metadata = {
  title: "Sunrise Computer Education",
  description: "MKCL Authorized Learning Center - Sangadi",
  
  verification: {
    other: {
      "facebook-domain-verification": "ax9rpen4ikb8s1375o1ql867wsvjcv",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="main-body">
        <Navbar />
        <TopNotification />

        <main className="main-content">
          {children}
        </main>

        <GoogleReviews />
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}