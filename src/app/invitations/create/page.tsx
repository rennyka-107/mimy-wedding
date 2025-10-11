import CreateInvitation from "@/components/wedding/CreateInvitation";
import { Suspense } from "react";

export default function CreateInvitationPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
            <CreateInvitation />
        </Suspense>
    )
}
