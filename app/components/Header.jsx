"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Search, ShoppingCartIcon } from "lucide-react";
import { CartContext } from "../context/CartContext";
import Cart from "./Cart";
import CartApis from "../utils/CartApis";
import ProductApis from "../utils/ProductApis";
import ProductList from "./ProductList"; // Import the ProductList component

const Header = () => {
  const { cart, setCart, isCartOpen, setIsCartOpen } = useContext(CartContext);
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Ref to track the entire search section
  const searchSectionRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(window?.location?.href.toString().includes("sign-in", "sign-up"));
  }, []);

  useEffect(() => {
    user && getCartItems();
  }, [user]);

  useEffect(() => {
    getLatestProducts_();
  }, []);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (searchSectionRef.current && !searchSectionRef.current.contains(event.target)) {
        setIsSearchOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getLatestProducts_ = () => {
    ProductApis.getLatestProducts().then((res) => {
      setProductList(res.data.data);
    });
  };

  const getCartItems = () => {
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(
      (res) => {
        res?.data?.data.forEach((citem) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: citem.id,
              product: citem?.attributes?.products?.data[0],
            },
          ]);
        });
      }
    );
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = productList.filter((product) =>
      product.attributes.title.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };
  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return !isLoggedIn && (
    <div className="shadow-md">
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <a href="/">
                <Image src="/logo.svg" alt="logo" width={50} height={50} />
              </a>
            </div>

            <div className="relative flex items-center gap-4">
              <Search
                className="cursor-pointer"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />
              {isSearchOpen && (
                <div ref={searchSectionRef} className="flex flex-col w-full ">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch} 
                    placeholder="Search products..."
                    className="border focus:border-primary focus:border p-2 focus:outline-none rounded transition duration-75 ease-in-out"
                  />

                  {searchTerm && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-10 p-4 overflow-hidden">
                      <ProductList
                        productList={filteredProducts.slice(0, 4)}
                        className={"grid-cols-2 sm:grid-cols-2 md:grid-cols-2"}
                        onProductClick={closeSearch}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="sm:flex sm:gap-4">
                {user ? (
                  <div className="flex gap-4">
                    <h2 className="flex cursor-pointer">
                      <ShoppingCartIcon
                        onClick={() => setIsCartOpen(!isCartOpen)}
                      />
                      ({cart?.length})
                    </h2>
                    <UserButton />
                    {isCartOpen && <Cart />}
                  </div>
                ) : (
                  <>
                    <a
                      className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
                      href="/sign-in"
                    >
                      Login
                    </a>
                    <div className="hidden sm:flex">
                      <Link
                        className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary transition hover:text-teal-500/75 sm:block"
                        href="/sign-up"
                      >
                        Register
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
