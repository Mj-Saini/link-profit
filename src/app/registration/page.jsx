
"use client";
import { Suspense } from "react";
import RegistrationForm from "../components/RegistrationForm";

export default function RegistrationPage() {

  


    return (
        <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
            <RegistrationForm />
        </Suspense>
    )
}
