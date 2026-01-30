import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-purple-950">
      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto space-y-8">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
              🚀 Free forever. No credit card required.
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Shorten Links,
              <br />
              Amplify Results
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform long, complicated URLs into clean, shareable links. Track every click, understand your audience, and boost your online presence.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href="/dashboard"
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Started Free
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a
              href="#features"
              className="px-10 py-5 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-lg font-bold rounded-2xl hover:border-blue-600 hover:text-blue-600 dark:hover:border-purple-500 dark:hover:text-purple-400 transition-all duration-300"
            >
              See How It Works
            </a>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-4">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Trusted by thousands of users worldwide
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-40 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to manage links
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Powerful features designed to help you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Create short links in milliseconds. Our optimized infrastructure ensures instant URL shortening without delays.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Detailed Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Track clicks, geographic data, referrers, and devices. Make data-driven decisions with comprehensive insights.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Custom Slugs</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Create branded, memorable links that reflect your identity. Choose your own custom short URLs.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🔒</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Enterprise-grade security with SSL encryption. Your data is protected with industry-standard protocols.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">♾️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Unlimited Links</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                No restrictions on the number of links you can create. Scale your link management without limits.
              </p>
            </div>

            <div className="group bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📱</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Mobile Optimized</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Perfect experience on any device. Manage your links seamlessly from desktop, tablet, or mobile.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-40 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Start shortening links in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Paste Your Link</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Copy any long URL and paste it into our shortener
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Customize & Create</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Optionally add a custom slug or let us generate one
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Share & Track</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your short link and monitor its performance
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-40 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-extrabold">10K+</div>
                <div className="text-xl font-medium opacity-90">Links Created</div>
                <p className="text-sm opacity-75">And growing every day</p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-extrabold">1M+</div>
                <div className="text-xl font-medium opacity-90">Clicks Tracked</div>
                <p className="text-sm opacity-75">Across all links</p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-extrabold">99.9%</div>
                <div className="text-xl font-medium opacity-90">Uptime</div>
                <p className="text-sm opacity-75">Always available</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-40 max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join thousands of users who trust us with their links
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Shortening Now
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
