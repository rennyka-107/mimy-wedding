"use client";
import { useState, useEffect, useRef } from "react";
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
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { TemplateId, templateSunshineVow } from "@/types/wedding.type";
import JadeWhisperTemplate from "@/wedding-templates/ForestCharm.template";
import CocoaEmbraceTemplate from "@/wedding-templates/CocoaEmbrace.template";
import GoldenBondTemplate from "@/wedding-templates/GoldenBond.template";
import ForestCharmTemplate from "@/wedding-templates/ForestCharm.template";

export default function EditInvitation() {
  const params = useParams();
  const id = params.id;

  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const outerDivRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);

  // State cho modal xuất bản
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  // State cho modal thành công
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [publicData, setPublicData] = useState({
    publicUrl: "",
    publicStart: "",
    publicEnd: ""
  });

  const [originalTemplate, setOriginalTemplate] = useState<{ template_id: TemplateId, template_name: string, template_price: number, configs: { texts: { [key: string]: TextItem }; images: { [key: string]: ImageItem }; background_colors: { [key: string]: BackgroundColorItem }; url_maps: { [key: string]: UrlMapItem }; send_gifts: { [key: string]: SendGiftItem }; } } | null>(null);


  // State cho modal lưu nháp
  const [isSaveDraftModalOpen, setIsSaveDraftModalOpen] = useState(false);

  const { selectedComponent, setSelectedComponent, updateText, updateImage, updateBackgroundColor, updateUrlMap, updateSendGift, resetAllComponent, resetComponent, template, updateTemplate } = useSunshineVowStore();
  function fetchInvitation() {
    fetch(`/api/orders?id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data, "data");
        if (data.status === "success" && data.data) {
          updateTemplate({
            template_id: data.data.template_id,
            template_name: data.data.template_name,
            template_price: data.data.template_price,
            configs: data.data.template_config
          });
          setIsPaid(data.data.public_url !== null && data.data.public_url !== "");
          setOriginalTemplate({
            template_id: data.data.template_id as TemplateId,
            template_name: data.data.template_name,
            template_price: data.data.template_price,
            configs: data.data.template_config
          });
        }
      })
  }

  useEffect(() => {
    if (!id) return;
    fetchInvitation();
    return () => {
      updateTemplate(templateSunshineVow);
    }
  }, [id]);
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

      fetch(`/api/orders?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData),
      }).then(res => res.json()).then(data => {
        console.log(data, "data");
        if (data.status === "success") {
          setIsSaveDraftModalOpen(true);
        } else {
          toast.error("Đã có lỗi xảy ra trong quá trình lưu nháp! Vui lòng liên hệ với chúng tôi theo địa chỉ contact@mimy.vn!");
        }
      })

      console.log("Draft saved:", draftData);
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Có lỗi xảy ra khi lưu nháp!");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    // Kiểm tra nếu click nằm trong outer div nhưng ngoài inner div
    if (
      outerDivRef.current &&
      innerDivRef.current &&
      outerDivRef.current.contains(target) &&
      !innerDivRef.current.contains(target)
    ) {
      // Bỏ chọn component hiện tại
      setSelectedComponent(null, null, null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function renderTemplate() {
    switch (template.template_id) {
      case "sunshine_vow":
        return <SunshineVowTemplate isPublicPage />;
      case "olive_harmony":
        return <OliveHarmonyTemplate isPublicPage />;
      case "cocoa_embrace":
        return <CocoaEmbraceTemplate isPublicPage />;
      case "golden_bond":
        return <GoldenBondTemplate isPublicPage />;
      case "forest_charm":
        return <ForestCharmTemplate isPublicPage />;
      case "jade_whisper":
        return <JadeWhisperTemplate isPublicPage />;
      default:
        return <SunshineVowTemplate isPublicPage />;
    }
  }


  return (
    <div className="w-full h-full flex font-montserrat">
      <div ref={outerDivRef} className="w-3/4 bg-[#E9EAEB] h-full flex items-center justify-center">
        <div ref={innerDivRef} className="w-[448px] h-[calc(100vh-86px)] bg-white border shadow-sm rounded-sm overflow-y-auto">
          {renderTemplate()}
        </div>
      </div>
      <div className="w-1/4 bg-white h-[calc(100vh-86px)] overflow-y-auto">
        <div className="flex justify-center gap-5 items-center border-b border-[#E9EAEB] px-[18px] py-[1rem]">
          <button
            onClick={handleSaveDraft}
            className="cursor-pointer hover:opacity-70 w-[48%] bg-[#F5F5F5] px-[12px] py-[8px] rounded-[4px] text-[14px] font-[500] text-[#4A3B36]">
            Lưu nháp
          </button>
          <button
            onClick={() => {
              if (isPaid) {
                fetch("/api/orders?id=" + id, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    template_config: template.configs
                  }),
                }).then(res => res.json()).then(data => {
                  if (data.status === "success") {
                    toast.success("Cập nhật thiệp thành công!");
                  } else {
                    toast.error("Đã có lỗi xảy ra trong quá trình xuất bản thiệp! Vui lòng liên hệ với chúng tôi trực tiếp qua zalo hoặc facebook!");
                  }
                });
              } else {
                setIsPublishModalOpen(true);
              }
            }}
            className="cursor-pointer hover:opacity-70 w-[48%] bg-[#fd8c06] px-[12px] py-[8px] rounded-[4px] text-[14px] font-[500] text-white">
            Xuất bản
          </button>
        </div>
        <div className="flex flex-col justify-start items-start gap-2 border-b border-[#E9EAEB] px-[18px] py-[1rem]">
          <label className="text-[#4A3B36] text-[14px] font-[600]">Thao tác</label>
          <div className="flex gap-5 w-full">
            <button disabled className="disabled:opacity-70 w-[48%] bg-[#F5F5F5] px-[12px] py-[8px] rounded-[4px] text-[14px] font-[500] text-[#4A3B36]">Xóa bỏ</button>
            <button onClick={() => {
              if (selectedComponent.id !== null) {
                console.log(selectedComponent.id, selectedComponent.type)
                resetComponent(selectedComponent.id, selectedComponent.type, template.template_id);
              } else {
                if(originalTemplate){
                  resetAllComponent(originalTemplate);
                } else {
                  resetAllComponent();
                }
              }
            }} className="cursor-pointer hover:opacity-70 w-[48%] bg-[#fd8c06] px-[12px] py-[8px] rounded-[4px] text-[14px] font-[500] text-white">Quay về mặc định</button>
          </div>
        </div>

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
          <label className="text-[#4A3B36] text-[14px] font-[600]">Tải ảnh lên</label>
          <ImageUpload
            initialImageUrl={(selectedComponent.data as ImageItem)?.url}
            onImageUpload={(file) => {
              // Lưu file ảnh vào state nếu cần
              console.log('File uploaded:', file);
            }}
            onImageUploadUrl={(url) => {
              updateImage(selectedComponent.id ?? '', { url: url });
              setSelectedComponent(selectedComponent.id ?? '', 'image', { ...selectedComponent.data as ImageItem, url: url });
            }}
            onImageRemove={() => {
              // // Xóa ảnh hiện tại và sử dụng URL mặc định
              // const defaultImageUrl = `/templates/SunshineVow/${selectedComponent.id}.png`;
              // updateImage(selectedComponent.id ?? '', { url: defaultImageUrl });
              // setSelectedComponent(selectedComponent.id ?? '', 'image', { ...selectedComponent.data as ImageItem, url: defaultImageUrl });
            }}
            className="w-full"
          />

          {/* Gallery of uploaded images */}
          <div className="mt-4 w-full">
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
              }}
              selectedUrl={(selectedComponent.data as ImageItem)?.url}
              className="w-full"
            />
          </div>
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
            <label className="text-[#4A3B36] text-[14px] font-[600] font-montserrat">Ngân hàng</label>
            <input type="text" value={(selectedComponent.data as SendGiftItem)?.bank_name} onChange={(e) => {
              const newContent = e.target.value;
              updateSendGift(selectedComponent.id ?? '', { bank_name: newContent });
              setSelectedComponent(selectedComponent.id ?? '', 'send_gift', { ...selectedComponent.data as SendGiftItem, bank_name: newContent });
            }} placeholder="Nhập nội dung" className="bg-[#F5F5F5] w-full rounded-[4px] px-[12px] py-[8px] outline-none text-[#222222 ]" />
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
              fetch("/api/orders?id=" + id, {
                method: "PUT",
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
