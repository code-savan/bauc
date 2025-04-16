/**
 * Helper utility for sending form submission notifications
 */

export async function sendFormSubmissionNotification(formType: string, formData: Record<string, any>) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        formData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Email notification failed:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send notification:', error);
    return false;
  }
}
