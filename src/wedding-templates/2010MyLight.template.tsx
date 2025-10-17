import useTemplateStore from "@/states/templates/state";
import { template2010MyLight } from "@/types/wedding.type";
import { useEffect } from "react";

export default function T2010MyLightTemplate() {
    const { template: { configs: { texts, images, background_colors, url_maps, send_gifts } }, setSelectedComponent, updateTemplate } = useTemplateStore();

    useEffect(() => {
        updateTemplate(template2010MyLight)
    }, [])


    return (
        <div className="font-afacad relative">
            <img className="w-full" src="/templates/2010MyLight/1.png" alt="first image" />
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedComponent('image_1', 'image', images['image_1'])
                }}
                className="absolute top-[40px] left-1/2 -translate-x-1/2 z-2" style={{
                    width: "368px",
                    aspectRatio: "1/1",
                    backgroundImage: `url("${images['image_1'].url}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitMaskImage: 'url("/templates/2010MyLight/svg1.svg")',
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskImage: 'url("/templates/2010MyLight/svg1.svg")',
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    maskPosition: "center",
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "center",
                    cursor: 'pointer'
                }}>
            </div>
            <svg width="333" height="357" viewBox="0 0 333 357" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-1 absolute top-[55px] left-[48%] -translate-x-1/2">
                <path fillRule="evenodd" clipRule="evenodd" d="M162.362 0.0648419C189.965 -1.33927 212.787 20.3843 236.93 33.8133C259.962 46.6248 287.783 55.1134 301.61 77.5208C315.355 99.7971 306.148 128.767 311.343 154.41C316.396 179.355 337.496 202.135 331.883 226.961C326.272 251.78 296.971 262.979 282.121 283.66C266.371 305.595 265.717 340.36 241.64 352.641C217.692 364.856 189.248 345.42 162.362 344.743C136.217 344.085 108.94 359.175 84.9868 348.696C61.0604 338.229 50.312 310.783 35.5561 289.268C21.6031 268.924 3.34995 249.724 0.325171 225.256C-2.65769 201.127 15.7776 179.792 19.0441 155.7C22.6805 128.88 6.16122 98.4335 20.6244 75.5394C34.7856 53.1233 67.9406 53.6922 91.3671 41.2178C115.819 28.1974 134.683 1.4728 162.362 0.0648419Z" fill="#EBEBEB" />
            </svg>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_1', 'text', texts['text_1'])
            }} style={{ marginTop: '13rem', fontWeight: 400, letterSpacing: '0%', lineHeight: '100%', fontFamily: 'Send Flowers', textAlign: 'center', cursor: 'pointer', color: texts['text_1'].text_color, fontSize: texts['text_1'].text_size }}>{texts['text_1'].content}</div>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_2', 'text', texts['text_2'])
            }} style={{ fontWeight: 400, letterSpacing: '0%', lineHeight: '100%', fontFamily: 'Send Flowers', textAlign: 'center', cursor: 'pointer', color: texts['text_2'].text_color, fontSize: texts['text_2'].text_size }}>{texts['text_2'].content}</div>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_3', 'text', texts['text_3'])
            }} style={{ fontWeight: 400, letterSpacing: '0%', lineHeight: '100%', fontFamily: 'Send Flowers', textAlign: 'center', cursor: 'pointer', color: texts['text_3'].text_color, fontSize: texts['text_3'].text_size }}>{texts['text_3'].content}</div>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_4', 'text', texts['text_4'])
            }} style={{ marginTop: '1rem', fontWeight: 400, letterSpacing: '0%', lineHeight: '100%', textAlign: 'center', cursor: 'pointer', color: texts['text_4'].text_color, fontSize: texts['text_4'].text_size }}>{texts['text_4'].content}</div>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_5', 'text', texts['text_5'])
            }} style={{ marginTop: '0.2rem', fontWeight: 400, letterSpacing: '0%', lineHeight: '100%', textAlign: 'center', cursor: 'pointer', color: texts['text_5'].text_color, fontSize: texts['text_5'].text_size }}>{texts['text_5'].content}</div>
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_6', 'text', texts['text_6'])
            }} style={{ marginTop: '2rem', padding: '0 30px', fontWeight: 400, textAlign: 'justify', textJustify: 'inter-word', letterSpacing: '0%', lineHeight: '100%', cursor: 'pointer', color: texts['text_6'].text_color, fontSize: texts['text_6'].text_size }}>{texts['text_6'].content}</div>
            <img onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('image_2', 'image', images['image_2'])
            }} src={images['image_2'].url} className="w-full px-[30px] rounded-[16px] mt-[24px] cursor-pointer" />
            <div onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('text_7', 'text', texts['text_7'])
            }} style={{ marginTop: '2rem', padding: '0 30px', fontWeight: 400, textAlign: 'justify', textJustify: 'inter-word', letterSpacing: '0%', lineHeight: '100%', cursor: 'pointer', color: texts['text_7'].text_color, fontSize: texts['text_7'].text_size }}>{texts['text_7'].content}</div>
            <img onClick={(e) => {
                e.stopPropagation();
                setSelectedComponent('image_3', 'image', images['image_3'])
            }} src={images['image_3'].url} className="w-full px-[30px] rounded-[16px] my-[24px] cursor-pointer" />
        </div>


    );
}