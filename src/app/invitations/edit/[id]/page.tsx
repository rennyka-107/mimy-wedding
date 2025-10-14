import EditInvitation from "@/components/wedding/EditInvitation";
import { Suspense } from "react";

export default function EditInvitationPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
            <EditInvitation />
        </Suspense>
    )
}
