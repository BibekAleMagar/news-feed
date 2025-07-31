import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Bandage, Newspaper } from 'lucide-react'
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const items = [
  {
    title: "Health News",
    url: "/home",
    icon: Bandage
  },
  {
    title: "Mix News",
    url: "/home/mix-news",
    icon: Newspaper
  }
]

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export const SideBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('User');
    if (storedUser) {
      const userObj: User = JSON.parse(storedUser);
      setUser(userObj);
    }
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-col justify-center items-center py-4">
            <img src={user?.image} alt="user" className="w-24 h-24 rounded-full" />
            <p className="font-bold text-xl mt-2">{user?.firstName} {user?.lastName}</p>
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url; 

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={` ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        <item.icon />
                        <span className="">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
