'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from './Toast';

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

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

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

    try {
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
      const toEmail = process.env.NEXT_PUBLIC_EMAIL || 'your-email@example.com';

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
          addToast('Message sent successfully! I\'ll get back to you soon.', 'success');
          setFormData({ name: '', email: '', message: '' });
        } else {
          throw new Error('Failed to send email');
        }
      } else {
        const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
        addToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      addToast('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <section className="py-section-gap max-w-container-max mx-auto px-gutter" id="contact">
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card p-8 md:p-16 rounded-2xl grid md:grid-cols-2 gap-16 relative overflow-visible group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 pointer-events-none"></div>
            
            <div className="relative z-10 pointer-events-auto">
              <h2 className="font-display-lg text-display-lg mb-stack-md text-text">Initiate Collaboration.</h2>
              <p className="text-text-secondary text-body-lg mb-8">
                Have a vision that needs engineering? Let&apos;s build something that transcends the ordinary.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-label-sm text-text-secondary uppercase">Email</p>
                    <p className="font-bold text-text">mdzafar.dev@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-sand-light">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <p className="text-label-sm text-text-secondary uppercase">Base</p>
                    <p className="font-bold text-text" data-location="San Francisco, CA">Global</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 pointer-events-auto">
              <div className="relative">
                <input 
                  className="peer block w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border text-text focus:ring-0 focus:border-primary transition-all cursor-text" 
                  id="name" 
                  name="name"
                  placeholder=" " 
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label 
                  className="absolute top-3 left-0 text-text-secondary origin-[0] -translate-y-6 scale-75 transform transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary pointer-events-none" 
                  htmlFor="name"
                >
                  Full Name
                </label>
              </div>
              
              <div className="relative">
                <input 
                  className="peer block w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border text-text focus:ring-0 focus:border-primary transition-all cursor-text" 
                  id="email" 
                  name="email"
                  placeholder=" " 
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label 
                  className="absolute top-3 left-0 text-text-secondary origin-[0] -translate-y-6 scale-75 transform transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary pointer-events-none" 
                  htmlFor="email"
                >
                  Email Address
                </label>
              </div>
              
              <div className="relative">
                <textarea 
                  className="peer block w-full px-0 py-3 bg-transparent border-0 border-b-2 border-border text-text focus:ring-0 focus:border-primary transition-all resize-none cursor-text" 
                  id="message" 
                  name="message"
                  placeholder=" " 
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <label 
                  className="absolute top-3 left-0 text-text-secondary origin-[0] -translate-y-6 scale-75 transform transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary pointer-events-none" 
                  htmlFor="message"
                >
                  Your Message
                </label>
              </div>
              
              <button 
                className="w-full py-4 bg-primary text-bg rounded-xl font-bold uppercase tracking-widest hover:bg-primary-light transition-colors magnetic-target disabled:opacity-50" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Transmitting...' : 'Transmit Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
}
