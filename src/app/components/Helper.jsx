import { CloudUpload, Lock, Share2, Trash } from "lucide-react";

import img1 from '../../../public/assets/img1.webp'
import img2 from '../../../public/assets/img2.webp'
import img3 from '../../../public/assets/img3.webp'
import img4 from '../../../public/assets/img4.webp'
import img5 from '../../../public/assets/img5.webp'
import img6 from '../../../public/assets/img6.webp'


export const screenshots = [
    { src: img1, alt: "Screenshot 1" },
    { src: img2, alt: "Screenshot 2" },
    { src: img3, alt: "Screenshot 3" },
    { src: img4, alt: "Screenshot 4" },
    { src: img5, alt: "Screenshot 5" },
    { src: img6, alt: "Screenshot 6" },
];


export const features = [
    "Collect free cash every 15mins.",
    "Huge progressive jackpot & big chance to get a big win.",
    "Stunning visual effects & immersive Las Vegas slots experience designed by experts.",
    "Wild collection of Vegas slots games, including 777 slots and other popular free slot machine games.",
    "Complete the Album to win surprise rewards.",
    "Enjoy the multiplayer feature to win massive rewards with your friends in casino jackpot slots.",
    "Find precious treasure in Island Quest by completing the challenges.",
];

export const tags = [
    "#6 top free casino",
    "Casino",
    "Slots",
    "Casual",
    "Single player",
    "Stylized",
]; 
export const reviewTags = [
    "phone",
    "teblet",
    "Chromebook",
    "TV",
]; 


export const dataSafetyItems = [
    {
        img: <Share2 size={20} className="text-black/80"/>,
        text: "This app may share these data types with third parties",
        subtext: "App activity and Device or other IDs",
    },
    {
        img: <CloudUpload size={20} className="text-black/80" />,
        text: "This app may collect these data types",
        subtext: "Location, Personal info and 4 others",
    },
    {
        img: <Lock size={20} className="text-black/80" />,
        text: "Data is encrypted in transit",
    },
    {
        img: <Trash size={20} className="text-black/80" />,
        text: "You can request that data be deleted",
    },
];


export const updates = [
    "Quick Hit Collections WINTER WONDERLAND is here!",
    "Thanksgiving will be a SPECIAL TIME!",
    "The Quick Hit Vault will get an ULTRA UPGRADE!",
    "The Holiday Season will TAKE OVER Quick Hit like never before!",
    "Get ready to win a DISCO WILDBALL for a pumping New Year!",
];