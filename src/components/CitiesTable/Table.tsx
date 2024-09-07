"use client";
import { TableRow } from "../ui/table";
import { TableCell } from "../ui/table";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Cities, Result } from "@/helpers/types";

import { useRef } from "react";

export default function CitiesTable() {
   const [citiesData, setCitiesData] = useState<Result[] | null>(null);
   const [fetching, setFetching] = useState(false);
   const [isLoadingMore, setIsLoadingMore] = useState(false); // Track ongoing loading
   const offsetRef = useRef(0); // Store offset using useRef for memoization

   useEffect(() => {
      async function fetchData(offset: number) {
         if (fetching || isLoadingMore) return; // Prevent duplicate fetches

         try {
            setIsLoadingMore(true); // Indicate loading more data

            const response = await fetch(
               `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=cou_name_en%2Cascii_name&limit=30&offset=${offset}`
            );

            if (!response.ok) {
               throw new Error(
                  `Network response was not ok (status ${response.status})`
               );
            }

            const data = (await response.json()) as Cities;
            setCitiesData((prevCities) =>
               prevCities ? [...prevCities, ...data.results] : data.results
            );
         } catch (error) {
            console.error("Error fetching data:", error);
         } finally {
            setFetching(false);
            setIsLoadingMore(false); // Reset loading state on success or error
         }
      }

      if (!fetching && !citiesData) {
         // Fetch initial data only if not already fetched
         fetchData(offsetRef.current);
      }

      const handleScroll = () => {
         if (
            window.innerHeight + document.documentElement.scrollTop !==
               document.documentElement.offsetHeight ||
            isLoadingMore
            // Prevent triggering fetch while loading more
         ) {
            return;
         }

         offsetRef.current += 30; // Update offset using useRef
         fetchData(offsetRef.current);
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
   }, [fetching, isLoadingMore, citiesData]); // Only re-run on state changes

   return (
      <>
         {/* <AutoSizer>
            {({ width, height }: { width: number; height: number }) => (
               <List
                  width={width}
                  height={height}
                  rowHeight={cache.current.rowHeight}
                  deferredMeasurementCache={cache.current}
                  rowCount={citiesData ? citiesData.length : 0}
                  // @ts-ignore
                  rowRenderer={({ key, index, style, parent }) => {
                     if (!citiesData) return "";
                     const data = citiesData[index];

                     return (
                        <CellMeasurer
                           key={key}
                           cache={cache.current}
                           parent={parent}
                           columnIndex={0}
                           rowIndex={index}
                        >
                           <TableRow style={style} key={data.geoname_id}>
                              <TableCell className="font-medium">
                                 <Link
                                    href={
                                       "/" +
                                       data.coordinates.lat +
                                       "-" +
                                       data.coordinates.lon
                                    }
                                 >
                                    {data.ascii_name}
                                 </Link>
                              </TableCell>

                              <TableCell>{data.cou_name_en}</TableCell>
                              <TableCell>{data.timezone}</TableCell>
                           </TableRow>
                        </CellMeasurer>
                     );
                  }}
               />
            )}
         </AutoSizer> */}
         {citiesData?.map((data) => (
            <TableRow key={data.geoname_id} className="py-10">
               <TableCell className="font-medium py-3 text-md">
                  <Link
                     href={
                        "/" + data.coordinates.lat + "-" + data.coordinates.lon
                     }
                  >
                     {data.ascii_name}
                  </Link>
               </TableCell>

               <TableCell>{data.cou_name_en}</TableCell>
               <TableCell>{data.timezone}</TableCell>
            </TableRow>
         ))}

         {/* {fetching ? (
            <div className="mx-auto w-max mt-4">
               <Loader />
            </div>
         ) : (
            ""
         )} */}
      </>
   );
}
