import { BackgroundColorItem, Countdown, ImageItem, SendGiftItem, TextItem, Timeline, UrlMapItem } from "../templates/state";

export const original2010MyLightState: {
  texts: { [key: string]: TextItem };
  images: { [key: string]: ImageItem };
  background_colors: { [key: string]: BackgroundColorItem };
  url_maps: { [key: string]: UrlMapItem };
  send_gifts: { [key: string]: SendGiftItem };
  countdown?: Countdown;
  timeline?: Timeline[];
} = {
  texts: {
    text_1: { id: 'text_1', content: "Gửi đến", text_color: '#222D35', text_size: '96px' },
    text_2: { id: 'text_2', content: 'mẹ yêu', text_color: '#4E746A', text_size: '96px' },
    text_3: { id: 'text_3', content: 'của con', text_color: '#222D35', text_size: '96px' },
    text_4: { id: 'text_4', content: 'Lời cảm ơn mãi không vơi', text_color: '#6B726E', text_size: '18px' },
    text_5: { id: 'text_5', content: 'Mong mẹ mạnh khỏe, đời đời bình an.', text_color: '#6B726E', text_size: '18px' },
    text_6: { id: 'text_6', content: 'Mẹ thân yêu, trong mỗi bước đi trên chặng đường của con đều có hình bóng mẹ phía sau. Con không có lời hay ý đẹp nào, chỉ có tấm lòng biết ơn sâu sắc nhất. Cảm ơn mẹ đã sinh thành, dưỡng dục, luôn là bờ bến yêu thương mỗi khi con vấp ngã. Con chúc mẹ luôn dồi dào sức khỏe, bình an và mãi ở bên cạnh chúng con. ', text_color: '#6B726E', text_size: '18px' },
    text_7: { id: 'text_7', content: 'Chúc mẹ sức khỏe, niềm vui và cuộc sống này sẽ thật nhẹ nhàng với mẹ của con. Con luôn ở đây và yêu thương mẹ.', text_color: '#6B726E', text_size: '18px' },
  },

  images: {
    image_1: { id: 'image_1', url: '/templates/2010MyLight/2.png', style: { width: '100%', height: 'auto' } },
    image_2: { id: 'image_2', url: '/templates/2010MyLight/3.png', style: { objectFit: 'cover', borderRadius: '8px' } },
    image_3: { id: 'image_3', url: '/templates/2010MyLight/4.png', style: { objectFit: 'cover', borderRadius: '8px' } },
  },

  background_colors: {
    bg_color_1: { id: 'bg_color_1', color: '#FFFAD3', border_color: 'transparent' },
    bg_color_2: { id: 'bg_color_2', color: '#E9BD0B', border_color: '#E9BD0B' },
    bg_color_3: { id: 'bg_color_3', color: '#000000', border_color: '#000000' },
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
