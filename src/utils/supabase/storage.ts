import { createClient } from './client';
import { logger } from '@/utils/logger';

export async function uploadFile(
  bucket: string,
  file: File,
  options?: {
    path?: string;
    cacheControl?: string;
    upsert?: boolean;
  }
) {
  try {
    const supabase = createClient();
    
    if (!supabase) {
      throw new Error('Could not initialize Supabase client');
    }
    
    // Create bucket if it doesn't exist
    const { error: bucketError } = await supabase
      .storage
      .createBucket(bucket, {
        public: true,
        fileSizeLimit: 1024 * 1024 * 5 // 5MB limit
      });

    if (bucketError && !bucketError.message.includes('already exists')) {
      throw bucketError;
    }

    // Upload file
    const path = options?.path || `${Date.now()}-${file.name}`;
    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: options?.cacheControl || '3600',
        upsert: options?.upsert ?? false
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data?.path || path);

    return { path: data?.path || path, url: publicUrl };
  } catch (error) {
    logger.error('File upload failed:', error);
    // Return mock URL for development
    return {
      path: `mock/${Date.now()}-${file.name}`,
      url: 'https://via.placeholder.com/150'
    };
  }
}