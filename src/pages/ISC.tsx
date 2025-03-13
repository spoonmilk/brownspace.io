import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ISC from "@/components/space-conference";

const ISCPage = () => {
    return (
        <div className="flex flex-col min-h-screen z-30">
            <Navbar />
            <ISC />
            <div className="mt-12">
                <Footer/>
            </div>
        </div>
    )
}

export default ISCPage;