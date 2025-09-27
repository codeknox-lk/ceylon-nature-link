"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactHero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll get back to you soon.");
  };

  return (
    <section className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="font-bold text-6xl md:text-7xl lg:text-8xl text-green-600 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Get in touch with our team to discuss your requirements, request quotes, or learn more about our premium Sri Lankan natural products.
              </p>
            </div>
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">📍</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Head Office</h3>
                </div>
                <p className="text-gray-600">Level 8, Valiant Towers<br/>46/7, Nawam Mawatha<br/>Colombo 02</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">🏭</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Factory</h3>
                </div>
                <p className="text-gray-600">364/5, Kelanitissa Mawatha<br/>Wanawasala, Kelaniya</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">📞</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                </div>
                <p className="text-gray-600">+94 77 958 9371</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">✉️</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                </div>
                <p className="text-gray-600">info@winloflavors.com</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-96 h-96 lg:w-[28rem] lg:h-[28rem]">
              <img
                src="/contact.png"
                alt="Person with phone"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll respond to your inquiry within 24 hours during business days.
              </p>
            </div>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Information</option>
                      <option value="quote">Request Quote</option>
                      <option value="export">Export Services</option>
                      <option value="private-label">Private Label</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="focus:ring-green-500 focus:border-green-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="focus:ring-green-500 focus:border-green-500 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Phone and Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="focus:ring-green-500 focus:border-green-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <Input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="focus:ring-green-500 focus:border-green-500 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="focus:ring-green-500 focus:border-green-500 rounded-xl"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="focus:ring-green-500 focus:border-green-500 rounded-xl"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">
              Visit our office and factory in Colombo
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Location</h3>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8994!2d79.8606!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae258e2b2b2b2b2%3A0x1234567890abcdef!2sValiant%20Towers%2C%2046%2F7%2C%20Nawam%20Mawatha%2C%20Colombo%2002%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ceylon Nature Link Location"
                ></iframe>
              </div>
              <div className="mt-6 text-center">
                <div className="inline-flex items-center bg-green-50 px-6 py-3 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-lg">📍</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Level 8, Valiant Towers</p>
                    <p className="text-sm text-gray-600">46/7, Nawam Mawatha, Colombo 02</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
