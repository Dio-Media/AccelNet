import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ComingSoon() {
  const location = useLocation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-8 text-center">
        <div className="text-sm font-semibold text-blue-700 mb-2">
          Coming soon
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
          This page isn't live yet
        </h1>

        <p className="text-gray-600 mb-6">
          You visited <span className="font-mono text-gray-800">{location.pathname}</span>.  
          We're still building it and will publish it soon.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-blue-800 px-5 py-2.5 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-gray-800 font-semibold hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
