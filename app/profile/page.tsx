import type { Metadata } from "next";
import PrivateRoute from "@/components/PrivateRoute";
import ProfileCard from "@/components/ProfileCard";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function ProfilePage() {
  return (
    <main className="flex-1 px-4 py-12">
      <PrivateRoute>
        <ProfileCard />
      </PrivateRoute>
    </main>
  );
}