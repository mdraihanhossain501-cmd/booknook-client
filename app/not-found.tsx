import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <p className="text-7xl font-bold text-primary md:text-8xl">404</p>
      <h1 className="text-3xl font-bold md:text-4xl">Page not found</h1>
      <p className="max-w-md text-base-content/70">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary btn-lg">
        Back to Home
      </Link>
    </main>
  );
}