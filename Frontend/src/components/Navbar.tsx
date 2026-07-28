import { MessagesSquare, Search } from "lucide-react"
import { Input } from "./ui/input"

const Navbar = () => {

  return (
  <div className="sticky top-0 w-full z-50 bg-background border-b">
    <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">

        <div className="text-2xl font-bold flex items-center gap-2">
          <MessagesSquare className="w-4 h-4 size-6" />
            SocialApp
        </div>
        <div className="relative w-72">
            <Search className=" absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground"/>
            <Input className="pl-10" placeholder="Search..."/>
        </div>
        <div>
            Right Side
        </div>
    </div>
  </div>
  );
};

export default Navbar
