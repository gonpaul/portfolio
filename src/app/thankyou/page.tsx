import Navigation from '@/components/Navigation';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-black mb-4 relative inline-block">
              <span className="relative">
                Thank You!
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-1 h-full bg-black"></div>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-1 h-full bg-black"></div>
              </span>
            </h1>
          </div>

          {/* Thank You Content */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-black mb-6">Message Received!</h2>
            
            <div className="space-y-4 text-gray-700 leading-relaxed max-w-2xl mx-auto">
              <p className="text-lg">
                Thank you for reaching out! I've received your message and will get back to you as soon as possible.
              </p>
              <p>
                I typically respond within 24 hours, so you can expect to hear from me soon. In the meantime, 
                feel free to explore more of my work or check out my latest blog posts.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-black text-white px-8 py-4 font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
              >
                Return to Home
              </Link>
              <Link 
                href="/blog"
                className="bg-transparent border-2 border-black text-black px-8 py-4 font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-200 transform hover:scale-105"
              >
                Read My Blog
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email Confirmation</h3>
                  <p className="text-gray-600 text-sm">Check your inbox for a confirmation</p>
                </div>
                
                <div className="p-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Quick Response</h3>
                  <p className="text-gray-600 text-sm">I'll reply within 24 hours</p>
                </div>
                
                <div className="p-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">Fast Turnaround</h3>
                  <p className="text-gray-600 text-sm">Quick project discussions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-100 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600 font-mono">
              © Gonpaul | Pavel Goncharov
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}