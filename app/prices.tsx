import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import fetchApartmentHistory from "./fetchApartmentHistory";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo({ apt_number }: { apt_number: number }) {
  const { data, isLoading } = useQuery({
    queryKey: ["history", apt_number],
    queryFn: () => fetchApartmentHistory({ apt_number }),
  });
  console.log(data);

  if (!data) {
    return <div>No data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  return (
    <Table>
      <TableCaption>A list of price changes</TableCaption>
      <TableHeader>
        <TableRow className="text-blue-900 text-base font-medium font-sans">
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.Id}>
            <TableCell className="font-normal text-blue-900 text-sm font-sans">
              {new Date(item.Date).toLocaleDateString("en-US")}
            </TableCell>
            <TableCell className="text-blue-900 text-sm font-normal font-sans">
              {item.Location}
            </TableCell>
            <TableCell className="text-right text-blue-900 text-sm font-normal font-sans">
              ${item.Price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
