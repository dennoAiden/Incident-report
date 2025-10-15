import { useState } from "react";
import { AlertTriangle, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import videoBg from "../videos/response1.mp4";
import EmergencyReporting from "./EmergencyReporting";
import Navbar from "./Navbar";

export default function LandingPage() {
  const [showEmergencyReport, setShowEmergencyReport] = useState(false);

  const stats = [
    { value: "15min", label: "Average Response" },
    { value: "24/7", label: "Support Available" },
    { value: "500+", label: "Service Providers" },
    { value: "98%", label: "Customer Rating" },
  ];

  const features = [
    {
      icon: Clock,
      title: "Rapid Response",
      description:
        "Get connected with nearby service providers within minutes of your request",
    },
    {
      icon: MapPin,
      title: "Nationwide Coverage",
      description:
        "Extensive network of verified service providers across Kenya",
    },
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Round-the-clock assistance via phone, USSD, or WhatsApp",
    },
  ];

  return (
    <div className="home bg-gray-900 text-white">
      <Navbar />

      {/* HERO SECTION */}
      <div
        className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10"
        style={{ paddingTop: "80px" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/fallback-image.jpg"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ filter: "blur(4px) brightness(0.4)", zIndex: "-1" }}
        >
          <source src={videoBg} type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-3xl">
          <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-gray-200 mb-6 leading-snug">
            Report and track incidents in real-time before or after they happen.
            Help make our communities safer together.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link
              to="/login"
              aria-label="Sign in to your account"
              className="px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transform hover:scale-105 transition duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              aria-label="Create a new account"
              className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transform hover:scale-105 transition duration-300 border border-gray-600"
            >
              Create Account
            </Link>
          </div>

          {/* Emergency Button */}
          <button
            onClick={() => setShowEmergencyReport(true)}
            className="mt-6 sm:mt-8 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto"
          >
            <AlertTriangle className="w-5 h-5" />
            Report Emergency Now
          </button>

          <div className="mt-6 text-gray-300 text-sm sm:text-base">
            <p>Emergency? Call 999 or 112 immediately</p>
          </div>

          {showEmergencyReport && (
            <EmergencyReporting onClose={() => setShowEmergencyReport(false)} />
          )}
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-500">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200 mb-4">
            Why Choose MyRescue?
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg">
            Comprehensive incident management solution
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 sm:p-8 bg-white/10 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="inline-block p-4 bg-white/20 rounded-lg mb-5">
                <feature.icon className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-200 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
