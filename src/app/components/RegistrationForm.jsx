
"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, User, Phone, Gift } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { setCookie } from "cookies-next";

// 🔹 Generate 8-digit numeric userUID
const generateRandomUserUID = () => {
    const chars = "0123456789";
    let uid = "";
    for (let i = 0; i < 8; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
};

// 🔹 Get precise timestamp in ISO format
const getPreciseTimestamp = () => new Date().toISOString();

const RegistrationForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const referralFromURL = searchParams?.get("Invitecode");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        referral: "",
    });

    useEffect(() => {
        if (referralFromURL) {
            setFormData((prev) => ({ ...prev, referral: referralFromURL }));
        }
    }, [referralFromURL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // ✅ Create auth user
            const userCred = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const uid = userCred.user.uid;

            // ✅ Generate unique 8-digit userUID
            const userUID = generateRandomUserUID();

            // ✅ Current timestamp
            const timestamp = getPreciseTimestamp();

            // ✅ User object structure
            const userData = {
                userUID: userUID,
                Id: uid,
                Name: formData.name,
                Email: formData.email,
                Number: formData.phone,
                ReferCode: formData.referral || "",
                ReferredBy: "",
                CreatedAt: timestamp,
                LastLoginTime: timestamp,
                LastLoginDeviceId: "",
                ProfileImage:
                    "https://firebasestorage.googleapis.com/v0/b/referral-rise-official.appspot.com/o/Dummy%2Fdummy_img_profile.png?alt=media&token=33c09171-212f-4868-a45a-915166681b24",
                DOB: "",
                AadharNumber: "",
                PanNumber: "",
                AccountHolder: "",
                BranchName: "",
                IFSCCode: "",
                AccountNumber: "",
                upiHandle: "",
                BonusWallet: 20,
                MainWallet: 0,
                Level: 0,
                Token: "",
                isBlocked: false,
            };

            // ✅ Store user data in Firestore
            await setDoc(doc(db, "User", uid), userData);

            // ✅ Set cookie and redirect
            setCookie("registered", "true", { path: "/", httpOnly: false });
            router.push("/");
        } catch (err) {
            console.error("Signup Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                background: "linear-gradient(135deg, #0A0A0A, #1A1A2E, #16213E, #0F3460)",
            }}
        >
            <div className="w-full max-w-md bg-[#0E0E1A]/70 backdrop-blur-md rounded-3xl shadow-[0_0_25px_rgba(0,255,255,0.2)] p-8 border border-[#1F1F3C]">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6B8CFF] to-[#A26BFF] text-center mb-2 tracking-wide">
                    JOIN THE GAME
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    Create your account and start earning rewards
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Player Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-cyan-400" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-cyan-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-cyan-400" />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-3 pr-10 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            required
                        />
                        {showPassword ? (
                            <EyeOff
                                className="absolute right-3 top-3 text-cyan-400 cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye
                                className="absolute right-3 top-3 text-cyan-400 cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>

                    {/* Referral Code */}
                    <div className="relative">
                        <Gift className="absolute left-3 top-3 text-cyan-400" />
                        <input
                            type="text"
                            name="referral"
                            placeholder="Enter refer code for bonus reward"
                            value={formData.referral}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#6B8CFF] to-[#A26BFF] text-white font-semibold shadow-[0_0_15px_rgba(162,107,255,0.5)] hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "CREATE ACCOUNT"}
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
                )}

              
            </div>
        </div>
    );
};

export default RegistrationForm;






// "use client";
// import { useState, useEffect } from "react";
// import { Eye, EyeOff, Mail, User, Phone, Gift } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../lib/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { setCookie } from "cookies-next";
// import { motion } from "framer-motion";

// const generateRandomUserUID = () => {
//     const chars = "0123456789";
//     let uid = "";
//     for (let i = 0; i < 8; i++) {
//         uid += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return uid;
// };

// const getPreciseTimestamp = () => new Date().toISOString();

// const RegistrationForm = () => {
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const referralFromURL = searchParams?.get("Invitecode");

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [showPassword, setShowPassword] = useState(false);

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         referral: "",
//     });

//     // ✅ Set referral if in URL
//     useEffect(() => {
//         if (referralFromURL) {
//             setFormData((prev) => ({ ...prev, referral: referralFromURL }));
//         }
//     }, [referralFromURL]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         try {
//             const userCred = await createUserWithEmailAndPassword(
//                 auth,
//                 formData.email,
//                 formData.password
//             );
//             const uid = userCred.user.uid;
//             const userUID = generateRandomUserUID();
//             const timestamp = getPreciseTimestamp();

//             const userData = {
//                 userUID,
//                 Id: uid,
//                 Name: formData.name,
//                 Email: formData.email,
//                 Number: formData.phone,
//                 ReferCode: formData.referral || "",
//                 ReferredBy: "",
//                 CreatedAt: timestamp,
//                 LastLoginTime: timestamp,
//                 LastLoginDeviceId: "",
//                 ProfileImage:
//                     "https://firebasestorage.googleapis.com/v0/b/referral-rise-official.appspot.com/o/Dummy%2Fdummy_img_profile.png?alt=media&token=33c09171-212f-4868-a45a-915166681b24",
//                 BonusWallet: 20,
//                 MainWallet: 0,
//                 Level: 0,
//                 Token: "",
//                 isBlocked: false,
//             };

//             await setDoc(doc(db, "User", uid), userData);
//             setCookie("registered", "true", { path: "/", httpOnly: false });
//             router.push("/");
//         } catch (err) {
//             console.error("Signup Error:", err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#07071C]">
//             {/* 🔹 Animated Nebula Background */}
//             <div className="absolute inset-0 bg-gradient-to-b from-[#06061A] via-[#0C0C2A] to-[#101020] opacity-90"></div>

//             {/* 🔹 Floating Energy Blobs */}
//             <motion.div
//                 className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[180px] opacity-40"
//                 animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
//                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//             />
//             <motion.div
//                 className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[180px] opacity-40"
//                 animate={{ x: [0, -50, 50, 0], y: [0, -40, 40, 0] }}
//                 transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//             />

//             {/* ⚡ Premium Animated Coin Background */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 {[...Array(25)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute w-10 h-10 coin-glow"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * -100}%`,
//                             animationDelay: `${Math.random() * 6}s`,
//                             animationDuration: `${8 + Math.random() * 5}s`,
//                         }}
//                         animate={{
//                             y: ["-10vh", "110vh"],
//                             rotate: [0, 360],
//                             scale: [1, 1.2, 1],
//                             opacity: [0, 1, 0.8, 0],
//                         }}
//                         transition={{
//                             duration: 10 + Math.random() * 4,
//                             repeat: Infinity,
//                             ease: "easeInOut",
//                         }}
//                     >
//                         <img
//                             src="https://cdn-icons-png.flaticon.com/512/138/138292.png"
//                             alt="coin"
//                             className="w-full h-full object-contain drop-shadow-[0_0_10px_gold]"
//                         />
//                     </motion.div>
//                 ))}
//             </div>

//             {/* 🔹 Animated Form */}
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: 40 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 className="relative z-10 w-full max-w-md bg-[#101020]/70 backdrop-blur-md rounded-3xl shadow-[0_0_30px_rgba(0,255,255,0.25)] p-8 border border-[#2F2F55]"
//             >
//                 <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#6B8CFF] to-[#A26BFF]">
//                     JOIN THE GAME
//                 </h2>
//                 <p className="text-center text-gray-400 mb-6">
//                     Create your account and start earning rewards
//                 </p>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div className="relative">
//                         <User className="absolute left-3 top-3 text-cyan-400" />
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Enter your name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-3 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                             required
//                         />
//                     </div>

//                     <div className="relative">
//                         <Mail className="absolute left-3 top-3 text-cyan-400" />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Enter your email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-3 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                             required
//                         />
//                     </div>

//                     <div className="relative">
//                         <Phone className="absolute left-3 top-3 text-cyan-400" />
//                         <input
//                             type="tel"
//                             name="phone"
//                             placeholder="Enter your phone number"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-3 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                             required
//                         />
//                     </div>

//                     <div className="relative">
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             name="password"
//                             placeholder="Create a strong password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="w-full pl-3 pr-10 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                             required
//                         />
//                         {showPassword ? (
//                             <EyeOff
//                                 className="absolute right-3 top-3 text-cyan-400 cursor-pointer"
//                                 onClick={() => setShowPassword(false)}
//                             />
//                         ) : (
//                             <Eye
//                                 className="absolute right-3 top-3 text-cyan-400 cursor-pointer"
//                                 onClick={() => setShowPassword(true)}
//                             />
//                         )}
//                     </div>

//                     <div className="relative">
//                         <Gift className="absolute left-3 top-3 text-cyan-400" />
//                         <input
//                             type="text"
//                             name="referral"
//                             placeholder="Enter refer code for bonus reward"
//                             value={formData.referral}
//                             onChange={handleChange}
//                             className="w-full pl-10 pr-3 py-3 rounded-xl bg-transparent border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#6B8CFF] to-[#A26BFF] text-white font-semibold shadow-[0_0_20px_rgba(162,107,255,0.6)] hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50"
//                     >
//                         {loading ? "Creating..." : "CREATE ACCOUNT"}
//                     </button>
//                 </form>

//                 {error && (
//                     <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
//                 )}
//             </motion.div>

//             {/* 🔹 Extra Styles */}
//             <style jsx>{`
//         .coin-glow {
//           filter: drop-shadow(0 0 10px gold)
//             drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
//         }

//         .coin-glow img {
//           animation: coinSpin 2s linear infinite;
//         }

//         @keyframes coinSpin {
//           0% {
//             transform: rotateY(0deg);
//           }
//           100% {
//             transform: rotateY(360deg);
//           }
//         }
//       `}</style>
//         </div>
//     );
// };

// export default RegistrationForm;
