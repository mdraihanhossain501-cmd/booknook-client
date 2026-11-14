import type { Metadata } from "next";
import PrivateRoute from "@/components/PrivateRoute";
import MyBorrows from "@/components/MyBorrows";

export const metadata: Metadata = {
  title: "My Borrows",
};

export default function MyBorrowsPage() {
  return (
    <main className="flex-1 px-4 py-12">
      <PrivateRoute>
        <MyBorrows />
      </PrivateRoute>
    </main>
  );
}