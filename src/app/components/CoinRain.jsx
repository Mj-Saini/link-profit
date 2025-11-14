"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CoinRain() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCoins((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    left: Math.random() * window.innerWidth,
                    size: Math.random() * 30 + 20,
                    duration: Math.random() * 2 + 3,
                    rotation: Math.random() * 360,
                },
            ]);
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
            {coins.map((coin) => (
                <motion.div
                    key={coin.id}
                    initial={{
                        top: -50,
                        left: coin.left,
                        rotate: 0,
                        opacity: 1,
                    }}
                    animate={{
                        top: "110vh",
                        rotate: coin.rotation + 720,
                        opacity: 0.9,
                    }}
                    transition={{
                        duration: coin.duration,
                        ease: "easeIn",
                    }}
                    onAnimationComplete={() =>
                        setCoins((prev) => prev.filter((c) => c.id !== coin.id))
                    }
                    className="absolute"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/138/138281.png"
                        alt="coin"
                        style={{
                            width: coin.size,
                            height: coin.size,
                            filter: "drop-shadow(0 0 6px gold)",
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
}
