"use client";

export default function Topbar() {
  return (
    <div className="w-full bg-white border-b p-4 flex justify-between items-center">
      <p className="font-medium">Admin Dashboard</p>

      <button
        className="text-red-600"
        onClick={() => {
          localStorage.removeItem("admin_token");
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}
