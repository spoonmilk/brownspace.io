import { Carousel } from '@/components/ui/carousel';

export const Subgroups = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Explore Subgroups</h1>
      
      {/* ShadCN Carousel (simplified) */}
      <Carousel className="max-w-4xl mx-auto">
        
        {/* Each slide representing a subgroup */}
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <img src="/images/group1.jpg" alt="Group 1" width={200} height={200} className="rounded-full mx-auto" />
            <h2 className="mt-4 text-xl font-semibold">Flight Software</h2>
            <p className="text-gray-600">Collaborative efforts for digital marketing strategies.</p>
          </div>
        </div>
        
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <img src="/images/group2.jpg" alt="Group 2" width={200} height={200} className="rounded-full mx-auto" />
            <h2 className="mt-4 text-xl font-semibold">Ground Software</h2>
            <p className="text-gray-600">Creative minds working on user interfaces and experiences.</p>
          </div>
        </div>
        
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <img src="/images/group3.jpg" alt="Group 3" width={200} height={200} className="rounded-full mx-auto" />
            <h2 className="mt-4 text-xl font-semibold">Structures</h2>
            <p className="text-gray-600">Building the foundation and infrastructure of our app.</p>
          </div>
        </div>
                
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <img src="/images/group3.jpg" alt="Group 3" width={200} height={200} className="rounded-full mx-auto" />
            <h2 className="mt-4 text-xl font-semibold">Avionics</h2>
            <p className="text-gray-600">Building the foundation and infrastructure of our app.</p>
          </div>
        </div>
 
        <div className="flex justify-center items-center bg-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <img src="/images/group3.jpg" alt="Group 3" width={200} height={200} className="rounded-full mx-auto" />
            <h2 className="mt-4 text-xl font-semibold">ADCS</h2>
            <p className="text-gray-600">Building the foundation and infrastructure of our app.</p>
          </div>
        </div>
        {/* More subgroups can be added here in a similar format */}
      </Carousel>

      {/* Optional: More information section */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-700">Interested in joining one of the subgroups? Reach out to us!</p>
      </div>
    </div>
  );
}
