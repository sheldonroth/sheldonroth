import Navigation from "@/components/Navigation";
import { collections } from "@/content/catalog";
import Footer from "@/components/Footer";
import SeenMarker from "@/components/experience/SeenMarker";
import { CartProvider } from "@/context/CartContext";
import { JsonLd, personOrganizationGraph } from "@/lib/schema";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <SeenMarker />
      <JsonLd data={personOrganizationGraph()} />
      <Navigation galleries={collections.map((c) => ({ slug: c.slug, title: c.title }))} />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
