"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "New Post", href: "/admin/new", icon: "✍️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    }

    // Don't show sidebar on login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#060614] flex">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 bg-[#0d0d2b] border-r border-[#1e1e4a] flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-[#1e1e4a]">
                    <Link href="/" className="text-white font-black text-lg">&lt; Dev Talha /&gt;</Link>
                    <p className="text-[#6b6dff] text-xs font-semibold mt-1 tracking-widest uppercase">Admin Panel</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                        ? "bg-[#2c2ebf] text-white shadow-[0_0_20px_rgba(44,46,191,0.3)]"
                                        : "text-[#9898b5] hover:bg-[#1a1a4e] hover:text-white"
                                    }`}
                            >
                                <span>{link.icon}</span>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-[#1e1e4a]">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#9898b5] hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                    >
                        <span>🚪</span>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
