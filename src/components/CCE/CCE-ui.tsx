'use client'

import { Keypair, PublicKey } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useCCEProgram, useCCEProgramAccount } from './CCE-data-access'

export function CreateMarket() {
  const { initializeMarket } = useCCEProgram()
  const [commodity, setCommodity] = useState('')
  const [price, setPrice] = useState('')

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Commodity Name"
        className="input input-bordered"
        value={commodity}
        onChange={(e) => setCommodity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Initial Price"
        className="input input-bordered"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={() => {
          if (!commodity || !price) return
          initializeMarket.mutateAsync({
            keypair: Keypair.generate(),
            commodity,
            initialPrice: Number(price)
          })
        }}
        disabled={initializeMarket.isPending}
      >
        Create Market
      </button>
    </div>
  )
}

export function MarketList() {
  const { markets } = useCCEProgram()

  if (markets.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {markets.data?.map((market) => (
        <MarketCard key={market.publicKey.toString()} market={market} />
      ))}
    </div>
  )
}

function MarketCard({ market }: { market: any }) {
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const { placeBuyOrder, placeSellOrder } = useCCEProgramAccount({ account: market.publicKey })

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">{market.account.commodity}</h2>
        <p>Current Price: {market.account.currentPrice} SOL</p>
        <p>Volume: {market.account.volume}</p>
        
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Quantity"
            className="input input-bordered"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            className="btn btn-success"
            onClick={() => placeBuyOrder.mutateAsync({ quantity: Number(quantity), price: Number(price) })}
          >
            Buy
          </button>
          <button
            className="btn btn-error"
            onClick={() => placeSellOrder.mutateAsync({ quantity: Number(quantity), price: Number(price) })}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  )
}
