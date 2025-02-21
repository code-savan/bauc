"use client"

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { toast, Toaster } from 'sonner'
import { Loader2, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type FormData = {
  title: string;
  content: string;
  image: File | null;
}

export default function DeveloperApplication() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      // Create preview URL
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.image) {
        throw new Error('Please select an image');
      }

      // Create folder name from title or date
      const folderName = formData.title.toLowerCase().replace(/\s+/g, '-') ||
                        new Date().toISOString().split('T')[0];

      // Upload image to storage
      const imagePath = `developers/${folderName}/${formData.image.name}`;
      const { error: uploadError } = await supabase.storage
        .from('developer')
        .upload(imagePath, formData.image);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('developer')
        .getPublicUrl(imagePath);

      // Insert developer data
      const { error: insertError } = await supabase
        .from('developers')
        .insert([
          {
            title: formData.title,
            content: formData.content,
            image: publicUrl,
            status: 'pending' // New applications are pending by default
          }
        ]);

      if (insertError) throw insertError;

      toast.success("Application submitted successfully! We'll review it shortly.");
      router.push('/'); // or wherever you want to redirect after success

    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-y-auto  flex items-center justify-center">
      <div className="md:basis-3/5 basis-full mx-auto px-4 flex items-center justify-center">

        <div className="md:w-[550px] font-mono">
            <Image src="/logo.png"
            alt="Developer Application"
            className='mb-3 w-[100px]'
            width={100} height={100} />
          <h1 className="text-3xl font-bold text-left mb-2">Developer Application</h1>
          <p className="text-gray-600 text-left mb-4 text-sm">
            Join our network of trusted real estate developers
          </p>

          {/* <hr className='my-4 w-[80%] mx-auto' /> */}

          <form onSubmit={handleSubmit} className="space-y-3 bg-white rounded-xl shadow-sm">
            {/* Developer Name/Title */}
            <div className=''>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Developer Name
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent text-xs outline-none"
                placeholder="Enter your development company name"
              />
            </div>

            {/* Description */}
            <div className=''>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-transparent min-h-[150px] max-h-[150px] text-xs outline-none"
                placeholder="Tell us about your development company, projects, and experience..."
              />
            </div>

            {/* Image Upload */}
            <div className=''>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Logo/Image
              </label>
              <div className="mt-1 flex justify-center space-x-3  transition-colors">
                <div className="space-y-1 text-center flex-1 flex flex-col justify-center items-center border-2 border-gray-300 border-dashed rounded-lg hover:border-green-500 cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className=" text-sm text-gray-600">
                    <label htmlFor="image" className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500">
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                    <p className="pl-1 text-xs">or drag and drop</p>
                  </div>
                  <p className="text-[10px] text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>


              {imagePreview && (
                <div className="flex-1">
                  <Image
                    src={imagePreview ? imagePreview : '/logo-placeholder.svg'}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-lg"
                    width={128}
                    height={128}
                  />
                </div>
              )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-mono text-xs bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>
      </div>





      <div className='md:basis-2/5 basis-full hidden md:block h-screen filter brightness-50 grayscale-0' style={{ backgroundImage: 'url(devapp.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* <Image src="/images/developer-application.png" alt="Developer Application" clas width={1000} height={1000} /> */}
      </div>

      <Toaster />
    </main>
  );
}
