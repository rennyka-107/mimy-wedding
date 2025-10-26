"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ColorDisplay from "./ColorDisplay";
import NumberInput from "./NumberInput";
import ImageUpload from "./ImageUpload";
import SunshineVowTemplate from "@/wedding-templates/SunshineVow.template";
import useSunshineVowStore, { BackgroundColorItem, Countdown, ImageItem, SendGiftItem, TextItem, Timeline, UrlMapItem } from "@/states/templates/state";
import PublishInvitationModal from "@/components/popup/PublishInvitationModal";
import SuccessPublishModal from "@/components/popup/SuccessPublishModal";
import SaveDraftModal from "@/components/popup/SaveDraftModal";
import { toast } from "react-hot-toast";
import OliveHarmonyTemplate from "@/wedding-templates/OliveHarmony.template";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import CocoaEmbraceTemplate from "@/wedding-templates/CocoaEmbrace.template";
import GoldenBondTemplate from "@/wedding-templates/GoldenBond.template";
import ForestCharmTemplate from "@/wedding-templates/ForestCharm.template";
import JadeWhisperTemplate from "@/wedding-templates/JadeWhisper.template";
import Button from "../ui/Button";
import CloseIcon from "../icons/close";
import { TemplateId, templateSunshineVow } from "@/types/wedding.type";
import T2010MyLightTemplate from "@/wedding-templates/2010MyLight.template";
import T2010ForYaTemplate from "@/wedding-templates/2010ForYa.template";
import { LoadingRing } from "../ui/Loading";

export default function CreateInvitation() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template_id");

  const router = useRouter();
  const { user } = useAuth();
  console.log(user, "user");

  // Refs for click outside detection
  const outerDivRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);

  // State cho modal xuất bản
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  // State cho modal thành công
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [publicData, setPublicData] = useState({
    publicUrl: "",
    publicStart: "",
    publicEnd: ""
  });

  // State cho modal lưu nháp
  const [isSaveDraftModalOpen, setIsSaveDraftModalOpen] = useState(false);

  const { selectedComponent, setSelectedComponent, updateText, updateImage, updateBackgroundColor, updateUrlMap, updateSendGift, resetAllComponent, resetComponent, template, updateTemplate, updateTimeline, updateCountdown, deleteComponent } = useSunshineVowStore();

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
          toast.error("Đã có lỗi xảy ra trong quá trình lưu nháp! Vui lòng liên hệ với chúng tôi theo địa chỉ contact@mimy.vn!");
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

  // Hàm xử lý click outside
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

  // Thêm event listener khi component mount
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      updateTemplate(templateSunshineVow);
    }
  }, [templateId])

  const renderTemplate = useMemo(() => {
    if (loading) {
      setLoading(false);
      return <></>
    } else {
      switch (templateId) {
        case "sunshine_vow":
          return <SunshineVowTemplate isPublicPage={false} />;
        case "olive_harmony":
          return <OliveHarmonyTemplate isPublicPage={false} />;
        case "cocoa_embrace":
          return <CocoaEmbraceTemplate isPublicPage={false} />;
        case "golden_bond":
          return <GoldenBondTemplate isPublicPage={false} />;
        case "forest_charm":
          return <ForestCharmTemplate isPublicPage={false} />;
        case "jade_whisper":
          return <JadeWhisperTemplate isPublicPage={false} />;
        case "2010_my_light":
          return <T2010MyLightTemplate isPublicPage={false} />;
        case "2010_for_ya":
          return <T2010ForYaTemplate isPublicPage={false} />;
        default:
          return <SunshineVowTemplate isPublicPage={false} />;
      }
    }


  }, [templateId, loading])

  console.log(template, "123123123")


  return (
    <div className="w-full h-full flex flex-col lg:flex-row font-montserrat">
      {loading && <div className="w-full h-[100vh] flex items-center justify-center">
        <LoadingRing />
      </div>}
      {!loading && <div ref={outerDivRef} className="w-full lg:w-3/4 bg-[#E9EAEB] h-full flex items-center justify-center">
        <div ref={innerDivRef} className="w-full xs:w-[448px] h-[calc(100vh-86px)] bg-white shadow-sm rounded-sm overflow-y-auto scrollbar-hidden">
          {renderTemplate}
        </div>
      </div>}

      {!loading && <div className={`edit-box max-h-[50vh] lg:max-h-[calc(100vh-86px)] flex flex-col items-end gap-[0.5rem] lg:block w-full absolute bottom-0 z-[1] lg:static lg:w-1/4 lg:h-[calc(100vh-86px)]`}>
        <div onClick={() => setSelectedComponent(null, null, null)} className="lg:hidden w-[fit-content] p-[12px] bg-white rounded-[50%] border">
          <CloseIcon />
        </div>

        <div style={{ boxShadow: '0px -1px 10.7px 0px #00000040' }} className="max-h-[50vh] lg:max-h-full lg:h-full w-full overflow-y-auto scrollbar-hidden bg-white">
          <div className="flex justify-center gap-5 items-center border-b border-[#E9EAEB] px-[18px] py-[1rem]">
            <Button
              variant="ghost"
              onClick={handleSaveDraft}
              className="w-full cursor-pointer outline-none"
            >
              Lưu nháp
            </Button>
            <Button
              onClick={() => setIsPublishModalOpen(true)}
              className="w-full cursor-pointer">
              Xuất bản
            </Button>
          </div>
          <div className={`lg:block flex flex-col justify-start items-start gap-2 border-b border-[#E9EAEB] px-[18px] py-[1rem]`}>
            <label className="text-[#4A3B36] text-[14px] font-[600]">Thao tác</label>
            <div className="flex gap-5 w-full">
              <Button onClick={() => {
                if (selectedComponent.id !== null) {
                  deleteComponent(selectedComponent.id, selectedComponent.type)
                }
              }} variant="ghost" className="disabled:opacity-70 w-full outline-none focus:border-none">Xóa bỏ</Button>
              <Button onClick={() => {
                if (selectedComponent.id !== null) {
                  console.log(selectedComponent.id, selectedComponent.type)
                  resetComponent(selectedComponent.id, selectedComponent.type, templateId as TemplateId);
                } else {
                  resetAllComponent();
                }
              }} className="cursor-pointer w-full outline-none">Mặc định</Button>
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
            <ImageUpload
              initialImageUrl={(selectedComponent.data as ImageItem)?.url}
              onImageUpload={(file) => {
                console.log('File uploaded:', file);
              }}
              onImageUploadUrl={(url) => {
                updateImage(selectedComponent.id ?? '', { url: url });
                setSelectedComponent(selectedComponent.id ?? '', 'image', { ...selectedComponent.data as ImageItem, url: url });
              }}
              onImageRemove={() => {
                // const defaultImageUrl = `/templates/SunshineVow/${selectedComponent.id}.png`;
                // updateImage(selectedComponent.id ?? '', { url: defaultImageUrl });
                // setSelectedComponent(selectedComponent.id ?? '', 'image', { ...selectedComponent.data as ImageItem, url: defaultImageUrl });
              }}
              className="w-full"
            />
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
          {selectedComponent && selectedComponent.type === 'timeline' && <div className="flex flex-col gap-4 px-[18px] py-[1rem]">
            <div className="flex justify-between items-center">
              <label className="text-[#4A3B36] text-[14px] font-[600]">Dòng thời gian</label>
              <Button
                onClick={() => {
                  const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                  const newTimelineItem: Timeline = {
                    datetime: {
                      text_color: currentTimeline.length > 0 ? currentTimeline[currentTimeline.length - 1].datetime.text_color : "#000000",
                      text_size: currentTimeline.length > 0 ? currentTimeline[currentTimeline.length - 1].datetime.text_size : "14px",
                      content: "00:00"
                    },
                    title: {
                      text_color: currentTimeline.length > 0 ? currentTimeline[currentTimeline.length - 1].title.text_color : "#000000",
                      text_size: currentTimeline.length > 0 ? currentTimeline[currentTimeline.length - 1].title.text_size : "16px",
                      content: "Tiêu đề mới"
                    },
                    description: {
                      text_color: currentTimeline.length > 0 ? currentTimeline[currentTimeline.length - 1].description.text_color : "#666666",
                      text_size: currentTimeline.length > 0 ? currentTimeline[currentTimeline.length - 1].description.text_size : "14px",
                      content: "Mô tả sự kiện"
                    }
                  };
                  const updatedTimeline = [...currentTimeline, newTimelineItem];
                  updateTimeline(updatedTimeline);
                  setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                }}
                className="cursor-pointer text-[12px]"
              >
                + Thêm sự kiện
              </Button>
            </div>

            {(selectedComponent?.data as Timeline[])?.map(({ datetime, title, description }: Timeline, index) => (
              <div className="border border-[#E9EAEB] rounded-[8px] p-[12px]" key={index}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#4A3B36] text-[12px] font-[600]">Sự kiện {index + 1}</span>
                  <button
                    onClick={() => {
                      const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                      const updatedTimeline = currentTimeline.filter((_, i) => i !== index);
                      updateTimeline(updatedTimeline);
                      setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                    }}
                    className="text-red-500 hover:text-red-700 text-[12px] font-[500]"
                  >
                    Xóa
                  </button>
                </div>

                {/* Datetime Section */}
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-[6px]">
                  <label className="text-[#4A3B36] text-[13px] font-[600] mb-2 block">📅 Thời gian</label>
                  <input
                    type="text"
                    value={datetime.content}
                    onChange={(e) => {
                      const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                      const updatedTimeline = [...currentTimeline];
                      updatedTimeline[index] = {
                        ...updatedTimeline[index],
                        datetime: { ...updatedTimeline[index].datetime, content: e.target.value }
                      };
                      updateTimeline(updatedTimeline);
                      setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                    }}
                    placeholder="VD: 10:00"
                    className="bg-white w-full rounded-[4px] px-[12px] py-[6px] outline-none text-[#222222] text-[14px] mb-2 border border-blue-100"
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[#4A3B36] text-[11px] font-[500] mb-1 block">Màu chữ</label>
                      <ColorDisplay
                        colorValue={datetime.text_color}
                        onChange={(color) => {
                          console.log(color, "color")
                          const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                          const updatedTimeline = [...currentTimeline];
                          updatedTimeline[index] = {
                            ...updatedTimeline[index],
                            datetime: { ...updatedTimeline[index].datetime, text_color: color }
                          };
                          updateTimeline(updatedTimeline);
                          setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                        }}
                        className="w-full px-[8px] py-[4px]"
                        editable={true}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[#4A3B36] text-[11px] font-[500] mb-1 block">Cỡ chữ</label>
                      <NumberInput
                        value={Number(datetime.text_size.replace('px', ''))}
                        onChange={(size) => {
                          const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                          const updatedTimeline = [...currentTimeline];
                          updatedTimeline[index] = {
                            ...updatedTimeline[index],
                            datetime: { ...updatedTimeline[index].datetime, text_size: `${size}px` }
                          };
                          updateTimeline(updatedTimeline);
                          setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                        }}
                        min={8}
                        max={72}
                        className="w-full px-[8px] py-[4px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Title Section */}
                <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-[6px]">
                  <label className="text-[#4A3B36] text-[13px] font-[600] mb-2 block">✏️ Tiêu đề</label>
                  <input
                    type="text"
                    value={title.content}
                    onChange={(e) => {
                      const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                      const updatedTimeline = [...currentTimeline];
                      updatedTimeline[index] = {
                        ...updatedTimeline[index],
                        title: { ...updatedTimeline[index].title, content: e.target.value }
                      };
                      updateTimeline(updatedTimeline);
                      setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                    }}
                    placeholder="VD: Lễ ăn hỏi"
                    className="bg-white w-full rounded-[4px] px-[12px] py-[6px] outline-none text-[#222222] text-[14px] mb-2 border border-green-100"
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[#4A3B36] text-[11px] font-[500] mb-1 block">Màu chữ</label>
                      <ColorDisplay
                        colorValue={title.text_color}
                        onChange={(color) => {
                          const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                          const updatedTimeline = [...currentTimeline];
                          updatedTimeline[index] = {
                            ...updatedTimeline[index],
                            title: { ...updatedTimeline[index].title, text_color: color }
                          };
                          updateTimeline(updatedTimeline);
                          setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                        }}
                        className="w-full px-[8px] py-[4px]"
                        editable={true}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[#4A3B36] text-[11px] font-[500] mb-1 block">Cỡ chữ</label>
                      <NumberInput
                        value={Number(title.text_size.replace('px', ''))}
                        onChange={(size) => {
                          const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                          const updatedTimeline = [...currentTimeline];
                          updatedTimeline[index] = {
                            ...updatedTimeline[index],
                            title: { ...updatedTimeline[index].title, text_size: `${size}px` }
                          };
                          updateTimeline(updatedTimeline);
                          setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                        }}
                        min={8}
                        max={72}
                        className="w-full px-[8px] py-[4px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-[6px]">
                  <label className="text-[#4A3B36] text-[13px] font-[600] mb-2 block">📝 Mô tả</label>
                  <textarea
                    rows={3}
                    value={description.content}
                    onChange={(e) => {
                      const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                      const updatedTimeline = [...currentTimeline];
                      updatedTimeline[index] = {
                        ...updatedTimeline[index],
                        description: { ...updatedTimeline[index].description, content: e.target.value }
                      };
                      updateTimeline(updatedTimeline);
                      setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                    }}
                    placeholder="VD: Lễ ăn hỏi tại nhà trai"
                    className="bg-white w-full rounded-[4px] px-[12px] py-[6px] outline-none text-[#222222] text-[14px] mb-2 border border-purple-100"
                  />
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[#4A3B36] text-[11px] font-[500] mb-1 block">Màu chữ</label>
                      <ColorDisplay
                        colorValue={description.text_color}
                        onChange={(color) => {
                          const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                          const updatedTimeline = [...currentTimeline];
                          updatedTimeline[index] = {
                            ...updatedTimeline[index],
                            description: { ...updatedTimeline[index].description, text_color: color }
                          };
                          updateTimeline(updatedTimeline);
                          setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                        }}
                        className="w-full px-[8px] py-[4px]"
                        editable={true}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[#4A3B36] text-[11px] font-[500] mb-1 block">Cỡ chữ</label>
                      <NumberInput
                        value={Number(description.text_size.replace('px', ''))}
                        onChange={(size) => {
                          const currentTimeline = (selectedComponent.data as Timeline[]) || [];
                          const updatedTimeline = [...currentTimeline];
                          updatedTimeline[index] = {
                            ...updatedTimeline[index],
                            description: { ...updatedTimeline[index].description, text_size: `${size}px` }
                          };
                          updateTimeline(updatedTimeline);
                          setSelectedComponent(selectedComponent.id ?? '', 'timeline', updatedTimeline);
                        }}
                        min={8}
                        max={72}
                        className="w-full px-[8px] py-[4px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>}
          {selectedComponent && selectedComponent.type === 'countdown' && <div className="flex flex-col gap-4 px-[18px] py-[1rem]">
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-[6px]">
              <label className="text-[#4A3B36] text-[13px] font-[600] mb-2 block">⏰ Đếm ngược</label>

              <div className="mb-3">
                <label className="text-[#4A3B36] text-[12px] font-[500] mb-1 block">Ngày & Giờ đích</label>
                <input
                  type="datetime-local"
                  value={
                    (selectedComponent.data as { content: Date | string })?.content
                      ? new Date((selectedComponent.data as { content: Date | string }).content).toISOString().slice(0, 16)
                      : ''
                  }
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    updateCountdown({
                      ...(selectedComponent.data as Countdown),
                      content: newDate,
                    });
                    setSelectedComponent(
                      selectedComponent.id ?? '',
                      'countdown',
                      {
                        ...(selectedComponent.data as Countdown),
                        content: newDate
                      }
                    );
                  }}
                  className="bg-white w-full rounded-[4px] px-[12px] py-[6px] outline-none text-[#222222] text-[14px] mb-2 border border-orange-100"
                />
                <p className="text-[#666666] text-[11px] mt-1">
                  Chọn ngày và giờ để đếm ngược tự động hiển thị trên thiệp
                </p>
              </div>

              <div className="mb-3 p-2 bg-white rounded-[4px] border border-orange-100">
                <label className="text-[#4A3B36] text-[11px] font-[600] mb-2 block">Nhãn văn bản</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[#4A3B36] text-[10px] font-[400] mb-1 block">Màu chữ</label>
                    <ColorDisplay
                      colorValue={(selectedComponent.data as Countdown)?.text_color}
                      onChange={(color) => {
                        updateCountdown({
                          ...(selectedComponent.data as Countdown),
                          text_color: color
                        });
                        setSelectedComponent(
                          selectedComponent.id ?? '',
                          'countdown',
                          {
                            ...(selectedComponent.data as Countdown),
                            text_color: color
                          }
                        );
                      }}
                      className="w-full px-[6px] py-[3px]"
                      editable={true}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[#4A3B36] text-[10px] font-[400] mb-1 block">Cỡ chữ</label>
                    <NumberInput
                      value={Number((selectedComponent.data as Countdown)?.text_size?.replace('px', '') || 16)}
                      onChange={(size) => {
                        updateCountdown({
                          ...(selectedComponent.data as Countdown),
                          text_size: `${size}px`
                        });
                        setSelectedComponent(
                          selectedComponent.id ?? '',
                          'countdown',
                          {
                            ...(selectedComponent.data as Countdown),
                            text_size: `${size}px`
                          }
                        );
                      }}
                      min={8}
                      max={72}
                      className="w-full px-[6px] py-[3px]"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3 p-2 bg-white rounded-[4px] border border-orange-100">
                <label className="text-[#4A3B36] text-[11px] font-[600] mb-2 block">Số đếm ngược</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[#4A3B36] text-[10px] font-[400] mb-1 block">Màu số</label>
                    <ColorDisplay
                      colorValue={(selectedComponent.data as Countdown)?.number_color}
                      onChange={(color) => {
                        updateCountdown({
                          ...(selectedComponent.data as Countdown),
                          number_color: color
                        });
                        setSelectedComponent(
                          selectedComponent.id ?? '',
                          'countdown',
                          {
                            ...(selectedComponent.data as Countdown),
                            number_color: color
                          }
                        );
                      }}
                      className="w-full px-[6px] py-[3px]"
                      editable={true}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[#4A3B36] text-[10px] font-[400] mb-1 block">Cỡ số</label>
                    <NumberInput
                      value={Number((selectedComponent.data as Countdown)?.number_size?.replace('px', '') || 24)}
                      onChange={(size) => {
                        updateCountdown({
                          ...(selectedComponent.data as Countdown),
                          number_size: `${size}px`
                        });
                        setSelectedComponent(
                          selectedComponent.id ?? '',
                          'countdown',
                          {
                            ...(selectedComponent.data as Countdown),
                            number_size: `${size}px`
                          }
                        );
                      }}
                      min={8}
                      max={72}
                      className="w-full px-[6px] py-[3px]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-2 bg-white rounded-[4px] border border-orange-100">
                <label className="text-[#4A3B36] text-[11px] font-[600] mb-2 block">Màu nền</label>
                <ColorDisplay
                  colorValue={(selectedComponent.data as Countdown)?.background}
                  onChange={(color) => {
                    updateCountdown({
                      ...(selectedComponent.data as Countdown),
                      background: color
                    });
                    setSelectedComponent(
                      selectedComponent.id ?? '',
                      'countdown',
                      {
                        ...(selectedComponent.data as Countdown),
                        background: color
                      }
                    );
                  }}
                  className="w-full px-[8px] py-[4px]"
                  editable={true}
                />
              </div>
            </div>
          </div>}
        </div>
      </div>}

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