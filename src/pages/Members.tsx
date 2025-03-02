import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Team } from "@/components/team";

function Members() {
  return (
    <div className="flex flex-col min-h-screen z-30">
      <Navbar />
      <section id="team" className="container py-24 mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Our Team
        </h2>
        <Team subgroup="Club Presidents" />
        <Team subgroup="ADCS" />
        <Team subgroup="Avionics" />
        <Team subgroup="Flight Software" />
        <Team subgroup="Ground Software" />
        <Team subgroup="Operations" />
        <Team subgroup="R&D" />
        <Team subgroup="Structures" />
        
        
      </section>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}

export default Members;
