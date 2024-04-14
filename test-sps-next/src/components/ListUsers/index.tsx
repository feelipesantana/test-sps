"use client";
import { getUsers } from "@/api/get-users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser } from "@/api/delete-user";
import { Button } from "../ui/button";
import { GetUsersTypes } from "@/@types/get-users-types";
import { CircleX, Delete, RefreshCw } from "lucide-react";
import { UpdateIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { getCurrentDate } from "@/utils/current-date";
import { Toaster } from "../ui/sonner";
import { ModalUpdate } from "../ModalUpdate";
import { useOpenModal } from "@/hook/useOpenModal";
import { useCurrentUser } from "@/hook/useCurrentUser";

export function ListUsers() {
  const queryClient = useQueryClient();
  const { setOpenModal, openModal } = useOpenModal();
  const { setCurrentUser } = useCurrentUser();

  const { data: users } = useQuery<GetUsersTypes[]>({
    queryFn: getUsers,
    queryKey: ["users"],
  });

  async function handleDeleteUser(id: string) {
    const status = await deleteUser(id);

    console.log(status);
    if (status === 200) {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast("Usuário excluído com sucesso!", {
        description: getCurrentDate(),
        action: {
          label: "X",
          onClick: () => console.log("Ok"),
        },
      });
    } else {
      toast("Erro ao excluir usuário!", {
        description: "Tente novamente",
        action: {
          label: "X",
          onClick: () => console.log("Ok"),
        },
      });
    }
  }

  function handleUpdateCurrentId(user: GetUsersTypes) {
    console.log(user);
    setCurrentUser(user);
    setOpenModal(true);
  }

  return (
    <div className="border mt-32">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data de criação</TableHead>
            <TableHead>Excluir</TableHead>
            <TableHead>Atualizar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.type}</TableCell>
              <TableCell>{user.createed_at}</TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <CircleX />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant={"default"}
                  onClick={() => handleUpdateCurrentId(user)}
                >
                  <RefreshCw />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toaster />
      <ModalUpdate />
    </div>
  );
}
