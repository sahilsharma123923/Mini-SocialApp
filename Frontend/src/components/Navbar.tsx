import { Bell, Home, LogOut, MessageCircle, MessagesSquare, Search, Settings, User } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {

  return (
  <div className="sticky top-0 w-full z-50 bg-background border-b">
    <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold flex items-center gap-2 text-neutral-700">
          <MessagesSquare className="w-4 h-4 size-6" />
            SocialApp
        </div>
        <div className="relative w-full max-w-md">
            <Search className=" absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground"/>
            <Input className="pl-10" placeholder="Search..."/>
        </div>
        <div>
            <div className="flex items-center gap-9">
              {/* Home */}
              <Button variant="ghost" size="icon" aria-label="Home">
                <Home className="size-5"/>
              </Button>

               {/* Notification */}
              <Button variant="ghost" size="icon">
               <Bell className="size-5"/>
              </Button>

               {/*Message*/}
              <Button variant="ghost" size="icon">
               <MessageCircle className="size-5"/>
              </Button>

             {/* Profile and settings */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="hover:bg-transparent">
                    <Avatar>
                      <AvatarFallback>SS</AvatarFallback>
                     </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem className="flex items-center gap-1.5">
                    <User className="size-4 text-blue-900"/>
                    Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="size-4 text-muted-foreground"/>
                    Settings</DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="size-4 text-red-500"/>
                    Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </div>
    </div>
  </div>
  );
};

export default Navbar
