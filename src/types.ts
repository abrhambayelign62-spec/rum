export interface WeddingDetails {
  groomNameAm: string;
  groomNameEn: string;
  brideNameAm: string;
  brideNameEn: string;
  monogramInitials: string;
  weddingDateEth: string;
  weddingDateGreg: string;
  targetDateTime: string; // ISO string for countdown
  verseQuote: string;
  verseCitation: string;
  venueNameAm: string;
  venueNameEn: string;
  venueAddress: string;
  venueRating: number;
  googleMapsUrl: string;
  telegramBotUrl: string;
  receptionTimeAm: string;
  groomFullTitleAm?: string;
  brideFullTitleAm?: string;
}

export interface TimelineEvent {
  id: string;
  timeAm: string;
  timeEn: string;
  titleAm: string;
  titleEn: string;
  descriptionAm: string;
  iconType: 'car' | 'church' | 'camera' | 'dinner' | 'celebration';
}

export interface GuestRsvp {
  fullName: string;
  phone: string;
  attendance: 'attending' | 'declined';
  guestCount: number;
  message: string;
  submittedAt: string;
}
