// import { Button } from "@/components/ui/Button"

const Layout = ({children}: {children: React.ReactNode}) => {
return (
  <div className="sm:container max-w-7xl mx-auto h-full pt-12">
    <div>
        {/* <Button>Back</Button> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        <div className="flex flex-col col-span-2 space-y-6">{children}</div>

        {/* Info sidebar */}
        <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            
        </div>
      </div>
    </div>
  </div>
  )
}

export default Layout