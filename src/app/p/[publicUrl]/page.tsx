"use client";
import { use, useEffect } from 'react'
import useTemplateStore from '@/states/templates/state';
import SunshineVowTemplate from '@/wedding-templates/SunshineVow.template';
import OliveHarmonyTemplate from '@/wedding-templates/OliveHarmony.template';
import CocoaEmbraceTemplate from '@/wedding-templates/CocoaEmbrace.template';
import GoldenBondTemplate from '@/wedding-templates/GoldenBond.template';
import ForestCharmTemplate from '@/wedding-templates/ForestCharm.template';
import JadeWhisperTemplate from '@/wedding-templates/JadeWhisper.template';

export default function PublicPage({
    params,
}: {
    params: Promise<{ publicUrl: string }>
}) {
    const { publicUrl } = use(params);
    const { updateTemplate, template: { template_id } } = useTemplateStore();

    function renderTemplate() {
        switch (template_id) {
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
    }

    async function fetchData() {
        const response = await fetch(`/api/orders?publicUrl=${publicUrl}`);
        const data = await response.json();
        if (data.status === "success") {
            updateTemplate({
                template_id: data.data.template_id,
                template_name: data.data.template_name,
                template_price: data.data.template_price,
                configs: data.data.template_config,
            });
        } else {
            console.log("Error:", data.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // console.log(publicUrl, "publicUrl");
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[448px] h-full bg-white border shadow-sm rounded-sm overflow-y-auto">
                {renderTemplate()}
            </div>
        </div>
    );
}