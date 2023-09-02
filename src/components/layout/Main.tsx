"use client"

import useDeviceSize from "@/hooks/use-device-size";
import Aside from "./Aside";

interface MainProps {
children: React.ReactNode;
}

const Main = ({children}: MainProps) => {
  const [width, height] = useDeviceSize();
  const isMobile = width <= 767;

  return (
          <main className="container max-w-5xl mx-auto h-full py-8">

          { !isMobile ? (
           <div className="hidden md:grid grid-cols-3 gap-y-4 gap-x-4">
            <div className="col-span-1 h-full relative">
              {/* @ts-expect-error Server Component */}
              <Aside />
             </div>
             <div className="col-span-2">
             {children}
             </div>
           </div>
           ) : (
           <div className="md:hidden gap-y-4">
            {children}
          </div>         
          ) 
        }
               
     </main>
  )
}

export default Main;