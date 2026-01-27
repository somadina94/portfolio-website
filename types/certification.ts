export interface Certification {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  badge_url: string | null;
  certificate_url: string | null;
  issuer: string | null;
  date_issued: string;
}
