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
import Charts from "@/components/Charts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

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
    return (
      <div className="flex flex-row justify-center mx-14 h-96 ">
        <div className="flex flex-col space-y-3 mt-8">
          <div>
            <Skeleton className="h-14 w-[800px] rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-[800px]" />
            <Skeleton className="h-6 w-[800px]" />
          </div>
          <div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-[800px]" />
              <Skeleton className="h-6 w-[800px]" />
              <Skeleton className="h-6 w-[800px]" />
              <Skeleton className="h-6 w-[800px]" />
              <Skeleton className="h-6 w-[800px]" />
              <Skeleton className="h-6 w-[800px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <ScrollArea className="h-80 w-full rounded-md border">
          <Table>
            <TableCaption>A list of price changes</TableCaption>
            <TableHeader>
              <TableRow className="text-blue-900 text-base font-medium font-sans">
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.Id}
                  className=" text-blue-900 text-sm font-normal font-sans"
                >
                  <TableCell>
                    {new Date(item.Date).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>{item.Location}</TableCell>
                  <TableCell>{item.Number}</TableCell>
                  <TableCell>${item.Price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
