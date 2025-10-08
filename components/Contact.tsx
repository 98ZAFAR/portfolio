import React, { useState } from 'react';

// EmailJS type interface
interface EmailJSWindow extends Window {
  emailjs?: {
    send: (
      serviceID: string,
      templateID: string,
      templateParams: Record<string, string>,
      publicKey: string
    ) => Promise<{ text: string }>;
  };
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration - Replace with your actual EmailJS credentials
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
      const toEmail = process.env.NEXT_PUBLIC_EMAIL || 'your-email@example.com';

      // Check if EmailJS is available and configured
      if (typeof window !== 'undefined' && (window as EmailJSWindow).emailjs && 
          serviceID !== 'YOUR_SERVICE_ID' && templateID !== 'YOUR_TEMPLATE_ID') {
        const result = await (window as EmailJSWindow).emailjs!.send(
          serviceID,
          templateID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: toEmail,
          },
          publicKey
        );

        if (result.text === 'OK') {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          throw new Error('Failed to send email');
        }
      } else {
        // Fallback: Create mailto link
        const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 bg-[var(--color-bg-light)]/50 dark:bg-[var(--color-darkbg)]/50 px-4"
    >
      <h2 className="text-3xl font-bold text-center mb-6">
        Get in <span className="text-[var(--color-accent)]">Touch</span>
      </h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Your Message"
          required
          className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition resize-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-accent)] transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        {submitStatus === 'success' && (
          <div className="text-green-600 text-center text-sm">
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="text-red-600 text-center text-sm">
            Failed to send message. Please try again or contact me directly.
          </div>
        )}
      </form>
    </section>
  );
}
