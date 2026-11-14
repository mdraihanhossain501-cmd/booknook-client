"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // Only allow redirects to pages inside this site
  const redirectParam = searchParams.get("redirect");
  const redirectTo =
    redirectParam && redirectParam.startsWith("/") && !redirectParam.startsWith("//")
      ? redirectParam
      : "/";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed. Check your email and password.");
      return;
    }

    toast.success("Welcome back!");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm">
      <h1 className="mb-6 text-center text-3xl font-bold">Welcome back</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="input input-bordered w-full"
          />
          <button
            type="button"
            onClick={() =>
              toast("Password reset is not available yet.", { icon: "ℹ️" })
            }
            className="mt-2 text-sm text-primary hover:underline"
          >
            Forget Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        New to BookNook?{" "}
        <Link href="/register" className="font-semibold text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}