'use client'
import { titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import {IoSearchOutline, IoCartOutline} from "react-icons/io5"

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  const totalItemInCart = useCartStore(state => state.getTotalItems())
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])
  
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
        </Link>
      </div>

      {/*Center Menu */}
      <div className="hidden sm:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">Hombres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">Mujeres</Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">Niños</Link>
      </div>

      {/*Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5"/>
        </Link>

        <Link href={
          ((totalItemInCart === 0) && loaded)
          ? '/empty'
          :'/cart' } className="mex-2">
          <div className="relative">
            {
              (loaded && totalItemInCart > 0 ) && (
                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                  {totalItemInCart}
                </span>
              )
            }
            <IoCartOutline className="w-5 h-5"/>
          </div>
        </Link>
        <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" onClick={openSideMenu}>
        Menú
        </button>
      </div>
    </nav>
  )
}
