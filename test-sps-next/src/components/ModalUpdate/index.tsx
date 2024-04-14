"use client";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/api/update-user";
import { toast } from "sonner";
import { getCurrentDate } from "@/utils/current-date";
import { useOpenModal } from "@/hook/useOpenModal";
import { useCurrentUser } from "@/hook/useCurrentUser";
import { useEffect } from "react";

const schemaCreateZod = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  type: z.enum(["ADMIN", "DEFAULT"]).optional(),
  password: z.string().optional(),
});

type FormValues = z.infer<typeof schemaCreateZod>;
export function ModalUpdate() {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUser();
  const { openModal, setOpenModal } = useOpenModal();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaCreateZod),
  });

  async function handleUpdateUser(data: FormValues) {
    if (data) {
      try {
        const response = await updateUser({
          id: currentUser.id,
          name: data.name,
          email: data.email,
          type: data.type,
          password: data.password,
        });
        if (response.status === 200) {
          toast("Usuário Atualizado com Sucesso!", {
            description: getCurrentDate(),
            action: {
              label: "X",
              onClick: () => console.log("Ok"),
            },
          });
          queryClient.invalidateQueries({ queryKey: ["users"] });
        } else {
          toast("Erro ao atualizar usuário!", {
            description: Date.now(),
            action: {
              label: "X",
              onClick: () => console.log("Ok"),
            },
          });
        }
      } catch (err) {
        toast("Erro ao atualizar usuário", {
          description: "Inter Error",
          action: {
            label: "X",
            onClick: () => console.log("Ok"),
          },
        });
      }
    }
  }

  useEffect(() => {
    if (openModal && currentUser) {
      setValue("name", currentUser.name || "");
      setValue("email", currentUser.email || "");
    }
  }, [openModal, currentUser, setValue]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent>
        <form
          className=" w-[28rem] p-10 space-y-10 "
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Name:</Label>
              <Input
                type="text"
                {...register("name")}
                defaultValue={currentUser.name}
                onChange={(e) => setValue("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email:</Label>
              <Input
                type="email"
                {...register("email")}
                onChange={(e) => setValue("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Selecionar Tipo:</Label>
              <Select
                {...register("type")}
                onValueChange={(e: any) => setValue("type", e)}
                defaultValue={currentUser.type}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="DEFAULT">DEFAULT</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Password:</Label>
              <Input type="password" {...register("password")} />
            </div>
          </div>
          <Button variant={"default"} className="w-full" type="submit">
            {" "}
            Atualizar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
