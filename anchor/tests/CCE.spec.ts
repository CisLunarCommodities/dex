import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {CCE} from '../target/types/CCE'

describe('CCE', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.CCE as Program<CCE>

  const CCEKeypair = Keypair.generate()

  it('Initialize CCE', async () => {
    await program.methods
      .initialize()
      .accounts({
        CCE: CCEKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([CCEKeypair])
      .rpc()

    const currentCount = await program.account.CCE.fetch(CCEKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment CCE', async () => {
    await program.methods.increment().accounts({ CCE: CCEKeypair.publicKey }).rpc()

    const currentCount = await program.account.CCE.fetch(CCEKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment CCE Again', async () => {
    await program.methods.increment().accounts({ CCE: CCEKeypair.publicKey }).rpc()

    const currentCount = await program.account.CCE.fetch(CCEKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement CCE', async () => {
    await program.methods.decrement().accounts({ CCE: CCEKeypair.publicKey }).rpc()

    const currentCount = await program.account.CCE.fetch(CCEKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set CCE value', async () => {
    await program.methods.set(42).accounts({ CCE: CCEKeypair.publicKey }).rpc()

    const currentCount = await program.account.CCE.fetch(CCEKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the CCE account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        CCE: CCEKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.CCE.fetchNullable(CCEKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
