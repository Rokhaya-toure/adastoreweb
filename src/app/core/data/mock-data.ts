import { Category, Product } from '../models/product';

const CLOUD_NAME = 'hetxppwj';

// Image Cloudinary à partir du public ID


export const img = (publicId: string, width = 600) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_pad,b_white,ar_1:1,w_${width},f_auto,q_auto/${publicId}`;

// Vidéo Cloudinary (public ID sans extension)


// Miniature de la vidéo (première image)
export const vidPoster = (publicId: string, width = 600) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0,c_fill,ar_1:1,w_${width},f_jpg,q_auto/${publicId}.jpg`;

export const vidEmbed = (idOrUrl: string) =>
  idOrUrl.startsWith('http')
    ? idOrUrl
    : `https://player.cloudinary.com/embed/?cloud_name=${CLOUD_NAME}&public_id=${idOrUrl}`;
export const vid = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto,vc_h264/${publicId}.mp4`;

export const CATEGORIES: Category[] = [
  { slug: 'trepieds',     name: 'Trépieds',          description: 'Trépieds pour téléphone et caméra.',            emoji: '📸' },
  { slug: 'ring-lights',  name: 'Ring lights',       description: ' ring lights et ring lights avec trépied.', emoji: '💍' },
  { slug: 'mini-ring-lights',  name: 'mini-Ring-lights',       description: 'Mini ring lights et ring lights avec trépied.', emoji: '💍' },
  { slug: 'projecteurs',  name: 'Projecteurs',       description: 'Mini projecteurs pour la maison et le bureau.', emoji: '📽️' },
  { slug: 'smartphones',  name: 'Smartphones',       description: 'Smartphones et accessoires.',                   emoji: '📱' },
  { slug: 'micros et ecouteurs',       name: 'Micros et écouteurs',            description: 'Micros cravate et micros de studio.',           emoji: '🎙️' },
  { slug: 'ventilateurs', name: 'Ventilateurs',      description: 'Ventilateurs portables rechargeables.',         emoji: '🌀' },
  { slug: 'chargeurs',    name: 'Chargeurs',         description: 'Chargeurs, câbles et accessoires.',             emoji: '🔌' },
  { slug: 'bouteilles',   name: 'Bouteilles',        description: 'Bouteilles isothermes et gourdes.',             emoji: '🧴' },
  { slug: 'epilation',    name: 'Épilation',         description: 'Machines à cire pour épilation.',               emoji: '✨' },
  { slug: 'montre',    name: 'Montre',         description: 'Montres intelligentes et accessoires.',               emoji: '⌚' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1, name: 'Trépied 2 m', short: 'Trépied pour téléphone et caméra, réglable jusqu\'à 2 m',
    price: 10000, category: 'trepieds', emoji: '📸', isNew: true, sales: 90,
    image: img('ChatGPT_Image_15_sept._2026_19_01_55'),
    videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at_22.07.21_3'),
    
  },
  {
    id: 2, name: 'Mini ring light', short: 'Mini ring light rechargeable et portable, 2 couleurs',
    price: 3500, category: 'mini-ring-lights', emoji: '💍', sales: 55, isNew:true,
    image: img('WhatsApp_Image_2026-09-17_at_13.16.59.jpg'),
    videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at21'),
  },
  {
    id: 3, name: 'Projecteur', short: ' projecteur avec support, portable et rechargeable, 3 couleurs tres lumineux',
    price: 20000, category: 'projecteurs', emoji: '🎞️', sales: 55,
    image: img('WhatsApp_Image_2026-11-01_at_11.47.48.jpg'),
    videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at_21.58.43'),
  },
  {
    id: 4, name: 'Ring light', short: 'ring light 10 pousse avec trépied, 3 couleurs et télécommande, très lumineux et réglable',
    price: 5000, category: 'ring-lights', emoji: '💍', sales: 55,
    image: img('ChatGPT_Image_15_sept._2026_18_47_08.png'),
    videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at_22.07.21_2'),
  },
  {
    id: 5, name: 'Trépied', short: ' trepied 170cm pour telephone avec deux lampe anneau, 3 couleurs et télécommande, très lumineux et réglable',
    price: 7500, category: 'trepieds', emoji: '�', sales: 55,
    image: img('WhatsApp_Image_2026-11-01_at_11.53.59.jpg'),
    videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at_22.07.21'),
  },
  {
    id: 6, name: 'Projecteur', short: 'projecteur pour arriere plante, portable et rechargeable, 3 couleurs tres lumineux',
    price: 20000, category: 'projecteurs', emoji: '🎞️', sales: 55,
    image: img('FSD168_infographie.jpg'),
    videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at_21.10.36'),
  },
  {
    // Exemple avec galerie photos + vidéo : remplacez les public IDs par les vôtres
    id: 7, name: 'projecteur', short: 'projecteur plokoma p19 avec suport de 2m avec plusieurs couleurs et télécommande, très lumineux et réglable',
    price: 18000, category: 'projecteurs', emoji: '💍', sales: 55,
    image: img('WhatsApp_Image_2026-11-01_at_11.51.49.jpg'),
    images: [img('PLOKAMA_P19_infographie.jpg', 900)],
        videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at_15.18.39'),

    // video: 'mon_id_video_cloudinary',
  },
  {
    id: 8, name: 'projecteur', short: 'projecteur plokama p11 avec suport de 2m avec plusieurs couleurs et télécommande, très lumineux et réglable',
    price: 12000, category: 'projecteurs', emoji: '💍', sales: 55,
    image: img('PLOKAMA_P11_infographie.jpg'),
    videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at_21.58.42'),
  },
  {
    id: 9, name: 'Ring light', short: 'Mini ring light rechargeable et portable,plusieurs couleurs et télécommande, très lumineux et réglable',
    price: 4500, category: 'ring-lights', emoji: '💍', sales: 55,
    image: img('TL5_infographie_v2.jpg'),
    videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at_21.10.23'),


  },
  {
    id: 10, name: 'casque', short: 'ecouteur casque bluetooth tres pratique et sesistant',
    price: 10000, category: 'micros-et-ecouteurs', emoji: '💍', sales: 55,
    image: img('WhatsApp_Image_2026-11-01_at_11.53.25.jpg'),
  },

   {
    id: 11, name: 'pack montre et ventillo', short: 'montre  intelligente et ventilo portable rechargeable, 3 couleurs tres lumineux',
    price: 8000, category: 'montre', emoji: '💍', sales: 55,
    image: img('WhatsApp_Image_2026-11-01_at_11.48.28.jpg'),
  },
    {
    id: 12, name: 'ventillo', short: 'mini ventillo portable rechargeable',
    price: 3500, category: 'ventillos', emoji: '💍', sales: 55,
    image: img('WhatsApp_Image_2026-11-01_at_15.01.55.jpg'),
  },
    {
    id: 13, name: 'montre S11 Max', short: 'montre intelligente S11 Max avec plusieurs fonctionnalités et couleurs',
    price: 8000, category: 'montre', emoji: '💍', sales: 55,
    image: img('WhatsApp_Image_2026-11-01_at_15.03.11.jpg'),
  },
    {
    id: 14, name: 'Ring light plokama', short: 'Mini ring light plokama rechargeable et portable,plusieurs couleurs et télécommande, très lumineux et réglable',
    price: 7000, category: 'ring-lights', emoji: '💍', sales: 55,
    image: img('WhatsApp_Image_2026-11-01_at_15.04.29.jpg'),
  },
  {
    id: 15, name: 'trepied', short: 'trepid 1.70m pour telephone avec deux lampe anneau, télécommande,',
    price: 4700, category: 'trepieds', emoji: '💍', sales: 55,
    image: img('SELFIE_STICK_simple.jpg'),
    videoEmbed: vidEmbed('WhatsApp_Video_2026-11-01_at_15.18.39'),
  },

]
  