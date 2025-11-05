import React from 'react'
import LoginPage from '../LoginPage'
import SignUpPage from '../SignUpPage'

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with calming blue gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 -z-20" />
      
      {/* Animated background lines */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <img 
          src="/bg-lines.svg" 
          alt="" 
          className="w-full h-full object-cover animate-pulse"
          style={{ animationDuration: '8s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header/Navigation */}
        <header className="bg-white/80 backdrop-blur-sm shadow-md">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img 
                  src="/brain.svg"
                  alt='logo'
                  className="h-12 w-12"
                />
                <h1 className="text-2xl font-bold text-blue-900">AccelNet</h1>
              </div>
              
              <div className="hidden md:flex space-x-8">
                <a href="#about" className="text-blue-800 hover:text-blue-600 font-medium transition">About</a>
                <a href="#structure" className="text-blue-800 hover:text-blue-600 font-medium transition">Structure</a>
                <a href="#working-groups" className="text-blue-800 hover:text-blue-600 font-medium transition">Working Groups</a>
                <a href="#activities" className="text-blue-800 hover:text-blue-600 font-medium transition">Activities</a>
                <a href="#news" className="text-blue-800 hover:text-blue-600 font-medium transition">News</a>
              </div>

              <div className="flex space-x-4">
                <a href="/login" className="text-blue-800 hover:text-blue-600 font-medium transition">
                  login
                </a>
                <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                  Sign Up
                </a>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-blue-900 mb-6">
              Advancing Brain-Inspired Computing
            </h2>
            <p className="text-xl text-blue-800 mb-8 leading-relaxed">
              A collaborative network accelerating research in neuroscience, artificial intelligence, 
              and brain-computer interfaces to improve brain health through art and science.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Explore Research
              </button>
              <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-blue-800 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-200">
                Join Network
              </button>
            </div>
          </div>
        </section>

        {/* Featured Content Cards */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-blue-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Research</h3>
              <p className="text-blue-700">
                Cutting-edge research in brain-computer interfaces and neuroscience
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-blue-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Collaboration</h3>
              <p className="text-blue-700">
                Global network of researchers, artists, and industry partners
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-blue-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Publications</h3>
              <p className="text-blue-700">
                Open-access research and datasets advancing the field
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 py-12">
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-blue-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-blue-600">150+</p>
                <p className="text-blue-800 font-medium mt-2">Researchers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">25+</p>
                <p className="text-blue-800 font-medium mt-2">Institutions</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">50+</p>
                <p className="text-blue-800 font-medium mt-2">Publications</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">10+</p>
                <p className="text-blue-800 font-medium mt-2">Countries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-900 text-white mt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold mb-4">About AccelNet</h4>
                <p className="text-blue-200">
                  Accelerating research networks for brain-inspired computing and brain health.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-blue-200">
                  <li><a href="#" className="hover:text-white transition">Working Groups</a></li>
                  <li><a href="#" className="hover:text-white transition">Publications</a></li>
                  <li><a href="#" className="hover:text-white transition">Events</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4">Connect</h4>
                <p className="text-blue-200">
                  Join our global network of researchers and innovators.
                </p>
              </div>
            </div>
            <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-300">
              <p>&copy; 2025 AccelNet. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default HomePage