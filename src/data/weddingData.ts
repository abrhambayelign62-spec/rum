import { WeddingDetails, TimelineEvent } from '../types';

export const WEDDING_DATA: WeddingDetails = {
  groomNameAm: 'አዳነ',
  groomNameEn: 'Adane',
  brideNameAm: 'ቢታኒያ',
  brideNameEn: 'Bitaniya',
  monogramInitials: 'AB',
  weddingDateEth: 'ግንቦት 16 / 2018 ዓ.ም',
  weddingDateGreg: 'May 24, 2026',
  targetDateTime: '2026-05-24T18:00:00',
  verseQuote: '«እግዚአብሔር ነገርን ሁሉ በጊዜው ውብ አድርጎ ሠራው»',
  verseCitation: 'መክብብ 3:11',
  venueNameAm: 'ንፋስ ስልክ የሰርግ አዳራሽ',
  venueNameEn: 'East West Hall | Gofa Mebrat',
  venueAddress: 'XP9X+MV5, Addis Ababa, Ethiopia',
  venueRating: 4.8,
  googleMapsUrl: 'https://maps.google.com/?q=Gofa+Mebrat+Addis+Ababa+Ethiopia',
  telegramBotUrl: 'https://t.me/YeneSergBot',
  receptionTimeAm: 'ከምሽቱ 12:00 ሰዓት',
  groomFullTitleAm: 'የአቶ አዳነ አረጋ',
  brideFullTitleAm: 'የወ/ሪት ቢታንያ መስፍን',
};

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    timeAm: 'ከ 5:30 ሰዓት',
    timeEn: '11:30 AM',
    titleAm: 'ጉዞ ወደ ሙሽራት ቤት',
    titleEn: 'Procession to the Bride\'s House',
    descriptionAm: 'የሙሽራው ሚዜዎችና ቤተሰቦች ታጅበው ሙሽራይቱን ለመቀበል የሚደረግ የደመቀ ጉዞ',
    iconType: 'car',
  },
  {
    id: '2',
    timeAm: 'ከ 8:00 ሰዓት',
    timeEn: '2:00 PM',
    titleAm: 'የጋብቻ ቃለ-መሀላና ስነ-ስርዓት',
    titleEn: 'Holy Matrimony & Vows',
    descriptionAm: 'በእግዚአብሔር ፊት በአንድነት የሚፈጸም ቅዱስ የጋብቻ ስርዓት',
    iconType: 'church',
  },
  {
    id: '3',
    timeAm: 'ከ 10:00 ሰዓት',
    timeEn: '4:00 PM',
    titleAm: 'የፎቶ ፕሮግራም በወዳጅነት ፓርክ',
    titleEn: 'Photo Session at Friendship Park',
    descriptionAm: 'ከወዳጅ ዘመዶች ጋር የሚደረግ አስደሳች የፎቶ መታሰቢያ',
    iconType: 'camera',
  },
  {
    id: '4',
    timeAm: 'ከምሽቱ 12:00 ሰዓት',
    timeEn: '6:00 PM',
    titleAm: 'የእራት ፕሮግራም እና የእንኳን ደህና መጣችሁ አቀባበል',
    titleEn: 'Dinner Reception & Welcome',
    descriptionAm: 'ንፋስ ስልክ አዳራሽ | የተመረጡ የባህልና የዘመናዊ ምግቦች መስተንግዶ',
    iconType: 'dinner',
  },
  {
    id: '5',
    timeAm: 'ከምሽቱ 2:00 ሰዓት',
    timeEn: '8:00 PM',
    titleAm: 'የኬክ ቆረሳ እና የደስታ ጭፈራ',
    titleEn: 'Cake Cutting & Celebration',
    descriptionAm: 'የደስታችን መቋጫ ከምርጥ ሙዚቃዎችና ጭፈራዎች ጋር',
    iconType: 'celebration',
  },
];

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    title: 'የመጀመሪያ ቀን',
    desc: 'The beginning of our forever',
  },
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    title: 'የፍቅር ጉዞ',
    desc: 'Walking hand in hand through life',
  },
  {
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
    title: 'የቃል ኪዳን ቀን',
    desc: 'Two hearts joined as one in love',
  },
];
