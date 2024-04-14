import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { getUsers } from "@/api/get-users";

import { GetUsersTypes } from "@/@types/get-users-types";
import { ListUsers } from "@/components/ListUsers";
import { SessionType } from "@/@types/session-types";

export default async function System() {
  const session: SessionType | null = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <ListUsers />
    </div>
  );
}
