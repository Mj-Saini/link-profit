// components/AppDetails.js
"use client";
import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import jackpotImg from '../../../public/assets/jeckpot-party.webp'
import dancingDrums from '../../../public/assets/dancing-drum.webp'
import goldFish from '../../../public/assets/gold-fish.webp'

const AppDetails = () => {
    const supportLinks = [
        {
            label: "Website",
            href: "https://www.quickhitslots.com/",
            icon: "https://play-lh.googleusercontent.com/o8odxCBBPQGZWnQwCg6vJSSqIEm1lRc0NLCOaejCzFmGmb5dkNBdROgkpA0UTB80Bw=s128-rw",
        },
        {
            label: "Support email",
            href: "mailto:android@quickhitslots.zendesk.com",
            icon: "email",
            sub: "android@quickhitslots.zendesk.com",
        },
        {
            label: "Address",
            href: "https://maps.google.com/?q=900%20Technology%20Parkway%0ASuite%20300%0ACedar%20Falls,%20IA%2050613",
            icon: "place",
            sub: "900 Technology Parkway, Suite 300, Cedar Falls, IA 50613",
        },
        {
            label: "Privacy Policy",
            href: "https://www.sciplay.com/terms-of-service/#!/privacy",
            icon: "shield",
        },
    ];

    const games = [
        {
            title: "Jackpot Party Casino Slots",
            developer: "SF Games",
            rating: 4.6,
            image: jackpotImg,
        },
        {
            title: "Dancing Drums Slots Casino",
            developer: "SF Games",
            rating: 3.5,
            image: dancingDrums,
        },
        {
            title: "Gold Fish Casino Slot Games",
            developer: "SF Games",
            rating: 4.8,
            image: goldFish,
        },
    ];

    return (
        <div className="space-y-8">
            {/* App Support */}
           

            {/* More by SF Games */}
            <section className="bg-white md:p-4 rounded shadow">
                <h2 className="text-lg font-normal text-black mb-4">App Support</h2>
                <div className="flex flex-col gap-4">
                    {games.map((game) => (
                        <Link key={game.title} href="#" className="bg-gray-50 rounded overflow-hidden transition flex">
                            <Image src={game.image} alt={game.title} className=" h-16 w-16 object-cover rounded-xl" />
                            <div className="p-2">
                                <h3 className="font-medium text-[#202124] text-sm">{game.title}</h3>
                                <p className=" text-gray-500 text-xs">{game.developer}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-[#202124]/90 text-xs">{game.rating} star</span>
                                    
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AppDetails;
