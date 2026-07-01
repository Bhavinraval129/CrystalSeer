"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  Settings,
  Menu,
  X,
  Gem,
  ChevronRight,
  FolderTree,
  LogOut,
  Lock,
  User,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/subcategories", label: "Subcategories", icon: FolderTree },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_logged_in");
    setIsAuthenticated(session === "true");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usernameInput.trim() || !passwordInput) {
      setAuthError("Please fill in all fields.");
      return;
    }
    setAuthLoading(true);
    setAuthError("");
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", usernameInput.trim())
        .eq("password", passwordInput)
        .single();
      if (error || !data) {
        setAuthError("Invalid username or password.");
      } else {
        sessionStorage.setItem("admin_logged_in", "true");
        setIsAuthenticated(true);
      }
    } catch {
      setAuthError("Failed to connect to database. Please check your Supabase credentials.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasswordInput("");
  };

  if (isAuthenticated === null) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-lavender-mist flex items-center justify-center">
        <div suppressHydrationWarning className="w-12 h-12 border-4 border-soft-purple-200 border-t-primary-purple rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div suppressHydrationWarning className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-purple-100 via-lavender-mist to-gold-50 p-4 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-purple/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gold-accent/10 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[450px] relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-deep-plum flex items-center justify-center shadow-xl mb-4 hover:scale-105 transition-transform duration-300">
              <Gem className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-deep-plum tracking-wide">
              Crystal<span className="text-primary-purple italic font-light">Seer</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-deep-plum/50 mt-1 font-semibold">
              Admin Portal
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl p-8 shadow-2xl shadow-deep-plum/5">
            <h2 className="font-playfair text-xl font-bold text-deep-plum mb-6">Admin Sign In</h2>

            {authError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-red-600 font-medium">{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-deep-plum/60 mb-2">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-plum/40" />
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter username"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-soft-purple-200 focus:outline-none focus:ring-2 focus:ring-primary-purple/30 bg-white text-sm text-deep-plum placeholder-deep-plum/30 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-deep-plum/60 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-plum/40" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-soft-purple-200 focus:outline-none focus:ring-2 focus:ring-primary-purple/30 bg-white text-sm text-deep-plum placeholder-deep-plum/30 transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-deep-plum text-white py-3.5 rounded-xl font-semibold hover:bg-primary-purple hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {authLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="text-xs text-deep-plum/60 hover:text-deep-plum hover:underline font-medium">
              ← Return to Crystal Seer
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className="min-h-screen flex bg-lavender-mist">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] bg-deep-plum text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary-purple/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-playfair text-lg font-bold tracking-wide">
                  Crystal<span className="italic font-light text-soft-purple-400">Seer</span>
                </h1>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                  Admin Panel
                </p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 px-3 mb-3 font-semibold">Menu</p>
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-primary-purple text-white shadow-lg shadow-primary-purple/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? "text-white" : "text-white/40 group-hover:text-white/80"
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-white/60" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-soft-purple-200 px-4 lg:px-8 h-16 flex items-center gap-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-soft-purple-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-deep-plum" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-deep-plum/50 hover:text-red-500 bg-lavender-mist hover:bg-red-50 border border-soft-purple-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-deep-plum to-primary-purple flex items-center justify-center text-white text-sm font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
