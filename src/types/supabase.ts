
export interface Hairstyle {
  id: string;
  name: string;
  category: 'corte' | 'barba' | string;
  description?: string;
  image_urls: string[];
  face_shape_compatibility?: string[];
  popularity?: number;
  created_at?: string;
  updated_at?: string;
}

export interface VirtualTryOn {
  id?: string;
  client_id: string;
  hairstyle_id: string;
  result_image_url: string;
  face_data: any | null;
  is_saved: boolean;
  feedback: 'liked' | 'disliked' | 'neutral' | null;
  created_at?: string;
}

export interface ClientFaceData {
  face_shape: string;
  features?: Record<string, any>;
}
