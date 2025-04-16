import { NextRequest, NextResponse } from 'next/server';
import { sendFormNotification } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, formData } = body;

    if (!formType || !formData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          details: 'Both formType and formData are required'
        },
        { status: 400 }
      );
    }

    // Validate Resend API configuration
    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API key is missing. Add RESEND_API_KEY to your .env.local file');
      return NextResponse.json(
        {
          success: false,
          error: 'Email configuration error',
          details: 'Resend API key is missing'
        },
        { status: 500 }
      );
    }

    // Add timestamp to indicate when this notification was sent
    const dataWithTimestamp = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    const success = await sendFormNotification(formType, dataWithTimestamp);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email notification',
          details: 'The email service encountered an error. Check server logs for details.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Notification sent successfully for ${formType} submission`
    });
  } catch (error) {
    console.error('Email API error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
