import { BackgroundColorItem, Countdown, ImageItem, SendGiftItem, TextItem, Timeline, UrlMapItem } from "../templates/state";

export const original2010ForYaState: {
  texts: { [key: string]: TextItem };
  images: { [key: string]: ImageItem };
  background_colors: { [key: string]: BackgroundColorItem };
  url_maps: { [key: string]: UrlMapItem };
  send_gifts: { [key: string]: SendGiftItem };
  countdown?: Countdown;
  timeline?: Timeline[];
} = {
  texts: {
    text_1: { id: 'text_1', content: "Dear", text_color: '#56462F', text_size: '96px', isDeleted: false },
    text_2: { id: 'text_2', content: 'mylove', text_color: '#FAAA95', text_size: '96px', isDeleted: false },
    text_3: { id: 'text_3', content: 'Gửi em, cô gái dịu dàng', text_color: '#6B726E', text_size: '18px', isDeleted: false },
    text_4: { id: 'text_4', content: 'Chúc em hạnh phúc, bình an một đời', text_color: '#6B726E', text_size: '18px', isDeleted: false },
    text_5: { id: 'text_5', content: 'GỬI TỚI EM CỦA ANH', text_color: '#3A4239', text_size: '32px', isDeleted: false },
    text_6: { id: 'text_6', content: '20/10 không chỉ là ngày để tôn vinh vẻ đẹp của phụ nữ, mà với anh, nó là ngày để anh thêm trân trọng vì có em trong đời. Cảm ơn em vì tất cả. Anh chúc em luôn được yêu thương và che chở, đặc biệt là từ anh.', text_color: '#6B726E', text_size: '18px', isDeleted: false },
    text_7: { id: 'text_7', content: 'Chúc em yêu của anh ngày 20/10 thật ngọt ngào và xinh đẹp như chính em vậy. Cảm ơn em vì đã đến bên anh và khiến mỗi ngày đều là một ngày vui. Yêu em nhiều!', text_color: '#6B726E', text_size: '18px', isDeleted: false },
    text_8: { id: 'text_8', content: 'Món quà dành cho em chính là một buổi tối bên cạnh em. Hẹn gặp em tối nay, công chúa của anh.', text_color: '#6B726E', text_size: '18px', isDeleted: false },
  },

  images: {
    image_1: { id: 'image_1', url: '/templates/2010ForYa/2.png', style: { width: '100%', height: 'auto' }, isDeleted: false },
    image_2: { id: 'image_2', url: '/templates/2010ForYa/3.png', style: { objectFit: 'cover', borderRadius: '8px' }, isDeleted: false },
    image_3: { id: 'image_3', url: '/templates/2010ForYa/4.png', style: { objectFit: 'cover', borderRadius: '8px' }, isDeleted: false },
  },

  background_colors: {
    bg_color_1: { id: 'bg_color_1', color: '#EFEFEF', border_color: '#FFFFFF', isDeleted: false },
    bg_color_2: { id: 'bg_color_2', color: '#FAAA95', border_color: '#FFFFFF', isDeleted: false },
    bg_color_3: { id: 'bg_color_3', color: '#FFE9C0', border_color: '#FFFFFF', isDeleted: false },
  },

  url_maps: {
    map_1: { id: 'map_1', url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.394868543491!2d106.69629867472932!3d10.779723089318715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4a9f346469%3A0x20a2c7b1a8348df4!2sNotre-Dame%20Cathedral%20Basilica%20of%20Saigon!5e0!3m2!1sen!2s!4v1695108884305!5m2!1sen!2s', isDeleted: false }
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
      isDeleted: false,
    }
  },
}
