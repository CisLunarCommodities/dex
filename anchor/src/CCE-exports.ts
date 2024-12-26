// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CCEIDL from '../target/idl/CCE.json'
import type { CCE } from '../target/types/CCE'

// Re-export the generated IDL and type
export { CCE, CCEIDL }

// The programId is imported from the program IDL.
export const CCE_PROGRAM_ID = new PublicKey(CCEIDL.address)

// This is a helper function to get the CCE Anchor program.
export function getCCEProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...CCEIDL, address: address ? address.toBase58() : CCEIDL.address } as CCE, provider)
}

// This is a helper function to get the program ID for the CCE program depending on the cluster.
export function getCCEProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the CCE program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return CCE_PROGRAM_ID
  }
}
