




// "use client";
// import { useState, useEffect } from "react";
// import { Eye, EyeOff, Mail, User, Phone, Gift } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../lib/firebaseConfig";

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
//             // ✅ create user in Firebase Auth
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
//                 CreatedAt: timestamp,
//                 LastLoginTime: timestamp,
//                 ProfileImage:
//                     "https://firebasestorage.googleapis.com/v0/b/referral-rise-official.appspot.com/o/Dummy%2Fdummy_img_profile.png?alt=media&token=33c09171-212f-4868-a45a-915166681b24",
//                 BonusWallet: 20,
//                 MainWallet: 0,
//                 Level: 0,
//                 Token: "",
//                 isBlocked: false,
//             };

//             await setDoc(doc(db, "User", uid), userData);

//             router.push("/"); // ✅ redirect after signup
//         } catch (err) {
//             console.error("Signup Error:", err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div
//             className="min-h-screen flex items-center justify-center px-4"
//             style={{
//                 background:
//                     "linear-gradient(135deg, #0A0A0A, #1A1A2E, #16213E, #0F3460)",
//             }}
//         >
//             <div className="w-full max-w-md bg-[#0E0E1A]/70 backdrop-blur-md rounded-3xl shadow-[0_0_25px_rgba(0,255,255,0.2)] p-8 border border-[#1F1F3C]">
//                 <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6B8CFF] to-[#A26BFF] text-center mb-2 tracking-wide">
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
//                         className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#6B8CFF] to-[#A26BFF] text-white font-semibold shadow-[0_0_15px_rgba(162,107,255,0.5)] hover:opacity-90 transition disabled:opacity-50"
//                     >
//                         {loading ? "Creating..." : "CREATE ACCOUNT"}
//                     </button>
//                 </form>

//                 {error && (
//                     <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RegistrationForm;




"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, User, Phone, Gift } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, increment } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";

const generateRandomUserUID = () => {
    const chars = "0123456789";
    let uid = "";
    for (let i = 0; i < 8; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
};

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
            // ✅ Create user in Firebase Auth
            const userCred = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const uid = userCred.user.uid;
            const userUID = generateRandomUserUID();
            const timestamp = getPreciseTimestamp();

            // ✅ Save new user data in "User" collection
            const userData = {
                userUID,
                Id: uid,
                Name: formData.name,
                Email: formData.email,
                Number: formData.phone,
                ReferCode: formData.referral || "",
                CreatedAt: timestamp,
                LastLoginTime: timestamp,
                ProfileImage:
                    "https://firebasestorage.googleapis.com/v0/b/referral-rise-official.appspot.com/o/Dummy%2Fdummy_img_profile.png?alt=media&token=33c09171-212f-4868-a45a-915166681b24",
                BonusWallet: 20,
                MainWallet: 0,
                Level: 0,
                Token: "",
                isBlocked: false,
            };

            await setDoc(doc(db, "User", uid), userData);

            // ✅ Update AppUsage -> increment user count and update timestamp
            const appUsageRef = doc(db, "AppUsage", "docId"); // <-- replace "docId" with your actual document ID
            await updateDoc(appUsageRef, {
                TotalUsersCount: increment(1),
                UpdatedAt: timestamp,
            });

            router.push("/"); // ✅ redirect after signup
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
