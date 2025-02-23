export const Subgroups = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Explore Subgroups</h1>
        <Subgroup subgroupName='ADCS' description='Attitude Determination & Control Systems (ADCS) is responsible for identifying and maintaining the proper orientation of PVDX as it orbits in space, by collecting data from onboard sensors such as magnetometers and combining them with knowledge of previous states.'/>
        <Subgroup subgroupName='Avionics' description="Avionics is responsible for all the electronic hardware aboard the CubeSat. This involves developing all aspects of the satellite's power system, from the solar panels, and batteries, all the way to distribution and sensing."/>
        <Subgroup subgroupName='Flight Software' description='Tasked with hardware-software integration, merging PVDX’s complex array of sensors and actuators into a central operating system that manages the transfer of information between the satellite and the ground station.'/>
        <Subgroup subgroupName='Ground Software' description='Tasked with producing a web-app to allow student interaction with PVDX, managing our own website, and building a ground station to communicate with PVDx once in orbit.'/>
        <Subgroup subgroupName='Operations' description='Handles fundraising, sponsorships, orders, and events for the organization.'/>
        <Subgroup subgroupName='R&D' description="Focuses on unique, space-related research projects outside the scope of BSE's bigger projects. Last year, R&D competed in the Plant the Moon Challenge, experimenting with cacti growth in lunar highlight and mare simulant, and winning the award for Best Analysis of Data."/>
        <Subgroup subgroupName='Structures' description='Designs, manufactures and tests a majority of the components of the physical satellite. There are many independent projects operating within the structures subgroup: chassis, arm mechanism, internal structures, external structures and testing.'/>
        
      {/* Optional: More information section */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-700">Interested in joining one of the subgroups? Reach out to us!</p>
      </div>
    </div>
  );
}

const Subgroup = ({ subgroupName, description }: {subgroupName: string, description: string}) => {
  return (
    <div className="flex justify-center items-center bg-gray-600 p-4 rounded-lg shadow-lg mb-8" style={{marginLeft: "20%", marginRight: "20%"}}>
      <div className="text-center">
        <img src="/images/group3.jpg" alt="Group 3" width={200} height={200} className="rounded-full mx-auto" />
        <h2 className="mt-4 text-xl font-semibold text-white pb-2">{subgroupName}</h2>
        <p className="text-white">{description}</p>
      </div>
    </div>)
}