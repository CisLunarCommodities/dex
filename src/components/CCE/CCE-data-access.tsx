'use client'

import { getCCEProgram, getCCEProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
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

  const accounts = useQuery({
    queryKey: ['CCE', 'all', { cluster }],
    queryFn: () => program.account.CCE.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['CCE', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ CCE: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useCCEProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useCCEProgram()

  const accountQuery = useQuery({
    queryKey: ['CCE', 'fetch', { cluster, account }],
    queryFn: () => program.account.CCE.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['CCE', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ CCE: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['CCE', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ CCE: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['CCE', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ CCE: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['CCE', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ CCE: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
