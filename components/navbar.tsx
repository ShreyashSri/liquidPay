"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut, Bell } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  email: string;
}

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Behavior Analysis", href: "/behavior-analysis" },
  { name: "Savings Goals", href: "/savings" },
  { name: "Budget Planner", href: "/budget" },
  { name: "AI Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8188/api/auth/checkauth", {
          withCredentials: true,
        });
        if (response.data.success) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8188/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 text-yellow-400"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v1" />
              <path d="M12 21v1" />
              <path d="M4.93 4.93l.7.7" />
              <path d="M18.36 18.36l.7.7" />
              <path d="M2 12h1" />
              <path d="M21 12h1" />
              <path d="M4.93 19.07l.7-.7" />
              <path d="M18.36 5.64l.7-.7" />
              <circle cx="12" cy="12" r="4" />
            </svg>
            <span className="text-xl font-bold text-white">Liquidpay</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.submenu ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`text-sm font-medium transition-colors hover:text-white flex items-center ${
                        pathname === link.href ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {link.name} <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-gray-900 border-gray-800">
                    {link.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link
                          href={subItem.href}
                          className={`w-full ${
                            pathname === subItem.href ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    pathname === link.href ? "text-white" : "text-gray-400"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-gray-800">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-gray-800">
                    {user?.username || "Account"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-gray-900 border-gray-800">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="text-gray-300 hover:text-white hover:bg-gray-800">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="text-gray-300 hover:text-white hover:bg-gray-800">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-gray-800">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Notification Bell */}
            <Link href="/nudges">
              <Button
                variant="ghost"
                size="icon"
                className="text-yellow-400 hover:text-yellow-500 hover:bg-gray-800"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </Link>

            {/* Connect Bank Button */}
            <Link href="/connect-bank">
              <Button
                variant="outline"
                className="border-yellow-600 text-yellow-500 hover:bg-yellow-600/10"
              >
                Connect Bank
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800 mt-2 animate-in slide-in-from-top-5 duration-300">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.submenu ? (
                  <div key={link.name} className="space-y-2">
                    <div className="text-sm font-medium text-white">{link.name}</div>
                    <div className="pl-4 border-l border-gray-800 space-y-2">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`text-sm font-medium transition-colors hover:text-white block ${
                            pathname === subItem.href ? "text-yellow-400" : "text-gray-400"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-white ${
                      pathname === link.href ? "text-white" : "text-gray-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}

              <div className="pt-4 border-t border-gray-800 flex flex-col space-y-3">
                {!isLoggedIn ? (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-gray-800">
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                )}
                <Link href="/connect-bank" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-yellow-600 text-yellow-500 hover:bg-yellow-600/10">
                    Connect Bank
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
