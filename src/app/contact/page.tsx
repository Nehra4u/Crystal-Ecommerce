'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { Form, FormField, FormRow } from '@/components/ui/Form';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Section background="stone" padding="lg">
      <Container size="md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <Form 
              title="Send us a message"
              onSubmit={handleSubmit}
            >
              <FormRow>
                <FormField>
                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormField>
                
                <FormField>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormField>
              </FormRow>
              
              <FormField>
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormField>
              
              <FormField>
                <Textarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                />
              </FormField>
              
              <Button type="submit" className="w-full" size="lg">
                Send Message
              </Button>
            </Form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Get in touch</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      Crystal Street 123<br />
                      Prague, Czech Republic<br />
                      110 00
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+420 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-xl">✉️</span>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">info@larimarita-milenaoda.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🕒</span>
                  <div>
                    <h3 className="font-medium text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Customer Support</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Frequently Asked Questions</h3>
                  <p className="text-gray-600 text-sm">
                    Find answers to common questions about our products and services.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Returns & Exchanges</h3>
                  <p className="text-gray-600 text-sm">
                    30-day return policy on all products in original condition.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Shipping Information</h3>
                  <p className="text-gray-600 text-sm">
                    Free shipping on orders over $100. Express delivery available.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
