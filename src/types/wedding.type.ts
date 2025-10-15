import { originalSunshineVowState } from "@/states/origin_state/sunshine_vow";
import { originalOliveHarmonyState } from "@/states/origin_state/olive_harmony";
import { originalCocoaEmbraceState } from "@/states/origin_state/cocoa_embrace";
import { originalGoldenBondState } from "@/states/origin_state/golden_bond";
import { originalForestCharmState } from "@/states/origin_state/forest_charm";
import { originalJadeWhisperState } from "@/states/origin_state/jade_whisper";
import { BackgroundColorItem, ImageItem, SendGiftItem, TextItem, UrlMapItem } from "@/states/templates/state";

export type TemplateId = 'sunshine_vow' | 'olive_harmony' | 'cocoa_embrace' | 'golden_bond' | 'forest_charm' | 'jade_whisper';

export const templateSunshineVow: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
        texts: { [key: string]: TextItem };
        images: { [key: string]: ImageItem };
        background_colors: { [key: string]: BackgroundColorItem };
        url_maps: { [key: string]: UrlMapItem };
        send_gifts: { [key: string]: SendGiftItem };
    };
} = {
    template_id: 'sunshine_vow',
    template_name: 'Thiệp cưới Sunshine Vow',
    template_price: 60000,
    configs: originalSunshineVowState
};

export const templateOliveHarmony: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
        texts: { [key: string]: TextItem };
        images: { [key: string]: ImageItem };
        background_colors: { [key: string]: BackgroundColorItem };
        url_maps: { [key: string]: UrlMapItem };
        send_gifts: { [key: string]: SendGiftItem };
    };
} = {
    template_id: 'olive_harmony',
    template_name: 'Thiệp cưới Olive Harmony',
    template_price: 30000,
    configs: originalOliveHarmonyState
};

export const templateCocoaEmbrace: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
        texts: { [key: string]: TextItem };
        images: { [key: string]: ImageItem };
        background_colors: { [key: string]: BackgroundColorItem };
        url_maps: { [key: string]: UrlMapItem };
        send_gifts: { [key: string]: SendGiftItem };
    };
} = {
    template_id: 'cocoa_embrace',
    template_name: 'Thiệp cưới Cocoa Embrace',
    template_price: 30000,
    configs: originalCocoaEmbraceState
};

export const templateGoldenBond: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
        texts: { [key: string]: TextItem };
        images: { [key: string]: ImageItem };
        background_colors: { [key: string]: BackgroundColorItem };
        url_maps: { [key: string]: UrlMapItem };
        send_gifts: { [key: string]: SendGiftItem };
    };
} = {
    template_id: 'golden_bond',
    template_name: 'Thiệp cưới Golden Bond',
    template_price: 30000,
    configs: originalGoldenBondState
};

export const templateForestCharm: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
        texts: { [key: string]: TextItem };
        images: { [key: string]: ImageItem };
        background_colors: { [key: string]: BackgroundColorItem };
        url_maps: { [key: string]: UrlMapItem };
        send_gifts: { [key: string]: SendGiftItem };
    };
} = {
    template_id: 'forest_charm',
    template_name: 'Thiệp cưới Forest Charm',
    template_price: 50000,
    configs: originalForestCharmState
};

export const templateJadeWhisper: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
        texts: { [key: string]: TextItem };
        images: { [key: string]: ImageItem };
        background_colors: { [key: string]: BackgroundColorItem };
        url_maps: { [key: string]: UrlMapItem };
        send_gifts: { [key: string]: SendGiftItem };
    };
} = {
    template_id: 'jade_whisper',
    template_name: 'Thiệp cưới Jade Whisper',
    template_price: 50000,
    configs: originalJadeWhisperState
};
