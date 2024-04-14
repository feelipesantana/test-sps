"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

export function SignOut() {
  const { push } = useRouter();
  const [loading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    try {
      await signOut();
      destroyCookie({}, "user_token", { path: "/" });
    } catch (error) {
      console.error(error);
    } finally {
      push("/");
      setIsLoading(false);
    }
  }
  return (
    <Button className="border" variant={"link"} onClick={handleSignOut}>
      Sair
    </Button>
  );
}
