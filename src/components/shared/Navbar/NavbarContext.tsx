"use client";

import { createContext, useContext, useState } from "react";
import { NavLink } from "app/constants/types";

interface NavbarContextType {
  isOpen: boolean;
  toggleNavbar: () => void;
  hoveredOption: NavLink | null;
  setHoveredOption: (option: NavLink | null) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<null | NavLink>(null);

  const toggleNavbar = () => {
    setHoveredOption(null);
    setIsOpen(prev => !prev);
  };

  return (
    <NavbarContext.Provider value={{ isOpen, toggleNavbar, hoveredOption, setHoveredOption }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};