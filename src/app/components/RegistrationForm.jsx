

// "use client";
// import { useState, useEffect } from "react";
// import { Eye, EyeOff, Mail, User, Phone, Gift, CheckCircle, XCircle } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, updateDoc, increment } from "firebase/firestore";
// import { auth, db } from "../lib/firebaseConfig";
// import Image from "next/image";
// import logo from '../../../public/logo.jpeg'

// const generateRandomUserUID = () => {
//     const chars = "0123456789";
//     let uid = "";
//     for (let i = 0; i < 8; i++) {
//         uid += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return uid;
// };

// const getPreciseTimestamp = () => new Date().toISOString();

// // ✅ Gaming Background Animation Component
// const GamingBackground = () => {
//     return (
//         <div className="fixed inset-0 -z-10 overflow-hidden">
//             {/* Animated Gradient Background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#0F3460] animate-gradient-shift"></div>

//             {/* Floating Gaming Elements */}
//             <div className="absolute inset-0">
           
//                 {/* Floating Stars */}
//                 {[...Array(20)].map((_, i) => (
//                     <div
//                         key={`star-${i}`}
//                         className="absolute animate-pulse opacity-40"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             animationDelay: `${Math.random() * 3}s`,
//                         }}
//                     >
//                         <div className="w-1 h-1 bg-white rounded-full"></div>
//                     </div>
//                 ))}

//                 {/* Animated Grid Pattern */}
//                 <div className="absolute inset-0 opacity-10">
//                     <div className="grid-pattern animate-grid-move"></div>
//                 </div>

//                 {/* Pulsing Glow Effects */}
//                 <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
//                 <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
//                 <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-blue-500 rounded-full filter blur-3xl opacity-15 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
//             </div>

//             {/* Animated Particles */}
//             <div className="particles-container">
//                 {[...Array(30)].map((_, i) => (
//                     <div
//                         key={`particle-${i}`}
//                         className="particle"
//                         style={{
//                             left: `${Math.random() * 100}%`,
//                             animationDelay: `${Math.random() * 10}s`,
//                         }}
//                     ></div>
//                 ))}
//             </div>
//         </div>
//     );
// };

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

//     // ✅ Validation states
//     const [validation, setValidation] = useState({
//         phone: {
//             isValid: false,
//             message: "",
//             isTouched: false
//         },
//         password: {
//             isValid: false,
//             message: "",
//             isTouched: false
//         }
//     });

//     useEffect(() => {
//         if (referralFromURL) {
//             setFormData((prev) => ({ ...prev, referral: referralFromURL }));
//         }
//     }, [referralFromURL]);

//     // ✅ Phone Number Validation
//     const validatePhone = (phone) => {
//         const phoneRegex = /^[6-9]\d{9}$/;
//         if (!phone) {
//             return { isValid: false, message: "Phone number is required" };
//         }
//         if (!phoneRegex.test(phone)) {
//             return { isValid: false, message: "Enter a valid 10-digit Indian phone number" };
//         }
//         return { isValid: true, message: "Valid phone number" };
//     };

//     // ✅ Password Validation
//     const validatePassword = (password) => {
//         const minLength = 6;
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasLowerCase = /[a-z]/.test(password);
//         const hasNumbers = /\d/.test(password);
//         const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

//         if (!password) {
//             return { isValid: false, message: "Password is required" };
//         }
//         if (password.length < minLength) {
//             return { isValid: false, message: `Password must be at least ${minLength} characters` };
//         }
//         if (!hasUpperCase) {
//             return { isValid: false, message: "Add at least one uppercase letter" };
//         }
//         if (!hasLowerCase) {
//             return { isValid: false, message: "Add at least one lowercase letter" };
//         }
//         if (!hasNumbers) {
//             return { isValid: false, message: "Add at least one number" };
//         }
//         if (!hasSpecialChar) {
//             return { isValid: false, message: "Add at least one special character" };
//         }
//         return { isValid: true, message: "Strong password" };
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));

//         // ✅ Real-time validation
//         if (name === "phone") {
//             const phoneValidation = validatePhone(value);
//             setValidation(prev => ({
//                 ...prev,
//                 phone: {
//                     ...phoneValidation,
//                     isTouched: true
//                 }
//             }));
//         }

//         if (name === "password") {
//             const passwordValidation = validatePassword(value);
//             setValidation(prev => ({
//                 ...prev,
//                 password: {
//                     ...passwordValidation,
//                     isTouched: true
//                 }
//             }));
//         }
//     };

//     // ✅ Handle blur events for validation
//     const handleBlur = (e) => {
//         const { name, value } = e.target;

//         if (name === "phone") {
//             const phoneValidation = validatePhone(value);
//             setValidation(prev => ({
//                 ...prev,
//                 phone: {
//                     ...phoneValidation,
//                     isTouched: true
//                 }
//             }));
//         }

//         if (name === "password") {
//             const passwordValidation = validatePassword(value);
//             setValidation(prev => ({
//                 ...prev,
//                 password: {
//                     ...passwordValidation,
//                     isTouched: true
//                 }
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");

//         // ✅ Final validation before submission
//         const phoneValidation = validatePhone(formData.phone);
//         const passwordValidation = validatePassword(formData.password);

//         if (!phoneValidation.isValid || !passwordValidation.isValid) {
//             setError("Please fix validation errors before submitting");
//             setLoading(false);
//             return;
//         }

//         try {
//             // ✅ Create user in Firebase Auth
//             const userCred = await createUserWithEmailAndPassword(
//                 auth,
//                 formData.email,
//                 formData.password
//             );
//             const uid = userCred.user.uid;
//             const userUID = generateRandomUserUID();
//             const timestamp = getPreciseTimestamp();

//             // ✅ Save new user data in "User" collection
//             const userData = {
//                 userUID,
//                 Id: uid,
//                 Name: formData.name,
//                 Email: formData.email,
//                 Number: formData.phone,
//                 ReferredBy: formData.referral || "",
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

//             // ✅ Update AppUsage -> increment user count and update timestamp
//             const appUsageRef = doc(db, "AppUsage", "docId");
//             await updateDoc(appUsageRef, {
//                 TotalUsersCount: increment(1),
//                 UpdatedAt: timestamp,
//             });

//             router.push("/");
//         } catch (err) {
//             console.error("Signup Error:", err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ Check if form is valid for submission
//     const isFormValid = () => {
//         return (
//             formData.name &&
//             formData.email &&
//             formData.phone &&
//             formData.password &&
//             validation.phone.isValid &&
//             validation.password.isValid
//         );
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
//             {/* ✅ Gaming Background Animation */}
//             <GamingBackground />

//             <div className="flex items-center flex-wrap">
//                 <div className="hidden lg:flex w-1/2 lg:pe-5 backdrop-blur-xl rounded-3xl shadow-2xl">
//                     <Image className="backdrop-blur-xl rounded-3xl shadow-2xl" src={logo} alt="logo"  />
//                </div>

//                 {/* Main Form Container */}
//                 <div className="w-full lg:w-1/2 lg:ps-5">
//                     <div className="flex gap-3 items-center justify-center pb-5 lg:hidden">
//                         <Image className="w-15 h-15 lg:w-full lg:h-auto backdrop-blur-xl rounded-3xl shadow-2xl" src={logo} alt="logo" />
//                         <h2 className="font-semibold text-3xl">Profit Area</h2>
//                     </div>
//                     <div className=" bg-[#0E0E1A]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-5 lg:p-8 border border-[#6B8CFF]/30 relative z-10 transform hover:scale-[1.02] transition-transform duration-300">

//                         {/* Animated Header */}
//                         <div className="text-center mb-4">
//                             <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6B8CFF] via-[#A26BFF] to-[#FF6B8B] animate-text-shimmer mb-2 tracking-wide">
//                                 JOIN THE GAME
//                             </h2>
//                             <p className="text-gray-300 animate-pulse">
//                                 Create your account and start earning rewards
//                             </p>
//                         </div>

//                         <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-5">
//                             {/* Name Field */}
//                             <div className="relative group">
//                                 <User className="absolute left-3 top-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     placeholder="Enter your name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 group-hover:border-cyan-400"
//                                     required
//                                 />
//                             </div>

//                             {/* Email Field */}
//                             <div className="relative group">
//                                 <Mail className="absolute left-3 top-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     placeholder="Enter your email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 group-hover:border-cyan-400"
//                                     required
//                                 />
//                             </div>

//                             {/* Phone Field with Validation */}
//                             <div className="relative group">
//                                 <Phone className="absolute left-3 top-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
//                                 <input
//                                     type="tel"
//                                     name="phone"
//                                     placeholder="Enter your phone number"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     maxLength="10"
//                                     className={`w-full pl-10 pr-10 py-3 rounded-xl bg-black/40 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-cyan-400 ${validation.phone.isTouched
//                                         ? validation.phone.isValid
//                                             ? "border-green-500 focus:ring-green-500"
//                                             : "border-red-500 focus:ring-red-500"
//                                         : "border-[#243B55] focus:ring-cyan-400"
//                                         }`}
//                                     required
//                                 />
//                                 {validation.phone.isTouched && (
//                                     <div className="absolute right-3 top-3">
//                                         {validation.phone.isValid ? (
//                                             <CheckCircle className="text-green-500 animate-bounce" size={20} />
//                                         ) : (
//                                             <XCircle className="text-red-500 animate-pulse" size={20} />
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                             {validation.phone.isTouched && validation.phone.message && (
//                                 <p className={`text-sm animate-fade-in ${validation.phone.isValid ? 'text-green-400' : 'text-red-400'}`}>
//                                     {validation.phone.message}
//                                 </p>
//                             )}

//                             {/* Password Field with Validation */}
//                             <div className="relative group">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     placeholder="Create a strong password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     className={`w-full pl-3 pr-20 py-3 rounded-xl bg-black/40 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-cyan-400 ${validation.password.isTouched
//                                         ? validation.password.isValid
//                                             ? "border-green-500 focus:ring-green-500"
//                                             : "border-red-500 focus:ring-red-500"
//                                         : "border-[#243B55] focus:ring-cyan-400"
//                                         }`}
//                                     required
//                                 />
//                                 <div className="absolute right-3 top-3 flex gap-2">
//                                     {validation.password.isTouched && (
//                                         <div>
//                                             {validation.password.isValid ? (
//                                                 <CheckCircle className="text-green-500 animate-bounce" size={20} />
//                                             ) : (
//                                                 <XCircle className="text-red-500 animate-pulse" size={20} />
//                                             )}
//                                         </div>
//                                     )}
//                                     {showPassword ? (
//                                         <EyeOff
//                                             className="text-cyan-400 cursor-pointer hover:text-purple-400 transition-colors duration-300"
//                                             onClick={() => setShowPassword(false)}
//                                             size={20}
//                                         />
//                                     ) : (
//                                         <Eye
//                                             className="text-cyan-400 cursor-pointer hover:text-purple-400 transition-colors duration-300"
//                                             onClick={() => setShowPassword(true)}
//                                             size={20}
//                                         />
//                                     )}
//                                 </div>
//                             </div>
//                             {validation.password.isTouched && validation.password.message && (
//                                 <p className={`text-sm animate-fade-in ${validation.password.isValid ? 'text-green-400' : 'text-red-400'}`}>
//                                     {validation.password.message}
//                                 </p>
//                             )}

//                             {/* Password Requirements */}
//                             {validation.password.isTouched && !validation.password.isValid && (
//                                 <div className="bg-black/40 p-3 rounded-lg border border-[#243B55] animate-slide-down">
//                                     <p className="text-sm text-gray-300 mb-2">Password must contain:</p>
//                                     <ul className="text-xs text-gray-400 space-y-1">
//                                         <li className={formData.password.length >= 6 ? "text-green-400" : ""}>
//                                             • At least 6 characters
//                                         </li>
//                                         <li className={/[A-Z]/.test(formData.password) ? "text-green-400" : ""}>
//                                             • One uppercase letter (A-Z)
//                                         </li>
//                                         <li className={/[a-z]/.test(formData.password) ? "text-green-400" : ""}>
//                                             • One lowercase letter (a-z)
//                                         </li>
//                                         <li className={/\d/.test(formData.password) ? "text-green-400" : ""}>
//                                             • One number (0-9)
//                                         </li>
//                                         <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? "text-green-400" : ""}>
//                                             • One special character (!@#$%^&* etc.)
//                                         </li>
//                                     </ul>
//                                 </div>
//                             )}

//                             {/* Referral Field */}
//                             <div className="relative group">
//                                 <Gift className="absolute left-3 top-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
//                                 <input
//                                     type="text"
//                                     name="referral"
//                                     placeholder="Enter refer code for bonus reward"
//                                     value={formData.referral}
//                                     onChange={handleChange}
//                                     className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 group-hover:border-cyan-400"
//                                 />
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={loading || !isFormValid()}
//                                 className={`w-full py-3 mt-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 ${isFormValid()
//                                     ? "bg-gradient-to-r from-[#6B8CFF] to-[#A26BFF] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:from-[#7B9CFF] hover:to-[#B27BFF]"
//                                     : "bg-gray-600 cursor-not-allowed opacity-50"
//                                     } ${loading ? 'animate-pulse' : ''}`}
//                             >
//                                 {loading ? (
//                                     <span className="flex items-center justify-center">
//                                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                                         Creating Account...
//                                     </span>
//                                 ) : (
//                                     "CREATE ACCOUNT"
//                                 )}
//                             </button>
//                         </form>

//                         {error && (
//                             <div className="mt-3 p-3 bg-red-500/20 border border-red-500 rounded-lg animate-shake">
//                                 <p className="text-red-400 text-center text-sm">{error}</p>
//                             </div>
//                         )}
//                     </div>
//                </div>
//            </div>

//             {/* Add CSS for animations */}
//             <style jsx>{`
//                 @keyframes gradient-shift {
//                     0% { background-position: 0% 50%; }
//                     50% { background-position: 100% 50%; }
//                     100% { background-position: 0% 50%; }
//                 }
                
//                 @keyframes float {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50% { transform: translateY(-20px) rotate(180deg); }
//                 }
                
//                 @keyframes pulse-slow {
//                     0%, 100% { opacity: 0.2; transform: scale(1); }
//                     50% { opacity: 0.3; transform: scale(1.1); }
//                 }
                
//                 @keyframes text-shimmer {
//                     0% { background-position: -200% center; }
//                     100% { background-position: 200% center; }
//                 }
                
//                 @keyframes slide-down {
//                     from { opacity: 0; transform: translateY(-10px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
                
//                 @keyframes fade-in {
//                     from { opacity: 0; }
//                     to { opacity: 1; }
//                 }
                
//                 @keyframes shake {
//                     0%, 100% { transform: translateX(0); }
//                     25% { transform: translateX(-5px); }
//                     75% { transform: translateX(5px); }
//                 }
                
//                 .animate-gradient-shift {
//                     background: linear-gradient(-45deg, #0A0A0A, #1A1A2E, #16213E, #0F3460);
//                     background-size: 400% 400%;
//                     animation: gradient-shift 15s ease infinite;
//                 }
                
//                 .animate-float {
//                     animation: float 6s ease-in-out infinite;
//                 }
                
//                 .animate-pulse-slow {
//                     animation: pulse-slow 4s ease-in-out infinite;
//                 }
                
//                 .animate-text-shimmer {
//                     background: linear-gradient(90deg, #6B8CFF, #A26BFF, #FF6B8B, #A26BFF, #6B8CFF);
//                     background-size: 200% auto;
//                     background-clip: text;
//                     -webkit-background-clip: text;
//                     -webkit-text-fill-color: transparent;
//                     animation: text-shimmer 3s linear infinite;
//                 }
                
//                 .animate-slide-down {
//                     animation: slide-down 0.3s ease-out;
//                 }
                
//                 .animate-fade-in {
//                     animation: fade-in 0.3s ease-out;
//                 }
                
//                 .animate-shake {
//                     animation: shake 0.5s ease-in-out;
//                 }
                
//                 .grid-pattern {
//                     background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//                                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
//                     background-size: 50px 50px;
//                 }
                
//                 .animate-grid-move {
//                     animation: grid-move 20s linear infinite;
//                 }
                
//                 @keyframes grid-move {
//                     0% { transform: translate(0, 0); }
//                     100% { transform: translate(50px, 50px); }
//                 }
                
//                 .particles-container {
//                     position: absolute;
//                     top: 0;
//                     left: 0;
//                     width: 100%;
//                     height: 100%;
//                 }
                
//                 .particle {
//                     position: absolute;
//                     width: 2px;
//                     height: 2px;
//                     background: white;
//                     border-radius: 50%;
//                     animation: particle-float 8s linear infinite;
//                     opacity: 0;
//                 }
                
//                 @keyframes particle-float {
//                     0% {
//                         transform: translateY(100vh) rotate(0deg);
//                         opacity: 0;
//                     }
//                     10% {
//                         opacity: 1;
//                     }
//                     90% {
//                         opacity: 1;
//                     }
//                     100% {
//                         transform: translateY(-100px) rotate(360deg);
//                         opacity: 0;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default RegistrationForm;




"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, User, Phone, Gift, CheckCircle, XCircle, Download } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseConfig";
import Image from "next/image";
import logo from '../../../public/logo.jpeg'

const generateRandomUserUID = () => {
    const chars = "0123456789";
    let uid = "";
    for (let i = 0; i < 8; i++) {
        uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uid;
};

const getPreciseTimestamp = () => new Date().toISOString();

// ✅ Gaming Background Animation Component
const GamingBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#0F3460] animate-gradient-shift"></div>

            {/* Floating Gaming Elements */}
            <div className="absolute inset-0">

                {/* Floating Stars */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`star-${i}`}
                        className="absolute animate-pulse opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    >
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                ))}

                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="grid-pattern animate-grid-move"></div>
                </div>

                {/* Pulsing Glow Effects */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-blue-500 rounded-full filter blur-3xl opacity-15 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Animated Particles */}
            <div className="particles-container">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

const RegistrationForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const referralFromURL = searchParams?.get("Invitecode");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [appUrl, setAppUrl] = useState("");
    const [appLoading, setAppLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        referral: "",
    });

    // ✅ Validation states
    const [validation, setValidation] = useState({
        phone: {
            isValid: false,
            message: "",
            isTouched: false
        },
        password: {
            isValid: false,
            message: "",
            isTouched: false
        }
    });

    // ✅ Fetch App Config from Firebase
    const fetchAppConfig = async () => {
        try {
            const appConfigRef = doc(db, "Appconfig", "docId");
            const appConfigSnap = await getDoc(appConfigRef);

            if (appConfigSnap.exists()) {
                const configData = appConfigSnap.data();
                setAppUrl(configData.appURL || "");
                console.log("✅ App URL fetched:", configData.appURL);
            } else {
                console.log("❌ AppConfig document not found");
            }
        } catch (error) {
            console.error("❌ Error fetching AppConfig:", error);
        } finally {
            setAppLoading(false);
        }
    };

    useEffect(() => {
        if (referralFromURL) {
            setFormData((prev) => ({ ...prev, referral: referralFromURL }));
        }
        // Fetch app config when component mounts
        fetchAppConfig();
    }, [referralFromURL]);

    // ✅ Handle Install Button Click
    const handleInstallClick = () => {
        if (appUrl) {
            window.open(appUrl, "_blank");
            console.log("📱 Opening app download link:", appUrl);
        } else {
            console.log("❌ App URL not available");
            alert("App download link is currently unavailable. Please try again later.");
        }
    };

    // ✅ Phone Number Validation
    const validatePhone = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phone) {
            return { isValid: false, message: "Phone number is required" };
        }
        if (!phoneRegex.test(phone)) {
            return { isValid: false, message: "Enter a valid 10-digit Indian phone number" };
        }
        return { isValid: true, message: "Valid phone number" };
    };

    // ✅ Password Validation
    const validatePassword = (password) => {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (!password) {
            return { isValid: false, message: "Password is required" };
        }
        if (password.length < minLength) {
            return { isValid: false, message: `Password must be at least ${minLength} characters` };
        }
        if (!hasUpperCase) {
            return { isValid: false, message: "Add at least one uppercase letter" };
        }
        if (!hasLowerCase) {
            return { isValid: false, message: "Add at least one lowercase letter" };
        }
        if (!hasNumbers) {
            return { isValid: false, message: "Add at least one number" };
        }
        if (!hasSpecialChar) {
            return { isValid: false, message: "Add at least one special character" };
        }
        return { isValid: true, message: "Strong password" };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // ✅ Real-time validation
        if (name === "phone") {
            const phoneValidation = validatePhone(value);
            setValidation(prev => ({
                ...prev,
                phone: {
                    ...phoneValidation,
                    isTouched: true
                }
            }));
        }

        if (name === "password") {
            const passwordValidation = validatePassword(value);
            setValidation(prev => ({
                ...prev,
                password: {
                    ...passwordValidation,
                    isTouched: true
                }
            }));
        }
    };

    // ✅ Handle blur events for validation
    const handleBlur = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const phoneValidation = validatePhone(value);
            setValidation(prev => ({
                ...prev,
                phone: {
                    ...phoneValidation,
                    isTouched: true
                }
            }));
        }

        if (name === "password") {
            const passwordValidation = validatePassword(value);
            setValidation(prev => ({
                ...prev,
                password: {
                    ...passwordValidation,
                    isTouched: true
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // ✅ Final validation before submission
        const phoneValidation = validatePhone(formData.phone);
        const passwordValidation = validatePassword(formData.password);

        if (!phoneValidation.isValid || !passwordValidation.isValid) {
            setError("Please fix validation errors before submitting");
            setLoading(false);
            return;
        }

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
                ReferredBy: formData.referral || "",
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
            const appUsageRef = doc(db, "AppUsage", "docId");
            await updateDoc(appUsageRef, {
                TotalUsersCount: increment(1),
                UpdatedAt: timestamp,
            });

            router.push("/");
        } catch (err) {
            console.error("Signup Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Check if form is valid for submission
    const isFormValid = () => {
        return (
            formData.name &&
            formData.email &&
            formData.phone &&
            formData.password &&
            validation.phone.isValid &&
            validation.password.isValid
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* ✅ Gaming Background Animation */}
            <GamingBackground />

            <div className="flex items-center flex-wrap">
                <div className="hidden lg:flex w-1/2 lg:pe-5 backdrop-blur-xl rounded-3xl shadow-2xl">
                    <Image className="backdrop-blur-xl rounded-3xl shadow-2xl" src={logo} alt="logo" />
                </div>

                {/* Main Form Container */}
                <div className="w-full lg:w-1/2 lg:ps-5">
                    <div className="flex gap-3 items-center justify-center pb-5 lg:hidden">
                        <Image className="w-15 h-15 lg:w-full lg:h-auto backdrop-blur-xl rounded-3xl shadow-2xl" src={logo} alt="logo" />
                        <h2 className="font-semibold text-3xl">Profit Area</h2>
                    </div>
                    <div className=" bg-[#0E0E1A]/80 backdrop-blur-xl rounded-3xl shadow-2xl p-5 lg:p-8 border border-[#6B8CFF]/30 relative z-10 transform hover:scale-[1.02] transition-transform duration-300">

                        {/* Animated Header */}
                        <div className="text-center mb-4">
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6B8CFF] via-[#A26BFF] to-[#FF6B8B] animate-text-shimmer mb-2 tracking-wide">
                                JOIN THE GAME
                            </h2>
                            <p className="text-gray-300 animate-pulse">
                                Create your account and start earning rewards
                            </p>
                        </div>

                        {/* ✅ INSTALL BUTTON - Registration Form के ऊपर */}
                        <div className="mb-6">
                            <button
                                onClick={handleInstallClick}
                                disabled={!appUrl}
                                className={`w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${appUrl
                                    ? "bg-gradient-to-r from-[#105943] to-[#0c4a34] shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                                    : "bg-gray-600 cursor-not-allowed opacity-50"
                                    }`}
                            >
                                <Download size={20} />
                                {appUrl ? "Install App Now" : "Loading App..."}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-5">
                            {/* Name Field */}
                            <div className="relative group">
                                <User className="absolute left-3 top-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 group-hover:border-cyan-400"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 group-hover:border-cyan-400"
                                    required
                                />
                            </div>

                            {/* Phone Field with Validation */}
                            <div className="relative group">
                                <Phone className="absolute left-3 top-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    maxLength="10"
                                    className={`w-full pl-10 pr-10 py-3 rounded-xl bg-black/40 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-cyan-400 ${validation.phone.isTouched
                                        ? validation.phone.isValid
                                            ? "border-green-500 focus:ring-green-500"
                                            : "border-red-500 focus:ring-red-500"
                                        : "border-[#243B55] focus:ring-cyan-400"
                                        }`}
                                    required
                                />
                                {validation.phone.isTouched && (
                                    <div className="absolute right-3 top-3">
                                        {validation.phone.isValid ? (
                                            <CheckCircle className="text-green-500 animate-bounce" size={20} />
                                        ) : (
                                            <XCircle className="text-red-500 animate-pulse" size={20} />
                                        )}
                                    </div>
                                )}
                            </div>
                            {validation.phone.isTouched && validation.phone.message && (
                                <p className={`text-sm animate-fade-in ${validation.phone.isValid ? 'text-green-400' : 'text-red-400'}`}>
                                    {validation.phone.message}
                                </p>
                            )}

                            {/* Password Field with Validation */}
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full pl-3 pr-20 py-3 rounded-xl bg-black/40 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-cyan-400 ${validation.password.isTouched
                                        ? validation.password.isValid
                                            ? "border-green-500 focus:ring-green-500"
                                            : "border-red-500 focus:ring-red-500"
                                        : "border-[#243B55] focus:ring-cyan-400"
                                        }`}
                                    required
                                />
                                <div className="absolute right-3 top-3 flex gap-2">
                                    {validation.password.isTouched && (
                                        <div>
                                            {validation.password.isValid ? (
                                                <CheckCircle className="text-green-500 animate-bounce" size={20} />
                                            ) : (
                                                <XCircle className="text-red-500 animate-pulse" size={20} />
                                            )}
                                        </div>
                                    )}
                                    {showPassword ? (
                                        <EyeOff
                                            className="text-cyan-400 cursor-pointer hover:text-purple-400 transition-colors duration-300"
                                            onClick={() => setShowPassword(false)}
                                            size={20}
                                        />
                                    ) : (
                                        <Eye
                                            className="text-cyan-400 cursor-pointer hover:text-purple-400 transition-colors duration-300"
                                            onClick={() => setShowPassword(true)}
                                            size={20}
                                        />
                                    )}
                                </div>
                            </div>
                            {validation.password.isTouched && validation.password.message && (
                                <p className={`text-sm animate-fade-in ${validation.password.isValid ? 'text-green-400' : 'text-red-400'}`}>
                                    {validation.password.message}
                                </p>
                            )}

                            {/* Password Requirements */}
                            {validation.password.isTouched && !validation.password.isValid && (
                                <div className="bg-black/40 p-3 rounded-lg border border-[#243B55] animate-slide-down">
                                    <p className="text-sm text-gray-300 mb-2">Password must contain:</p>
                                    <ul className="text-xs text-gray-400 space-y-1">
                                        <li className={formData.password.length >= 6 ? "text-green-400" : ""}>
                                            • At least 6 characters
                                        </li>
                                        <li className={/[A-Z]/.test(formData.password) ? "text-green-400" : ""}>
                                            • One uppercase letter (A-Z)
                                        </li>
                                        <li className={/[a-z]/.test(formData.password) ? "text-green-400" : ""}>
                                            • One lowercase letter (a-z)
                                        </li>
                                        <li className={/\d/.test(formData.password) ? "text-green-400" : ""}>
                                            • One number (0-9)
                                        </li>
                                        <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? "text-green-400" : ""}>
                                            • One special character (!@#$%^&* etc.)
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Referral Field */}
                            <div className="relative group">
                                <Gift className="absolute left-3 top-3 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                                <input
                                    type="text"
                                    name="referral"
                                    placeholder="Enter refer code for bonus reward"
                                    value={formData.referral}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-[#243B55] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 group-hover:border-cyan-400"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !isFormValid()}
                                className={`w-full py-3 mt-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 ${isFormValid()
                                    ? "bg-gradient-to-r from-[#6B8CFF] to-[#A26BFF] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:from-[#7B9CFF] hover:to-[#B27BFF]"
                                    : "bg-gray-600 cursor-not-allowed opacity-50"
                                    } ${loading ? 'animate-pulse' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating Account...
                                    </span>
                                ) : (
                                    "CREATE ACCOUNT"
                                )}
                            </button>
                        </form>

                        {error && (
                            <div className="mt-3 p-3 bg-red-500/20 border border-red-500 rounded-lg animate-shake">
                                <p className="text-red-400 text-center text-sm">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add CSS for animations */}
            <style jsx>{`
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.1); }
                }
                
                @keyframes text-shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .animate-gradient-shift {
                    background: linear-gradient(-45deg, #0A0A0A, #1A1A2E, #16213E, #0F3460);
                    background-size: 400% 400%;
                    animation: gradient-shift 15s ease infinite;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                
                .animate-text-shimmer {
                    background: linear-gradient(90deg, #6B8CFF, #A26BFF, #FF6B8B, #A26BFF, #6B8CFF);
                    background-size: 200% auto;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: text-shimmer 3s linear infinite;
                }
                
                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                
                .grid-pattern {
                    background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                }
                
                .animate-grid-move {
                    animation: grid-move 20s linear infinite;
                }
                
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
                
                .particles-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                
                .particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: white;
                    border-radius: 50%;
                    animation: particle-float 8s linear infinite;
                    opacity: 0;
                }
                
                @keyframes particle-float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default RegistrationForm;