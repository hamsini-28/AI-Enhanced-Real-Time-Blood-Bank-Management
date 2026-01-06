// About.jsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-12">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About LifeAPI</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">
          Connecting donors, recipients, and volunteers to save lives through
          the power of community.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-red-600 text-center">
          Our Mission
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-center">
          At <span className="font-semibold">LifeAPI</span>, our mission is
          simple: to make blood donation accessible, efficient, and impactful.  
          We believe every drop counts, and by connecting donors with those in
          need, we can save countless lives and strengthen our communities.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl font-semibold text-red-600 text-center">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-10 mt-10 max-w-6xl mx-auto">
          <div className="p-6 shadow-lg rounded-2xl bg-gray-50">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
              alt="Donation"
              className="w-20 mx-auto"
            />
            <h3 className="mt-6 text-xl font-semibold text-center">
              Blood Donation
            </h3>
            <p className="mt-4 text-center">
              We encourage and connect regular and first-time donors with
              hospitals and patients in need.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-2xl bg-gray-50">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png"
              alt="Awareness"
              className="w-20 mx-auto"
            />
            <h3 className="mt-6 text-xl font-semibold text-center">
              Awareness
            </h3>
            <p className="mt-4 text-center">
              We spread awareness about the importance of blood donation and how
              a single donation can save multiple lives.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-2xl bg-gray-50">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Community"
              className="w-20 mx-auto"
            />
            <h3 className="mt-6 text-xl font-semibold text-center">
              Community Support
            </h3>
            <p className="mt-4 text-center">
              We build communities of donors, recipients, and volunteers who
              stand together in times of need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-red-600">Contact Us</h2>
        <p className="mt-4 text-lg">
          Have questions or want to join our mission? Reach out to us.
        </p>
        <div className="mt-6 space-y-3">
          <p>Email: <span className="font-semibold">support@lifeapi.org</span></p>
          <p>Phone: <span className="font-semibold">+91 98765 43210</span></p>
          <p>Address: 123, Health Street, Hyderabad, India</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-6 text-center text-gray-600">
        © {new Date().getFullYear()} LifeAPI. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutPage;
