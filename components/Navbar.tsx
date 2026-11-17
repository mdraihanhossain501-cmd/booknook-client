"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
];

const privateLinks = [
    { href: "/add-book", label: "Add Book" },
    { href: "/my-books", label: "My Books" },
    { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

    function closeDropdown() {
        (document.activeElement as HTMLElement | null)?.blur();
    }

    async function handleLogout() {
        closeDropdown();
        const { error } = await authClient.signOut();
        if (error) {
            toast.error("Logout failed. Please try again.");
            return;
        }
        toast.success("Logged out successfully");
        router.push("/");
        router.refresh();
    }

    function linkClass(href: string) {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return active ? "font-semibold text-primary" : "";
    }

    return (
        <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
            <div className="navbar mx-auto max-w-7xl px-4">
                <div className="navbar-start">
                    {/* Mobile menu */}
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            aria-label="Open menu"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow"
                        >
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={closeDropdown}
                                        className={linkClass(link.href)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Logo />
                </div>

                {/* Desktop links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-1 px-1">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={linkClass(link.href)}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navbar-end gap-2">
                    <ThemeToggle />
                    {isPending ? (
                        <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
                    ) : user ? (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                aria-label="Open user menu"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={user.image || "https://placehold.co/80x80?text=U"}
                                        alt={user.name}
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow"
                            >
                                <li className="menu-title text-base-content">{user.name}</li>
                                <li>
                                    <Link href="/profile" onClick={closeDropdown}>
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <button type="button" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="btn btn-outline btn-primary">
                                Login
                            </Link>
                            <Link href="/register" className="btn btn-primary">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}