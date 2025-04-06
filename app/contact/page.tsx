"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  HelpCircle,
  AlertCircle,
  Briefcase,
  Users,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    reason: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              FinSavvy AI
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            We'd love to hear from you. Reach out with any questions, feedback,
            or inquiries.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <ContactInfoCard
            icon={<Mail className="h-6 w-6 text-yellow-500" />}
            title="Email Us"
            info="info@finsavvy.ai"
            description="For general inquiries and information"
          />
          <ContactInfoCard
            icon={<Phone className="h-6 w-6 text-yellow-500" />}
            title="Call Us"
            info="+91 98765 43210"
            description="Monday to Friday, 9AM to 6PM IST"
          />
          <ContactInfoCard
            icon={<MapPin className="h-6 w-6 text-yellow-500" />}
            title="Visit Us"
            info="Koramangala, Bangalore"
            description="Schedule an appointment first"
          />
        </div>

        {/* Contact Form */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 h-full">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  How Can We Help?
                </h2>

                <div className="space-y-6">
                  <ContactReason
                    id="general"
                    name="reason"
                    value="general"
                    title="General Inquiry"
                    description="General questions about our platform"
                    icon={<MessageSquare className="h-5 w-5 text-yellow-500" />}
                    checked={formData.reason === "general"}
                    onChange={handleChange}
                  />
                  <ContactReason
                    id="support"
                    name="reason"
                    value="support"
                    title="Customer Support"
                    description="Help with your account or our services"
                    icon={<HelpCircle className="h-5 w-5 text-yellow-500" />}
                    checked={formData.reason === "support"}
                    onChange={handleChange}
                  />
                  <ContactReason
                    id="feedback"
                    name="reason"
                    value="feedback"
                    title="Feedback"
                    description="Share your thoughts or suggestions"
                    icon={<AlertCircle className="h-5 w-5 text-yellow-500" />}
                    checked={formData.reason === "feedback"}
                    onChange={handleChange}
                  />
                  <ContactReason
                    id="business"
                    name="reason"
                    value="business"
                    title="Business Inquiry"
                    description="Partnership or business opportunities"
                    icon={<Briefcase className="h-5 w-5 text-yellow-500" />}
                    checked={formData.reason === "business"}
                    onChange={handleChange}
                  />
                  <ContactReason
                    id="press"
                    name="reason"
                    value="press"
                    title="Press Inquiry"
                    description="Media or press related questions"
                    icon={<Users className="h-5 w-5 text-yellow-500" />}
                    checked={formData.reason === "press"}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Send Us a Message
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill out the form below and we'll get back to you as soon as
                    possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        Message Sent!
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Thank you for reaching out. We'll get back to you
                        shortly.
                      </p>
                      <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                            reason: "general",
                          });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-300"
                          >
                            Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-gray-700 border-gray-600 text-white focus-visible:ring-yellow-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-300"
                          >
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-gray-700 border-gray-600 text-white focus-visible:ring-yellow-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium text-gray-300"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="bg-gray-700 border-gray-600 text-white focus-visible:ring-yellow-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-300"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="bg-gray-700 border-gray-600 text-white focus-visible:ring-yellow-500"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <FaqItem
              question="How quickly can I expect a response?"
              answer="We typically respond to all inquiries within 24-48 hours during business days. For urgent matters, please indicate this in your subject line."
            />
            <FaqItem
              question="I'm having technical issues with the app. What should I do?"
              answer="For technical support, please select 'Customer Support' as your reason for contact and provide details about the issue you're experiencing. Our technical team will assist you promptly."
            />
            <FaqItem
              question="How can I request a demo for my organization?"
              answer="Select 'Business Inquiry' as your reason for contact and mention that you're interested in a demo. Please include your organization's name and the number of potential users."
            />
            <FaqItem
              question="Do you offer phone support?"
              answer="Yes, we offer phone support for our Premium plan users. If you're on a different plan, please contact us through this form, and we'll arrange a call if needed."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoCard({ icon, title, info, description }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-3 rounded-lg bg-gray-700/50 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-1 text-white">{title}</h3>
        <p className="text-yellow-500 font-medium mb-2">{info}</p>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

function ContactReason({
  id,
  name,
  value,
  title,
  description,
  icon,
  checked,
  onChange,
}) {
  return (
    <div className="flex">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <label
        htmlFor={id}
        className="flex items-start p-4 w-full bg-gray-700/50 border border-gray-700 rounded-lg cursor-pointer hover:border-yellow-500/30 peer-checked:border-yellow-500 peer-checked:bg-yellow-500/10 transition-all"
      >
        <div className="p-2 rounded-full bg-gray-700 mr-3 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </label>
    </div>
  );
}

function FaqItem({ question, answer }) {
  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-3 text-white">{question}</h3>
        <p className="text-gray-400">{answer}</p>
      </CardContent>
    </Card>
  );
}
