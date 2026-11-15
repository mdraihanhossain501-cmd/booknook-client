"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import GoogleButton from "@/components/GoogleButton";

function validatePassword(password: string) {
    if (password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must have at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must have at least one lowercase letter";
    }
    return "";
}

export default function RegisterForm() {
    const router = useRouter();
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = String(form.get("name")).trim();
        const email = String(form.get("email")).trim();
        const image = String(form.get("image")).trim();
        const password = String(form.get("password"));

        const problem = validatePassword(password);
        if (problem) {
            setPasswordError(problem);
            return;
        }
        setPasswordError("");

        setLoading(true);
        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
            image,
        });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Registration failed. Please try again.");
            return;
        }

        toast.success("Account created! Please log in.");
        router.push("/login");
    }

    return (
        <div className="mx-auto w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-8 shadow-sm">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Create your account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="input input-bordered w-full"
                    />
                </div>

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
                    <label className="mb-1 block text-sm font-medium" htmlFor="image">
                        Photo URL
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="url"
                        required
                        placeholder="https://example.com/your-photo.jpg"
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
                        placeholder="Enter a strong password"
                        className="input input-bordered w-full"
                    />
                    {passwordError && (
                        <p className="mt-1 text-sm text-error">{passwordError}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>

            <div className="divider my-6">OR</div>
            <GoogleButton callbackURL="/" />
            <p className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary">
                    Login
                </Link>
            </p>
        </div>
    );
}