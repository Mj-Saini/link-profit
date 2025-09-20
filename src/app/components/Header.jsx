// components/PlayNavbar.tsx
"use client";
import Link from "next/link";
import { PlayIcon } from "./Icons";

const Header = () => {
    return (
        <nav className="flex flex-col md:flex-row md:items-center px-3 md:px-6 py-3 gap-5 bg-white shadow">
            {/* Google Play Logo */}
            <Link href="/" aria-label="Google Play logo" className="flex items-center space-x-2">
                <PlayIcon/>
                <span className={`font-normal text-lg md:text-xl text-[#5f6368]`}>Google Play</span>
            </Link>

            {/* Navigation Tabs */}
            <div className="flex space-x-6">
                <Link
                    href="/store/games"
                    className="text-gray-600 hover:text-black transition text-xs"
                >
                    Games
                </Link>
                <Link
                    href="/store/apps"
                    className="text-[#01875f] font-medium text-xs"
                >
                    Apps
                </Link>
                <Link
                    href="/store/movies"
                    className="text-gray-600 hover:text-black transition text-xs"
                >
                    Movies &amp; TV
                </Link>
                <Link
                    href="/store/books"
                    className="text-gray-600 hover:text-black transition text-xs"
                >
                    Books
                </Link>
                <Link
                    href="/store/apps/category/FAMILY"
                    className="text-gray-600 hover:text-black transition text-xs"
                >
                    Kids
                </Link>
            </div>
        </nav>
    );
};

export default Header
