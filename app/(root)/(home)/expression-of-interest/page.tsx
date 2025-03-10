"use client"

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Building2, User, MapPin, BriefcaseIcon, HomeIcon, Loader2 } from 'lucide-react';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  residentialAddress: string;
  country: string;
  state: string;
  city: string;
  addressLandmark: string;
  occupation: string;
  investmentCountry: string;
  specificCity: string;
  specificCityDetails?: string;
  propertyType: string;
  propertyTypeOther?: string;
  budgetRange: string;
  additionalFeatures: string;
  timeline: string;
  howDidYouHear: string;
  howDidYouHearOther?: string;
  additionalInformation: string;
  consent: boolean;
  servicesInterested: string[];
  servicesOther?: string;
};

const EOIPage = () => {
  const { register, handleSubmit, control, watch, reset } = useForm<FormData>({
    defaultValues: {
      servicesInterested: [],
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchSpecificCity = watch('specificCity');
  const watchPropertyType = watch('propertyType');
  const watchHowDidYouHear = watch('howDidYouHear');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('expression_of_interests').insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          email: data.email,
          residential_address: data.residentialAddress,
          country: data.country,
          state: data.state,
          city: data.city,
          address_landmark: data.addressLandmark,
          occupation: data.occupation,
          investment_country: data.investmentCountry,
          specific_city: data.specificCity,
          specific_city_details: data.specificCity === 'Yes' ? data.specificCityDetails : null,
          services_interested: data.servicesInterested || [],
          services_other: data.servicesInterested?.includes('Other') ? data.servicesOther : null,
          property_type: data.propertyType,
          property_type_other: data.propertyType === 'Other' ? data.propertyTypeOther : null,
          budget_range: data.budgetRange,
          additional_features: data.additionalFeatures,
          timeline: data.timeline,
          how_did_you_hear: data.howDidYouHear,
          how_did_you_hear_other: data.howDidYouHear === 'Other' ? data.howDidYouHearOther : null,
          additional_information: data.additionalInformation,
          consent: data.consent,
        },
      ]);

      if (error) throw error;

      toast.success("Thank you! Your expression of interest has been submitted successfully.");
      reset();
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || "Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollArea className="">
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">Expression of Interest</CardTitle>
            <p className="text-muted-foreground">Please fill out the form below to express your interest</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                </div>
                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    {...register('firstName', { required: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    {...register('lastName', { required: true })}
                  />
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone/Mobile</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your mobile number"
                    {...register('phone', { required: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register('email', { required: true })}
                  />
                </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Enter your occupation"
                    {...register('occupation', { required: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="residentialAddress">Residential Address</Label>
                  <Textarea
                    id="residentialAddress"
                    placeholder="Enter your residential address"
                    {...register('residentialAddress', { required: true })}
                  />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Controller
                      control={control}
                      name="country"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent  className="bg-white">
                            <SelectItem value="Nigeria">Nigeria</SelectItem>
                            <SelectItem value="Ghana">Ghana</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="Enter your state"
                      {...register('state', { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      {...register('city', { required: true })}
                    />
                  </div>
                </div>
              </div>

              {/* Investment Interest */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">Investment Interest</h2>
                </div>
                <Separator />

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="investmentCountry">Which Country&apos;s Real Estate Are You Interested In?</Label>
                    <Controller
                      control={control}
                      name="investmentCountry"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="Nigeria">Nigeria</SelectItem>
                            <SelectItem value="Ghana">Ghana</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Do You Have Any Specific City In Mind?</Label>
                    <Controller
                      control={control}
                      name="specificCity"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="specificCityYes" />
                            <Label htmlFor="specificCityYes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="specificCityNo" />
                            <Label htmlFor="specificCityNo">No</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>

                  {watchSpecificCity === 'Yes' && (
                    <div className="space-y-2">
                      <Label htmlFor="specificCityDetails">Please specify the city:</Label>
                      <Input
                        id="specificCityDetails"
                        placeholder="Enter the specific city"
                        {...register('specificCityDetails')}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Type of Property</Label>
                    <Controller
                      control={control}
                      name="propertyType"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Property Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="Residential">Residential</SelectItem>
                            <SelectItem value="Commercial">Commercial</SelectItem>
                            <SelectItem value="Industrial">Industrial</SelectItem>
                            <SelectItem value="Land">Land</SelectItem>
                            <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {watchPropertyType === 'Other' && (
                    <div className="space-y-2">
                      <Label htmlFor="propertyTypeOther">Please specify the property type:</Label>
                      <Input
                        id="propertyTypeOther"
                        placeholder="Specify the property type"
                        {...register('propertyTypeOther')}
                        required={watchPropertyType === 'Other'}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="budgetRange">Budget Range (₦)</Label>
                    <Input
                      id="budgetRange"
                      type="text"
                      placeholder="e.g., 10,000,000-200,000,000"
                      {...register('budgetRange', { required: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline for Purchase:</Label>
                    <Controller
                      control={control}
                      name="timeline"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Timeline" />
                          </SelectTrigger>
                          <SelectContent  className="bg-white">
                            <SelectItem value="Immediately">Immediately</SelectItem>
                            <SelectItem value="Within 3 months">Within 3 months</SelectItem>
                            <SelectItem value="Within 6 months">Within 6 months</SelectItem>
                            <SelectItem value="Within 1 year">Within 1 year</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Services Interested */}
              <div className="space-y-2">
                <Label>Services Interested In</Label>
                <Controller
                  control={control}
                  name="servicesInterested"
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange([value])} defaultValue={field.value?.[0]}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Services" />
                      </SelectTrigger>
                      <SelectContent className="bg-white capitalize">
                        <SelectItem value="Property Purchase">VETTING SERVICES</SelectItem>
                        <SelectItem value="Property Purchase">PORTFOLIO DEVELOPMENT MANAGEMENT</SelectItem>
                        <SelectItem value="Property Purchase">LEGAL SERVICES</SelectItem>
                        <SelectItem value="Property Purchase">PORTFOLIO INVESTMENT</SelectItem>
                        <SelectItem value="Property Purchase">PORTFOLIO MANAGEMENT</SelectItem>
                        <SelectItem value="Property Purchase">PORTFOLIO SUPERVISION MANAGEMENT</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

                  <div className="space-y-2">
                    <Label htmlFor="howDidYouHear">How Did You Hear About Us?</Label>
                    <Controller
                      control={control}
                      name="howDidYouHear"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent  className="bg-white">
                            <SelectItem value="Referral">Referral</SelectItem>
                            <SelectItem value="Online Search">Online Search</SelectItem>
                            <SelectItem value="Social Media">Social Media</SelectItem>
                            <SelectItem value="Advertisement">Advertisement</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {watchHowDidYouHear === 'Other' && (
                    <div className="space-y-2">
                      <Label htmlFor="howDidYouHearOther">Please specify how you heard about us:</Label>
                      <Input
                        id="howDidYouHearOther"
                        placeholder="Specify how you heard about us"
                        {...register('howDidYouHearOther')}
                        required={watchHowDidYouHear === 'Other'}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BriefcaseIcon className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold">Additional Information</h2>
                </div>
                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="additionalFeatures">Additional Features or Requirements:</Label>
                  <Textarea
                    id="additionalFeatures"
                    placeholder="E.g., Number of Bedrooms, Office Size, Parking Facilities, Etc."
                    {...register('additionalFeatures')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInformation">Any Other Information or Special Requests:</Label>
                  <Textarea
                    id="additionalInformation"
                    placeholder="Enter any additional information or special requests"
                    {...register('additionalInformation')}
                  />
                </div>
              </div>

              {/* Consent */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    {...register('consent', { required: true })}
                  />
                  <Label htmlFor="consent" className="text-sm">
                    I hereby consent to collecting and processing my data for real estate vetting purposes as outlined by{' '}
                    <a href="/privacy-policy" className="text-primary hover:underline">
                      BAUC Privacy Policy
                    </a>
                    .
                  </Label>
                </div>
              </div>



              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-black text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Expression of Interest"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default EOIPage;
