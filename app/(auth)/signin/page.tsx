"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useActionState } from "react";
import { signin } from "./actions";

function Signin() {
  const [state, action, pending] = useActionState(signin, undefined);
  
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Fazer Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={action}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="text-sm">Email</Label>
                <Input name="email" placeholder="Digite seu email" />
                {state?.errors?.email && (
                  <p className="!m-0 text-xs p-1 text-red-500">
                    {state.errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className="text-sm">Telefone</Label>
                <Input name="phone" placeholder="Digite seu telefone" />
                {state?.errors?.phone && (
                  <p className="!m-0 text-xs p-1 text-red-500">
                    {state.errors.phone}
                  </p>
                )}
              </div>

              <p>{state?.message}</p>

              <Button type="submit" className="bg-[#00b490]" disabled={pending}>
                Entrar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signin;
