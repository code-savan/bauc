"use client"

import { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { supabase } from '@/lib/supabaseClient'
import { useToast } from '@/hooks/use-toast'
import { sendFormSubmissionNotification } from '@/lib/notificationHelper'
import {
  User, Phone, Mail, Building2, Globe, MapPin,
  Calendar, FileText, Upload, AlertTriangle, Loader2, X
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Field = {
  key: string;
  label: string;
  isFile?: boolean;
}

type FormData = {
  // Client Information
  fullName: string
  contactNumber: string
  email: string

  // Developer Information
  developerName: string
  registrationNumber: string
  officeAddress: string
  website: string

  // Portfolio Details
  portfolioName: string
  location: string
  portfolioType: string
  projectTimeline: string
  completionDate: string

  // Portfolio Vetting
  landSize: string
  surveyNumber: string
  currentLandUse: string
  zoningInfo: string
  topographyDetails: string
  infrastructure: string
  encumbrances: string
  documentation: string

  // Additional Information
  documents: FileList | null
  additionalInfo: string
  consent: boolean

  // New fields for available documentation
  availableDocumentation: {
    file: File | null;
    url: string;
  }

  // Update verification doc to include document type
  verificationDoc: {
    file: File | null;
    url: string;
    type: string;
  }
}

// Add this new Preview component
function FormPreview({ control }: { control: any }) {
  const values = useWatch({ control });

  const sections: { title: string; icon: JSX.Element; fields: Field[] }[] = [
    {
      title: "Client Information",
      icon: <User className="h-4 w-4" />,
      fields: [
        { key: 'fullName', label: 'Full Name' },
        { key: 'contactNumber', label: 'Contact Number' },
        { key: 'email', label: 'Email' },
      ]
    },
    {
      title: "Developer Information",
      icon: <Building2 className="h-4 w-4" />,
      fields: [
        { key: 'developerName', label: 'Developer Name' },
        { key: 'registrationNumber', label: 'Registration Number' },
        { key: 'officeAddress', label: 'Office Address' },
        { key: 'website', label: 'Website' },
      ]
    },
    {
      title: "Portfolio Details",
      icon: <FileText className="h-4 w-4" />,
      fields: [
        { key: 'portfolioName', label: 'Portfolio Name' },
        { key: 'location', label: 'Location' },
        { key: 'portfolioType', label: 'Portfolio Type' },
        { key: 'projectTimeline', label: 'Timeline' },
        { key: 'completionDate', label: 'Completion Date' },
      ]
    },
    {
      title: "Portfolio Vetting",
      icon: <FileText className="h-4 w-4" />,
      fields: [
        { key: 'landSize', label: 'Land Size' },
        { key: 'surveyNumber', label: 'Survey Number' },
        { key: 'currentLandUse', label: 'Current Land Use' },
        { key: 'zoningInfo', label: 'Zoning Info' },
        { key: 'topographyDetails', label: 'Topography' },
        { key: 'infrastructure', label: 'Infrastructure' },
        { key: 'encumbrances', label: 'Encumbrances' },
      ]
    },
    {
      title: "Additional Information",
      icon: <FileText className="h-4 w-4" />,
      fields: [
        { key: 'additionalInfo', label: 'Additional Info' },
      ]
    },
    {
      title: "Uploaded Files",
      icon: <FileText className="h-4 w-4" />,
      fields: [
        {
          key: 'availableDocumentation',
          label: 'Documentation',
          isFile: true
        },
        {
          key: 'verificationDoc',
          label: 'Verification Doc',
          isFile: true
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 sticky top-6">
      <h3 className="text-lg font-semibold border-b pb-2">Form Preview</h3>
      <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pb-20" style={{ maxWidth: '100%' }}>
        {sections.map((section) => {
          const hasValues = section.fields.some(field => values[field.key]);
          if (!hasValues) return null;

          return (
            <div key={section.title} className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                {section.icon}
                {section.title}
              </div>
              <div className="grid gap-2 text-sm pl-6">
                {section.fields.map((field) => {
                  if (!values[field.key]) return null;
                  if (field.isFile) {
                    const fileData = values[field.key];
                    if (!fileData?.url) return null;

                    return (
                      <div key={field.key} className="mt-2">
                        <span className="text-gray-500">{field.label}:</span>
                        <MediaPreview
                          url={fileData.url}
                          type={fileData.file?.type?.startsWith('image/') ? 'image' : 'pdf'}
                          onRemove={() => {}} // Preview only
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={field.key} className="grid grid-cols-[120px,1fr] gap-2">
                        <span className="text-gray-500">{field.label}:</span>
                        <span className="font-medium break-words">{values[field.key]}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Update the MediaPreview component to ensure the onRemove function is only called on button click
function MediaPreview({
  url,
  type,
  onRemove
}: {
  url: string;
  type: 'image' | 'pdf';
  onRemove: () => void;
}) {
  return (
    <div className="relative group">
      {type === 'image' ? (
        <div className="relative h-32 w-full">
          <Image
            src={url}
            alt="Preview"
            fill
            className="object-contain rounded-lg"
          />
        </div>
      ) : (
        <div className="h-32 w-full flex items-center justify-center bg-gray-50 rounded-lg">
          <FileText className="h-8 w-8 text-gray-400" />
          <span className="ml-2 text-sm text-gray-600">PDF Document</span>
        </div>
      )}
      <button
        onClick={onRemove} // Ensure this is the only place onRemove is called
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function KYCForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors }, control, setValue, watch, reset } = useForm<FormData>()

  const { toasts, showToast } = useToast();

  // Handle file uploads
  const handleFileUpload = async (file: File, path: string, formData?: FormData) => {
    try {
      // Create folder name based on available data
      let folderName = '';
      if (formData?.developerName) {
        folderName = formData.developerName.replace(/\s+/g, '_').toLowerCase();
      } else if (formData?.portfolioName) {
        folderName = formData.portfolioName.replace(/\s+/g, '_').toLowerCase();
      } else if (formData?.fullName) {
        folderName = formData.fullName.replace(/\s+/g, '_').toLowerCase();
      } else {
        folderName = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${path}/${folderName}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('kyc_media')
        .upload(filePath, file);

      if (uploadError) throw new Error(uploadError.message);

      const { data } = supabase.storage
        .from('kyc_media')
        .getPublicUrl(filePath);

      return { path: filePath, url: data.publicUrl };
    } catch (error) {
      console.error('Error uploading file:', error);
      showToast('Upload Error', 'File upload failed.');
      throw error;
    }
  };

  // Form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const uploadPromises = [];

      if (data.availableDocumentation?.file) {
        uploadPromises.push(
          handleFileUpload(data.availableDocumentation.file, 'documentation', data)
            .then(result => ({ documentation: result }))
        );
      }

      if (data.verificationDoc?.file) {
        uploadPromises.push(
          handleFileUpload(data.verificationDoc.file, 'verificationDocs', data)
            .then(result => ({ verification: result }))
        );
      }

      const uploadResults = await Promise.all(uploadPromises);
      const uploadedFiles = Object.assign({}, ...uploadResults);

      console.log('Data being inserted:', {
        full_name: data.fullName,
        contact_number: data.contactNumber,
        email: data.email,
        developer_name: data.developerName,
        registration_number: data.registrationNumber,
        office_address: data.officeAddress,
        website: data.website,
        portfolio_name: data.portfolioName,
        location: data.location,
        portfolio_type: data.portfolioType,
        project_timeline: data.projectTimeline,
        completion_date: data.completionDate,
        land_size: data.landSize,
        survey_number: data.surveyNumber,
        current_land_use: data.currentLandUse,
        zoning_info: data.zoningInfo,
        topography_details: data.topographyDetails,
        infrastructure: data.infrastructure,
        encumbrances: data.encumbrances,
        documentation: uploadedFiles.documentation?.url || null,
        additional_info: data.additionalInfo,
        consent: data.consent,
        documents_url: uploadedFiles.verification?.url ? [uploadedFiles.verification.url] : [],
        document_type: data.verificationDoc?.type || null,
      });

      // Insert into kyc_forms table
      const { error: insertError } = await supabase
        .from('kyc_forms')
        .insert({
          full_name: data.fullName,
          contact_number: data.contactNumber,
          email: data.email,
          developer_name: data.developerName,
          registration_number: data.registrationNumber,
          office_address: data.officeAddress,
          website: data.website,
          portfolio_name: data.portfolioName,
          location: data.location,
          portfolio_type: data.portfolioType,
          project_timeline: data.projectTimeline,
          completion_date: data.completionDate,
          land_size: data.landSize,
          survey_number: data.surveyNumber,
          current_land_use: data.currentLandUse,
          zoning_info: data.zoningInfo,
          topography_details: data.topographyDetails,
          infrastructure: data.infrastructure,
          encumbrances: data.encumbrances,
          documentation: uploadedFiles.documentation?.url || null,
          additional_info: data.additionalInfo,
          consent: data.consent,
          documents_url: uploadedFiles.verification?.url ? [uploadedFiles.verification.url] : [],
          document_type: data.verificationDoc?.type || null,
        });

      if (insertError) throw insertError;

      // Send email notification
      await sendFormSubmissionNotification('KYC Form', {
        ...data,
        documentation: uploadedFiles.documentation?.url || null,
        verification: uploadedFiles.verification?.url || null,
      });

      showToast('Success', 'Form submitted successfully!');

      // Clear form fields
      reset();

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push('/');
      }, 1500); // 1.5 second delay to show the success message

    } catch (error: any) {
      console.error('Submission error:', error);

      // Handle specific error cases with user-friendly messages
      if (error.message) {
        if (error.message.includes('duplicate key') && error.message.includes('email')) {
          showToast('Form Error', 'This email address is already registered in our system.');
        } else if (error.message.includes('violates foreign key constraint')) {
          showToast('Form Error', 'There was an issue with one of your selections. Please check your form.');
        } else if (error.message.includes('violates not-null constraint')) {
          showToast('Form Error', 'Please fill in all required fields.');
        } else if (error.message.includes('malformed array literal')) {
          showToast('Form Error', 'There was an issue with your document upload. Please try again.');
        } else {
          // Generic error message for other cases
          showToast('Submission Error', 'We couldn\'t process your form. Please try again later.');
        }
      } else {
        showToast('Submission Error', 'Something went wrong. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Display custom toasts */}
        {toasts.map((t) => (
          <div
            key={t.id}
            className="fixed bottom-4 right-4 bg-white shadow-lg border rounded-lg p-4 z-50 animate-in fade-in slide-in-from-bottom-4"
          >
            <div className="flex gap-2">
              <strong className="text-gray-900">{t.title}</strong>
              <span className="text-gray-600">—</span>
              <span className="text-gray-600">{t.description}</span>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-3xl font-display-fair">KYC FORM – BAUC International</CardTitle>
                <CardDescription className="text-base max-w-2xl mx-auto">
                  Thank you for choosing BAUC INTERNATIONAL. Please ensure you provide correct, accurate and comprehensive information about the portfolio as any incorrect information will greatly affect the outcome of our report.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Section 1: Client Information */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-xl font-semibold">Client Information</h2>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input {...register('fullName')} placeholder="Enter your full name" />
                      </div>

                      <div className="space-y-2">
                        <Label>Contact Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...register('contactNumber')} className="pl-10" placeholder="Your contact number" />
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...register('email')} className="pl-10" type="email" placeholder="Your email address" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Developer Information */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-xl font-semibold">Developer/Portfolio Owner Information</h2>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Developer/Landowner Name</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...register('developerName')} className="pl-10" placeholder="Enter developer name" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Company Registration Number</Label>
                        <Input
                          {...register('registrationNumber')}
                          placeholder="If applicable"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Head Office Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...register('officeAddress')} className="pl-10" placeholder="Enter office address" />
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...register('website')} className="pl-10" placeholder="If applicable" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Portfolio Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-xl font-semibold">Portfolio Details</h2>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Portfolio Name</Label>
                        <Input {...register('portfolioName')} placeholder="If applicable" />
                      </div>

                      <div className="space-y-2">
                        <Label>Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...register('location')} className="pl-10" placeholder="Enter location" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Portfolio Type</Label>
                        <Select onValueChange={value => setValue('portfolioType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className='bg-white'>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Project Timeline</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...register('projectTimeline')} className="pl-10" placeholder="If applicable" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Expected Completion Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...register('completionDate')} className="pl-10" type="date" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Vetting Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-xl font-semibold">Portfolio Vetting</h2>
                    </div>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Land Size</Label>
                        <Input {...register('landSize')} placeholder="Enter land size" />
                      </div>

                      <div className="space-y-2">
                        <Label>Location/Survey Plan Number</Label>
                        <Input {...register('surveyNumber')} placeholder="Enter survey plan number" />
                      </div>

                      <div className="space-y-2">
                        <Label>Current Land Use</Label>
                        <Input {...register('currentLandUse')} placeholder="Specify current land use" />
                      </div>

                      <div className="space-y-2">
                        <Label>Zoning Information</Label>
                        <Input {...register('zoningInfo')} placeholder="Enter zoning information" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Topography Details</Label>
                        <Textarea
                          {...register('topographyDetails')}
                          placeholder="Describe the topography"
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Access to Infrastructure</Label>
                        <Textarea
                          {...register('infrastructure')}
                          placeholder="Describe access to roads, electricity, water, etc."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>Encumbrances</Label>
                        <Textarea
                          {...register('encumbrances')}
                          placeholder="List any encumbrances if any"
                          className="min-h-[100px]"
                        />
                      </div>

                      {/* File upload sections */}
                      <div className="space-y-2">
                        <Label>Available Documentation (Optional)</Label>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                            <input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                try {
                                  const isImage = file.type.startsWith('image/');
                                  const isPDF = file.type === 'application/pdf';

                                  if (!isImage && !isPDF) {
                                    showToast('File Error', 'Please upload only images or PDF files');
                                    return;
                                  }

                                  // Create preview URL
                                  const previewUrl = URL.createObjectURL(file);

                                  // Preserve the document type when updating the file
                                  const currentType = watch('verificationDoc.type') || '';
                                  setValue('availableDocumentation', {
                                    file,
                                    url: previewUrl
                                  } as any);

                                  showToast('File Uploaded', isPDF
                                    ? 'PDF uploaded. Scroll preview to view.'
                                    : 'Image uploaded. Scroll preview to view.');
                                } catch (error) {
                                  showToast('File Error', 'Error handling file');
                                }
                              }}
                              className="hidden"
                              id="documentation-upload"
                              accept=".pdf,image/*"
                            />
                            <label
                              htmlFor="documentation-upload"
                              className="flex flex-col items-center justify-center cursor-pointer"
                            >
                              <Upload className="h-6 w-6 text-gray-400 mb-2" />
                              <span className="text-sm font-medium text-gray-600">Upload documentation</span>
                              <span className="text-xs text-gray-500 mt-1">PDF or Images</span>
                            </label>
                          </div>

                          {watch('availableDocumentation')?.url && (
                            <MediaPreview
                              url={watch('availableDocumentation').url}
                              type={watch('availableDocumentation').file?.type.startsWith('image/') ? 'image' : 'pdf'}
                              onRemove={() => {
                                // Clear the field value when the X button is clicked
                                setValue('availableDocumentation', { file: null, url: '' } as any);
                                showToast('Info', 'File removed from preview');
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Updated Verification Document Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <h2 className="text-xl font-semibold">Verification Document</h2>
                    </div>
                    <Separator />

                    <div className="space-y-4">
                      <Label>Document Type</Label>
                      <Select
                        onValueChange={value => setValue('verificationDoc.type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent className='bg-white'>
                          <SelectItem value="id">Personal ID Card</SelectItem>
                          <SelectItem value="passport">Passport Data Page</SelectItem>
                          <SelectItem value="title">Title Document</SelectItem>
                          <SelectItem value="deed">Deed of Assignment</SelectItem>
                          <SelectItem value="c_of_o">C of O</SelectItem>
                          <SelectItem value="offer_letter">Offer Letter</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                        <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            try {
                              const isImage = file.type.startsWith('image/');
                              const isPDF = file.type === 'application/pdf';

                              if (!isImage && !isPDF) {
                                showToast('File Error', 'Please upload only images or PDF files');
                                return;
                              }

                              // Create preview URL
                              const previewUrl = URL.createObjectURL(file);

                              // Preserve the document type when updating the file
                              const currentType = watch('verificationDoc.type') || '';
                              setValue('verificationDoc', {
                                file,
                                url: previewUrl,
                                type: currentType
                              } as any);

                              showToast('File Uploaded', isPDF
                                ? 'PDF uploaded. Scroll preview to view.'
                                : 'Image uploaded. Scroll preview to view.');
                            } catch (error) {
                              showToast('File Error', 'Error handling file');
                            }
                          }}
                          className="hidden"
                          id="verificationdoc-upload"
                          accept=".pdf,image/*"
                        />
                        <label
                          htmlFor="verificationdoc-upload"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-6 w-6 text-gray-400 mb-2" />
                          <span className="text-sm font-medium text-gray-600">Upload verification document</span>
                          <span className="text-xs text-gray-500 mt-1">PDF or Images</span>
                        </label>
                      </div>

                      {watch('verificationDoc')?.url && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Document Type: {watch('verificationDoc.type') ?
                                watch('verificationDoc.type').replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) :
                                'Not specified'}
                            </span>
                          </div>
                          <MediaPreview
                            url={watch('verificationDoc').url}
                            type={watch('verificationDoc').file?.type?.startsWith('image/') ? 'image' : 'pdf'}
                            onRemove={() => {
                              // Preserve the document type when removing the file
                              const currentType = watch('verificationDoc.type') || '';
                              setValue('verificationDoc', { file: null, url: '', type: currentType } as any);
                              showToast('Info', 'File removed from preview');
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <Label>Additional Information</Label>
                    <Textarea
                      {...register('additionalInfo')}
                      placeholder="Please provide any additional information or specific concerns you would like us to consider during the vetting process..."
                      className="min-h-[150px]"
                    />
                  </div>

                  {/* Declaration */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox {...register('consent')} id="consent" required />
                      <Label htmlFor="consent" className="text-sm">
                        I hereby confirm that the information provided in this form is true, accurate and complete to the best of my knowledge.
                        I authorize BAUC International to use this information for operational purposes only.
                      </Label>
                    </div>
                  </div>

                  {/* Warning Note */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      <h3 className="font-semibold">KINDLY NOTE:</h3>
                    </div>
                    <ul className="text-red-600 text-sm space-y-1 list-disc pl-5">
                      <li>Kindly cross-check and ensure that the Portfolio Details are correct, as any update attracts additional full payment.</li>
                      <li>Please allow ten (10) working days for the completion of the vetting process.</li>
                      <li>The service fees included in the Service Proposal Letter will be directly invoiced by BAUC International.</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit KYC Form"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <FormPreview control={control} />
          </div>
        </div>
      </div>
    </main>
  )
}
