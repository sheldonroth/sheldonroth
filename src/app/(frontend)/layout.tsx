import Navigation from "@/components/Navigation";
import { collections } from "@/content/catalog";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navigation galleries={collections.map((c) => ({ slug: c.slug, title: c.title }))} />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
