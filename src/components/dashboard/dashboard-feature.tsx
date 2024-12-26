'use client'

import { AppHero } from '../ui/ui-layout'

const tokenInfo = [
  {
    symbol: '$LOX',
    description: 'Liquid Oxygen - The primary fuel token used for gas fees in the Cislunar Commodities Exchange',
    details: 'Used to power transactions and trades within the CCE ecosystem'
  },
  {
    symbol: '$H3',
    description: 'Helium-3 - Governance and discount token for the CCE platform',
    details: 'Hold $H3 to receive trading fee discounts and participate in governance decisions'
  }
]

const resources: { label: string; href: string }[] = [
  { label: 'CCE Documentation', href: 'https://docs.cce.exchange/' },
  { label: 'Lunar Mining Standards', href: 'https://lunarmining.standards/' },
  { label: 'Space Commodities Index', href: 'https://index.cce.exchange/' },
  { label: 'Asteroid Classification Guide', href: 'https://asteroids.cce.exchange/' },
]

export default function DashboardFeature() {
  return (
    <div>
      <AppHero 
        title="Cislunar Commodities Exchange (CCE)" 
        subtitle="The first decentralized exchange for space resources and lunar mining commodities." 
      />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Token Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Native Tokens</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tokenInfo.map((token) => (
              <div key={token.symbol} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-primary">{token.symbol}</h3>
                  <p className="font-semibold">{token.description}</p>
                  <p className="text-sm opacity-80">{token.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Markets</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="stat bg-base-200 rounded-box">
              <div className="stat-title">Lunar Regolith</div>
              <div className="stat-value">324.5 LOX</div>
              <div className="stat-desc">↗︎ 12% (24h)</div>
            </div>
            <div className="stat bg-base-200 rounded-box">
              <div className="stat-title">Water Ice</div>
              <div className="stat-value">1,423 LOX</div>
              <div className="stat-desc">↘︎ 3% (24h)</div>
            </div>
            <div className="stat bg-base-200 rounded-box">
              <div className="stat-title">Rare Earth Metals</div>
              <div className="stat-value">5,893 LOX</div>
              <div className="stat-desc">↗︎ 8% (24h)</div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.href}
                className="card bg-base-200 shadow-xl hover:bg-base-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="card-body">
                  <h3 className="card-title">{resource.label}</h3>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">Learn More →</button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
