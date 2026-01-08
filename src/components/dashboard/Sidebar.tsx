"use client";
import Link from "next/link";
import { MdCancel, MdDashboard } from "react-icons/md";
import Image from "next/image";
import {
  Award,
  ChartNoAxesGantt,
  DollarSign,
  Dumbbell,
  Newspaper,
  Settings,
  UsersRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const menuItems = [
    {
      title: "Dashboard",
      icon: <MdDashboard size={18} />,
      href: "/",
    },
    {
      title: "User Management",
      icon: <UsersRound size={18} />,
      href: "/user-management",
    },
    {
      title: "Trainer Management",
      icon: <Award size={18} />,
      href: "/dashboard/schedules",
    },
    {
      title: "Program Management",
      icon: <ChartNoAxesGantt size={18} />,
      href: "/dashboard/schedules",
    },
    {
      title: "Gym Management",
      icon: <Dumbbell size={18} />,
      href: "/dashboard/schedules",
    },
    {
      title: "Newsfeed Moderation",
      icon: <Newspaper size={18} />,
      href: "/dashboard/schedules",
    },
    {
      title: "Manage Subscriptions",
      icon: <DollarSign size={18} />,
      href: "/dashboard/schedules",
    },
    {
      title: "Settings",
      icon: <Settings size={18} />,
      href: "/dashboard/schedules",
    },
  ];

  // handling logout
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // 1. Remove token from browser storage
    localStorage.removeItem("token");

    // 2. Clear Redux Store
    dispatch(logout());

    // 3. Redirect to Login Page
    router.replace("/login");
    // .replace() prevents the user from clicking "Back" to access the dashboard again
  };

  return (
    <nav
      className={`
        fixed lg:sticky top-0 left-0 z-100 h-screen bg-[#e1e6e2] transition-all duration-300 overflow-auto
        ${
          isOpen
            ? "min-w-84 translate-x-0"
            : "w-84 -translate-x-full lg:translate-x-0 lg:w-84"
        }
      `}
    >
      <div className="flex items-center gap-2 pt-6 pb-2 px-4 sticky top-0 min-h-16 z-100">
        <Link href="/">
          <Image
            width={300}
            height={100}
            src="/images/logo.png"
            alt="logo"
            className="w-44 object-contain"
          />
        </Link>
        <button onClick={() => setIsOpen(false)} className="lg:hidden ml-auto">
          <MdCancel size={24} />
        </button>
      </div>
      <div className="px-4">
        <div className="">
          <ul className="mt-3 space-y-4">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`text-slate-800 text-[15px] font-medium space-x-3 flex items-center cursor-pointer bg-[#F7F9F8] hover:bg-[#B8C398] active:bg-[#B8C398] focus:bg-[#B8C398] px-3 py-3 transition-all duration-300 ${
                      isActive ? "bg-[#B8C398]" : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                onClick={handleLogout}
                className={`text-slate-800 text-[15px] font-medium space-x-3 flex items-center cursor-pointer bg-[#F7F9F8] hover:bg-[#B8C398] active:bg-[#B8C398] focus:bg-[#B8C398] px-3 py-3 transition-all duration-300`}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
