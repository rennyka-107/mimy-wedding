import { BackgroundColorItem, Countdown, ImageItem, SendGiftItem, TextItem, Timeline, UrlMapItem } from "../templates/state";

export const originalCocoaEmbraceState: {
  texts: { [key: string]: TextItem };
  images: { [key: string]: ImageItem };
  background_colors: { [key: string]: BackgroundColorItem };
  url_maps: { [key: string]: UrlMapItem };
  send_gifts: { [key: string]: SendGiftItem };
  countdown?: Countdown;
  timeline?: Timeline[];
} = {
  texts: {
    text_1: { id: 'text_1', content: "Ngày chung đôi", text_color: '#B46B4D', text_size: '48px', isDeleted: false },
    text_2: { id: 'text_2', content: 'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.', text_color: '#8C8A8A', text_size: '14px', isDeleted: false },
    text_3: { id: 'text_3', content: 'Ông Nguyễn Văn A', text_color: '#8C8A8A', text_size: '14px', isDeleted: false },
    text_4: { id: 'text_4', content: 'Bà Nguyễn Thị B', text_color: '#8C8A8A', text_size: '14px', isDeleted: false },
    text_5: { id: 'text_5', content: 'Hà Nội', text_color: '#8C8A8A', text_size: '14px', isDeleted: false },
    text_6: { id: 'text_6', content: 'Ông Nguyễn Văn C', text_color: '#8C8A8A', text_size: '14px', isDeleted: false },
    text_7: { id: 'text_7', content: 'Bà Nguyễn Thị D', text_color: '#8C8A8A', text_size: '14px', isDeleted: false },
    text_8: { id: 'text_8', content: 'Hà Nội', text_color: '#8C8A8A', text_size: '14px', isDeleted: false },
    text_9: { id: 'text_9', content: 'Thân mời', text_color: '#6E6E6E', text_size: '48px', isDeleted: false },
    text_10: { id: 'text_10', content: 'Gia đình tới dự lễ thành hôn của chúng tôi', text_color: '#9A9A9A', text_size: '15px', isDeleted: false },
    text_11: { id: 'text_11', content: 'Ngọc Anh', text_color: '#B46B4D', text_size: '72px', isDeleted: false },
    text_12: { id: 'text_12', content: 'Nhật Nam', text_color: '#B46B4D', text_size: '72px', isDeleted: false },
    text_13: { id: 'text_13', content: 'Hôn lễ được cử hành tại', text_color: '#9A9A9A', text_size: '16px', isDeleted: false },
    text_14: { id: 'text_14', content: '999 Kim Mã, Hà Nội', text_color: '#3D3D3D', text_size: '20px', isDeleted: false },
    text_15: { id: 'text_15', content: 'Vào lúc', text_color: '#9A9A9A', text_size: '16px', isDeleted: false },
    text_16: { id: 'text_16', content: '11 giờ 00, 12/09/2025', text_color: '#3D3D3D', text_size: '20px', isDeleted: false },
    text_17: { id: 'text_17', content: '(Tức ngày 10 tháng 8 năm Ất Tỵ)', text_color: '#9A9A9A', text_size: '16px', isDeleted: false },
    text_18: { id: 'text_18', content: 'DRESS CODE', text_color: '#9A9A9A', text_size: '16px', isDeleted: false },
    text_19: { id: 'text_19', content: 'Nếu bạn chưa quen đường, mình đã chuẩn bị sẵn link Google Maps để bạn dễ dàng tìm thấy', text_color: '#8C8A8A', text_size: '14px', isDeleted: false },
    text_20: { id: 'text_20', content: 'TIMELINE DỰ KIẾN', text_color: '#B46B4D', text_size: '24px', isDeleted: false },
    text_27: { id: 'text_27', content: 'Gift Giving', text_color: '#5C4A3B', text_size: '36px', isDeleted: false },
    text_28: { id: 'text_28', content: 'Thank you for taking the time to share this happiness with us.', text_color: '#787878', text_size: '15px', isDeleted: false },
    text_29: { id: 'text_29', content: 'Cảm ơn bạn đã gửi gắm tình cảm cho chúng mình. Sự có mặt của bạn là món quà quý giá nhất, và chúng mình trân trọng được sẻ chia hạnh phúc này cùng bạn.', text_color: '#FFFFFF', text_size: '16px', isDeleted: false },
  },

  images: {
    image_1: { id: 'image_1', url: '/templates/CocoaEmbrace/1.png', style: { objectFit: 'cover', borderRadius: 'none' }, isDeleted: false },
    image_2: { id: 'image_2', url: '/templates/CocoaEmbrace/2.png', style: { objectFit: 'cover', borderRadius: 'none' }, isDeleted: false },
    image_3: { id: 'image_3', url: '/images/qr-mimy.png', style: { objectFit: 'cover', borderRadius: '8px' }, isDeleted: false },
  },

  background_colors: {
    bg_color_1: { id: 'bg_color_1', color: '#B46B4D', border_color: '#B46B4D', isDeleted: false },
    bg_color_2: { id: 'bg_color_2', color: '#050505', border_color: '#050505', isDeleted: false },
    bg_color_3: { id: 'bg_color_3', color: '#FFFFFF', border_color: '#D9D9D9', isDeleted: false },
  },

  url_maps: {
    map_1: { id: 'map_1', url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868543491!2d106.69629867472932!3d10.779723089318715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4a9f346469%3A0x20a2c7b1a8348df4!2sNotre-Dame%20Cathedral%20Basilica%20of%20Saigon!5e0!3m2!1sen!2s!4v1695108884305!5m2!1sen!2s', isDeleted: false }
  },

  send_gifts: {
    send_gift_1: {
      id: 'send_gift_1',
      text_color: '#FFFFFF',
      text_bank_color: '#8C8A8A',
      text_size: '16px',
      text_bank_size: '18px',
      background_color: '#B46B4D',
      border_color: '#B46B4D',
      content: 'Send gifts',
      bank_name: 'TP Bank',
      bank_number: 'Account number: 0000000000',
      bank_holder: 'Account holder: Nguyen Van A',
      isDeleted: false,
    }
  },

  timeline: [
    {
      datetime: { content: '8:00 - 9:00', text_color: '#686868', text_size: '14px' },
      title: { content: 'Đón khách', text_color: '#3D3D3D', text_size: '16px' },
      description: { content: '', text_color: '#2E2C2C', text_size: '14px' }
    },
    {
      datetime: { content: '10:00 - 11:00', text_color: '#686868', text_size: '14px' },
      title: { content: 'Lễ vu quy', text_color: '#3D3D3D', text_size: '16px' },
      description: { content: '', text_color: '#2E2C2C', text_size: '14px' }
    },
    {
      datetime: { content: '11:15', text_color: '#686868', text_size: '14px' },
      title: { content: 'Khai tiệc', text_color: '#3D3D3D', text_size: '16px' },
      description: { content: '', text_color: '#2E2C2C', text_size: '14px' }
    },
  ],
}