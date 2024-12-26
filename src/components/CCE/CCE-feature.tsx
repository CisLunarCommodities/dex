'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useCCEProgram } from './CCE-data-access'
import { CreateMarket, MarketList } from './CCE-ui'

export default function CCEFeature() {
  const { publicKey } = useWallet()
  const { programId } = useCCEProgram()

  return publicKey ? (
    <div>
      <AppHero
        title="CCE"
        subtitle={
          'Create a new market by clicking the "Create" button. Markets are stored on-chain and can be traded using LOX tokens.'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <CreateMarket />
      </AppHero>
      <MarketList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
