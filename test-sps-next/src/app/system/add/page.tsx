import { AddUser } from "@/components/AddUser";
import { Toaster } from "@/components/ui/sonner";

export default function Add() {
  return (
    <div className="flex flex-col items-center justify-center">
      <AddUser />
      <Toaster />
    </div>
  );
}
