import Image from "next/image";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchApartments } from "./fetchApartments";
import ApartmentsList from "./apartments";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["apartments"],
    queryFn: fetchApartments,
  });

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-between bg-white w-full">
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
              and balconies, our brand-new studio, one, and two-bedroom
              apartments for rent in West Nashville brighten your everyday –
              from the moment you wake up to the minute you come home.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-lg text-blue-900">Available Apts</p>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ApartmentsList />
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
}
