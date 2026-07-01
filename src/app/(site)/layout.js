import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import MobileContactBar from "@/components/ui/MobileContactBar";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <MobileContactBar />
    </>
  );
}
