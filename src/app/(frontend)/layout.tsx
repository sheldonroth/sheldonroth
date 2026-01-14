import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
