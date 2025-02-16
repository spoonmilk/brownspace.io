import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Projects } from "@/components/projects";

function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen z-30">
      <Navbar />
      <Projects />
      <div className="mt-12">
        <Footer/>
      </div>
    </div>
  );
}

export default ProjectsPage;
