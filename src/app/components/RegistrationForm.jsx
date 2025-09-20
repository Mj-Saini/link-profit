

"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, User, Phone } from "lucide-react"; // 👁 add EyeOff
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { setCookie } from "cookies-next";

const RegistrationForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const referralFromURL = searchParams?.get("Invitecode");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // 👁 state

    
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
            const userCred = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const uid = userCred.user.uid; 

            await setDoc(doc(db, "User", uid), {
            

                Id: uid,
                CreatedAt: '',
                DOB: '',
                Email: formData.email,
                Name: formData.name,
                Number: formData.phone,
                ProfileImage: '',
                AadharNumber: '',
                PanNumber: '',
                ReferCode: formData.referral || null,
                AcountHolderName: '',
                BranchName: '',
                IFSCCode: "",
                AccountNumber: "",
                Level: 0,
                Amount: 0,
                isBlocked: false,
                upiHandle: "",
                ReferredBy: "",
                Token: "",
            });


            
            
            console.log("✅ Registered:", userCred.user);
            setCookie("registered", "true", { path: "/", httpOnly: true });
            router.push("/");
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F2F7] px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
                    Create Account
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    We are glad to see you again user
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-black" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 text-black focus:ring-[#8F5CE2]"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-black" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8F5CE2]"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-black" />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8F5CE2]"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // 👁 toggle
                            name="password"
                            placeholder="Create your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-3 pr-10 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8F5CE2]"
                            required
                        />
                        {showPassword ? (
                            <EyeOff
                                className="absolute right-3 top-3 text-black cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye
                                className="absolute right-3 top-3 text-black cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>

                    {/* Referral Code */}
                    <input
                        type="text"
                        name="referral"
                        placeholder="Enter referral code (optional)"
                        value={formData.referral}
                        onChange={handleChange}
                        className="w-full pl-3 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8F5CE2]"
                        // ❌ removed readOnly so user can edit it
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#8F5CE2] to-[#6B3AD6] text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                {error && (
                    <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
                )}

                <p className="text-sm text-gray-500 mt-4 text-center">
                    Already have an account?{" "}
                    <span className="text-[#8F5CE2] font-medium cursor-pointer">Log In</span>
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;
