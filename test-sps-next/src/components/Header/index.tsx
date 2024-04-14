import { getServerSession } from "next-auth";
import { ModeToggle } from "../ModeToogle";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { SignOut } from "../SignOut";
import { cookies } from "next/headers";
import { Menu } from "../Menu";

export async function Header() {
  return (
    <div className="w-full h-24 border-b border-slate-600 flex items-center justify-between p-10">
      <div className="flex items-center justify-center gap-4">
        <Link href="/cms" className="text-lg text-slate-500">
          {" "}
          SPS Group
        </Link>

        <Link href="/cms" className="">
          {" "}
          Home
        </Link>
      </div>
      <Menu />
    </div>
  );
}
