
import { createClient } from '@supabase/supabase-js';
import { Hairstyle, VirtualTryOn, ClientFaceData } from '@/types/supabase';

// Initialize the Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

// Hairstyle-related functions
export const getAllHairstyles = async (): Promise<Hairstyle[]> => {
  const { data, error } = await supabase
    .from('hairstyles')
    .select('*')
    .order('popularity', { ascending: false });

  if (error) {
    console.error('Error fetching hairstyles:', error);
    throw error;
  }

  return data || [];
};

export const getHairstylesByCategory = async (category: string): Promise<Hairstyle[]> => {
  const { data, error } = await supabase
    .from('hairstyles')
    .select('*')
    .eq('category', category)
    .order('popularity', { ascending: false });

  if (error) {
    console.error('Error fetching hairstyles by category:', error);
    throw error;
  }

  return data || [];
};

export const getHairstylesByFaceShape = async (faceShape: string): Promise<Hairstyle[]> => {
  const { data, error } = await supabase
    .from('hairstyles')
    .select('*')
    .filter('face_shape_compatibility', 'cs', `{${faceShape}}`)
    .order('popularity', { ascending: false });

  if (error) {
    console.error('Error fetching hairstyles by face shape:', error);
    throw error;
  }

  return data || [];
};

export const getTrendingHairstyles = async (limit = 5): Promise<Hairstyle[]> => {
  const { data, error } = await supabase
    .from('hairstyles')
    .select('*')
    .order('popularity', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching trending hairstyles:', error);
    throw error;
  }

  return data || [];
};

export const incrementHairstylePopularity = async (hairstyleId: string): Promise<void> => {
  // First get the current popularity
  const { data: hairstyle, error: fetchError } = await supabase
    .from('hairstyles')
    .select('popularity')
    .eq('id', hairstyleId)
    .single();

  if (fetchError) {
    console.error('Error fetching hairstyle popularity:', fetchError);
    throw fetchError;
  }

  const currentPopularity = hairstyle?.popularity || 0;

  // Then update with incremented value
  const { error: updateError } = await supabase
    .from('hairstyles')
    .update({ popularity: currentPopularity + 1 })
    .eq('id', hairstyleId);

  if (updateError) {
    console.error('Error incrementing hairstyle popularity:', updateError);
    throw updateError;
  }
};

// Virtual Try-On related functions
export const saveVirtualTryOn = async (tryOnData: VirtualTryOn): Promise<VirtualTryOn> => {
  const { data, error } = await supabase
    .from('virtual_try_ons')
    .insert(tryOnData)
    .select()
    .single();

  if (error) {
    console.error('Error saving virtual try-on:', error);
    throw error;
  }

  return data;
};

export const getClientVirtualTryOns = async (clientId: string): Promise<VirtualTryOn[]> => {
  const { data, error } = await supabase
    .from('virtual_try_ons')
    .select('*, hairstyle:hairstyles(*)')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching client virtual try-ons:', error);
    throw error;
  }

  return data || [];
};

export const updateTryOnFeedback = async (
  tryOnId: string,
  feedback: 'liked' | 'disliked' | 'neutral'
): Promise<void> => {
  const { error } = await supabase
    .from('virtual_try_ons')
    .update({ feedback })
    .eq('id', tryOnId);

  if (error) {
    console.error('Error updating try-on feedback:', error);
    throw error;
  }
};

export const updateClientFaceShape = async (
  clientId: string,
  faceData: ClientFaceData
): Promise<void> => {
  const { error } = await supabase
    .from('clients')
    .update({ face_data: faceData })
    .eq('id', clientId);

  if (error) {
    console.error('Error updating client face shape:', error);
    throw error;
  }
};

export const uploadTryOnImage = async (imageFile: File, path: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('try-on-images')
    .upload(path, imageFile);

  if (error) {
    console.error('Error uploading try-on image:', error);
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from('try-on-images')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
};

// For backward compatibility with older code
export const updateClientFaceData = updateClientFaceShape;
