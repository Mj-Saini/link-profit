
// // /app/registration/page.jsx
// import React, { Suspense } from "react";
// import RegistrationForm from "../components/RegistrationForm";

// export default function Page() {
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <RegistrationForm />
//         </Suspense>
//     );
// }


"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import RegistrationForm from "../components/RegistrationForm";
import { auth } from "../lib/firebaseConfig";

export default function RegistrationPage() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // agar login hai to registration access mat do
                router.push("/");
            }
        });
        return () => unsubscribe();
    }, [router]);


    return (
        <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
            <RegistrationForm />
        </Suspense>
    )
}
