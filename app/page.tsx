'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-white text-darkGrey">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl mx-auto">
        <div className="mt-8 flex gap-4">
          <Link
            href="/account"
            className="onboarding-button-primary px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Start Free
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border font-medium hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-6 py-10 border-y">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
          <span>Trusted by startups</span>
          <span>•</span>
          <span>Growing businesses</span>
          <span>•</span>
          <span>Modern teams</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Unified Dashboard</h3>
          <p className="desc-text text-sm">
            Track revenue, users, and growth metrics in one place without
            switching tools.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Smart Insights</h3>
          <p className="desc-text text-sm">
            Understand your business performance with clean visual reports and
            analytics.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Fast Onboarding</h3>
          <p className="text-gray-600 text-sm">
            Get started in minutes with a guided setup tailored to your
            workflow.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 text-center bg-gray-50">
        <h3 className="text-2xl md:text-3xl font-semibold">
          Ready to simplify your workflow?
        </h3>

        <p className="text-gray-600 mt-3">
          Start your onboarding and set up your workspace in minutes.
        </p>

        <Link
          href="/account"
          className="inline-block mt-6 onboarding-button-primary w-fit text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          Get Started Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-lightGrey py-6">
        © {new Date().getFullYear()} NooluHQ. All rights reserved.
      </footer>
    </main>
  );
}
