import { create } from 'zustand';
import { originalSunshineVowState } from '../origin_state/sunshine_vow';

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
    template_id: 'sunshine_vow' | 'olive_harmony';
    template_name: string;
    template_price: number;
    configs: {
      texts: { [key: string]: TextItem };
      images: { [key: string]: ImageItem };
      background_colors: { [key: string]: BackgroundColorItem };
      url_maps: { [key: string]: UrlMapItem };
      send_gifts: { [key: string]: SendGiftItem };
    };
  };

  // Selected component
  selectedComponent: {
    id: string | null;
    type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | null;
    data: TextItem | ImageItem | BackgroundColorItem | UrlMapItem | SendGiftItem | null;
  };

  updateTemplate: (template: {
    template_id: 'sunshine_vow' | 'olive_harmony' | 'cocoa_embrace' | 'golden_bond' | 'forest_charm' | 'jade_whisper';
    template_name: string;
    template_price: number;
    configs: {
      texts: { [key: string]: TextItem };
      images: { [key: string]: ImageItem };
      background_colors: { [key: string]: BackgroundColorItem };
      url_maps: { [key: string]: UrlMapItem };
      send_gifts: { [key: string]: SendGiftItem };
    };
  }) => void;

  setSelectedComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | null, data: TextItem | ImageItem | BackgroundColorItem | UrlMapItem | SendGiftItem | null) => void;

  resetAllComponent: () => void;
  resetComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | null) => void;
  // Actions for template elements
  updateText: (id: string, updates: Partial<TextItem>) => void;
  updateImage: (id: string, updates: Partial<ImageItem>) => void;
  updateBackgroundColor: (id: string, updates: Partial<BackgroundColorItem>) => void;
  updateUrlMap: (id: string, updates: Partial<UrlMapItem>) => void;
  updateSendGift: (id: string, updates: Partial<SendGiftItem>) => void;
}

// Create the store
const useTemplateStore = create<TemplateState>((set) => ({
  template: {
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
  },
  // Initial state - template elements
  updateTemplate: (template: {
    template_id: 'sunshine_vow' | 'olive_harmony' | 'cocoa_embrace' | 'golden_bond' | 'forest_charm' | 'jade_whisper';
    template_name: string;
    template_price: number;
    configs: {
      texts: { [key: string]: TextItem };
      images: { [key: string]: ImageItem };
      background_colors: { [key: string]: BackgroundColorItem };
      url_maps: { [key: string]: UrlMapItem };
      send_gifts: { [key: string]: SendGiftItem };
    };
  }) => set((state) => ({
    template: {
      ...state.template,
      configs: {
        texts: template.configs.texts,
        images: template.configs.images,
        background_colors: template.configs.background_colors,
        url_maps: template.configs.url_maps,
        send_gifts: template.configs.send_gifts,
      },
    },
  })),

  selectedComponent: {
    id: null,
    type: null,
    data: null,
  },

  setSelectedComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | null, data: TextItem | ImageItem | BackgroundColorItem | UrlMapItem | SendGiftItem | null) => set((state) => ({
    selectedComponent: {
      id,
      type,
      data,
    },
  })),

  resetAllComponent: () => set((state) => ({
    template: {
      ...state.template,
      configs: {
        texts: originalSunshineVowState.texts,
        images: originalSunshineVowState.images,
        background_colors: originalSunshineVowState.background_colors,
        url_maps: originalSunshineVowState.url_maps,
        send_gifts: originalSunshineVowState.send_gifts,
      }
    }

  })),

  resetComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | null) => {
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
                  ...originalSunshineVowState.texts[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: originalSunshineVowState.texts[id]
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
                  ...originalSunshineVowState.images[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: originalSunshineVowState.images[id]
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
                  ...originalSunshineVowState.background_colors[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: originalSunshineVowState.background_colors[id]
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
                  ...originalSunshineVowState.url_maps[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: originalSunshineVowState.url_maps[id]
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
                  ...originalSunshineVowState.send_gifts[id]
                },
              },
            }
          },
          selectedComponent: {
            ...state.selectedComponent,
            data: originalSunshineVowState.send_gifts[id]
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
}));

export default useTemplateStore;
