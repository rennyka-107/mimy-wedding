"use client";
import { Suspense, use, useEffect, useMemo } from 'react'
import useTemplateStore from '@/states/templates/state';
import SunshineVowTemplate from '@/wedding-templates/SunshineVow.template';
import OliveHarmonyTemplate from '@/wedding-templates/OliveHarmony.template';
import CocoaEmbraceTemplate from '@/wedding-templates/CocoaEmbrace.template';
import GoldenBondTemplate from '@/wedding-templates/GoldenBond.template';
import ForestCharmTemplate from '@/wedding-templates/ForestCharm.template';
import JadeWhisperTemplate from '@/wedding-templates/JadeWhisper.template';
import { originalSunshineVowState } from '@/states/origin_state/sunshine_vow';
import { originalCocoaEmbraceState } from '@/states/origin_state/cocoa_embrace';
import { originalOliveHarmonyState } from '@/states/origin_state/olive_harmony';
import { originalGoldenBondState } from '@/states/origin_state/golden_bond';
import { originalForestCharmState } from '@/states/origin_state/forest_charm';
import { originalJadeWhisperState } from '@/states/origin_state/jade_whisper';

export default function ViewInvitationPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params);
    const { template, updateTemplate } = useTemplateStore();

    useEffect(() => {
        console.log(id, "id")
        switch (id) {
            case "sunshine_vow":
                updateTemplate({
                    template_id: 'sunshine_vow',
                    template_name: 'Sunshine Vow',
                    template_price: 4000,
                    configs: {
                        texts: originalSunshineVowState.texts,
                        images: originalSunshineVowState.images,
                        background_colors: originalSunshineVowState.background_colors,
                        url_maps: originalSunshineVowState.url_maps,
                        send_gifts: originalSunshineVowState.send_gifts,
                    }
                })
                return;
            case "olive_harmony":
                updateTemplate({
                    template_id: 'olive_harmony',
                    template_name: 'Olive Harmony',
                    template_price: 4000,
                    configs: {
                        texts: originalOliveHarmonyState.texts,
                        images: originalOliveHarmonyState.images,
                        background_colors: originalOliveHarmonyState.background_colors,
                        url_maps: originalOliveHarmonyState.url_maps,
                        send_gifts: originalOliveHarmonyState.send_gifts,
                    }
                })
                return;
            case "cocoa_embrace":
                updateTemplate({
                    template_id: 'cocoa_embrace',
                    template_name: 'Cocoa Embrace',
                    template_price: 4000,
                    configs: {
                        texts: originalCocoaEmbraceState.texts,
                        images: originalCocoaEmbraceState.images,
                        background_colors: originalCocoaEmbraceState.background_colors,
                        url_maps: originalCocoaEmbraceState.url_maps,
                        send_gifts: originalCocoaEmbraceState.send_gifts,
                    }
                })
                return;
            case "golden_bond":
                updateTemplate({
                    template_id: 'golden_bond',
                    template_name: 'Golden Bond',
                    template_price: 4000,
                    configs: {
                        texts: originalGoldenBondState.texts,
                        images: originalGoldenBondState.images,
                        background_colors: originalGoldenBondState.background_colors,
                        url_maps: originalGoldenBondState.url_maps,
                        send_gifts: originalGoldenBondState.send_gifts,
                    }
                })
                return;
            case "forest_charm":
                console.log("forest_charm ne con cho nay",)
                updateTemplate({
                    template_id: 'forest_charm',
                    template_name: 'Forest Charm',
                    template_price: 4000,
                    configs: {
                        texts: originalForestCharmState.texts,
                        images: originalForestCharmState.images,
                        background_colors: originalForestCharmState.background_colors,
                        url_maps: originalForestCharmState.url_maps,
                        send_gifts: originalForestCharmState.send_gifts,
                    }
                })
                return;
            case "jade_whisper":
                updateTemplate({
                    template_id: 'jade_whisper',
                    template_name: 'Jade Whisper',
                    template_price: 4000,
                    configs: {
                        texts: originalJadeWhisperState.texts,
                        images: originalJadeWhisperState.images,
                        background_colors: originalJadeWhisperState.background_colors,
                        url_maps: originalJadeWhisperState.url_maps,
                        send_gifts: originalJadeWhisperState.send_gifts,
                    }
                })
                return;
            default:
                updateTemplate({
                    template_id: 'sunshine_vow',
                    template_name: 'Sunshine Vow',
                    template_price: 4000,
                    configs: {
                        texts: originalSunshineVowState.texts,
                        images: originalSunshineVowState.images,
                        background_colors: originalSunshineVowState.background_colors,
                        url_maps: originalSunshineVowState.url_maps,
                        send_gifts: originalSunshineVowState.send_gifts,
                    }
                })
                return;
        }

    }, [id])

    console.log(template)

    const renderTemplate = useMemo(() => {
        switch (template.template_id) {
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
    }, [template.template_id])

    // console.log(publicUrl, "publicUrl");
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading...</div>}>
            <div className="w-full h-full bg-[#E9EAEB] flex items-center justify-center">
                {/* Left side - Template Preview (2/3 width) */}
                {/* <div className="w-3/4 bg-[#E9EAEB] h-full flex items-center justify-center"> */}
                    <div className="w-[448px] h-[calc(100vh-86px)] bg-white border shadow-sm rounded-sm overflow-y-auto scrollbar-hidden">

                        {renderTemplate}
                    </div>
                {/* </div> */}
            </div>
        </Suspense>

    );
}