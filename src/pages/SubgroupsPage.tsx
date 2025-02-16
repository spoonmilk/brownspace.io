import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Subgroups } from "@/components/subgroups";

function SubgroupsPage() {
  return (
    <div className="flex flex-col min-h-screen z-30">
      <Navbar />
      <Subgroups />
      <div className="mt-12">
        <Footer/>
      </div>
    </div>
  );
}

export default SubgroupsPage;
