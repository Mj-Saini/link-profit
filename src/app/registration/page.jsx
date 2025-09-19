"use client";
import { useState, useEffect } from "react";
import { Eye, Mail, User, Phone } from "lucide-react";
import { useSearchParams } from "next/navigation";

const Registration = () => {
    const searchParams = useSearchParams();
    const referralFromURL = searchParams.get("id"); // fetch ?id=xyz

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        referral: referralFromURL || "", // set initial value from URL if exists
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Check console for submitted data!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F2F7] px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Create Account</h2>
                <p className="text-center text-gray-500 mb-6">
                    We are glad to see you again user
                </p>

                {/* Form */}
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
                        <Eye className="absolute right-3 top-3 text-black cursor-pointer" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Create your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-3 pr-10 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8F5CE2]"
                            required
                        />
                    </div>

                    {/* Referral Code */}
                    <input
                        type="text"
                        name="referral"
                        placeholder="Enter refer code (optional)"
                        value={formData.referral}
                        onChange={handleChange}
                        className="w-full pl-3 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8F5CE2]"
                        readOnly={!!referralFromURL} // prevent editing if auto-filled from URL
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#8F5CE2] to-[#6B3AD6] text-white font-semibold shadow-lg hover:opacity-90 transition"
                    >
                        Create Account
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Already have an account? <span className="text-[#8F5CE2] font-medium cursor-pointer">Log In</span>
                </p>
            </div>
        </div>
    );
};

export default Registration;
