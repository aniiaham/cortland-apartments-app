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

const fetchApartments = async () => {
  const res = await fetch("http://localhost:6969/apartments");
  const response = (await res.json()) as { apartments: Apartments[] };
  return response;
};

export default fetchApartments;
