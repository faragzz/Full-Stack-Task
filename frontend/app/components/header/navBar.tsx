import React from 'react';
import Image from "next/image";

const NavBar = () => {
    return (
        <div
            className="bg-gray-300 h-[88px] sticky top-0 z-50 flex  items-center px-4 py-3">
            <Image src="/logo.png" alt="logo" width={70} height={70} className="rounded-full"/>
            <p className="ml-9 text-2xl font-medium">Arafny</p>
        </div>
    );
};
export default NavBar;
