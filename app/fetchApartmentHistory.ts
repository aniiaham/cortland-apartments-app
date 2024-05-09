import { Apartments } from "./fetchApartments";

interface ApartmentWithHistory extends Apartments {
  History?: {
    Id: string;
    Number: number;
    Price: number;
    Date: number;
    Location: string;
  }[];
}

export const fetchApartmentHistory = async ({
  apt_number,
}: {
  apt_number: number;
}) => {
  const res = await fetch(`http://localhost:6969/apartments/${apt_number}`);
  const response = (await res.json()) as { apartment: ApartmentWithHistory };
  return response.apartment.History;
};

export default fetchApartmentHistory;
