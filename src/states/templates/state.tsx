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
  isDeleted: boolean;
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
  isDeleted: boolean;
}

export interface ImageItem {
  id: string; // image_1, image_2, etc.
  url: string;
  style: Record<string, string>;
  isDeleted: boolean;
}

export interface BackgroundColorItem {
  id: string; // bg_color_1, bg_color_2, etc.
  color: string;
  border_color: string;
  isDeleted: boolean;
}

export interface UrlMapItem {
  id: string; // map_1, map_2, etc.
  url: string;
  isDeleted: boolean;
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
  isDeleted: boolean;
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

  deleteComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | 'timeline' | 'countdown' | null) => void;

  getDeleteComponents: () => {
    texts: TextItem[];
    images: ImageItem[];
    background_colors: BackgroundColorItem[];
    url_maps: UrlMapItem[];
    send_gifts: SendGiftItem[];
    timeline?: Timeline[];
    countdown?: Countdown;
  };

  revertDeleteComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | 'timeline' | 'countdown' | null, data: TextItem | ImageItem | BackgroundColorItem | UrlMapItem | SendGiftItem | Timeline[] | Countdown | null) => void;

  revertDeleteAllComponents: () => void;

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
const useTemplateStore = create<TemplateState>((set, get) => ({
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

  getDeleteComponents: () => {
    const template = get().template

    // get all deleted components
    const deletedComponents = {
      texts: Object.keys(template.configs.texts).filter((key) => template.configs.texts[key].isDeleted).map((key) => template.configs.texts[key]),
      images: Object.keys(template.configs.images).filter((key) => template.configs.images[key].isDeleted).map((key) => template.configs.images[key]),
      background_colors: Object.keys(template.configs.background_colors).filter((key) => template.configs.background_colors[key].isDeleted).map((key) => template.configs.background_colors[key]),
      url_maps: Object.keys(template.configs.url_maps).filter((key) => template.configs.url_maps[key].isDeleted).map((key) => template.configs.url_maps[key]),
      send_gifts: Object.keys(template.configs.send_gifts).filter((key) => template.configs.send_gifts[key].isDeleted).map((key) => template.configs.send_gifts[key]),
      timeline: template.configs.timeline ? template.configs.timeline : undefined,
      countdown: template.configs.countdown ? template.configs.countdown : undefined,
    }
    return deletedComponents;
  },

  revertDeleteComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | 'timeline' | 'countdown' | null, data: TextItem | ImageItem | BackgroundColorItem | UrlMapItem | SendGiftItem | Timeline[] | Countdown | null) => {
    switch (type) {
      case 'text':
        return set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                texts: {
                  ...state.template.configs.texts,
                  [id]: {
                    ...state.template.configs.texts[id],
                    isDeleted: false,
                  },
                },
              },
            },
          }
        })
      case 'image':
        return set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                images: {
                  ...state.template.configs.images,
                  [id]: {
                    ...state.template.configs.images[id],
                    isDeleted: false,
                  },
                },
              },
            },
          }
        })
      case 'background_color':
        return set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                background_colors: {
                  ...state.template.configs.background_colors,
                  [id]: {
                    ...state.template.configs.background_colors[id],
                    isDeleted: false,
                  },
                },
              },
            },
          }
        })
      case 'url_map':
        return set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                url_maps: {
                  ...state.template.configs.url_maps,
                  [id]: {
                    ...state.template.configs.url_maps[id],
                    isDeleted: false,
                  },
                },
              },
            },
          }
        })
      case 'send_gift':
        return set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                send_gifts: {
                  ...state.template.configs.send_gifts,
                  [id]: {
                    ...state.template.configs.send_gifts[id],
                    isDeleted: false,
                  },
                },
              },
            },
          }
        })
      case 'timeline':
        return set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                timeline: data as Timeline[]
              },
            },
          }
        })
      case 'countdown':
        return set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                countdown: data as Countdown
              },
            },
          }
        })
    }

  },

  revertDeleteAllComponents() {
    const deletedComponents = get().getDeleteComponents()
    set((state) => {
      return {
        ...state,
        template: {
          ...state.template,
          configs: {
            ...state.template.configs,
            texts: Object.fromEntries(
              Object.entries(state.template.configs.texts).map(([key, value]) => [
                key,
                { ...value, isDeleted: false },
              ])
            ),
            images: Object.fromEntries(
              Object.entries(state.template.configs.images).map(([key, value]) => [
                key,
                { ...value, isDeleted: false },
              ])
            ),
            background_colors: Object.fromEntries(
              Object.entries(state.template.configs.background_colors).map(([key, value]) => [
                key,
                { ...value, isDeleted: false },
              ])
            ),
            url_maps: Object.fromEntries(
              Object.entries(state.template.configs.url_maps).map(([key, value]) => [
                key,
                { ...value, isDeleted: false },
              ])
            ),
            send_gifts: Object.fromEntries(
              Object.entries(state.template.configs.send_gifts).map(([key, value]) => [
                key,
                { ...value, isDeleted: false },
              ])
            ),
            timeline: deletedComponents.timeline ? deletedComponents.timeline : state.template.configs.timeline,
            countdown: deletedComponents.countdown ? deletedComponents.countdown : state.template.configs.countdown,
          },
        },
      }
    })
  },

  deleteComponent: (id: string, type: 'text' | 'image' | 'background_color' | 'url_map' | 'send_gift' | 'timeline' | 'countdown' | null) => {
    switch (type) {
      case 'text':
        set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                texts: {
                  ...state.template.configs.texts,
                  [id]: {
                    ...state.template.configs.texts[id],
                    isDeleted: true,
                  },
                },
              },
            },
            selectedComponent: {
              id: null,
              type: null,
              data: null,
            }
          }
        })
        return
      case 'image':
        set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                images: {
                  ...state.template.configs.images,
                  [id]: {
                    ...state.template.configs.images[id],
                    isDeleted: true,
                  },
                },
              },
            },
            selectedComponent: {
              id: null,
              type: null,
              data: null,
            }
          }
        })
        return
      case 'background_color':
        set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                background_colors: {
                  ...state.template.configs.background_colors,
                  [id]: {
                    ...state.template.configs.background_colors[id],
                    isDeleted: true,
                  },
                },
              },
            },
            selectedComponent: {
              id: null,
              type: null,
              data: null,
            }
          }
        })
        return
      case 'url_map':
        set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                url_maps: {
                  ...state.template.configs.url_maps,
                  [id]: {
                    ...state.template.configs.url_maps[id],
                    isDeleted: true,
                  },
                },
              },
            },
            selectedComponent: {
              id: null,
              type: null,
              data: null,
            }
          }
        })
        return
      case 'send_gift':
        set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                send_gifts: {
                  ...state.template.configs.send_gifts,
                  [id]: {
                    ...state.template.configs.send_gifts[id],
                    isDeleted: true,
                  },
                },
              },
            },
            selectedComponent: {
              id: null,
              type: null,
              data: null,
            }
          }
        })
        return
      case 'timeline':
        set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                timeline: state.template.configs.timeline ? [] : undefined,
              },
            },
            selectedComponent: {
              id: null,
              type: null,
              data: null,
            }
          }
        })
        return
      case 'countdown':
        set((state) => {
          return {
            ...state,
            template: {
              ...state.template,
              configs: {
                ...state.template.configs,
                countdown: state.template.configs.countdown ? {
                  ...state.template.configs.countdown,
                  isDeleted: true,
                } : undefined,
              },
            },
            selectedComponent: {
              id: null,
              type: null,
              data: null,
            }
          }
        })
        return
      default:
        return;
    }
  },

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
