import { BackgroundColorItem, ImageItem, SendGiftItem, TextItem, UrlMapItem } from "../templates/state";

export const originalForestCharmState: {
  texts: { [key: string]: TextItem };
  images: { [key: string]: ImageItem };
  background_colors: { [key: string]: BackgroundColorItem };
  url_maps: { [key: string]: UrlMapItem };
  send_gifts: { [key: string]: SendGiftItem };
} = {
  texts: {
    text_1: { id: 'text_1', content: "Nhi Ngọc", text_color: '#609A44', text_size: '96px' },
    text_2: { id: 'text_2', content: 'Đức Anh', text_color: '#3A4239', text_size: '96px' },
    text_3: { id: 'text_3', content: 'Thân mời gia đình tới dự hôn lễ của tụi mình', text_color: '#868686', text_size: '20px' },
    text_4: { id: 'text_4', content: 'Days', text_color: '#5C5C5C', text_size: '16px' },
    text_5: { id: 'text_5', content: 'Hours', text_color: '#5C5C5C', text_size: '16px' },
    text_6: { id: 'text_6', content: 'Minutes', text_color: '#5C5C5C', text_size: '16px' },
    text_7: { id: 'text_7', content: 'Seconds', text_color: '#5C5C5C', text_size: '16px' },
    text_8: { id: 'text_8', content: 'Thời gian diễn ra', text_color: '#868686', text_size: '16px' },
    text_9: { id: 'text_9', content: '18-10-2025 10:00 (AM)', text_color: '#3A4239', text_size: '20px' },
    text_10: { id: 'text_10', content: 'Địa chỉ', text_color: '#868686', text_size: '16px' },
    text_11: { id: 'text_11', content: 'TRUNG TÂM TIỆC CƯỚI & HỘI NGHỊ DIAMOND PALACE', text_color: '#3A4239', text_size: '20px' },
    // text_12: { id: 'text_12', content: '', text_color: '#2B2B2B', text_size: '16px' },
    text_13: { id: 'text_13', content: 'Nếu bạn chưa quen đường, mình đã chuẩn bị sẵn link Google Maps để bạn dễ dàng tìm thấy', text_color: '#868686', text_size: '14px' },
    text_14: { id: 'text_14', content: 'Google Maps', text_color: '#4A7C59', text_size: '14px' },
    text_15: { id: 'text_15', content: 'Dress Code', text_color: '#868686', text_size: '16px' },
    text_16: { id: 'text_16', content: 'CẢM ƠN VÌ ĐÃ ĐẾN', text_color: '#3A4239', text_size: '20px' },
    text_17: { id: 'text_17', content: 'Chúng tôi xin gửi lời cảm ơn chân thành nhất đến gia đình, bạn bè và tất cả mọi người đã đến chung vui trong ngày trọng đại của chúng tôi. Sự hiện diện, lời chúc phúc và tình cảm của mọi người đã làm cho lễ cưới trở nên thật ý nghĩa và trọn vẹn. Chúng tôi sẽ luôn trân trọng và ghi nhớ khoảnh khắc hạnh phúc này. Xin chân thành cảm ơn!', text_color: '#868686', text_size: '20px' },
    text_18: { id: 'text_18', content: 'CHÚ RỂ', text_color: '#3A4239', text_size: '20px' },
    text_19: { id: 'text_19', content: 'Ngày hôm nay, khi nhìm lại em quốc yểu là dường, mình biết rằng hạnh tinh hạnh phúc của chúng ta thật vẻ bất đầu. Cảm ơn em đã dẫn, đã chọn lá và và cùng mình xây nên một mãi nao nao mang ơn pải thượng.', text_color: '#868686', text_size: '20px' },
    text_20: { id: 'text_20', content: 'CÔ DÂU', text_color: '#3A4239', text_size: '20px' },
    text_21: { id: 'text_21', content: 'Khoảnh khắc thành dẫn minh chiếc way cười, em thấy mội yểu, nơi đảo hơa thật. Cảm ơn anh vi luôn dụ dọng, vì đâ đi cùng em qua bao như nóng nón từ gia. Em tin rằng, từ nay đỡn nốt vé sau, chúng ta sễ cùng nhau viết nên câu chuyện đẹp nhất đời minh.', text_color: '#868686', text_size: '20px' },
    text_22: { id: 'text_22', content: 'QUÀ CHO DÂU RỂ', text_color: '#3A4239', text_size: '30px' },
    text_23: { id: 'text_23', content: 'Cảm ơn vì đã thành gia lễ cưới', text_color: '#868686', text_size: '20px' },
  },

  images: {
    image_1: { id: 'image_1', url: '/templates/ForestCharm/1.png', style: { objectFit: 'cover', borderRadius: 'none' } },
    image_2: { id: 'image_2', url: '/templates/ForestCharm/2.png', style: { objectFit: 'cover', borderRadius: '16px' } },
    image_3: { id: 'image_3', url: '/templates/ForestCharm/3.png', style: { objectFit: 'cover', borderRadius: '16px' } },
    image_4: { id: 'image_4', url: '/templates/ForestCharm/4.png', style: { objectFit: 'cover', borderRadius: '16px' } },
    image_qr: { id: 'image_qr', url: '/images/qr-mimy.png', style: { objectFit: 'cover', borderRadius: 'none' } },
  },

  background_colors: {
    bg_color_1: { id: 'bg_color_1', color: '#FBFFF8', border_color: 'none' },
    bg_color_2: { id: 'bg_color_2', color: '#5F9654', border_color: 'none' },
    bg_color_3: { id: 'bg_color_3', color: '#19271A', border_color: 'none' },
    bg_color_4: { id: 'bg_color_4', color: '#FFFFFF', border_color: '#D9D9D9' },
    bg_color_5: { id: 'bg_color_5', color: '#FFFFFF', border_color: 'none' },
  },

  url_maps: {
    map_1: { id: 'map_1', url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868543491!2d106.69629867472932!3d10.779723089318715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4a9f346469%3A0x20a2c7b1a8348df4!2sNotre-Dame%20Cathedral%20Basilica%20of%20Saigon!5e0!3m2!1sen!2s!4v1695108884305!5m2!1sen!2s' }
  },

  send_gifts: {
    send_gift_1: {
      id: 'send_gift_1',
      text_color: '#FFFFFF',
      text_bank_color: '#868686',
      text_size: '16px',
      text_bank_size: '18px',
      background_color: '#5F9654',
      border_color: 'none',
      content: 'Send gift',
      bank_name: 'NGUYEN VAN A',
      bank_number: 'BIDV - 109256432237',
      bank_holder: ''
    }
  },
}
