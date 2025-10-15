"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ColorDisplay from "./ColorDisplay";
import NumberInput from "./NumberInput";
import ImageUpload from "./ImageUpload";
import ImageGallery from "./ImageGallery";
import RefreshableLimitIndicator from "./RefreshableLimitIndicator";
import SunshineVowTemplate from "@/wedding-templates/SunshineVow.template";
import useSunshineVowStore, { BackgroundColorItem, ImageItem, SendGiftItem, TextItem, UrlMapItem } from "@/states/templates/state";
import PublishInvitationModal, { Template } from "@/components/popup/PublishInvitationModal";
import SuccessPublishModal from "@/components/popup/SuccessPublishModal";
import SaveDraftModal from "@/components/popup/SaveDraftModal";
import { toast } from "react-hot-toast";
import OliveHarmonyTemplate from "@/wedding-templates/OliveHarmony.template";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { originalOliveHarmonyState } from "@/states/origin_state/olive_harmony";
import CocoaEmbraceTemplate from "@/wedding-templates/CocoaEmbrace.template";
import GoldenBondTemplate from "@/wedding-templates/GoldenBond.template";
import ForestCharmTemplate from "@/wedding-templates/ForestCharm.template";
import JadeWhisperTemplate from "@/wedding-templates/JadeWhisper.template";
import { originalSunshineVowState } from "@/states/origin_state/sunshine_vow";
import Button from "../ui/Button";
import CloseIcon from "../icons/close";
import { TemplateId } from "@/types/wedding.type";

export default function CreateInvitation() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template_id");

  const router = useRouter();
  // State để trigger refresh limit indicators và gallery
  const [refreshLimitTrigger, setRefreshLimitTrigger] = useState(0);
  const [refreshGalleryTrigger, setRefreshGalleryTrigger] = useState(0);
  const { user } = useAuth();
  console.log(user, "user");
  // State cho modal xuất bản
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  // State cho modal thành công
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [publicData, setPublicData] = useState({
    publicUrl: "",
    publicStart: "",
    publicEnd: ""
  });

  // State cho modal lưu nháp
  const [isSaveDraftModalOpen, setIsSaveDraftModalOpen] = useState(false);
  const [openEditComponent, setOpenEditComponent] = useState<boolean>(false);

  const { selectedComponent, setSelectedComponent, updateText, updateImage, updateBackgroundColor, updateUrlMap, updateSendGift, resetAllComponent, resetComponent, template, updateTemplate } = useSunshineVowStore();

  // Hàm xử lý lưu nháp
  const handleSaveDraft = async () => {
    try {
      // Tạo dữ liệu để lưu nháp
      const draftData = {
        template_id: template.template_id,
        template_configs: template.configs,
        total_money: template.template_price,
        template_price: template.template_price,
        template_name: template.template_name,
        template_config: template.configs,
        user_id: user?.id
      };

      fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData),
      }).then(res => res.json()).then(data => {
        console.log(data, "data");
        if (data.status === "success") {
          setIsSaveDraftModalOpen(true);
        } else {
          toast.error("Đã có lỗi xảy ra trong quá trình lưu nháp! Vui lòng liên hệ với chúng tôi trực tiếp qua zalo hoặc facebook!");
        }
      })

      // Gọi API lưu nháp (có thể tạo API riêng hoặc sử dụng API invitations)
      // Tạm thời hiển thị modal thành công
      // setIsSaveDraftModalOpen(true);

      console.log("Draft saved:", draftData);
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Có lỗi xảy ra khi lưu nháp!");
    }
  };

  useEffect(() => {
    return () => {
      updateTemplate({
        template_id: "sunshine_vow",
        template_name: "Sunshine Vow",
        template_price: 0,
        configs: {
          texts: originalSunshineVowState.texts,
          images: originalSunshineVowState.images,
          background_colors: originalSunshineVowState.background_colors,
          url_maps: originalSunshineVowState.url_maps,
          send_gifts: originalSunshineVowState.send_gifts
        }
      });
    }
  }, [templateId])

  const renderTemplate = useMemo(() => {
    switch (templateId) {
      case "sunshine_vow":
        return <SunshineVowTemplate />;
      case "olive_harmony":
        return <OliveHarmonyTemplate />;
      case "cocoa_embrace":
        return <CocoaEmbraceTemplate />;
      case "golden_bond":
        return <GoldenBondTemplate />;
      case "forest_charm":
        return <ForestCharmTemplate />;
      case "jade_whisper":
        return <JadeWhisperTemplate />;
      default:
        return <SunshineVowTemplate />;
    }
  }, [templateId])
  // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //       delayChildren: 0.1
  //     }
  //   }
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 10 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  // };

  // Handle form submission
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Logic for saving invitation
  //   console.log({
  //     textColor,
  //     fontSize,
  //     deleteAll,
  //     returnToDefault,
  //     alternativeContent
  //   });
  // };

  // console.log(selectedComponent, "wtf")

  return (
    <div className="w-full h-full flex flex-col lg:flex-row font-montserrat">
      <div className="w-full lg:w-3/4 bg-[#E9EAEB] h-full flex items-center justify-center">
        <div className="w-full xs:w-[448px] h-[calc(100vh-86px)] bg-white border-none shadow-sm rounded-sm overflow-y-auto scrollbar-hidden">
          {renderTemplate}
        </div>
      </div>

      <div className={`edit-box max-h-[50vh] lg:max-h-[calc(100vh-86px)] flex flex-col items-end gap-[0.5rem] lg:block w-full absolute bottom-0 z-[1] lg:static lg:w-1/4 lg:h-[calc(100vh-86px)]`}>
        <div onClick={() => setSelectedComponent(null, null, null)} className="lg:hidden w-[fit-content] p-[12px] bg-white rounded-[50%] border">
          <CloseIcon />
        </div>

        <div style={{ boxShadow: '0px -1px 10.7px 0px #00000040' }} className="max-h-[50vh] lg:max-h-full lg:h-full w-full overflow-y-auto scrollbar-hidden bg-white">
          <div className="flex justify-center gap-5 items-center border-b border-[#E9EAEB] px-[18px] py-[1rem]">
            <Button
              variant="ghost"
              onClick={handleSaveDraft}
              className="w-full cursor-pointer"
              >
              Lưu nháp
            </Button>
            <Button
              onClick={() => setIsPublishModalOpen(true)}
              className="w-full cursor-pointer">
              Xuất bản
            </Button>
          </div>
          {selectedComponent.id !== null && <div className={`lg:block flex flex-col justify-start items-start gap-2 border-b border-[#E9EAEB] px-[18px] py-[1rem]`}>
            <label className="text-[#4A3B36] text-[14px] font-[600]">Thao tác</label>
            <div className="flex gap-5 w-full">
              <Button variant="ghost" disabled className="disabled:opacity-70 w-full">Xóa bỏ</Button>
              <Button onClick={() => {
                if (selectedComponent.id !== null) {
                  console.log(selectedComponent.id, selectedComponent.type)
                  resetComponent(selectedComponent.id, selectedComponent.type, templateId as TemplateId);
                } else {
                  resetAllComponent();
                }
              }} className="cursor-pointer w-full">Mặc định</Button>
            </div>
          </div>}

          {selectedComponent.type === 'text' && <div className="flex justify-center gap-5 items-center border-b border-[#E9EAEB] px-[18px] py-[1rem]">
            <div className="flex flex-col items-start w-[48%] gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Màu chữ</label>
              <ColorDisplay
                colorValue={(selectedComponent.data as TextItem)?.text_color}
                onChange={(color) => {
                  updateText(selectedComponent.id ?? '', { text_color: color });
                  setSelectedComponent(selectedComponent.id ?? '', 'text', { ...selectedComponent.data as TextItem, text_color: color });
                }}
                className="w-full px-[12px] py-[8px]"
                editable={true}
              />
            </div>
            <div className="flex flex-col items-start w-[48%] gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Cỡ chữ (px)</label>
              <NumberInput
                value={Number((selectedComponent.data as TextItem)?.text_size.replace('px', ''))}
                onChange={(size) => {
                  updateText(selectedComponent.id ?? '', { text_size: `${size}px` });
                  setSelectedComponent(selectedComponent.id ?? '', 'text', { ...selectedComponent.data as TextItem, text_size: `${size}px` });
                }}
                min={8}
                max={72}
                className="w-full px-[12px] py-[8px]"
              />
            </div>
          </div>}
          {selectedComponent && selectedComponent.type === 'text' && <div className="flex flex-col gap-2 items-start px-[18px] py-[1rem]">
            <label className="text-[#4A3B36] text-[14px] font-[600] font-montserrat">Nội dung thay thế</label>
            <textarea rows={5} value={(selectedComponent.data as TextItem).content} onChange={(e) => {
              const newContent = e.target.value;
              updateText(selectedComponent.id ?? '', { content: newContent });
              setSelectedComponent(selectedComponent.id ?? '', 'text', { ...selectedComponent.data as TextItem, content: newContent });
            }} placeholder="Nhập nội dung" className="bg-[#F5F5F5] w-full rounded-[4px] px-[12px] py-[8px] outline-none text-[#222222]" />
          </div>}
          {selectedComponent && selectedComponent.type === 'image' && <div className="flex flex-col gap-2 items-start px-[18px] py-[1rem]">
            {/* <label className="text-[#4A3B36] text-[14px] font-[600]">Tải ảnh lên</label>

          <RefreshableLimitIndicator type="image" className="w-full mb-3" refreshTrigger={refreshLimitTrigger} /> */}
            <ImageUpload
              initialImageUrl={(selectedComponent.data as ImageItem)?.url}
              onImageUpload={(file) => {
                console.log('File uploaded:', file);
              }}
              onImageUploadUrl={(url) => {
                updateImage(selectedComponent.id ?? '', { url: url });
                setSelectedComponent(selectedComponent.id ?? '', 'image', { ...selectedComponent.data as ImageItem, url: url });

                setRefreshLimitTrigger(prev => prev + 1);
                setRefreshGalleryTrigger(prev => prev + 1);
              }}
              onImageRemove={() => {
                const defaultImageUrl = `/templates/SunshineVow/${selectedComponent.id}.png`;
                updateImage(selectedComponent.id ?? '', { url: defaultImageUrl });
                setSelectedComponent(selectedComponent.id ?? '', 'image', { ...selectedComponent.data as ImageItem, url: defaultImageUrl });
              }}
              className="w-full"
            />

            {/* <div className="mt-4 w-full">
              <ImageGallery
                onImageSelect={(url) => {
                  updateImage(selectedComponent.id ?? '', { url: url });
                  setSelectedComponent(selectedComponent.id ?? '', 'image', { ...selectedComponent.data as ImageItem, url: url });
                }}
                onImageDelete={(imageId, imageUrl) => {
                  // Nếu ảnh đang được chọn là ảnh bị xóa, reset về ảnh mặc định
                  const currentImage = selectedComponent.data as ImageItem;
                  if (currentImage?.url === imageUrl) {
                    const defaultImageUrl = `/templates/SunshineVow/${selectedComponent.id}.png`;
                    updateImage(selectedComponent.id ?? '', { url: defaultImageUrl });
                    setSelectedComponent(selectedComponent.id ?? '', 'image', { ...currentImage, url: defaultImageUrl });
                  }

                  setRefreshLimitTrigger(prev => prev + 1);
                  setRefreshGalleryTrigger(prev => prev + 1);
                }}
                selectedUrl={(selectedComponent.data as ImageItem)?.url}
                className="w-full"
                refreshTrigger={refreshGalleryTrigger}
              />
            </div> */}
          </div>}
          {selectedComponent && selectedComponent.type === 'background_color' && <div className="flex gap-2 justify-between px-[18px] py-[1rem]">
            <div className="flex flex-col items-start w-[48%] gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Màu nền</label>
              <ColorDisplay
                colorValue={(selectedComponent.data as BackgroundColorItem)?.color}
                onChange={(color) => {
                  updateBackgroundColor(selectedComponent.id ?? '', { color: color });
                  setSelectedComponent(selectedComponent.id ?? '', 'background_color', { ...selectedComponent.data as BackgroundColorItem, color: color });
                }}
                className="w-full px-[12px] py-[8px]"
                editable={true}
              />
            </div>
            <div className="flex flex-col items-start w-[48%] gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Màu viền</label>
              <ColorDisplay
                colorValue={(selectedComponent.data as BackgroundColorItem)?.border_color}
                onChange={(color) => {
                  updateBackgroundColor(selectedComponent.id ?? '', { border_color: color });
                  setSelectedComponent(selectedComponent.id ?? '', 'background_color', { ...selectedComponent.data as BackgroundColorItem, border_color: color });
                }}
                className="w-full px-[12px] py-[8px]"
                editable={true}
              />
            </div>
          </div>}
          {selectedComponent && selectedComponent.type === 'url_map' && <div className="flex flex-col gap-2 items-start px-[18px] py-[1rem]">
            <label className="text-[#4A3B36] text-[14px] font-[600]">Đường dẫn Google Maps</label>
            <textarea rows={5} value={(selectedComponent.data as UrlMapItem).url} onChange={(e) => {
              const newContent = e.target.value;
              updateUrlMap(selectedComponent.id ?? '', { url: newContent });
              setSelectedComponent(selectedComponent.id ?? '', 'url_map', { ...selectedComponent.data as UrlMapItem, url: newContent });
            }} placeholder="Nhập url" className="bg-[#F5F5F5] w-full rounded-[4px] px-[12px] py-[8px] outline-none text-[#222222]" />
          </div>}
          {selectedComponent && selectedComponent.type === 'send_gift' && <div className="flex gap-2 items-center justify-between px-[18px] py-[1rem]">
            <div className="flex flex-col items-start w-[48%] gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Màu chữ</label>
              <ColorDisplay
                colorValue={(selectedComponent.data as SendGiftItem)?.text_color}
                onChange={(color) => {
                  updateSendGift(selectedComponent.id ?? '', { text_color: color });
                  setSelectedComponent(selectedComponent.id ?? '', 'send_gift', { ...selectedComponent.data as SendGiftItem, text_color: color });
                }}
                className="w-full px-[12px] py-[8px]"
                editable={true}
              />
            </div>
            <div className="flex flex-col items-start w-[48%] gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Cỡ chữ (px)</label>
              <NumberInput
                value={Number((selectedComponent.data as SendGiftItem)?.text_size.replace('px', ''))}
                onChange={(size) => {
                  updateSendGift(selectedComponent.id ?? '', { text_size: `${size}px` });
                  setSelectedComponent(selectedComponent.id ?? '', 'send_gift', { ...selectedComponent.data as SendGiftItem, text_size: `${size}px` });
                }}
                min={8}
                max={72}
                className="w-full px-[12px] py-[8px]"
              />
            </div>
          </div>}
          {selectedComponent && selectedComponent.type === 'send_gift' && <div className="flex justify-between gap-2 items-center px-[18px] py-[1rem]">
            <div className="flex flex-col items-start w-[48%] gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Màu nền</label>
              <ColorDisplay
                colorValue={(selectedComponent.data as SendGiftItem)?.background_color}
                onChange={(color) => {
                  updateSendGift(selectedComponent.id ?? '', { background_color: color });
                  setSelectedComponent(selectedComponent.id ?? '', 'send_gift', { ...selectedComponent.data as SendGiftItem, background_color: color });
                }}
                className="w-full px-[12px] py-[8px]"
                editable={true}
              />
            </div>
            <div className="flex flex-col items-start w-[48%] gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Màu viền</label>
              <ColorDisplay
                colorValue={(selectedComponent.data as SendGiftItem)?.border_color}
                onChange={(color) => {
                  updateSendGift(selectedComponent.id ?? '', { border_color: color });
                  setSelectedComponent(selectedComponent.id ?? '', 'send_gift', { ...selectedComponent.data as SendGiftItem, border_color: color });
                }}
                className="w-full px-[12px] py-[8px]"
                editable={true}
              />
            </div>
          </div>}
          {selectedComponent && selectedComponent.type === 'send_gift' && <div className="flex flex-col gap-2 items-start px-[18px] py-[1rem]">
            <label className="text-[#4A3B36] text-[14px] font-[600] font-montserrat">Nội dung thay thế</label>
            <textarea rows={5} value={(selectedComponent.data as SendGiftItem).content} onChange={(e) => {
              const newContent = e.target.value;
              updateSendGift(selectedComponent.id ?? '', { content: newContent });
              setSelectedComponent(selectedComponent.id ?? '', 'send_gift', { ...selectedComponent.data as SendGiftItem, content: newContent });
            }} placeholder="Nhập nội dung" className="bg-[#F5F5F5] w-full rounded-[4px] px-[12px] py-[8px] outline-none text-[#222222]" />
          </div>}
          {selectedComponent && selectedComponent.type === 'send_gift' && <div className="flex flex-col gap-5 items-start px-[18px] py-[1rem]">
            <div className="flex flex-col items-start w-full gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Ngân hàng</label>
              <input type="text" value={(selectedComponent.data as SendGiftItem)?.bank_name} onChange={(e) => {
                const newContent = e.target.value;
                updateSendGift(selectedComponent.id ?? '', { bank_name: newContent });
                setSelectedComponent(selectedComponent.id ?? '', 'send_gift', { ...selectedComponent.data as SendGiftItem, bank_name: newContent });
              }} placeholder="Nhập nội dung" className="bg-[#F5F5F5] w-full rounded-[4px] px-[12px] py-[8px] outline-none text-[#222222]" />
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Tên tài khoản</label>
              <input type="text" value={(selectedComponent.data as SendGiftItem)?.bank_holder} onChange={(e) => {
                const newContent = e.target.value;
                updateSendGift(selectedComponent.id ?? '', { bank_holder: newContent });
                setSelectedComponent(selectedComponent.id ?? '', 'send_gift', { ...selectedComponent.data as SendGiftItem, bank_holder: newContent });
              }} placeholder="Nhập nội dung" className="bg-[#F5F5F5] w-full rounded-[4px] px-[12px] py-[8px] outline-none text-[#222222]" />
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Số tài khoản</label>
              <input type="text" value={(selectedComponent.data as SendGiftItem)?.bank_number} onChange={(e) => {
                const newContent = e.target.value;
                updateSendGift(selectedComponent.id ?? '', { bank_number: newContent });
                setSelectedComponent(selectedComponent.id ?? '', 'send_gift', { ...selectedComponent.data as SendGiftItem, bank_number: newContent });
              }} placeholder="Nhập nội dung" className="bg-[#F5F5F5] w-full rounded-[4px] px-[12px] py-[8px] outline-none text-[#222222]" />
            </div>
          </div>}
        </div>
      </div>

      {/* Modal xuất bản thiệp */}
      <PublishInvitationModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onSubmit={({
          publicUrl,
          templateId,
          code,
          totalMoney,
          templatePrice,
          templateName,
          // userId,
          // paymentId,
          publicStart,
          publicEnd,
          templateConfigs,
        }, callback) => {
          fetch("/api/payment?code=" + code).then(res => res.json()).then(data => {
            console.log(data, "data");
            if (data.status === "success" && data.data) {
              const { id: paymentId } = data.data;
              fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  code,
                  total_money: templatePrice,
                  template_id: templateId,
                  template_price: templatePrice,
                  user_id: user?.id,
                  payment_id: paymentId,
                  public_url: publicUrl,
                  public_start: publicStart,
                  public_end: publicEnd,
                  template_name: templateName,
                  template_config: templateConfigs
                }),
              }).then(res => res.json()).then(data => {
                console.log(data, "data");
                if (data.status === "success") {
                  // Lưu thông tin để hiển thị trong modal thành công
                  setPublicData({
                    publicUrl: process.env.NEXT_PUBLIC_BASE_URL + publicUrl,
                    publicStart,
                    publicEnd
                  });
                  // Hiển thị modal thành công thay vì toast
                  setIsSuccessModalOpen(true);
                  callback && callback();
                } else {
                  toast.error("Đã có lỗi xảy ra trong quá trình xuất bản thiệp! Vui lòng liên hệ với chúng tôi trực tiếp qua zalo hoặc facebook!");
                }
              });
            } else {
              toast.error("Đơn hàng của bạn chưa được thanh toán! Vui lòng thanh toán để xuất bản thiệp cưới của bạn.");
            }
          })
          // Xử lý xuất bản thiệp

        }}
        isPaid={false} // Thay đổi thành true nếu sử dụng phiên bản trả phí
        templates={[
          {
            id: "blush-love",
            name: "Blush Love",
            price: 150000,
            imageUrl: "/templates/SunshineVow/cover.png"
          }
        ]}
        dailyRate={10000}
      />

      {/* Modal thành công */}
      <SuccessPublishModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        publicUrl={publicData.publicUrl}
        publicStart={publicData.publicStart}
        publicEnd={publicData.publicEnd}
      />

      {/* Modal lưu nháp */}
      <SaveDraftModal
        isOpen={isSaveDraftModalOpen}
        onClose={() => {
          router.push(`/invitations`);
          setIsSaveDraftModalOpen(false)
        }}
      />
    </div>
  );
}

function ResizablePopup({ children }: { children: React.ReactNode }) {
  const [height, setHeight] = useState(400); // chiều cao mặc định
  const popupRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    isResizing.current = true;
    startY.current = e.clientY;
    startHeight.current = popupRef.current?.offsetHeight ?? 0;
    document.addEventListener("mousemove", doResize);
    document.addEventListener("mouseup", stopResize);
  };

  const doResize = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newHeight = startHeight.current + (e.clientY - startY.current);
    setHeight(Math.max(200, Math.min(newHeight, window.innerHeight - 100))); // giới hạn
  };

  const stopResize = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", doResize);
    document.removeEventListener("mouseup", stopResize);
  };

  return (
    <div
      ref={popupRef}
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg w-[500px] overflow-hidden flex flex-col"
      style={{ height }}
    >
      <div className="flex-1 overflow-auto p-4">{children}</div>

      {/* Handle để kéo */}
      <div
        className="h-3 cursor-row-resize bg-gray-200 hover:bg-gray-300"
        onMouseDown={startResize}
      ></div>
    </div>
  );
}