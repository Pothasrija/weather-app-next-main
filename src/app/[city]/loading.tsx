import Loader from "@/components/loader";

export default function Loading() {
   return (
      <>
         <div className="h-[100dvh] flex items-center justify-center">
            <Loader />
         </div>
         {/* Your component content here */}
      </>
   );
}
