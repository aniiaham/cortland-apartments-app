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
        <div className="flex flex-col justify-start items-center max-w-3xl gap-4">
          <h2 className="text-blue-900 font-serif font-extralight text-[33.6px]">
            Find Your Perfect Fit at Our Nashville, Tennessee Apartment Homes
          </h2>
          <p className="text-blue-900 font-serif font-extralight text-[16.8px]">
            With designer features like granite countertops and private patios
            and balconies, our brand-new studio, one, and two-bedroom apartments
            for rent in West Nashville brighten your everyday – from the moment
            you wake up to the minute you come home.
          </p>
        </div>
      </div>
      <div className="mt-8">
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
    <div className="grid grid-cols-2 gap-20 w-full my-8">
      {apartments.map((apt) => (
        <div
          className="border border-gray-300 rounded-md py-8 px-6"
          key={apt.Number}
        >
          <p className="text-lg text-blue-900 font-medium font-sans">
            {apt.Floorplan}
          </p>
          <div className="flex flex-row gap-2 text-xs text-blue-900 font-light">
            <p>{apt.Sqft} sq. ft. |</p>
            <p>{apt.Bed_count === 0 ? "Studio" : `${apt.Bed_count} Bed`} |</p>
            <p>{apt.Bath_count} Bath</p>
          </div>
          <div>
            {apt.Floorplan === "Centennial" ? (
              <Image
                src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_StudioCentennial-S12-6b6e8ad01943e96acd89df93cc5d8a05.jpg"
                alt="studio centennial floor plan img"
                width={400}
                height={500}
              />
            ) : apt.Floorplan === "Clifton" ? (
              <Image
                src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1Clifton-S33-e637740fc82fbe6d829dc0d5d9a4d8b6.jpg"
                alt="studio centennial floor plan img"
                width={400}
                height={500}
              />
            ) : apt.Floorplan === "Cumberland" ? (
              <Image
                src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1Cumberland-A12-5802b719708e1605b6731731834922b7.jpg"
                alt="studio centennial floor plan img"
                width={400}
                height={500}
              />
            ) : apt.Floorplan === "Germantown" ? (
              <Image
                src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1-Germantown-A32-953be8326aca3dcbde2ee210b067ee05.jpg"
                alt="studio centennial floor plan img"
                width={400}
                height={500}
              />
            ) : apt.Floorplan === "The Gulch" ? (
              <Image
                src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_The-Gulch-A42-ed3db82e9f56231d124c76215e8548a4.jpg"
                alt="studio centennial floor plan img"
                width={400}
                height={500}
              />
            ) : apt.Floorplan === "Music Row" ? (
              <Image
                src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_2x2Music-Row-B12-bf6f3c1a0d84556095b3e8eeb576fe33.jpg"
                alt="studio centennial floor plan img"
                width={400}
                height={500}
              />
            ) : apt.Floorplan === "Urbandale" ? (
              <Image
                src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_2x2Urbandale-B33-0b757bedc8c4abacf0a9caba232a799f.jpg"
                alt="studio centennial floor plan img"
                width={400}
                height={500}
              />
            ) : (
              "Error"
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-blue-900 font-medium font-sans">
              Starting at ${apt.Price}
            </p>
            <p className="text-xs text-blue-900">
              Available starting{" "}
              {new Date(apt.Availability * 1000).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
