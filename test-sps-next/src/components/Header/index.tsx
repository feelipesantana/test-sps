import { getServerSession } from "next-auth";
import { ModeToggle } from "../ModeToogle";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export async function Header() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <div className="w-full h-24 border-b border-slate-600 flex items-center justify-between p-10">
      <div className="flex items-center justify-center gap-4">
        <Link href="/system" className="text-lg text-slate-500">
          {" "}
          SPS Group
        </Link>

        <Link href="/system" className="">
          {" "}
          Home
        </Link>
      </div>
      <div className="flex items-center justify-center gap-6">
        <div>
          {session && (
            <Link
              href="/system/add"
              className="border p-2 rounded-md transition ease duration-200 hover:text-slate-300"
            >
              {" "}
              Adicionar Usuário
            </Link>
          )}
        </div>
        <div>{session && "Sair"}</div>
        <ModeToggle />
      </div>
    </div>
  );
}
