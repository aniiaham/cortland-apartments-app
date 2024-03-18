import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";

type Apartments = {
  Number: number;
  Price: number;
  Floorplan: string;
  Bed_count: 0 | 1 | 2 | 3;
  Bath_count: 0 | 1 | 2 | 3;
  Sqft: number;
  Availability: number;
  Date: Date;
  Location: string;
  State: "TN";
  City: "Nashville";
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white w-full">
      <nav className="w-full mt-2 p-8 flex flex-row justify-between items-center">
        <Image
          src="https://cortland.com/assets/images/01_main_logo-013.svg"
          alt="cortland logo"
          width={200}
          height={50}
        />
        <button className="border border-blue-900 rounded-3xl py-3 px-10 text-blue-900">
          Schedule a Tour
        </button>
      </nav>
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        <div className="flex flex-col justify-center items-center relative">
          <Image
            src="https://cortland.com/assets/images/cache/DSC_21311-d88c24fa0129a6d16ea06023c6608120.jpg"
            alt="cortland bedroom image"
            width={1000}
            height={500}
            className="w-screen h-full "
          />
          <h1 className="text-[#FFFFFF] font-normal font-serif text-[55px] absolute bottom-4">
            Floor Plans
          </h1>
        </div>
        <div className="flex flex-col justify-start items-center max-w-4xl gap-4">
          <h2 className="text-blue-900 font-serif font-normal text-[33.6px]">
            Find Your Perfect Fit at Our Nashville, Tennessee Apartment Homes
          </h2>
          <p className="text-blue-900 font-serif font-normal text-xl">
            With designer features like granite countertops and private patios
            and balconies, our brand-new studio, one, and two-bedroom apartments
            for rent in West Nashville brighten your everyday – from the moment
            you wake up to the minute you come home.
          </p>
        </div>
      </div>
      <div>
        <p className="text-lg text-blue-900">Available Apts</p>
        <Suspense fallback={<Loading />}>
          <ApartmentsList />
        </Suspense>
      </div>
    </main>
  );
}

const fetchApartments = async () => {
  const res = await fetch("http://localhost:6969/apartments");
  const response = (await res.json()) as { apartments: Apartments[] };
  return response;
};

async function ApartmentsList() {
  const { apartments } = await fetchApartments();
  if (!apartments) return;

  return (
    <div className="grid grid-cols-3 gap-20">
      {apartments.map((apt) => (
        <div
          className="border border-blue-950 rounded-md w-full"
          key={apt.Number}
        >
          <p>{apt.Floorplan}</p>
          <div className="flex flex-row gap-2">
            <p>{apt.Sqft} sq. ft. |</p>
            <p>{apt.Bed_count === 0 ? "Studio" : `${apt.Bed_count} Bed`} |</p>
            <p>{apt.Bath_count} Bath</p>
          </div>
          <div>
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_StudioCentennial-S12-6b6e8ad01943e96acd89df93cc5d8a05.jpg"
              alt="studio centennial floor plan img"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col">
            <p>Starting at ${apt.Price}</p>
            <p>
              Available starting{" "}
              {new Date(apt.Availability * 1000).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
