// app/about-us/contact/page.tsx
"use client";

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section with Inbuilt Image */}
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

        {/* Contact Info Cards */}
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
            <p className="text-gray-600 text-sm">+92 300 1234567</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <div className="text-blue-600 text-4xl mb-2">✉️</div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-600 text-sm">info@yef.org</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mt-6">
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full border border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
