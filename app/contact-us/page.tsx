// app/about-us/contact/page.tsx
"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-64 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-4xl md:text-5xl font-bold text-white z-10">
          Contact Us
        </h1>
      </div>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-center text-gray-600 mb-10">
          We’d love to hear from you! Reach us through the details below or send
          us a message.
        </p>

        {/* Contact*/}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-blue-600 text-4xl mb-2">📍</div>
            <h3 className="text-lg font-semibold">Our Address</h3>
            <p className="text-gray-600 text-sm">
              123 NGO Street, Karachi, Pakistan
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-blue-600 text-4xl mb-2">📞</div>
            <h3 className="text-lg font-semibold">Call Us</h3>
            <p className="text-gray-600 text-sm">+92 344 5907911</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-blue-600 text-4xl mb-2">✉️</div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-600 text-sm">
              youthevolutionfoundation25@gmail.com
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setStatus("Submitting...");

            const form = e.currentTarget;
            const formData = new FormData(form);

            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({
                  name: formData.get("name"),
                  email: formData.get("email"),
                  subject: formData.get("subject"),
                  message: formData.get("message"),
                }),
                headers: { "Content-Type": "application/json" },
              });

              const data = await res.json();
              setStatus(data.message || "Success!");

              // ✅ Clear form fields on success
              if (res.ok) {
                form.reset();
              }
            } catch (err) {
              console.error(err);
              setStatus("Something went wrong!");
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full border border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mt-6">
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              className="w-full border border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mt-6">
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              className="w-full border border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Submit Button with Spinner */}
          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-full transition mx-auto"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>

          {/* Status Message */}
          {status && (
            <p
              className={`text-center mt-4 font-medium ${status.includes("wrong") ? "text-red-600" : "text-green-600"
                }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
