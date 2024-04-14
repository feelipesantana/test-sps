"use client";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ModeToogle";
import Link from "next/link";
import { SignOut } from "../SignOut";

export function Menu() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-center gap-6">
      <div className="flex items-center justify-center gap-3">
        <div>
          {pathname === "/cms" && (
            <Link
              href="/system/add"
              className="border p-2 rounded-md transition ease duration-200 hover:text-slate-300"
            >
              {" "}
              Adicionar Usuário
            </Link>
          )}
        </div>
        <div>{pathname === "/cms" && <SignOut />}</div>
      </div>

      <ModeToggle />
    </nav>
  );
}
