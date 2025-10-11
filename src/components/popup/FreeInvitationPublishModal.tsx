"use client";
import { useState } from "react";
import PublishInvitationModal from "./PublishInvitationModal";
import PublicationSuccessModal from "./PublicationSuccessModal";

interface FreeInvitationPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (startDate: Date | null, endDate: Date | null) => void;
  dailyRate?: number;
}

export default function FreeInvitationPublishModal({
  isOpen,
  onClose,
  onPublish,
  dailyRate = 10000
}: FreeInvitationPublishModalProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishedDates, setPublishedDates] = useState<{start: Date | null, end: Date | null}>({ start: null, end: null });
  
  const handleSubmit = ({ publicUrl,
    templateId,
    templatePrice,
    templateName,
    code,
    totalMoney,
    // userId,
    // paymentId,
    publicStart,
    publicEnd,
    templateConfigs }: {
      publicUrl: string;
      templateId: string;
      code: string;
      totalMoney: number;
      templatePrice: number;
      templateName: string;
      // userId: string;
      // paymentId: string;
      publicStart: string;
      publicEnd: string;
      templateConfigs: unknown;
    }) => {
    // Save the dates for showing in success modal
    setPublishedDates({ start: new Date(publicStart), end: new Date(publicEnd) });
    
    // Show success modal
    setShowSuccessModal(true);
    
    // Also call the original onPublish handler
    onPublish(new Date(publicStart), new Date(publicEnd));
  };
  
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <>
      <PublishInvitationModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isPaid={false}
        dailyRate={dailyRate}
      />
      
      <PublicationSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        startDate={publishedDates.start}
        endDate={publishedDates.end}
        invitationUrl={`https://mimywedding.com/${Math.random().toString(36).substring(2, 8)}`}
      />
    </>
  );
}
