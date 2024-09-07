"use client";

import { formatDateTime } from "@/helpers/functions/formateDate";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Root } from "@/helpers/types";
import { convertKelvin } from "@/helpers/functions/convertTemperature";
import { useState } from "react";
import Link from "next/link";

import {
   CloudAngledRainIcon,
   CloudAngledZapIcon,
   CloudIcon,
   Moon02Icon,
   MoonCloudAngledRainIcon,
   MoonCloudIcon,
   SnowIcon,
   Sun03Icon,
   SunCloud02Icon,
   SunCloudAngledRain02Icon,
} from "@/components/icon";
const handleClick = () => {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
   } else {
      alert("Geolocation is not supported by this browser.");
   }

   function success(position: GeolocationPosition): void {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const newUrl = `/${latitude}-${longitude}`;
      window.location.href = newUrl;
   }

   function error(): void {
      alert("Unable to retrieve your location.");
   }
};

export function Time() {
   return <div className="text-lg text-white/80">{formatDateTime()}</div>;
}
export function GetCurrentWeather() {
   // Your function implementation here
   return (
      <button
         onClick={handleClick}
         className="underline text-white/90 hover:text-white transition-colors pt-6 text-sm"
      >
         Use Current Location
      </button>
   );
}

const icons: Record<string, React.ReactElement> = {
   "01d": <Sun03Icon className="size-20 text-white" />,
   "01n": <Moon02Icon className="size-20 text-white" />,
   "02d": <SunCloud02Icon className="size-20 text-white" />,
   "02n": <MoonCloudIcon className="size-20 text-white" />,
   "03d": <CloudIcon className="size-20 text-white" />,
   "03n": <CloudIcon className="size-20 text-white" />,
   "04d": <CloudIcon className="size-20 text-white" />,
   "04n": <CloudIcon className="size-20 text-white" />,
   "09d": <CloudAngledRainIcon className="size-20 text-white" />,
   "09n": <CloudAngledRainIcon className="size-20 text-white" />,
   "10d": <SunCloudAngledRain02Icon className="size-20 text-white" />,
   "10n": <MoonCloudAngledRainIcon className="size-20 text-white" />,
   "11d": <CloudAngledZapIcon className="size-20 text-white" />,
   "11n": <CloudAngledZapIcon className="size-20 text-white" />,
   "13d": <SnowIcon className="size-20 text-white" />,
   "13n": <SnowIcon className="size-20 text-white" />,
   "50d": <SnowIcon className="size-20 text-white" />,
   "50n": <SnowIcon className="size-20 text-white" />,
};
export function Temperature({ weather }: { weather: Root }) {
   const [scale, setScale] = useState("celsius");
   // Your function implementation here
   const temperature = convertKelvin(weather?.main.temp)[
      scale as "celsius" | "fahrenheit"
   ];
   const temperatureMax = convertKelvin(weather?.main.temp_max)[
      scale as "celsius" | "fahrenheit"
   ];
   const temperatureMin = convertKelvin(weather?.main.temp_min)[
      scale as "celsius" | "fahrenheit"
   ];
   const feelsLike = convertKelvin(weather?.main.feels_like)[
      scale as "celsius" | "fahrenheit"
   ];
   const handleChange = (value: string) => {
      // "@ts-expect-error
      setScale(value);
   };
   return (
      <>
         <div className="mb-14 flex items-start pt-7 sm:pt-0 sm:flex-row sm:justify-between flex-col gap-5">
            <div>
               <div className="text-4xl tracking-wide mb-2 text-white">
                  {weather?.name}
               </div>
               <Time />
               <Link
                  href={"/"}
                  className="underline text-white/90 hover:text-white transition-colors pt-6 text-sm mr-3"
               >
                  Change City
               </Link>
               <GetCurrentWeather />
            </div>
            <Tabs onValueChange={handleChange} defaultValue={scale}>
               <TabsList className="bg-transparent shadow-none text-white">
                  <TabsTrigger value="celsius" className="w-9 h-9 rounded-lg">
                     &deg;C
                  </TabsTrigger>
                  <TabsTrigger
                     value="fahrenheit"
                     className="w-9 h-9 rounded-lg"
                  >
                     &deg;F
                  </TabsTrigger>
               </TabsList>
            </Tabs>
         </div>

         <div className="flex items-center justify-between">
            <div>
               {/*"@ts-expect-error */}
               {icons[weather?.weather[0].icon]}
               <div>
                  <div className="text-2xl text-white capitalize mt-2">
                     {weather?.weather[0].description}
                  </div>
               </div>
            </div>
            <div>
               <div className="text-5xl font-semibold text-white">
                  {temperature}
                  &deg;
               </div>
               <div className="text-2xl mt-3 font-normal text-white/90">
                  {temperatureMax}
                  &deg;/
                  {temperatureMin}
                  &deg;
               </div>
               <div className="text-lg mt-3 text-white/90">
                  Feels like <span className="font-semibold">{feelsLike}</span>
                  &deg;
               </div>
            </div>
         </div>
      </>
   );
}
