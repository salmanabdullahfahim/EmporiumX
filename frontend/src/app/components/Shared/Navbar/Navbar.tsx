"use client";
import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { BsCart } from "react-icons/bs";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  //   const cartItems = useAppSelector((state) => state.cart.items);
  //   const { totalOrderPrice } = useAppSelector((state) => state.cart);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "About Us",
      href: "/about-us",
    },
    {
      name: "Contact Us",
      href: "/contact-us",
    },
  ];

  return (
    <div className=" bg-white flex items-center justify-between h-[65px] p-10 md:px-12   w-full shadow-md sticky top-0 z-20">
      {/* Company logo or name */}
      <Logo />
      {/* desktop menu */}
      <div className="hidden lg:block">
        <ul className="flex gap-8 z-10 bg-transparent  font-medium text-md items-center">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="text-darkText">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* mobile menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <Logo />
                <div className="-mr-2">
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      onClick={toggleMenu}
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* cart icon */}

      <Link href="/cart" className="ml-3 md:ml-0">
        <div className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-slate-100 hover:text-white rounded-full px-4 py-1.5 border-[1px] border-blue-300 hover:border-blue-500 duration-200 cursor-pointer relative">
          <BsCart className="text-xl" />
          {/* <p className="font-semibold text-sm">${totalOrderPrice}</p>
            <span className="bg-white rounded-full text-blue-600 text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 flex justify-center items-center shadow-xl shadow-black">
              {cartItems?.length > 0 ? cartItems.length : 0}
            </span> */}
        </div>
      </Link>

      {/* mobile menu button */}
      <div className="lg:hidden">
        <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
