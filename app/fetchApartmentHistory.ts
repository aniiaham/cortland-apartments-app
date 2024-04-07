import { Apartments } from "./fetchApartments";

interface ApartmentWithHistory extends Apartments {
  History?: {
    Id: string;
    Number: number;
    Price: number;
    Date: Date;
    Location: string;
  }[];
}

const fetchApartmentHistory = async ({
  apt_number,
}: {
  apt_number: number;
}) => {
  console.log(apt_number);
  const res = await fetch(`http://localhost:6969/apartments/${apt_number}`);
  const response = (await res.json()) as { apartment: ApartmentWithHistory };
  if (!response.apartment?.History) return null;
  return response.apartment.History;
};

export default fetchApartmentHistory;
