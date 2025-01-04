'use client';

import { useState } from 'react';
import { Palette, Upload, Check, Loader2, AlertCircle } from 'lucide-react';
import { uploadFile } from '@/utils/supabase/storage';
import { createClient } from '@/utils/supabase/client';

interface BrandingSetupProps {
  onComplete: () => void;
}

export function BrandingSetup({ onComplete }: BrandingSetupProps) {
  const [companyName, setCompanyName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#014380');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Logo file must be smaller than 2MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Upload to Supabase Storage
      const { url } = await uploadFile('logos', file, {
        path: `${Date.now()}-${file.name}`,
        upsert: true
      });

      // Update user settings with logo URL
      const supabase = createClient();
      if (!supabase) throw new Error('Supabase client not initialized');

      const { error: updateError } = await supabase
        .from('user_settings')
        .upsert({
          branding: {
            logoUrl: url,
            primaryColor,
            companyName
          }
        });

      if (updateError) throw updateError;

      setLogoUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const supabase = createClient();
      if (!supabase) throw new Error('Supabase client not initialized');

      const { error: updateError } = await supabase
        .from('user_settings')
        .upsert({
          branding: {
            logoUrl,
            primaryColor,
            companyName
          }
        });

      if (updateError) throw updateError;
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save branding settings');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 pb-6 border-b">
        <Palette className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Company Branding</h2>
          <p className="text-gray-600">Customize your email management experience</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full rounded-md"
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Color
          </label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="h-10 w-20 rounded-md cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Logo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-gray-50">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
              ) : (
                <Upload className="w-6 h-6 text-gray-400" />
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
                <span className={`inline-flex items-center gap-2 px-4 py-2 ${
                  isUploading ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white hover:bg-primary-dark'
                } rounded-md transition-colors`}>
                  {isUploading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload className="w-4 h-4" /> Upload Logo</>
                  )}
                </span>
              </label>
              <p className="text-xs text-gray-500">
                Maximum file size: 2MB. Supported formats: PNG, JPG, SVG
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            <Check className="w-5 h-5" />
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
}