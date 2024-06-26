"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchApartments } from "./fetchApartments";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import fetchApartmentHistory from "./fetchApartmentHistory";
import Image from "next/image";
import { TableDemo } from "./prices";
import { Skeleton } from "@/components/ui/skeleton";
import Charts from "@/components/Charts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

export default function ApartmentsList() {
  const { data } = useQuery({
    queryKey: ["apartments"],
    queryFn: fetchApartments,
  });

  if (!data) return;

  const [selectedApartments, setSelectedApartments] = useState("all");

  const filterApartments =
    selectedApartments === "all"
      ? data.apartments
      : data.apartments.filter(
          (apartment) => apartment.Bed_count === Number(selectedApartments)
        );

  return (
    <section>
      <div className="flex flex-row justify-between">
        <p className="text-lg text-blue-900">Available Apts</p>

        <Select
          onValueChange={setSelectedApartments}
          defaultValue={selectedApartments}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0">Studio</SelectItem>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedroom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-20 w-full my-8 h-full">
        {filterApartments.map((apt) => (
          <DialogApartment
            key={apt.Number}
            apt_number={apt.Number}
            apt_floorplan={apt.Floorplan}
            apt_sqft={apt.Sqft}
            apt_bed_count={apt.Bed_count}
            apt_bath_count={apt.Bath_count}
            apt_price={apt.Price}
            apt_availability={apt.Availability}
          >
            <div
              className="border border-gray-300 rounded-md py-8 px-6 hover:border-gray-500 shadow-md hover:cursor-pointer flex flex-col gap-12"
              key={apt.Number}
            >
              <div>
                <p className="text-lg text-blue-900 font-medium font-sans">
                  {apt.Floorplan}
                </p>
                <p className="text-base text-blue-900 font-medium font-sans">
                  Apt #{apt.Number}
                </p>
                <div className="flex flex-row gap-2 text-xs text-blue-900 font-light">
                  <p>{apt.Sqft} sq. ft. |</p>
                  <p>
                    {apt.Bed_count === 0 ? "Studio" : `${apt.Bed_count} Bed`} |
                  </p>
                  <p>{apt.Bath_count} Bath</p>
                </div>
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
                ) : apt.Floorplan === "Elizabeth" ? (
                  <Image
                    src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1Elizabeth-A24-6a6754e6c72dcd6fcc7b19c341533e8c.jpg"
                    alt="studio centennial floor plan img"
                    width={400}
                    height={500}
                  />
                ) : (
                  "Error"
                )}
              </div>
              <div className="flex flex-row justify-between text-blue-900">
                <div className="flex flex-col">
                  <p className="text-sm font-medium font-sans">
                    Starting at ${apt.Price}
                  </p>
                  <p className="text-xs">
                    Available starting{" "}
                    {new Date(apt.Availability * 1000).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </DialogApartment>
        ))}
      </div>
    </section>
  );
}

export function TabsApartment({
  children,
  apt_number,
  apt_floorplan,
  apt_sqft,
  apt_bed_count,
  apt_bath_count,
  apt_price,
  apt_availability,
}: {
  children: React.ReactNode;
  apt_number: number;
  apt_floorplan: string;
  apt_sqft: number;
  apt_bed_count: number;
  apt_bath_count: number;
  apt_price: number;
  apt_availability: number;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["history", apt_number],
    queryFn: () => fetchApartmentHistory({ apt_number }),
  });

  if (!data) {
    return <div>No data</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-row justify-between mx-14 h-96">
        <div className="flex flex-col space-y-3 mt-8">
          <div>
            <Skeleton className="h-[40px] w-[140px] rounded-xl ml-6" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-[200px]" />
            </div>
            <div className="mt-6">
              <Skeleton className="h-[130px] w-[200px] rounded-xl" />
            </div>
          </div>
        </div>
        <div className="mt-14">
          <Skeleton className="h-[260px] w-[360px] rounded-xl ml-6" />
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="apartments">
      <TabsList>
        <TabsTrigger value="apartments">Available Apartment</TabsTrigger>
        <TabsTrigger value="price">Price History</TabsTrigger>
        <TabsTrigger value="price-chart">Price Chart</TabsTrigger>
      </TabsList>
      <TabsContent value="apartments" className="flex flex-row gap-12 w-full">
        <div className="flex flex-col gap-12">
          <div className="flex flex-row justify-between items-center ml-14 mt-8">
            <div className="flex flex-col gap-4 justify-center items-center">
              <h2 className="text-blue-900 font-normal font-sans text-3xl">
                Apt #{apt_number}
              </h2>
              <div className="flex flex-row gap-2 text-sm text-blue-900 font-normal">
                <p>
                  {apt_bed_count === 0 ? "Studio" : `${apt_bed_count} Bed`} |
                </p>
                <p>{apt_bath_count} Bath |</p>
                <p>{apt_sqft} sq ft</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-blue-900 font-medium font-sans text-base">
                  Starting at ${apt_price}
                </p>
                <p className="text-xs text-blue-900 font-normal">
                  $565 Deposit
                </p>
                <p className="text-xs text-blue-900 font-normal">
                  Available starting{" "}
                  {new Date(apt_availability * 1000).toLocaleDateString(
                    "en-US"
                  )}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p className="text-blue-900 font-medium font-sans text-base">
                  {apt_floorplan} Floorplan
                </p>
                <a href="/">
                  <button className="text-blue-900 font-normal">
                    View all Available
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-center text-gray-500 text-xs max-w-xs ml-2">
            <p>
              Pricing and availability are current as of 9:11 AM CDT on Mar 28,
              2024 and are subject to change.
            </p>
            <p>
              Dimensions and square footage shown are approximate. Actual
              interior finishes, as well as patios and balconies, may vary by
              apartment home. Pricing and availability are subject to change.
              Deposit amount may vary, as low as $0 with Jetty, depending on
              applicant's credit. Contact leasing office for details.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-center items-center">
          {apt_floorplan === "Centennial" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_StudioCentennial-S12-6b6e8ad01943e96acd89df93cc5d8a05.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Clifton" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1Clifton-S33-e637740fc82fbe6d829dc0d5d9a4d8b6.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Charlotte" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1-Charlotte-S22-e06e7a69dd88a4e2052a4204081ac549.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Cumberland" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1Cumberland-A12-5802b719708e1605b6731731834922b7.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Germantown" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1-Germantown-A32-953be8326aca3dcbde2ee210b067ee05.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Elizabeth" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1Elizabeth-A24-6a6754e6c72dcd6fcc7b19c341533e8c.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Hadley" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_2x1Hadley-A52-818df9e4edced0643497f0ad75f93607.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Hillwood" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1Hillwood-A62-2943ebc31d79c1ba3a9f40143d2373c0.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "The Nations" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_1x1The-Nations-A72-bfdc3e61c2a44830a0f6b80f3dc72385.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "The Gulch" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_The-Gulch-A42-ed3db82e9f56231d124c76215e8548a4.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Music Row" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_2x2Music-Row-B12-bf6f3c1a0d84556095b3e8eeb576fe33.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Urbandale" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_2x2Urbandale-B33-0b757bedc8c4abacf0a9caba232a799f.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : apt_floorplan === "Sylvan" ? (
            <Image
              src="https://cortland.com/assets/images/cache/CortlandAtTheNations_4731CentennialBlvd_3DF_2x2-Slyvan-B22-6a626ff70419f651530ba13303e08408.jpg"
              alt="studio centennial floor plan img"
              width={500}
              height={600}
            />
          ) : (
            "Error"
          )}
        </div>
      </TabsContent>
      <TabsContent value="price">
        <TableDemo apt_number={apt_number} />
      </TabsContent>
      <TabsContent value="price-chart">
        <Charts apt_number={apt_number} />
      </TabsContent>
    </Tabs>
  );
}

export function DialogApartment({
  children,
  apt_number,
  apt_floorplan,
  apt_sqft,
  apt_bed_count,
  apt_bath_count,
  apt_price,
  apt_availability,
}: {
  children: React.ReactNode;
  apt_number: number;
  apt_floorplan: string;
  apt_sqft: number;
  apt_bed_count: number;
  apt_bath_count: number;
  apt_price: number;
  apt_availability: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl flex flex-col justify-center">
        <DialogHeader>
          <TabsApartment
            children
            apt_number={apt_number}
            apt_floorplan={apt_floorplan}
            apt_sqft={apt_sqft}
            apt_bed_count={apt_bed_count}
            apt_bath_count={apt_bath_count}
            apt_price={apt_price}
            apt_availability={apt_availability}
          />
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
