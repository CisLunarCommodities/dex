import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey, Cluster } from "@solana/web3.js";
import { type CCE } from "../target/types/cce";
import { IDL } from "../target/types/cce";

export function getCCEProgramId(network: Cluster): PublicKey {
  return new PublicKey(process.env.NEXT_PUBLIC_CCE_PROGRAM_ID || "");
}

export function getCCEProgram(provider: AnchorProvider, programId: PublicKey) {
  return new Program<CCE>(IDL, programId, provider);
}

export type { CCE };