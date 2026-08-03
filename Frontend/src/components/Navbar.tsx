import {Bell,Home,LogOut, MessageCircle, MessagesSquare, Search, Settings,User,} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {DropdownMenu,DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "./ui/dropdown-menu";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-sm bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-semibold text-foreground"
         >
          <MessagesSquare className="size-5" />
           <span className="font-mono">SocialApp</span>
        </Link>

        {/* Search */}
        <div className="relative hidden w-full max-w-lg md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10 rounded-full" />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Home */}
          <Link to="/">
            <Button variant="ghost" size="icon" className="transition-all duration-200 hover:scale-110" aria-label="Home">
              <Home className="size-4" />
            </Button>
          </Link>

          {/* Notifications */}
          <Link to="/notifications">
            <Button variant="ghost" className="transition-all duration-200 hover:scale-110" size="icon" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
          </Link>

          {/* Messages */}
          <Link to="/messages">
            <Button variant="ghost" className="transition-all duration-200 hover:scale-110"  size="icon" aria-label="Messages">
              <MessageCircle className="size-4" />
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
           <DropdownMenuTrigger className="rounded-full p-0 hover:bg-transparent focus-visible:ring-1 focus-visible:ring-indigo-400">
             <Avatar className="size-9">
               <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                 SS
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <Link to="/profile">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="size-4 text-blue-500" />
                  Profile
                </DropdownMenuItem>
              </Link>

              <Link to="/settings">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                <LogOut className="size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;