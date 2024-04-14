"use client";

import { z } from "zod";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createUser } from "@/api/create-user";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { getCurrentDate } from "@/utils/current-date";

const schemaCreateZod = z.object({
  name: z.string().min(2, { message: "Por favor obrigatório o campos!" }),
  email: z.string().email({ message: "Deve ser um email!" }),
  type: z.enum(["ADMIN", "DEFAULT"]),
  password: z.string().min(4, { message: "Senha mínimo 4 caracteres!" }),
});

type FormValues = z.infer<typeof schemaCreateZod>;

export function AddUser() {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaCreateZod),
  });

  async function handleCreateUser(data: FormValues) {
    if (data && data.type) {
      const payload = {
        name: data.name,
        email: data.email,
        type: data.type,
        password: data.password,
      };

      try {
        const response = await createUser(payload);
        if (response.status === 201) {
          toast("Usuário adicionado com sucesso!", {
            description: getCurrentDate(),
            action: {
              label: "X",
              onClick: () => console.log("Ok"),
            },
          });
          queryClient.invalidateQueries({ queryKey: ["users"] });
        } else {
          toast("Erro ao adicionar usuário!", {
            description: Date.now(),
            action: {
              label: "X",
              onClick: () => console.log("Ok"),
            },
          });
        }
      } catch (err) {
        console.log("Entrou AQUI");
        toast("Erro ao adicionar usuário", {
          description: "Verifique com outro email !",
          action: {
            label: "X",
            onClick: () => console.log("Ok"),
          },
        });
      }
    }
  }
  return (
    <form
      className="mt-32 border w-[28rem] p-10 space-y-10 "
      onSubmit={handleSubmit(handleCreateUser)}
    >
      <div className="space-y-3">
        <div className="space-y-2">
          <Label>Name:</Label>
          <Input type="text" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Email:</Label>
          <Input type="email" {...register("email")} />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Selecionar Tipo:</Label>
          <Select
            {...register("type")}
            onValueChange={(e: any) => setValue("type", e)}
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
      <Button variant={"default"} className="w-full">
        {" "}
        Adicionar
      </Button>
    </form>
  );
}
