import { BackgroundColorItem, ImageItem, SendGiftItem, TextItem, UrlMapItem } from "../templates/state";

export const originalSunshineVowState: {
  texts: { [key: string]: TextItem };
  images: { [key: string]: ImageItem };
  background_colors: { [key: string]: BackgroundColorItem };
  url_maps: { [key: string]: UrlMapItem };
  send_gifts: { [key: string]: SendGiftItem };
} = {
  texts: {
    text_1: { id: 'text_1', content: "we're married", text_color: '#FFFFFF', text_size: '48px' },
    text_2: { id: 'text_2', content: 'our story', text_color: '#2E2C2C', text_size: '64px' },
    text_3: { id: 'text_3', content: 'We first met in college, and what started out to be extraordinary. What began with simple conversations slowly grew into laughter, trust and deep connection. Through every season of life, we\'ve faced challenges and celebrated milestones, always finding strength in each other. Today, our story continues as we embark on this beautiful journey with the promise of forever.', text_color: '#655E5E', text_size: '16px' },
    text_4: { id: 'text_4', content: 'bride', text_color: '#2E2C2C', text_size: '32px' },
    text_5: { id: 'text_5', content: 'groom', text_color: '#2E2C2C', text_size: '32px' },
    text_6: { id: 'text_6', content: 'our wedding', text_color: '#2E2C2C', text_size: '64px' },
    text_7: { id: 'text_7', content: 'We cordially invite you to celebrate the wedding with us', text_color: '#655E5E', text_size: '16px' },
    text_8: { id: 'text_8', content: 'T2', text_color: '#655E5E', text_size: '15px' },
    text_9: { id: 'text_9', content: 'T3', text_color: '#655E5E', text_size: '15px' },
    text_10: { id: 'text_10', content: 'T4', text_color: '#655E5E', text_size: '15px' },
    text_11: { id: 'text_11', content: 'T5', text_color: '#655E5E', text_size: '15px' },
    text_12: { id: 'text_12', content: 'T6', text_color: '#655E5E', text_size: '15px' },
    text_13: { id: 'text_13', content: 'T7', text_color: '#655E5E', text_size: '15px' },
    text_14: { id: 'text_14', content: 'CN', text_color: '#655E5E', text_size: '15px' },
    text_15: { id: 'text_15', content: '30', text_color: '#655E5E', text_size: '15px' },
    text_16: { id: 'text_16', content: '31', text_color: '#655E5E', text_size: '15px' },
    text_17: { id: 'text_17', content: '1', text_color: '#655E5E', text_size: '15px' },
    text_18: { id: 'text_18', content: '2', text_color: '#655E5E', text_size: '15px' },
    text_19: { id: 'text_19', content: '3', text_color: '#655E5E', text_size: '15px' },
    text_20: { id: 'text_20', content: '4', text_color: '#655E5E', text_size: '15px' },
    text_21: { id: 'text_21', content: '5', text_color: '#655E5E', text_size: '15px' },
    text_22: { id: 'text_22', content: 'Date & Time of the wedding', text_color: '#2E2C2C', text_size: '16px' },
    text_23: { id: 'text_23', content: 'OCTOBER 15, 2023', text_color: '#655E5E', text_size: '16px' },
    text_24: { id: 'text_24', content: '10:00 AM', text_color: '#655E5E', text_size: '16px' },
    text_25: { id: 'text_25', content: 'Wedding venue', text_color: '#2E2C2C', text_size: '16px' },
    text_26: { id: 'text_26', content: 'NOTRE DAME CATHEDRAL OF SAIGON', text_color: '#655E5E', text_size: '16px' },
    text_27: { id: 'text_27', content: '01 Cong xa Paris Street | Ho Chi Minh City', text_color: '#655E5E', text_size: '16px' },
    text_28: { id: 'text_28', content: 'Dress Code', text_color: '#787878', text_size: '16px' },
    text_29: { id: 'text_29', content: 'Timeline', text_color: '#3F3931', text_size: '48px' },
    text_30: { id: 'text_30', content: 'Wedding Ceremony', text_color: '#3F3931', text_size: '24px' },
    text_31: { id: 'text_31', content: '10:00 - 12:00', text_color: '#2E2C2C', text_size: '16px' },
    text_32: { id: 'text_32', content: 'Photo session with family and friends', text_color: '#2E2C2C', text_size: '14px' },
    text_33: { id: 'text_33', content: 'Wedding Reception', text_color: '#3F3931', text_size: '24px' },
    text_34: { id: 'text_34', content: '12:00 - 15:00', text_color: '#2E2C2C', text_size: '16px' },
    text_35: { id: 'text_35', content: 'Lunch and celebration with relatives', text_color: '#2E2C2C', text_size: '14px' },
    text_36: { id: 'text_36', content: 'Performance', text_color: '#3F3931', text_size: '24px' },
    text_37: { id: 'text_37', content: '15:00 - 18:00', text_color: '#2E2C2C', text_size: '16px' },
    text_38: { id: 'text_38', content: 'Live music and special performances', text_color: '#2E2C2C', text_size: '14px' },
    text_39: { id: 'text_39', content: 'Gift Giving', text_color: '#3F3931', text_size: '24px' },
    text_40: { id: 'text_40', content: '18:00 - 19:00', text_color: '#2E2C2C', text_size: '16px' },
    text_41: { id: 'text_41', content: 'Gift ceremony and guest appreciation', text_color: '#2E2C2C', text_size: '14px' },
    text_42: { id: 'text_42', content: 'SEND WISHES', text_color: '#3F3931', text_size: '36px' },
    text_43: { id: 'text_43', content: 'Thank you for taking the time to share this happiness with us.', text_color: '#787878', text_size: '15px' },
    text_44: { id: 'text_44', content: 'Your name', text_color: '#787878', text_size: '15px' },
    text_45: { id: 'text_45', content: 'Enter your wish', text_color: '#787878', text_size: '15px' },
    text_46: { id: 'text_46', content: 'Will you attend the party?', text_color: '#787878', text_size: '15px' },
    text_47: { id: 'text_47', content: 'Of course', text_color: '#655E5E', text_size: '14px' },
    text_48: { id: 'text_48', content: 'I’m busy already', text_color: '#655E5E', text_size: '14px' },
    text_49: { id: 'text_49', content: 'Send wishes', text_color: '#3F3931', text_size: '15px' },
    text_50: { id: 'text_50', content: 'Gift Giving', text_color: '#3F3931', text_size: '36px' },
    text_51: { id: 'text_51', content: 'Thank you for taking the time to share this happiness with us.', text_color: '#787878', text_size: '15px' },
    text_52: { id: 'text_52', content: 'Thanks & Best regards', text_color: '#FFFFFF', text_size: '32px' },
    text_53: { id: 'text_53', content: 'Thank you for taking the time to share this happiness with us.', text_color: '#FFFFFF', text_size: '15px' },
  },

  images: {
    image_1: { id: 'image_1', url: '/templates/SunshineVow/image-1.png', style: { width: '100%', height: 'auto' } },
    image_2: { id: 'image_2', url: '/templates/SunshineVow/image-2.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_3: { id: 'image_3', url: '/templates/SunshineVow/image-3.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_4: { id: 'image_4', url: '/templates/SunshineVow/image-4.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_5: { id: 'image_5', url: '/templates/SunshineVow/image-5.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_6: { id: 'image_6', url: '/templates/SunshineVow/image-6.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_7: { id: 'image_7', url: '/images/qr-mimy.png', style: { objectFit: 'cover', borderRadius: '8px' } },
  },

  background_colors: {
    bg_color_1: { id: 'bg_color_1', color: '#FFFAD3', border_color: 'transparent' },
    bg_color_2: { id: 'bg_color_2', color: '#E9BD0B', border_color: 'none' },
    bg_color_3: { id: 'bg_color_3', color: '#000000', border_color: 'none' },
    bg_color_4: { id: 'bg_color_4', color: '#FFFFFF', border_color: '#D9D9D9' },
    bg_color_5: { id: 'bg_color_5', color: '#FFF8E1', border_color: 'none' },
    bg_color_6: { id: 'bg_color_6', color: '#FFF8E1', border_color: 'none' },

  },

  url_maps: {
    map_1: { id: 'map_1', url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868543491!2d106.69629867472932!3d10.779723089318715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4a9f346469%3A0x20a2c7b1a8348df4!2sNotre-Dame%20Cathedral%20Basilica%20of%20Saigon!5e0!3m2!1sen!2s!4v1695108884305!5m2!1sen!2s' }
  },

  send_gifts: {
    send_gift_1: {
      id: 'send_gift_1',
      text_color: '#FFFFFF',
      text_bank_color: '#787878',
      text_size: '15px',
      text_bank_size: '15px',
      background_color: '#D46617',
      border_color: 'none',
      content: 'Send gifts',
      bank_name: 'TP Bank',
      bank_number: 'Account number: 0000000000',
      bank_holder: 'Account holder: Nguyen Van A',
    }
  },
}
