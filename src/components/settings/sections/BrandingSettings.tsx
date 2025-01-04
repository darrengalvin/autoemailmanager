'use client';

import { useState } from 'react';
import { Palette, Image, Upload, AlertCircle } from 'lucide-react';
import { BrandingConfig } from '@/types/branding';
import { createClient } from '@/utils/supabase/client';
import { useEmailStore } from '@/store/emailStore';
import { EmailSettings } from '@/types';

interface BrandingSettingsProps {
  config: BrandingConfig;
  onUpdate: (config: Required<BrandingConfig>) => void;
}

export function BrandingSettings({ config, onUpdate }: BrandingSettingsProps) {
  const [settings, setSettings] = useState<BrandingConfig>(config);
  const [logoPreview, setLogoPreview] = useState<string | null>(config.logoUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateSettings } = useEmailStore();

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error state
    setError(null);
    setIsUploading(true);

    try {
      const supabase = createClient();
      
      if (!supabase) {
        throw new Error('Could not initialize Supabase client');
      }
      
      // Create logos bucket if it doesn't exist
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .createBucket('logos', {
          public: true,
          fileSizeLimit: 1024 * 1024 * 2 // 2MB limit
        });

      if (bucketError && !bucketError.message.includes('already exists')) {
        throw bucketError;
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(data.path);

      // Update settings
      const updatedSettings = {
        ...settings,
        logoUrl: publicUrl
      };
      
      setSettings(updatedSettings);
      setLogoPreview(publicUrl);
      onUpdate(updatedSettings);
      
      // Update email store settings
      updateSettings(updatedSettings as unknown as EmailSettings);

    } catch (error) {
      console.error('Error uploading logo:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-medium">Branding Settings</h2>
      </div>

      <div className="grid gap-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Logo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-gray-50">
              {logoPreview ? (
                <img 
                  src={logoPreview} 
                  alt="Logo" 
                  className="max-w-full max-h-full object-contain"
                  onError={() => setLogoPreview(null)}
                />
              ) : (
                <Image className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={isUploading}
                />
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50">
                  <Upload className="w-4 h-4" />
                  {isUploading ? 'Uploading...' : 'Upload Logo'}
                </span>
              </label>
              <p className="text-xs text-gray-500">
                Maximum file size: 2MB. Supported formats: PNG, JPG, SVG
              </p>
            </div>
          </div>
          {error && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Rest of the component remains the same */}
      </div>
    </div>
  );
}