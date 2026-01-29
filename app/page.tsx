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
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Shorten Your Links
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create short, memorable links that are easy to share and track
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 dark:hover:border-purple-500 dark:hover:text-purple-400 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-32 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Fast & Simple</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Shorten any URL in seconds with our lightning-fast service
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Track Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor clicks, locations, and performance of your links
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Secure & Reliable</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your links are safe with enterprise-grade security
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-purple-400">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Links Created</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-purple-400">1M+</div>
              <div className="text-gray-600 dark:text-gray-400">Clicks Tracked</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-purple-400">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Happy Users</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
