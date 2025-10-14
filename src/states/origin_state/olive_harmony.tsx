import { BackgroundColorItem, ImageItem, SendGiftItem, TextItem, UrlMapItem } from "../templates/state";

export const originalOliveHarmonyState: {
  texts: { [key: string]: TextItem };
  images: { [key: string]: ImageItem };
  background_colors: { [key: string]: BackgroundColorItem };
  url_maps: { [key: string]: UrlMapItem };
  send_gifts: { [key: string]: SendGiftItem };
} = {
  texts: {
    text_1: { id: 'text_1', content: "Mình hẹn nhau", text_color: '#3D3D3D', text_size: '36px' },
    text_2: { id: 'text_2', content: 'ở đám cưới nhé', text_color: '#8BB087', text_size: '36px' },
    text_3: { id: 'text_3', content: 'Tình yêu không chỉ là nhìn vào mắt nhau, mà là cùng nhìn về một hướng', text_color: '#8C8A8A', text_size: '14px' },
    text_4: { id: 'text_4', content: 'Ông Nguyễn Văn A', text_color: '#8C8A8A', text_size: '14px' },
    text_5: { id: 'text_5', content: 'Bà Nguyễn Thị B', text_color: '#8C8A8A', text_size: '14px' },
    text_6: { id: 'text_6', content: 'Hà Nội', text_color: '#8C8A8A', text_size: '14px' },
    text_7: { id: 'text_7', content: 'Ông Nguyễn Văn C', text_color: '#8C8A8A', text_size: '14px' },
    text_8: { id: 'text_8', content: 'Bà Nguyễn Thị D', text_color: '#8C8A8A', text_size: '14px' },
    text_9: { id: 'text_9', content: 'Hà Nội', text_color: '#8C8A8A', text_size: '14px' },
    text_10: { id: 'text_10', content: 'Thân mời', text_color: '#5F9654', text_size: '36px' },
    text_11: { id: 'text_11', content: 'GIA ĐÌNH TỚI DỰ LỄ THÀNH HÔN CỦA CHÚNG TÔI', text_color: '#9A9A9A', text_size: '16px' },
    text_12: { id: 'text_12', content: 'Ngọc Khánh', text_color: '#5F9654', text_size: '48px' },
    text_13: { id: 'text_13', content: '&', text_color: '#5F9654', text_size: '48px' },
    text_14: { id: 'text_14', content: 'Nhật Thành', text_color: '#5F9654', text_size: '48px' },
    text_15: { id: 'text_15', content: 'Hôn lễ được cử hành tại', text_color: '#9A9A9A', text_size: '16px' },
    text_16: { id: 'text_16', content: '999 Kim Mã, Hà Nội', text_color: '#3D3D3D', text_size: '20px' },
    text_17: { id: 'text_17', content: 'Vào lúc', text_color: '#9A9A9A', text_size: '16px' },
    text_18: { id: 'text_18', content: '11 giờ 00, 12/09/2025', text_color: '#3D3D3D', text_size: '20px' },
    text_19: { id: 'text_19', content: '(Tức ngày 10 tháng 8 năm Ất Tỵ)', text_color: '#9A9A9A', text_size: '16px' },
    text_20: { id: 'text_20', content: 'DRESS CODE', text_color: '#9A9A9A', text_size: '16px' },
    text_21: { id: 'text_21', content: 'Nếu bạn chưa quen đường, mình đã chuẩn bị sẵn link Google Maps để bạn dễ dàng tìm thấy', text_color: '#8C8A8A', text_size: '14px' },
    text_22: { id: 'text_22', content: 'Timeline dự kiến', text_color: '#719D6D', text_size: '24px' },
    text_23: { id: 'text_23', content: '8:00 - 9:00', text_color: '#686868', text_size: '14px' },
    text_24: { id: 'text_24', content: 'Đón khách', text_color: '#3D3D3D', text_size: '16px' },
    text_25: { id: 'text_25', content: '10:00 - 11:00', text_color: '#686868', text_size: '14px' },
    text_26: { id: 'text_26', content: 'Lễ vu quy', text_color: '#3D3D3D', text_size: '16px' },
    text_27: { id: 'text_27', content: '11:15', text_color: '#686868', text_size: '14px' },
    text_28: { id: 'text_28', content: 'Khai tiệc', text_color: '#3D3D3D', text_size: '16px' },
    text_29: { id: 'text_29', content: 'Gửi lời chúc', text_color: '#242827', text_size: '36px' },
    text_30: { id: 'text_30', content: 'tới dâu rể', text_color: '#719D6D', text_size: '36px' },
    text_31: { id: 'text_31', content: 'Lorem ipsum dolor sit amet consectetuer adipiscing elit sed diam nonummy nibh', text_color: '#8C8A8A', text_size: '14px' },
    text_32: { id: 'text_32', content: 'Tên của bạn', text_color: '#8C8A8A', text_size: '15px' },
    text_33: { id: 'text_33', content: 'Nhập lời chúc', text_color: '#8C8A8A', text_size: '15px' },
    text_34: { id: 'text_34', content: 'Bạn sẽ đến dự tiệc chứ?', text_color: '#8C8A8A', text_size: '14px' },
    text_35: { id: 'text_35', content: 'Tất nhiên rồi', text_color: '#414651', text_size: '14px' },
    text_36: { id: 'text_36', content: 'Mình bận mất rồi', text_color: '#414651', text_size: '14px' },
    text_37: { id: 'text_37', content: 'Gift', text_color: '#719D6D', text_size: '48px' },
    text_38: { id: 'text_38', content: 'Cảm ơn bạn đã gửi gắm tình cảm cho chúng mình. Sự có mặt của bạn là món quà quý giá nhất, và chúng mình trân trọng được sẻ chia hạnh phúc này cùng bạn.', text_color: '#FFFFFF', text_size: '14px' },
  },

  images: {
    left: { id: 'left', url: '/templates/OliveHarmony/left.png', style: { width: '100%', height: 'auto' } },
    right: { id: 'right', url: '/templates/OliveHarmony/right.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_1: { id: 'image_1', url: '/templates/OliveHarmony/1.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_2: { id: 'image_2', url: '/templates/OliveHarmony/2.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    left1: { id: 'left1', url: '/templates/OliveHarmony/left1.png', style: { width: '100%', height: 'auto' } },
    right1: { id: 'right1', url: '/templates/OliveHarmony/right1.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_3: { id: 'image_3', url: '/templates/OliveHarmony/3.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_4: { id: 'image_4', url: '/templates/OliveHarmony/4.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_5: { id: 'image_5', url: '/templates/OliveHarmony/5.png', style: { objectFit: 'cover', borderRadius: '8px' } },
  },

  background_colors: {
    bg_color_1: { id: 'bg_color_1', color: '#719D6D', border_color: '#719D6D' },
    bg_color_2: { id: 'bg_color_2', color: '#050505', border_color: '#050505' },
    bg_color_3: { id: 'bg_color_3', color: '#000000', border_color: 'none' },
    bg_color_4: { id: 'bg_color_4', color: '#FFFFFF', border_color: '#D9D9D9' },
    bg_color_5: { id: 'bg_color_5', color: '#F8F7F7', border_color: 'none' },
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
      text_bank_size: '15px',
      background_color: '#5F9654',
      border_color: 'none',
      content: 'Gửi quà',
      bank_name: 'TP Bank',
      bank_number: 'Account number: 0000000000',
      bank_holder: 'Account holder: Nguyen Van A'
    }
  },
}