
import { apiService } from './api.service';

export interface TryOnStyle {
  id: string;
  name: string;
  imageUrl: string;
  category: 'hair' | 'beard' | 'mustache';
  popularity: number;
  trendPercentage: number;
}

export interface SavedLook {
  id: string;
  name: string;
  imageUrl: string;
  styles: {
    hairStyleId?: string;
    beardStyleId?: string;
    hairColor?: string;
    filters?: {
      brightness: number;
      contrast: number;
      saturation: number;
    };
  };
  createdAt: string;
}

class VirtualTryOnService {
  private readonly BASE_PATH = '/virtual-try-on';

  async getPopularStyles(): Promise<TryOnStyle[]> {
    try {
      return await apiService.get<TryOnStyle[]>(`${this.BASE_PATH}/popular-styles`);
    } catch (error) {
      console.error('Error fetching popular styles:', error);
      // Return mock data if API fails
      return [
        {
          id: 'hair1',
          name: 'Degradê Moderno',
          imageUrl: '/public/hairstyle-1.png',
          category: 'hair',
          popularity: 98,
          trendPercentage: 12
        },
        {
          id: 'beard1',
          name: 'Barba Completa',
          imageUrl: '/images/style-1.jpg',
          category: 'beard',
          popularity: 85,
          trendPercentage: 8
        }
      ];
    }
  }

  async getSavedLooks(userId: string): Promise<SavedLook[]> {
    try {
      return await apiService.get<SavedLook[]>(`${this.BASE_PATH}/saved-looks`, { userId });
    } catch (error) {
      console.error('Error fetching saved looks:', error);
      return [];
    }
  }

  async saveLook(look: Omit<SavedLook, 'id' | 'createdAt'>): Promise<SavedLook> {
    try {
      return await apiService.post<SavedLook>(`${this.BASE_PATH}/save-look`, look);
    } catch (error) {
      console.error('Error saving look:', error);
      
      // Create a mock response with current timestamp
      const mockSavedLook: SavedLook = {
        id: `look-${Date.now()}`,
        name: look.name,
        imageUrl: look.imageUrl,
        styles: look.styles,
        createdAt: new Date().toISOString()
      };
      
      return mockSavedLook;
    }
  }

  async getRecommendedStyles(faceShape?: string): Promise<TryOnStyle[]> {
    try {
      return await apiService.get<TryOnStyle[]>(`${this.BASE_PATH}/recommendations`, { faceShape });
    } catch (error) {
      console.error('Error fetching recommended styles:', error);
      // Return mock data if API fails
      return [
        {
          id: 'rec-hair1',
          name: 'Texturizado Moderno',
          imageUrl: '/public/hairstyle-2.png',
          category: 'hair',
          popularity: 94,
          trendPercentage: 15
        },
        {
          id: 'rec-beard2',
          name: 'Barba Desenhada',
          imageUrl: '/images/style-3.jpg',
          category: 'beard',
          popularity: 88,
          trendPercentage: 10
        }
      ];
    }
  }
}

export const virtualTryOnService = new VirtualTryOnService();
