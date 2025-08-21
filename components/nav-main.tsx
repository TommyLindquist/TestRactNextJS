import { pages } from "@/app/lib/data/slugArray";
import Link from "next/link"

 const randomNumber = Math.floor(Math.random() * 100) + 1;
 const randomSlug = Math.floor(Math.random() * pages.length);

 const linkList = [
    { href: "/", label: "Home"},
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact us"},
    { href: "/about/history", label: "History"},
    { href: "/about/getimage", label: "Get Image"},
    { href: `/about/dynamicroutetest/${randomNumber}`, label: `Dyna Route Test id ${randomNumber}` },
    { href: `/${pages[randomSlug].slug}`, label: "Test slug" },
    { href: "/anilist", label: "Anilist" }, 
    { href: "/anilist?error=true", label: "AnilistErrPage" },
];

export default function NavMain({className=""}: {className?: string}) {
    return (
        <nav className={`fixed bg-gray-800 text-white p-4 rounded-lg ${className}`}>

            <ul className="flex gap-4">
               {linkList.map((link, idx) => (
                <li key={idx}>
                    <Link
                    className="bg-amber-600 p-4 block text-xl"
                    href={link.href}
                    >
                        {link.label}
                    </Link>

                </li>
               ))}
            </ul>
        </nav>
    )
}