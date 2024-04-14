import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "./api/auth/[...nextauth]/route";
import { Input } from "@/components/ui/input";
import { LoginForm } from "@/components/LoginForm";
import { SessionType } from "@/@types/session-types";

export default async function Login() {
  const session: SessionType | null = await getServerSession(nextAuthOptions);
  if (session) {
    redirect("/system");
  }
  return (
    <main className="flex justify-center items-center">
      <div className=" max-w-[40rem] w-full rounded-lg bg-slate-200 dark:bg-slate-700 text-black border mt-32 p-10 flex items-center justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
