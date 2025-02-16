import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Sponsors } from "@/components/sponsors";
function SponsorsPage() {
  return (
    <div className="flex flex-col min-h-screen z-30">
      <Navbar />
      <Sponsors />
      <div className="mt-12">
        <Footer/>
      </div>
    </div>
  );
}

export default SponsorsPage;
