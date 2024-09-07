import {
   Table,
   TableBody,
   TableHeader,
   TableRow,
   TableHead,
} from "@/components/ui/table";
import Loader from "@/components/loader";
import dynamic from "next/dynamic";

// Client Components:
const CitiesTable = dynamic(() => import("@/components/CitiesTable/Table"), {
   ssr: false,
});

export default function Home() {
   return (
      <main className="max-w-5xl w-full mx-auto p-4">
         <h1 className="text-center font-bold text-3xl mb-10 mt-10 text-slate-700">
            Weather App
         </h1>
         <Table className="w-full">
            <TableHeader>
               <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Timezone</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               <CitiesTable />
            </TableBody>
         </Table>
         <div className="mx-auto w-max mt-4">
            <Loader />
         </div>
      </main>
   );
}
