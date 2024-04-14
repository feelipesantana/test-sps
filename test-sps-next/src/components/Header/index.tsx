import { getServerSession } from "next-auth";
import { ModeToggle } from "../ModeToogle";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export async function Header() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <div className="w-full h-24 border-b border-slate-600 flex items-center justify-between p-10">
      <div className="text-lg text-slate-500"> SPS Group</div>
      <div className="flex items-center justify-center gap-4">
        <div>{session && "Sair"}</div>
        <ModeToggle />
      </div>
    </div>
  );
}
