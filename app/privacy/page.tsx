import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for rioedwards.com",
};

export default function PrivacyPolicyPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-secondary px-content-px py-content-py"
    >
      <article className="prose mx-auto max-w-prose-max">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: February 2026</p>

        <h2>Overview</h2>
        <p>
          This website (rioedwards.com) is a personal portfolio. I respect your
          privacy and am committed to being transparent about data collection.
        </p>

        <h2>Analytics</h2>
        <p>
          This site uses{" "}
          <a
            href="https://vercel.com/analytics"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Analytics
          </a>{" "}
          to understand how visitors interact with the site. This service
          collects:
        </p>
        <ul>
          <li>Page views and navigation paths</li>
          <li>Referrer information (how you found this site)</li>
          <li>Device type and browser (anonymized)</li>
          <li>Geographic region (country-level only)</li>
        </ul>
        <p>
          Vercel Analytics is privacy-focused and does <strong>not</strong>:
        </p>
        <ul>
          <li>Use cookies for tracking</li>
          <li>Collect personal information</li>
          <li>Track individual users across sessions</li>
          <li>Share data with third parties for advertising</li>
        </ul>

        <h2>Contact Form</h2>
        <p>
          If you use the contact form, the information you provide (name, email,
          message) is sent directly to my email. This data is:
        </p>
        <ul>
          <li>Used only to respond to your inquiry</li>
          <li>Not stored in any database</li>
          <li>Not shared with third parties</li>
          <li>Not used for marketing purposes</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>This site is hosted on Vercel. Their privacy policy can be found at:</p>
        <ul>
          <li>
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vercel Privacy Policy
            </a>
          </li>
        </ul>

        <h2>Your Rights</h2>
        <p>
          Since this site collects minimal, anonymized data, there is no
          personal data to request or delete. If you have questions about
          privacy, feel free to{" "}
          <Link href="/#contact">contact me</Link>.
        </p>

        <h2>Changes</h2>
        <p>
          This policy may be updated occasionally. Changes will be reflected on
          this page with an updated date.
        </p>

        <div className="mt-12">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </article>
    </main>
  );
}
