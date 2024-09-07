import { FastWindIcon, HumidityIcon } from "@/components/icon";
import { Root } from "@/helpers/types";
import { redirect } from "next/navigation";
import { Temperature } from "@/components/Weather/ClientComponents";

async function getWeather(latitude: string, longitude: string) {
   try {
      const response = await fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process
            .env.WEATHER_API_KEY!}`
      );
      if (!response.ok) {
         return null;
      }
      const data = (await response.json()) as Root;
      return data;
   } catch (err) {
      return null;
   }
}

export default async function WeatherPage({
   params,
}: {
   params: { city: string };
}) {
   const { city } = params;
   const [latitude, longitude] = city?.split("-") || [];
   if (!latitude || !longitude) {
      redirect("/");
   }
   const weather = await getWeather(latitude, longitude);
   if (!weather) redirect("/");
   return (
      <>
         <main className="max-w-3xl sm:px-4 mx-auto">
            <div className="w-full shadow h-[100dvh] sm:h-max p-4 sm:p-14 sm:rounded-[2rem] sm:mt-10 bg-gradient-to-tr from-violet-500 to-purple-500">
               <Temperature weather={weather} />
               <div className="grid grid-cols-2 mt-16">
                  <div className="flex items-center gap-2 mx-auto">
                     <HumidityIcon className="size-8 text-white/90" />
                     <div className="text-2xl font-semibold text-white">
                        {weather?.main.humidity}%
                        <div className="text-sm font-normal text-white/70">
                           Humidity
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 mx-auto">
                     <FastWindIcon className="size-8 text-white/90" />
                     <div className="text-2xl font-semibold text-white">
                        {weather?.wind.speed}{" "}
                        <span className="text-sm">kph</span>
                        <div className="text-sm font-normal text-white/70">
                           Wind Speed
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </>
   );
}
