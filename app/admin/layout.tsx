"use client";

// import Sidebar from "@/components/admin/sidebar";
import Sidebar from "./sidebar";
// import Topbar from "@/components/admin/topbar";
import Topbar from "./topbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Protect admin routes
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.replace("/admin/login");
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
