"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Spinner } from "../Spinner";

const schemaFormZod = z.object({
  email: z
    .string()
    .min(2, { message: "It must have more than 2 characters." })
    .email("This not email valid."),
  password: z
    .string()
    .min(4, { message: "It must have more than 8 characters." }),
});

type FormValues = z.infer<typeof schemaFormZod>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schemaFormZod),
  });

  async function handleAuth(data: FormValues) {
    const validateDatas = schemaFormZod.parse(data);

    if (validateDatas) {
      setIsLoading(true);
      try {
        await signIn("credentials", {
          email: validateDatas.email,
          password: validateDatas.password,
          redirect: false,
        })
          .then((res) => {
            setIsLoading(false);
            if (res?.error) {
              console.error(res.error);
              return;
            }
            replace("/cms");
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }
  return (
    <form className="space-y-10" onSubmit={handleSubmit(handleAuth)}>
      <div className="space-y-3 dark:text-slate-950 ">
        <div className="space-y-1">
          <Label className="text-md text-semibold">Email:</Label>
          <Input
            type="email"
            {...register("email")}
            className="dark:bg-slate-200"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-md text-semibold">Senha:</Label>
          <Input
            type="password"
            {...register("password")}
            className="dark:bg-slate-200"
          />
        </div>
      </div>

      <Button className="w-full" type="submit">
        {isLoading ? <Spinner /> : <span>Logar</span>}
      </Button>
    </form>
  );
}
