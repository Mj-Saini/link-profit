"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccessful = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden relative">

            {/* 🔹 Animated background glow */}
            <motion.div
                className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[200px]"
                animate={{ x: [0, 50, -50, 0], y: [0, 40, -40, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[200px]"
                animate={{ x: [0, -60, 60, 0], y: [0, -40, 40, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 🔸 Success Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative bg-[#1e293b]/70 backdrop-blur-xl border border-emerald-400/30 shadow-[0_0_40px_rgba(16,185,129,0.4)] rounded-3xl p-8 max-w-md w-[90%] text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 0.6, ease: "backOut" }}
                    className="flex justify-center mb-4"
                >
                    <CheckCircle2 className="w-20 h-20 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]" />
                </motion.div>

                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                    Payment Successful!
                </h1>
                <p className="text-gray-300 mb-6">
                    Your transaction has been completed successfully.
                    Welcome to the premium experience 🚀
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 text-white font-semibold shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all duration-300"
                    onClick={() => (window.location.href = "/")}
                >
                    Go to Home
                </motion.button>
            </motion.div>

            {/* ✨ Floating confetti effect */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-emerald-400 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * -20}%`,
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        x: [0, Math.random() * 40 - 20],
                        opacity: [1, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </div>
    );
};

export default PaymentSuccessful;
