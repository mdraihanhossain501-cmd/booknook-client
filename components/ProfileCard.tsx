"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import SectionHeading from "@/components/SectionHeading";

export default function ProfileCard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!user) return null;

  const joined = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="mx-auto w-full max-w-md">
      <SectionHeading title="My Profile" />

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
        <div className="h-28 w-28 overflow-hidden rounded-full bg-base-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.image || "https://placehold.co/200x200?text=U"}
            alt={user.name}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-base-content/70">{user.email}</p>
        <p className="text-sm text-base-content/60">Member since {joined}</p>

        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/my-books" className="btn btn-primary">
            My Books
          </Link>
          <Link href="/my-borrows" className="btn btn-outline btn-primary">
            My Borrows
          </Link>
        </div>
      </div>
    </div>
  );
}