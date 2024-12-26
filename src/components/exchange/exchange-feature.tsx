'use client'

import { useState } from 'react'
import { IconSettings, IconArrowDown } from '@tabler/icons-react'
import { WalletButton } from '../solana/solana-provider'
import { useWallet } from '@solana/wallet-adapter-react'

const TOKENS = [
  { symbol: 'LOX', name: 'Liquid Oxygen', icon: '💧' },
  { symbol: 'H3', name: 'Helium-3', icon: '🌟' },
  { symbol: 'REG', name: 'Lunar Regolith', icon: '🌑' },
  { symbol: 'H2O', name: 'Water Ice', icon: '❄️' },
  { symbol: 'REM', name: 'Rare Earth Metals', icon: '⛰️' },
]

export default function ExchangeFeature() {
  const { publicKey } = useWallet()
  const [sellAmount, setSellAmount] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [selectedSellToken, setSelectedSellToken] = useState(TOKENS[0])
  const [selectedBuyToken, setSelectedBuyToken] = useState(null)
  const [showTokenList, setShowTokenList] = useState(false)

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="card bg-base-200 shadow-xl w-full max-w-[480px]">
        <div className="card-body">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button className="btn btn-sm btn-primary">Swap</button>
              <button className="btn btn-sm btn-ghost">Limit</button>
              <button className="btn btn-sm btn-ghost">Send</button>
              <button className="btn btn-sm btn-ghost">Buy</button>
            </div>
            <button className="btn btn-ghost btn-circle">
              <IconSettings className="w-6 h-6" />
            </button>
          </div>

          {/* Sell Input */}
          <div className="bg-base-300 p-4 rounded-box">
            <div className="text-sm mb-2">Sell</div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                placeholder="0"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                className="input input-ghost text-2xl w-full max-w-[200px] focus:outline-none"
              />
              <button 
                className="btn btn-ghost"
                onClick={() => setShowTokenList(true)}
              >
                <span className="mr-2">{selectedSellToken.icon}</span>
                {selectedSellToken.symbol}
                <span className="ml-2">▼</span>
              </button>
            </div>
            <div className="text-sm opacity-60 mt-2">$0.00</div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center -my-2">
            <button className="btn btn-circle btn-sm btn-ghost">
              <IconArrowDown className="w-5 h-5" />
            </button>
          </div>

          {/* Buy Input */}
          <div className="bg-base-300 p-4 rounded-box">
            <div className="text-sm mb-2">Buy</div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                placeholder="0"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                className="input input-ghost text-2xl w-full max-w-[200px] focus:outline-none"
              />
              <button 
                className="btn btn-primary"
                onClick={() => setShowTokenList(true)}
              >
                Select token ▼
              </button>
            </div>
            <div className="text-sm opacity-60 mt-2">$0.00</div>
          </div>

          {/* Connect Wallet / Swap Button */}
          {publicKey ? (
            <button className="btn btn-primary w-full mt-4">
              Swap
            </button>
          ) : (
            <WalletButton className="w-full mt-4" />
          )}

          {/* Network Banner */}
          <div className="mt-4 bg-base-300 rounded-box p-4 flex items-center gap-2">
            <div className="flex-1">
              <div className="font-semibold">Swapping across networks</div>
              <div className="text-sm opacity-60">Move tokens across 8+ networks.</div>
            </div>
            <button className="btn btn-sm btn-ghost">×</button>
          </div>
        </div>
      </div>

      {/* Token Selection Modal */}
      {showTokenList && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Select a token</h3>
            <div className="space-y-2">
              {TOKENS.map((token) => (
                <button
                  key={token.symbol}
                  className="btn btn-ghost w-full justify-start text-left"
                  onClick={() => {
                    setSelectedBuyToken(token)
                    setShowTokenList(false)
                  }}
                >
                  <span className="mr-2">{token.icon}</span>
                  <div>
                    <div>{token.symbol}</div>
                    <div className="text-sm opacity-60">{token.name}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowTokenList(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 