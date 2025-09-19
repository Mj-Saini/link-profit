
// /app/registration/page.jsx
import React, { Suspense } from "react";
import RegistrationForm from "../components/RegistrationForm";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegistrationForm />
        </Suspense>
    );
}
