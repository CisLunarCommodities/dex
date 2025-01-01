'use client'

import { CCE, getCCEProgram, getCCEProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey, SystemProgram } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useCCEProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCCEProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getCCEProgram(provider, programId), [provider, programId])

  const markets = useQuery({
    queryKey: ['CCE', 'markets', { cluster }],
    queryFn: () => program.account.market.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize_market = useMutation({
    mutationKey: ['CCE', 'initialize_market', { cluster }],
    mutationFn: async ({ keypair, commodity, initialPrice }: { keypair: Keypair, commodity: string, initialPrice: number }) =>
      program.methods
        .initialize_market(commodity, initialPrice)
        .accounts({
          market: keypair.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return markets.refetch()
    },
    onError: () => toast.error('Failed to initialize market'),
  })

  return {
    program,
    programId,
    markets,
    getProgramAccount,
    initialize_market,
  }
}

export function useCCEProgramAccount({ account }: { account: PublicKey }) {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCCEProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getCCEProgram(provider, programId), [provider, programId])

  const marketInfo = useQuery({
    queryKey: ['CCE', 'market', { cluster, account }],
    queryFn: () => program.account.market.fetch(account),
  })

  const place_buy_order = useMutation({
    mutationKey: ['CCE', 'place_buy_order', { cluster, account }],
    mutationFn: async ({ quantity, price }: { quantity: number, price: number }) =>
      program.methods
        .place_buy_order(quantity, price)
        .accounts({
          market: account,
          owner: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return marketInfo.refetch()
    },
    onError: () => toast.error('Failed to place buy order'),
  })

  const place_sell_order = useMutation({
    mutationKey: ['CCE', 'place_sell_order', { cluster, account }],
    mutationFn: async ({ quantity, price }: { quantity: number, price: number }) =>
      program.methods
        .placeSellOrder(quantity, price)
        .accounts({
          market: account,
          owner: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return marketInfo.refetch()
    },
    onError: () => toast.error('Failed to place sell order'),
  })

  return {
    marketInfo,
    place_buy_order,
    place_sell_order,
  }
}
