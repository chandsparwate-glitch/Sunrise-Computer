import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sunrise Computer Education",
  description: "MKCL Authorized Learning Center - Sangadi",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#ffffff",
        }}
      >
        <Navbar />

        <main
          style={{
            minHeight: "80vh",
          }}
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
