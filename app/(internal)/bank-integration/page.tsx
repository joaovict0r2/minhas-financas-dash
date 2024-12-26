"use client";

import { useEffect, useState } from "react";
import { accountsTransactions, createConnectToken } from "./actions";
import type { PluggyConnect as PluggyConnectType } from 'react-pluggy-connect'
import dynamic from "next/dynamic";

const PluggyConnect = dynamic(
  () => (import('react-pluggy-connect') as any).then((mod: { PluggyConnect: any; }) => mod.PluggyConnect),
  { ssr: false }
) as typeof PluggyConnectType

function BankIntegration() {
  const [isPluggyWidgetOpen, setIsPluggyWidgetOpen] = useState<boolean>(false);
  const [connectToken, setConnectToken] = useState<string>("");

  useEffect(() => {
    if (!connectToken) {
      const fetchToken = async () => {
        const response = await createConnectToken()
        const { accessToken } = response
        setConnectToken(accessToken)
      }

      fetchToken()
    }
  }, [connectToken])

  const onSuccess = async (itemData: { item: any; }) => {
    const data = await accountsTransactions(itemData.item.id) // itemId = (Nubank ID ou Caixa ID ou C6 Bank ID)
    console.log(data)
    // Acredito que tera que armazenar no BE as transações ou qualquer outro tipo de informação
    // que for pega do usuario. (da pra fazer a inserção no BE pelo next mesmo, ja que vcs estão usando postgres)
    setIsPluggyWidgetOpen(false)
  }

  return (
    <>
      {isPluggyWidgetOpen ? (
        <PluggyConnect
          connectToken={connectToken}
          includeSandbox={true}
          onClose={() => setIsPluggyWidgetOpen(false)}
          onSuccess={onSuccess}
        />
      ) : (
        <button 
          className="bg-[#00b490] text-white rounded-md p-2"
          onClick={() => setIsPluggyWidgetOpen(true)}>
          Conectar sua conta
        </button>
      )}
    </>
  );
}

export default BankIntegration;
