"use client";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    success: false,
    error: false,
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        success: false,
        error: true,
        message: "Please fill all required fields",
      });
      return;
    }

    // Create mailto link
    const subject = `Message from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;

    const mailtoLink = `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open email client
    const newWindow = window.open(mailtoLink, "_blank");

    if (newWindow) {
      setStatus({
        success: true,
        error: false,
        message: "Email client opened in new tab. Please send the email.",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus({
        success: false,
        error: true,
        message: "Popup blocked! Please allow popups to continue.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex gap-2 justify-between items-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>

          {status.success && (
            <div className="mb-4 p-1 bg-green-100 text-green-700 rounded-lg">
              {status.message}
            </div>
          )}

          {status.error && (
            <div className="mb-4 p-1 bg-red-100 text-red-700 rounded-lg">
              {status.message}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
