import { Resend } from 'resend';

type NotificationEmailParams = {
  to: string[];
  subject: string;
  formType: string;
  formData: Record<string, any>;
  replyTo?: string;
};

// Format form data for email
function formatFormData(formData: Record<string, any>): string {
  let formattedData = '';

  for (const [key, value] of Object.entries(formData)) {
    if (value === null || value === undefined || value === '') continue;

    // Skip file objects
    if (value instanceof File ||
        (typeof value === 'object' && value !== null && 'file' in value && value.file instanceof File)) {
      continue;
    }

    // Format arrays
    if (Array.isArray(value)) {
      formattedData += `<tr><td><strong>${formatKey(key)}</strong></td><td>${value.join(', ')}</td></tr>`;
      continue;
    }

    // Format objects
    if (typeof value === 'object' && value !== null) {
      // Skip file URLs
      if ('url' in value && typeof value.url === 'string') continue;

      formattedData += `<tr><td><strong>${formatKey(key)}</strong></td><td>${JSON.stringify(value)}</td></tr>`;
      continue;
    }

    formattedData += `<tr><td><strong>${formatKey(key)}</strong></td><td>${value}</td></tr>`;
  }

  return formattedData;
}

// Format keys for better readability
function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between camelCase
}

// Generate email content template
function generateEmailContent(params: NotificationEmailParams): string {
  const { formType, formData } = params;
  const formattedData = formatFormData(formData);

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; background-color: #f9f9f9; }
      table { width: 100%; border-collapse: collapse; }
      table, th, td { border: 1px solid #ddd; }
      th, td { padding: 10px; text-align: left; }
      .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Form Submission - ${formType}</h2>
      </div>
      <div class="content">
        <p>A new form submission has been received from ${formData.email || formData.name || 'a user'}.</p>

        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${formattedData}
          </tbody>
        </table>
      </div>
      <div class="footer">
        <p>This is an automated email from the BAUC International website.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Generate plain text content
function generatePlainTextContent(params: NotificationEmailParams): string {
  const { formType, formData } = params;
  let plainText = `New Form Submission - ${formType}\n\n`;
  plainText += `A new form submission has been received from ${formData.email || formData.name || 'a user'}.\n\n`;
  plainText += `Form Data:\n`;

  for (const [key, value] of Object.entries(formData)) {
    if (value === null || value === undefined || value === '') continue;

    if (value instanceof File || (typeof value === 'object' && value !== null && 'file' in value)) {
      continue;
    }

    if (Array.isArray(value)) {
      plainText += `${formatKey(key)}: ${value.join(', ')}\n`;
      continue;
    }

    if (typeof value === 'object' && value !== null) {
      if ('url' in value && typeof value.url === 'string') continue;
      plainText += `${formatKey(key)}: ${JSON.stringify(value)}\n`;
      continue;
    }

    plainText += `${formatKey(key)}: ${value}\n`;
  }

  plainText += `\nThis is an automated email from the BAUC International website.`;
  return plainText;
}

// Send notification email
export async function sendNotificationEmail(params: NotificationEmailParams): Promise<boolean> {
  // Initialize Resend with API key
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { to, subject, replyTo, formType, formData } = params;

    console.log(`Attempting to send email notification for ${formType}`);

    const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

    const { data, error } = await resend.emails.send({
      from: `BAUC International <${fromEmail}>`,
      to: to,
      subject: subject,
      html: generateEmailContent(params),
      text: generatePlainTextContent(params),
      replyTo: replyTo,
    });

    if (error) {
      console.error('Resend API error:', error);
      return false;
    }

    console.log(`Email sent successfully: ${data?.id}`);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);

    // Log specific error for missing API key
    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API key is missing. Add RESEND_API_KEY to your .env.local file');
    }

    return false;
  }
}

// Helper function specifically for form submissions
export async function sendFormNotification(
  formType: string,
  formData: Record<string, any>
): Promise<boolean> {
  const recipients = ['vet@baucinternational.com', 'collins@baucinternational.com'];
  const replyTo = formData.email || undefined;

  return sendNotificationEmail({
    to: recipients,
    subject: `New Form Submission: ${formType}`,
    formType,
    formData,
    replyTo,
  });
}
