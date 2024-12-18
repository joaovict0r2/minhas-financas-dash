"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OTPInput from "@/components/OTPInput/OTPInput";
import { useActionState } from "react";
import { validateToken } from "./actions";

function AuthToken() {
  const [state, action, pending] = useActionState(validateToken, undefined);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Autenticação com 2 fatores</CardTitle>
          <CardDescription>
            Um codigo foi enviado ao seu WhatsApp, <br /> por favor, verifique e
            insira no campo abaixo.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={action}>
            <div className="grid w-full items-center gap-4 justify-center">
              <OTPInput name="token" />
              {state?.errors?.token && (
                <p className="!m-0 text-xs p-1 text-red-500">
                  {state.errors.token}
                </p>
              )}
            </div>
            
            <Button type="submit" className="bg-[#00b490] w-full mt-5" disabled={pending}>
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthToken;
