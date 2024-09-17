import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "./context/CartContext";
const inter = Roboto({ subsets: ["latin"], weight: ["500", "700", "900"] });

export const metadata = {
  title: "Ecommerce",
  description: "",
};

export default function RootLayout({ children }) {

  return (
<ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}