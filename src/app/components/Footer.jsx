"use client"; // Required for Next.js app directory

import React from "react";
import indianFlag from '../../../public/assets/indian-flag.png'
import Image from "next/image";

const Footer = () => {
    const sections = [
        {
            title: "Google Play",
            links: [
                { label: "Play Pass", href: "https://play.google.com/about/play-pass" },
                { label: "Play Points", href: "#" },
                { label: "Gift cards", href: "https://play.google.com/about/giftcards" },
                { label: "Redeem", href: "#" },
                { label: "Refund policy", href: "https://support.google.com/googleplay/answer/134336" },
            ],
        },
        {
            title: "Kids & family",
            links: [
                { label: "Parent Guide", href: "https://support.google.com/googleplay?p=pff_parentguide" },
                { label: "Family sharing", href: "https://support.google.com/googleplay/answer/7007852" },
            ],
        },
    ];

    const bottomLinks = [
        { label: "Terms of Service", href: "https://play.google.com/intl/en-US_us/about/play-terms.html" },
        { label: "Privacy", href: "https://policies.google.com/privacy" },
        { label: "About Google Play", href: "https://support.google.com/googleplay/?p=about_play" },
        { label: "Developers", href: "https://developer.android.com/index.html" },
        { label: "Google Store", href: "https://store.google.com/?playredirect=true" },
    ];

    return (
        <footer className="bg-gray-100 text-[#5f6368] text-sm py-6 px-4 md:px-20 -mt-1">
            <div className="flex flex-wrap gap-8 mb-6">
                {sections.map((section, idx) => (
                    <section key={idx} className="min-w-[150px]">
                        <h3 className="font-normal text-[#5f6368] mb-2">{section.title}</h3>
                        <ul className="space-y-2">
                            {section.links.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className=""
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            <div className="flex flex-wrap gap-6 items-center mb-6">
                {bottomLinks.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        {link.label}
                    </a>
                ))}

                {/* Country / language section */}
                <div className="flex items-center gap-2 ml-auto">
                    <Image src={indianFlag} alt="India" className="h-6 w-6 object-contain" />
                    <span>India (English (India))</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
