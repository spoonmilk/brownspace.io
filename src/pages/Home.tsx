import { Navbar } from "@/components/navbar";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import { About } from "@/components/about";

function Home() {
  return (
    <div className="flex flex-col min-h-screen z-30">
      <Navbar />
      <Services/>
      <About/>
      <div className="mt-12">
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
