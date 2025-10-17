import { create } from 'zustand';
import { originalSunshineVowState } from '../origin_state/sunshine_vow';
import { originalOliveHarmonyState } from '../origin_state/olive_harmony';
import { originalCocoaEmbraceState } from '../origin_state/cocoa_embrace';
import { originalGoldenBondState } from '../origin_state/golden_bond';
import { originalForestCharmState } from '../origin_state/forest_charm';
import { originalJadeWhisperState } from '../origin_state/jade_whisper';
import { TemplateId, templateSunshineVow } from '@/types/wedding.type';
import { original2010MyLightState } from '../origin_state/2010_mylight';

export interface Countdown {
  text_color: string;
  text_size: string;
  number_color: string;
  number_size: string;
  background: string;
  content: Date;
}

export interface Timeline {
  datetime: {
    text_color: string;
    text_size: string;
    content: string;
  };
  title: {
    text_color: string;
    text_size: string;
    content: string;
  };
  description: {
    text_color: string;
    text_size: string;
    content: string;
  };
}

// Define interfaces for different template elements
export interface TextItem {
  id: string; // text_1, text_2, etc.
  content: string;
  text_color: string;
  text_size: string;
}

export interface ImageItem {
  id: string; // image_1, image_2, etc.
  url: string;
  style: Record<string, string>;
}

export interface BackgroundColorItem {
  id: string; // bg_color_1, bg_color_2, etc.
  color: string;
  border_color: string;
}

export interface UrlMapItem {
  id: string; // map_1, map_2, etc.
  url: string;
}

export interface SendGiftItem {
  id: string; // send_gift_1, send_gift_2, etc.
  text_color: string;
  text_size: string;
  text_bank_color: string;
  text_bank_size: string;
  background_color: string;
  border_color: string;
  content: string;
  bank_name: string;
  bank_number: string;
  bank_holder: string;
}


// Define the state structure
export interface TemplateState {
  template: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
      texts: { [key: string]: TextItem };
      images: { [key: string]: ImageItem };
      background_colors: { [key: string]: BackgroundColorItem };
      url_maps: { [key: string]: UrlMapItem };
      send_gifts: { [key: string]: SendGiftItem };
      timeline?: Timeline[];
      countdown?: Countdown;
    };
  };

  // Selected component
  selectedComponent: {
    id: string | null;
    type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | 'timeline' | 'countdown' | null;
    data: TextItem | ImageItem | BackgroundColorItem | UrlMapItem | SendGiftItem | Timeline[] | Countdown | null;
  };

  updateTemplate: (template: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
      texts: { [key: string]: TextItem };
      images: { [key: string]: ImageItem };
      background_colors: { [key: string]: BackgroundColorItem };
      url_maps: { [key: string]: UrlMapItem };
      send_gifts: { [key: string]: SendGiftItem };
      timeline?: Timeline[];
      countdown?: Countdown;
    };
  }) => void;

  setSelectedComponent: (id: string | null, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | 'timeline' | 'countdown' | null, data: TextItem | ImageItem | BackgroundColorItem | UrlMapItem | SendGiftItem | Timeline[] | Countdown | null) => void;

  resetAllComponent: (template?: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
      texts: { [key: string]: TextItem };
      images: { [key: string]: ImageItem };
      background_colors: { [key: string]: BackgroundColorItem };
      url_maps: { [key: string]: UrlMapItem };
      send_gifts: { [key: string]: SendGiftItem };
      timeline?: Timeline[];
      countdown?: Countdown;
    };
  }) => void;
  resetComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | 'timeline' | 'countdown' | null, template_id: TemplateId) => void;
  // Actions for template elements
  updateText: (id: string, updates: Partial<TextItem>) => void;
  updateImage: (id: string, updates: Partial<ImageItem>) => void;
  updateBackgroundColor: (id: string, updates: Partial<BackgroundColorItem>) => void;
  updateUrlMap: (id: string, updates: Partial<UrlMapItem>) => void;
  updateSendGift: (id: string, updates: Partial<SendGiftItem>) => void;
  updateTimeline: (updates: Timeline[]) => void;
  updateCountdown: (updates: Countdown) => void;
}

function getOriginalState(template_id: TemplateId) {
  switch (template_id) {
    case 'sunshine_vow':
      return originalSunshineVowState;
    case 'olive_harmony':
      return originalOliveHarmonyState;
    case 'cocoa_embrace':
      return originalCocoaEmbraceState;
    case 'golden_bond':
      return originalGoldenBondState;
    case 'forest_charm':
      return originalForestCharmState;
    case 'jade_whisper':
      return originalJadeWhisperState;
    case '2010_my_light':
      return original2010MyLightState;
    default:
      return originalSunshineVowState;
  }
}

// Create the store
const useTemplateStore = create<TemplateState>((set) => ({
  template: templateSunshineVow,
  // Initial state - template elements
  updateTemplate: (template: {
    template_id: TemplateId;
    template_name: string;
    template_price: number;
    configs: {
      texts: { [key: string]: TextItem };
      images: { [key: string]: ImageItem };
      background_colors: { [key: string]: BackgroundColorItem };
      url_maps: { [key: string]: UrlMapItem };
      send_gifts: { [key: string]: SendGiftItem };
      timeline?: Timeline[];
      countdown?: Countdown;
    };
  }) => {
    set((state) => ({
      template: {
        ...state.template,
        template_id: template.template_id,
        template_name: template.template_name,
        template_price: template.template_price,
        configs: {
          texts: template.configs.texts,
          images: template.configs.images,
          background_colors: template.configs.background_colors,
          url_maps: template.configs.url_maps,
          send_gifts: template.configs.send_gifts,
          timeline: template.configs?.timeline,
          countdown: template.configs?.countdown,
        },
      },
    }))
  },

  selectedComponent: {
    id: null,
    type: null,
    data: null,
  },

  setSelectedComponent: (id: string | null, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | 'timeline' | 'countdown' | null, data: TextItem | ImageItem | BackgroundColorItem | UrlMapItem | SendGiftItem | Timeline[] | Countdown | null) => set((state) => ({
    selectedComponent: {
      id,
      type,
      data,
    },
  })),

  resetAllComponent: (template?: {
    template_id: TemplateId;
    configs: {
      texts: { [key: string]: TextItem };
      images: { [key: string]: ImageItem };
      background_colors: { [key: string]: BackgroundColorItem };
      url_maps: { [key: string]: UrlMapItem };
      send_gifts: { [key: string]: SendGiftItem };
      timeline?: Timeline[];
      countdown?: Countdown;
    };
  }) => set((state) => ({
    template: {
      ...state.template,
      configs: {
        texts: template?.configs.texts ?? state.template.configs.texts,
        images: template?.configs.images ?? state.template.configs.images,
        background_colors: template?.configs.background_colors ?? state.template.configs.background_colors,
        url_maps: template?.configs.url_maps ?? state.template.configs.url_maps,
        send_gifts: template?.configs.send_gifts ?? state.template.configs.send_gifts,
        timeline: template?.configs.timeline ?? state.template.configs.timeline,
        countdown: template?.configs.countdown ?? state.template.configs.countdown,
      }
    }

  })),

  resetComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | 'timeline' | 'countdown' | null, template_id: TemplateId) => {
    switch (type) {
      case 'text':
        set((state) => ({
          template: {
            ...state.template,
            configs: {
              ...state.template.configs,
              texts: {
                ...state.template.configs.texts,
                [id]: {
                  ...state.template.configs.texts[id],
                  ...getOriginalState(template_id).texts[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: getOriginalState(template_id).texts[id]
          }
        }))
        return
      case 'image':
        set((state) => ({
          template: {
            ...state.template,
            configs: {
              ...state.template.configs,
              images: {
                ...state.template.configs.images,
                [id]: {
                  ...state.template.configs.images[id],
                  ...getOriginalState(template_id).images[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: getOriginalState(template_id).images[id]
          }
        }))
        return
      case 'background_color':
        set((state) => ({
          template: {
            ...state.template,
            configs: {
              ...state.template.configs,
              background_colors: {
                ...state.template.configs.background_colors,
                [id]: {
                  ...state.template.configs.background_colors[id],
                  ...getOriginalState(template_id).background_colors[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: getOriginalState(template_id).background_colors[id]
          }
        }))
        return
      case 'url_map':
        set((state) => ({
          template: {
            ...state.template,
            configs: {
              ...state.template.configs,
              url_maps: {
                ...state.template.configs.url_maps,
                [id]: {
                  ...state.template.configs.url_maps[id],
                  ...getOriginalState(template_id).url_maps[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: getOriginalState(template_id).url_maps[id]
          }
        }))
        return
      case 'send_gift':
        set((state) => ({
          template: {
            ...state.template,
            configs: {
              ...state.template.configs,
              send_gifts: {
                ...state.template.configs.send_gifts,
                [id]: {
                  ...state.template.configs.send_gifts[id],
                  ...getOriginalState(template_id).send_gifts[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: getOriginalState(template_id).send_gifts[id]
          }
        }))
        return
      case 'timeline':
        const timeline = getOriginalState(template_id)?.timeline;
        if (!timeline) return;
        set((state) => ({
          template: {
            ...state.template,
            configs: {
              ...state.template.configs,
              timeline: timeline,
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: timeline
          }
        }))
        return
      case 'countdown':
        const countdown = getOriginalState(template_id)?.countdown;
        if (!countdown) return;
        set((state) => ({
          template: {
            ...state.template,
            configs: {
              ...state.template.configs,
              countdown: countdown,
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: countdown
          }
        }))
        return
      default:
        break;
    }
  },

  // Actions - template elements
  updateText: (id, updates) => set((state) => ({
    template: {
      ...state.template,
      configs: {
        ...state.template.configs,
        texts: {
          ...state.template.configs.texts,
          [id]: {
            ...state.template.configs.texts[id],
            ...updates
          },
        }
      }
    }
  })),

  updateImage: (id, updates) => set((state) => ({
    template: {
      ...state.template,
      configs: {
        ...state.template.configs,
        images: {
          ...state.template.configs.images,
          [id]: {
            ...state.template.configs.images[id],
            ...updates
          },
        },
      }
    }
  })),

  updateBackgroundColor: (id, updates) => set((state) => ({
    template: {
      ...state.template,
      configs: {
        ...state.template.configs,
        background_colors: {
          ...state.template.configs.background_colors,
          [id]: {
            ...state.template.configs.background_colors[id],
            ...updates
          },
        },
      }
    }
  })),

  updateUrlMap: (id, updates) => set((state) => ({
    template: {
      ...state.template,
      configs: {
        ...state.template.configs,
        url_maps: {
          ...state.template.configs.url_maps,
          [id]: {
            ...state.template.configs.url_maps[id],
            ...updates
          },
        },
      }
    }
  })),

  updateSendGift: (id, updates) => set((state) => ({
    template: {
      ...state.template,
      configs: {
        ...state.template.configs,
        send_gifts: {
          ...state.template.configs.send_gifts,
          [id]: {
            ...state.template.configs.send_gifts[id],
            ...updates
          },
        },
      }
    }
  })),

  updateTimeline: (updates) => set((state) => ({
    template: {
      ...state.template,
      configs: {
        ...state.template.configs,
        timeline: updates
      }
    }
  })),

  updateCountdown: (updates) => set((state) => ({
    template: {
      ...state.template,
      configs: {
        ...state.template.configs,
        countdown: updates
      }
    }
  })),
}));

export default useTemplateStore;
