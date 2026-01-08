"use client";
import { useState, useRef, useEffect } from "react";
import { MdMenu } from "react-icons/md";

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const [, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <header className="z-50 bg-[#e1e6e2] sticky top-0 px-6">
      <div className="min-h-24 flex items-center justify-end rounded-md w-full relative tracking-wide">
        {/* Mobile Toggle Button */}
        <button onClick={toggleSidebar} className="lg:hidden mr-4">
          <MdMenu size={26} />
        </button>
      </div>
    </header>
  );
}
