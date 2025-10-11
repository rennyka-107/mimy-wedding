import { BackgroundColorItem, ImageItem, SendGiftItem, TextItem, UrlMapItem } from "../templates/state";

export const originalGoldenBondState: {
  texts: { [key: string]: TextItem };
  images: { [key: string]: ImageItem };
  background_colors: { [key: string]: BackgroundColorItem };
  url_maps: { [key: string]: UrlMapItem };
  send_gifts: { [key: string]: SendGiftItem };
} = {
  texts: {
    text_1: { id: 'text_1', content: "Save the Date", text_color: '#FFFFFF', text_size: '64px' },
    text_2: { id: 'text_2', content: 'Chúng mình tin rằng', text_color: '#AF601B', text_size: '16px' },
    text_3: { id: 'text_3', content: 'Tình yêu không chỉ là nhìn vào mắt nhau, mà là cùng nhìn về một hướng', text_color: '#5C4A3B', text_size: '22px' },
    text_4: { id: 'text_4', content: 'Minh Ngọc', text_color: '#AF601B', text_size: '64px' },
    text_5: { id: 'text_5', content: 'cùng với', text_color: '#5C4A3B', text_size: '22px' },
    text_6: { id: 'text_6', content: 'Anh Giang', text_color: '#AF601B', text_size: '64px' },
    text_7: { id: 'text_7', content: 'TRÂN TRỌNG KÍNH MỜI', text_color: '#5C4A3B', text_size: '22px' },
    text_8: { id: 'text_8', content: 'GIA ĐÌNH TỚI DỰ LỄ THÀNH HÔN CỦA CHÚNG TÔI', text_color: '#9A9A9A', text_size: '16px' },
    text_9: { id: 'text_9', content: 'Ngày & Giờ', text_color: '#AF8D1B', text_size: '16px' },
    text_10: { id: 'text_10', content: 'Ngày 18 tháng 01 năm 2025', text_color: '#5C4A3B', text_size: '22px' },
    text_11: { id: 'text_11', content: 'Hồi 10h00 (AM)', text_color: '#9A9A9A', text_size: '16px' },
    text_12: { id: 'text_12', content: 'Lễ thành hôn', text_color: '#AF8D1B', text_size: '16px' },
    text_13: { id: 'text_13', content: 'Nhà thờ Đức Bà Sài Gòn', text_color: '#5C4A3B', text_size: '22px' },
    text_14: { id: 'text_14', content: 'Số 01 Công xã Paris, Quận 1, TP. Hồ Chí Minh', text_color: '#9A9A9A', text_size: '16px' },
    text_15: { id: 'text_15', content: 'Dress Code', text_color: '#9A9A9A', text_size: '16px' },
    text_16: { id: 'text_16', content: 'Nếu bạn chưa quen đường, mình đã chuẩn bị sẵn link Google Maps để bạn dễ dàng tìm thấy', text_color: '#8C8A8A', text_size: '14px' },
    text_17: { id: 'text_17', content: 'Timeline', text_color: '#AF8D1B', text_size: '64px' },
    text_18: { id: 'text_18', content: 'Lễ Thành Hôn', text_color: '#5C4A3B', text_size: '22px' },
    text_19: { id: 'text_19', content: '8:00 - 9:00', text_color: '#8C8A8A', text_size: '16px' },
    text_20: { id: 'text_20', content: 'Nghi thức cưới truyền thống tại nhà thờ', text_color: '#8C8A8A', text_size: '14px' },
    text_21: { id: 'text_21', content: 'Chụp Ảnh Cưới', text_color: '#5C4A3B', text_size: '22px' },
    text_22: { id: 'text_22', content: '9:00 - 10:00', text_color: '#8C8A8A', text_size: '16px' },
    text_23: { id: 'text_23', content: 'Chụp ảnh kỷ niệm cùng gia đình và bạn bè', text_color: '#8C8A8A', text_size: '14px' },
    text_24: { id: 'text_24', content: 'Tiệc Cưới', text_color: '#5C4A3B', text_size: '22px' },
    text_25: { id: 'text_25', content: '10:00 - 12:00', text_color: '#8C8A8A', text_size: '16px' },
    text_26: { id: 'text_26', content: 'Tiệc buffet và các hoạt động vui chơi', text_color: '#8C8A8A', text_size: '14px' },
    text_27: { id: 'text_27', content: 'Biểu Diễn', text_color: '#5C4A3B', text_size: '22px' },
    text_28: { id: 'text_28', content: '12:00 - 13:00', text_color: '#8C8A8A', text_size: '16px' },
    text_29: { id: 'text_29', content: 'Nhạc sống và các tiết mục đặc biệt', text_color: '#8C8A8A', text_size: '14px' },
    text_30: { id: 'text_30', content: 'Tặng Quà', text_color: '#5C4A3B', text_size: '22px' },
    text_31: { id: 'text_31', content: '13:00 - 14:00', text_color: '#8C8A8A', text_size: '16px' },
    text_32: { id: 'text_32', content: 'Nghi thức tặng quà và cảm ơn khách mời', text_color: '#8C8A8A', text_size: '14px' },
    text_33: { id: 'text_33', content: 'Mừng cưới online', text_color: '#5C4A3B', text_size: '36px' },
    text_34: { id: 'text_34', content: 'Cảm ơn bạn đã dành thời gian chia sẻ niềm hạnh phúc này cùng chúng tôi', text_color: '#8C8A8A', text_size: '16px' },
    text_35: { id: 'text_35', content: 'Lời cảm ơn', text_color: '#FFFFFF', text_size: '36px' },
    text_36: { id: 'text_36', content: 'Sự hiện diện của bạn chính là món quà ý nghĩa nhất mà chúng tôi có thể nhận được.', text_color: '#FFFFFF', text_size: '16px' },
  },

  images: {
    image_1: { id: 'image_1', url: '/templates/GoldenBond/1.png', style: { objectFit: 'cover', borderRadius: 'none' } },
    image_2: { id: 'image_2', url: '/templates/GoldenBond/2.png', style: { objectFit: 'cover', borderRadius: 'none' } },
    image_3: { id: 'image_3', url: '/templates/GoldenBond/3.png', style: { objectFit: 'cover', borderRadius: 'none' } },
    image_4: { id: 'image_4', url: '/templates/GoldenBond/4.png', style: { objectFit: 'cover', borderRadius: 'none' } },
    image_5: { id: 'image_5', url: '/templates/GoldenBond/5.png', style: { objectFit: 'cover', borderRadius: 'none' } },
    image_6: { id: 'image_6', url: '/templates/GoldenBond/6.png', style: { objectFit: 'cover', borderRadius: 'none' } },
    image_four: { id: 'image_four', url: '/templates/GoldenBond/four.png', style: { objectFit: 'cover', borderRadius: 'none' } },
    image_bird: { id: 'image_bird', url: '/templates/GoldenBond/bird.png', style: { objectFit: 'cover', borderRadius: 'none' } },
  },

  background_colors: {
    bg_color_1: { id: 'bg_color_1', color: '#FFF0CC', border_color: 'none' },
    bg_color_2: { id: 'bg_color_2', color: '#FFF0CC', border_color: 'none' },
    bg_color_3: { id: 'bg_color_3', color: '#DB8700', border_color: 'none' },
    bg_color_4: { id: 'bg_color_4', color: '#000000', border_color: 'none' },
    bg_color_5: { id: 'bg_color_5', color: '#FFFFFF', border_color: '#D9D9D9' },
    bg_color_6: { id: 'bg_color_6', color: '#FFFEF9', border_color: 'none' },
  },

  url_maps: {
    map_1: { id: 'map_1', url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868543491!2d106.69629867472932!3d10.779723089318715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4a9f346469%3A0x20a2c7b1a8348df4!2sNotre-Dame%20Cathedral%20Basilica%20of%20Saigon!5e0!3m2!1sen!2s!4v1695108884305!5m2!1sen!2s' }
  },

  send_gifts: {
    send_gift_1: {
      id: 'send_gift_1',
      text_color: '#FFFFFF',
      text_bank_color: '#8C8A8A',
      text_size: '15px',
      text_bank_size: '14px',
      background_color: '#AF8D1B',
      border_color: 'none',
      content: 'Gửi quà ngay',
      bank_name: 'TP Bank',
      bank_number: 'Account number: 0000000000',
      bank_holder: 'Account holder: Nguyen Van A'
    }
  },
}