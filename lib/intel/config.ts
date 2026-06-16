/**
 * Curated configuration — REAL ecosystems, narrative themes, launchpads, and
 * featured builders. These are categories and official sources, not fictional
 * entities or invented metrics. Every URL here is an official source; every
 * number shown in the product is computed from live data, never from this file.
 */

/* ----------------------------- ecosystems ----------------------------- */

export interface EcosystemConfig {
  id: string;
  name: string;
  symbol: string;
  blurb: string;
  overview: string;
  githubTopic: string;
  seedRepos: string[];
  keywords: string[];
  /** Curated narrative theme ids most relevant to this ecosystem. */
  narrativeIds: string[];
  /** Curated launchpad ids in this ecosystem. */
  launchpadIds: string[];
  /** GitHub logins of notable builders to feature (verifiable handles only). */
  featuredBuilders: string[];
}

export const ECOSYSTEMS: EcosystemConfig[] = [
  {
    id: "base",
    name: "Base",
    symbol: "B",
    blurb: "Onchain consumer apps, AI agents, and a fast-growing launchpad layer.",
    overview:
      "Base has become a center of gravity for consumer onchain apps, AI agents, and social. A rich launchpad layer (Bankr, Clanker, Flaunch, Virtuals) lets anyone deploy tokens and agents, while apps like Aerodrome and Farcaster anchor liquidity and social.",
    githubTopic: "base",
    // Real, official Base-ecosystem repos — builders are discovered from their
    // live contributor graphs (Base core, OnchainKit/DevRel, Smart Wallet,
    // Farcaster social, the OP stack, and a leading DEX). Repos that don't
    // resolve simply contribute nothing.
    seedRepos: [
      "base-org/web",
      "base-org/node",
      "coinbase/onchainkit",
      "coinbase/smart-wallet",
      "coinbase/build-onchain-apps",
      "coinbase/agentkit",
      "farcasterxyz/protocol",
      "farcasterxyz/snapchain",
      "ourzora/zora-protocol",
      "wevm/wagmi",
      "wevm/viem",
      "ethereum-optimism/optimism",
      "velodrome-finance/contracts",
    ],
    keywords: ["base", "coinbase", "onchain", "farcaster", "clanker", "bankr"],
    narrativeIds: [
      "ai-agents",
      "consumer-crypto",
      "socialfi",
      "stablecoins",
      "agent-commerce",
      "onchain-apps",
    ],
    launchpadIds: ["bankr", "clanker", "flaunch", "virtuals", "base"],
    featuredBuilders: ["jessepollak"],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "S",
    blurb: "High-throughput consumer apps, memecoins, and launchpad culture.",
    overview:
      "Solana is the home of high-throughput consumer crypto — memecoins, launchpads, and AI agents. Pump.fun, Believe, and Bonk.fun define the launchpad layer, driving a constant stream of new tokens and communities.",
    githubTopic: "solana",
    seedRepos: ["solana-labs/solana", "coral-xyz/anchor"],
    keywords: ["solana", "spl", "pump.fun", "bonk"],
    narrativeIds: ["memecoins", "ai-agents", "launchpads", "consumer-crypto"],
    launchpadIds: ["pumpfun", "believe", "bonk"],
    featuredBuilders: [],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "Ξ",
    blurb: "Core protocol, L2s, and the largest builder base.",
    overview:
      "Ethereum remains the deepest ecosystem by builders and tracked projects, with activity distributing across L2s, restaking, and core protocol work.",
    githubTopic: "ethereum",
    seedRepos: ["ethereum/go-ethereum", "foundry-rs/foundry"],
    keywords: ["ethereum", "l2", "evm", "rollup", "restaking"],
    narrativeIds: ["restaking", "l2-scaling", "stablecoins", "prediction-markets"],
    launchpadIds: [],
    featuredBuilders: [],
  },
  {
    id: "ai",
    name: "AI",
    symbol: "AI",
    blurb: "Agents, models, and AI-native infrastructure.",
    overview:
      "AI is the highest-attention theme across crypto and software — autonomous agents, agent commerce, and AI-native infrastructure are attracting serious builders.",
    githubTopic: "ai-agents",
    seedRepos: ["langchain-ai/langchain", "run-llama/llama_index"],
    keywords: ["ai agents", "llm", "artificial intelligence", "openai", "agent"],
    narrativeIds: ["ai-agents", "agent-commerce", "ai-infrastructure", "autonomous-finance"],
    launchpadIds: ["virtuals"],
    featuredBuilders: [],
  },
  eco("arbitrum", "Arbitrum", "A", "Leading Ethereum L2 for DeFi and apps.", "arbitrum", ["OffchainLabs/nitro"], ["arbitrum", "arb", "offchain labs"], ["defi", "l2-scaling", "developer-tools"]),
  eco("optimism", "Optimism", "OP", "OP Stack L2 and the superchain.", "optimism", ["ethereum-optimism/optimism"], ["optimism", "op stack", "superchain"], ["l2-scaling", "developer-tools", "onchain-apps"]),
  eco("polygon", "Polygon", "P", "Scaling Ethereum with zk and PoS chains.", "polygon", ["0xPolygon/polygon-edge", "maticnetwork/bor"], ["polygon", "matic", "zkevm"], ["l2-scaling", "payments", "rwas"]),
  eco("bitcoin", "Bitcoin", "₿", "The original chain — and its growing app layer.", "bitcoin", ["bitcoin/bitcoin"], ["bitcoin", "btc", "ordinals", "lightning", "runes"], ["rwas", "payments"]),
  eco("bnb", "BNB Chain", "BNB", "High-throughput chain with deep retail activity.", "bnb-chain", ["bnb-chain/bsc"], ["bnb", "binance", "bsc", "bnb chain"], ["defi", "memecoins"]),
  eco("avalanche", "Avalanche", "AVAX", "Subnets and high-performance app chains.", "avalanche", ["ava-labs/avalanchego"], ["avalanche", "avax", "subnet"], ["defi", "gaming", "rwas"]),
  eco("sui", "Sui", "SUI", "Object-centric L1 with a Move VM.", "sui", ["MystenLabs/sui"], ["sui", "mysten", "move"], ["consumer-crypto", "gaming"]),
  eco("aptos", "Aptos", "APT", "Move-based L1 focused on safety and scale.", "aptos", ["aptos-labs/aptos-core"], ["aptos", "move", "aptos labs"], ["consumer-crypto", "payments"]),
  eco("ton", "TON", "TON", "The Open Network — crypto inside Telegram.", "ton", ["ton-blockchain/ton"], ["ton", "the open network", "telegram"], ["consumer-crypto", "memecoins", "payments"]),
  eco("near", "NEAR", "N", "Sharded L1 with an AI and abstraction focus.", "near", ["near/nearcore"], ["near protocol", "nearcore"], ["ai-agents", "developer-tools"]),
  eco("cosmos", "Cosmos", "⚛", "App-chains and the inter-blockchain economy.", "cosmos", ["cosmos/cosmos-sdk"], ["cosmos", "ibc", "tendermint", "app chain"], ["defi", "developer-tools"]),
  eco("celestia", "Celestia", "TIA", "Modular data availability for rollups.", "celestia", ["celestiaorg/celestia-node"], ["celestia", "modular", "data availability"], ["l2-scaling", "developer-tools"]),
  eco("starknet", "Starknet", "STRK", "ZK L2 powered by Cairo.", "starknet", ["starkware-libs/cairo"], ["starknet", "cairo", "starkware"], ["l2-scaling", "developer-tools"]),
  eco("zksync", "zkSync", "ZK", "ZK rollup and the Elastic chain stack.", "zksync", ["matter-labs/zksync-era"], ["zksync", "matter labs", "zk rollup"], ["l2-scaling", "payments"]),
  eco("berachain", "Berachain", "BERA", "Proof-of-liquidity L1 with deep DeFi.", "berachain", [], ["berachain", "bera", "proof of liquidity"], ["defi", "memecoins"]),
  eco("hyperliquid", "Hyperliquid", "HL", "High-performance onchain perps and its L1.", "hyperliquid", [], ["hyperliquid", "hype", "perp dex"], ["defi", "autonomous-finance"]),
  eco("monad", "Monad", "M", "High-throughput parallel EVM L1.", "monad", [], ["monad", "parallel evm"], ["defi", "developer-tools"]),
];

/** Compact ecosystem factory to keep the (large) list readable. */
function eco(
  id: string,
  name: string,
  symbol: string,
  blurb: string,
  githubTopic: string,
  seedRepos: string[],
  keywords: string[],
  narrativeIds: string[],
): EcosystemConfig {
  return {
    id,
    name,
    symbol,
    blurb,
    overview: `${name} — ${blurb} Loreon tracks its projects, builders, narratives, and news in real time.`,
    githubTopic,
    seedRepos,
    keywords: [name.toLowerCase(), ...keywords],
    narrativeIds,
    launchpadIds: [],
    featuredBuilders: [],
  };
}

export const ecosystemById = (id: string): EcosystemConfig | undefined =>
  ECOSYSTEMS.find((e) => e.id === id);

/* ----------------------------- narratives ----------------------------- */

export interface NarrativeTheme {
  id: string;
  name: string;
  category: string;
  summary: string;
  query: string;
  keywords: string[];
  ecosystems: string[];
}

export const NARRATIVE_THEMES: NarrativeTheme[] = [
  {
    id: "ai-agents",
    name: "AI Agents",
    category: "AI",
    summary:
      "Autonomous agents are moving from demos into production — trading, posting, and transacting onchain.",
    query: "autonomous AI agents crypto onchain adoption",
    keywords: ["ai agent", "agents", "autonomous", "llm", "virtuals"],
    ecosystems: ["ai", "base", "solana"],
  },
  {
    id: "consumer-crypto",
    name: "Consumer Crypto",
    category: "Consumer",
    summary:
      "Mainstream-friendly onchain apps with real retention — wallets, mini-apps, and social experiences.",
    query: "consumer crypto onchain apps adoption mainstream",
    keywords: ["consumer crypto", "onchain app", "mini app", "mini-app", "consumer"],
    ecosystems: ["base", "solana"],
  },
  {
    id: "socialfi",
    name: "SocialFi",
    category: "Social",
    summary:
      "Onchain social networks and creator economies — Farcaster and the apps building on it.",
    query: "socialfi farcaster onchain social networks",
    keywords: ["socialfi", "farcaster", "social network", "creator economy"],
    ecosystems: ["base"],
  },
  {
    id: "agent-commerce",
    name: "Agent Commerce",
    category: "AI",
    summary:
      "Payments and commerce primitives built for autonomous agents to transact with each other.",
    query: "AI agent commerce payments onchain x402",
    keywords: ["agent commerce", "agent payment", "x402", "agentic payment"],
    ecosystems: ["base", "ai"],
  },
  {
    id: "onchain-apps",
    name: "Onchain Apps",
    category: "Infrastructure",
    summary:
      "The shift from speculation to durable onchain applications with real usage.",
    query: "onchain applications usage growth base",
    keywords: ["onchain app", "onchain apps", "dapp", "mini app"],
    ecosystems: ["base"],
  },
  {
    id: "stablecoins",
    name: "Stablecoins",
    category: "Payments",
    summary:
      "Stablecoins becoming real payment rails — remittances, merchants, and treasuries.",
    query: "stablecoin payments settlement adoption",
    keywords: ["stablecoin", "usdc", "usdt", "payments", "settlement"],
    ecosystems: ["ethereum", "solana", "base"],
  },
  {
    id: "memecoins",
    name: "Memecoins",
    category: "Markets",
    summary:
      "The relentless memecoin cycle — launchpads, communities, and attention markets, led by Solana.",
    query: "solana memecoins pump.fun launchpad",
    keywords: ["memecoin", "meme coin", "pump.fun", "bonk", "meme"],
    ecosystems: ["solana", "base"],
  },
  {
    id: "launchpads",
    name: "Launchpads",
    category: "Infrastructure",
    summary:
      "Token and agent launchpads lowering the barrier to ship — Pump.fun, Clanker, Believe, and more.",
    query: "crypto token launchpad pump.fun clanker believe",
    keywords: ["launchpad", "pump.fun", "clanker", "believe", "token launch", "flaunch"],
    ecosystems: ["solana", "base"],
  },
  {
    id: "prediction-markets",
    name: "Prediction Markets",
    category: "Markets",
    summary:
      "Onchain prediction markets being treated as an information primitive, not just betting.",
    query: "onchain prediction markets polymarket growth",
    keywords: ["prediction market", "polymarket", "betting odds"],
    ecosystems: ["ethereum", "base"],
  },
  {
    id: "restaking",
    name: "Restaking",
    category: "DeFi",
    summary:
      "Restaking and shared-security marketplaces extending Ethereum's trust layer.",
    query: "restaking eigenlayer shared security",
    keywords: ["restaking", "eigenlayer", "avs", "shared security"],
    ecosystems: ["ethereum"],
  },
  {
    id: "l2-scaling",
    name: "L2 Scaling",
    category: "Infrastructure",
    summary:
      "Rollups and L2s scaling Ethereum — throughput, fees, and the move onchain.",
    query: "ethereum layer 2 rollups scaling",
    keywords: ["layer 2", "rollup", "optimism", "arbitrum", "l2", "zk rollup"],
    ecosystems: ["ethereum", "base"],
  },
  {
    id: "base-ecosystem",
    name: "Base Ecosystem",
    category: "Ecosystem",
    summary:
      "Everything happening on Base — apps, agents, launchpads, and the builders behind them.",
    query: "Base coinbase onchain ecosystem apps",
    keywords: ["base", "coinbase", "onchain", "farcaster", "clanker", "bankr", "aerodrome"],
    ecosystems: ["base"],
  },
  {
    id: "defi",
    name: "DeFi",
    category: "DeFi",
    summary:
      "Lending, DEXs, perps, and yield — the financial primitives of onchain markets.",
    query: "defi lending dex perpetuals yield",
    keywords: ["defi", "lending", "dex", "perpetual", "perps", "yield", "aave", "uniswap", "liquidity"],
    ecosystems: ["ethereum", "base", "solana"],
  },
  {
    id: "payments",
    name: "Payments",
    category: "Payments",
    summary:
      "Crypto rails for real-world payments — merchants, remittances, and settlement.",
    query: "crypto stablecoin payments merchants settlement",
    keywords: ["payment", "remittance", "settlement", "merchant", "checkout", "visa", "mastercard", "paypal"],
    ecosystems: ["base", "ethereum", "solana"],
  },
  {
    id: "ai-infrastructure",
    name: "AI Infrastructure",
    category: "AI",
    summary:
      "The compute, models, and tooling powering the AI wave — and where crypto plugs in.",
    query: "AI infrastructure GPU inference models",
    keywords: ["ai infrastructure", "gpu", "inference", "training", "model", "openai", "anthropic", "nvidia", "llm", "datacenter"],
    ecosystems: ["ai"],
  },
  {
    id: "depin",
    name: "DePIN",
    category: "Infrastructure",
    summary:
      "Decentralized physical infrastructure — networks of real-world hardware, coordinated onchain.",
    query: "decentralized physical infrastructure DePIN",
    keywords: ["depin", "physical infrastructure", "helium", "hivemapper", "render", "wireless"],
    ecosystems: ["solana", "ethereum"],
  },
  {
    id: "gaming",
    name: "Onchain Gaming",
    category: "Consumer",
    summary:
      "Games with real onchain economies — assets, items, and player-owned worlds.",
    query: "onchain web3 gaming gamefi",
    keywords: ["gaming", "web3 game", "gamefi", "immutable", "ronin", "game studio", "onchain game"],
    ecosystems: ["ethereum", "base", "solana"],
  },
  {
    id: "onchain-identity",
    name: "Onchain Identity",
    category: "Infrastructure",
    summary:
      "Names, attestations, and verifiable credentials — identity primitives for onchain life.",
    query: "onchain identity ENS attestations credentials",
    keywords: ["identity", "ens", "attestation", "verifiable credential", "did", "passport", "worldcoin", "reputation"],
    ecosystems: ["ethereum", "base"],
  },
  {
    id: "rwas",
    name: "Real World Assets",
    category: "Markets",
    summary:
      "Tokenized treasuries, credit, and real-world value moving onchain.",
    query: "real world assets tokenization treasuries",
    keywords: ["rwa", "real world asset", "tokenized", "tokenization", "treasury", "ondo", "private credit"],
    ecosystems: ["ethereum", "solana"],
  },
  {
    id: "creator-economy",
    name: "Creator Economy",
    category: "Consumer",
    summary:
      "Mints, music, and media — creators monetizing directly onchain.",
    query: "onchain creator economy mints zora",
    keywords: ["creator", "zora", "mint", "nft", "music", "fan token", "media", "collect"],
    ecosystems: ["base", "ethereum"],
  },
  {
    id: "wallet-infrastructure",
    name: "Wallet Infrastructure",
    category: "Infrastructure",
    summary:
      "Smart wallets, passkeys, and account abstraction making crypto usable.",
    query: "smart wallet account abstraction passkeys",
    keywords: ["wallet", "smart wallet", "account abstraction", "passkey", "embedded wallet", "privy", "metamask", "erc-4337"],
    ecosystems: ["ethereum", "base"],
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    category: "Infrastructure",
    summary:
      "SDKs, frameworks, and infra that make building onchain faster.",
    query: "crypto developer tools SDK framework",
    keywords: ["developer tools", "sdk", "foundry", "hardhat", "viem", "wagmi", "rpc", "indexer", "framework"],
    ecosystems: ["ethereum", "base"],
  },
  {
    id: "autonomous-finance",
    name: "Autonomous Finance",
    category: "AI",
    summary:
      "AI agents that trade, manage, and move capital onchain — DeFAI.",
    query: "AI agents autonomous finance defai trading",
    keywords: ["autonomous finance", "defai", "ai trading", "agent finance", "trading agent"],
    ecosystems: ["ai", "base", "solana"],
  },
];

export const themeById = (id: string): NarrativeTheme | undefined =>
  NARRATIVE_THEMES.find((t) => t.id === id);

/* ----------------------------- launchpads ----------------------------- */

export interface LaunchpadConfig {
  id: string;
  name: string;
  description: string;
  chain: string;
  ecosystem: string;
  website: string;
  docs?: string;
  /** Related narrative theme ids. */
  narrativeIds: string[];
  /** Keywords for matching real news. */
  keywords: string[];
}

export const LAUNCHPADS: LaunchpadConfig[] = [
  {
    id: "bankr",
    name: "Bankr",
    description:
      "An onchain trading and wallet agent on Base and Farcaster — users transact in natural language directly from social.",
    chain: "Base",
    ecosystem: "base",
    website: "https://bankr.bot/",
    docs: "https://docs.bankr.bot/",
    narrativeIds: ["ai-agents", "agent-commerce", "socialfi"],
    keywords: ["bankr"],
  },
  {
    id: "clanker",
    name: "Clanker",
    description:
      "A token deployer and launchpad on Base, popularised through Farcaster — deploy a token from a single cast.",
    chain: "Base",
    ecosystem: "base",
    website: "https://www.clanker.world/",
    docs: "https://www.clanker.world/clankers",
    narrativeIds: ["launchpads", "memecoins", "socialfi"],
    keywords: ["clanker"],
  },
  {
    id: "flaunch",
    name: "Flaunch",
    description:
      "A memecoin launchpad on Base with programmable fees and buybacks for creators and communities.",
    chain: "Base",
    ecosystem: "base",
    website: "https://flaunch.gg/",
    narrativeIds: ["launchpads", "memecoins"],
    keywords: ["flaunch"],
  },
  {
    id: "virtuals",
    name: "Virtuals Protocol",
    description:
      "A launchpad and protocol for tokenised AI agents on Base — create, co-own, and monetise autonomous agents.",
    chain: "Base",
    ecosystem: "base",
    website: "https://www.virtuals.io/",
    narrativeIds: ["ai-agents", "agent-commerce", "launchpads"],
    keywords: ["virtuals", "virtual protocol"],
  },
  {
    id: "base",
    name: "Base",
    description:
      "Coinbase's Ethereum L2 and the home for the apps, agents, and launchpads built on it.",
    chain: "Base",
    ecosystem: "base",
    website: "https://base.org/",
    narrativeIds: ["onchain-apps", "consumer-crypto", "ai-agents"],
    keywords: ["base", "coinbase"],
  },
  {
    id: "pumpfun",
    name: "Pump.fun",
    description:
      "The dominant Solana memecoin launchpad — anyone can launch a token with a bonding curve in seconds.",
    chain: "Solana",
    ecosystem: "solana",
    website: "https://pump.fun/",
    narrativeIds: ["memecoins", "launchpads", "consumer-crypto"],
    keywords: ["pump.fun", "pumpfun", "pump fun"],
  },
  {
    id: "believe",
    name: "Believe",
    description:
      "A Solana launchpad turning ideas and posts into tokens, with a focus on founders and communities.",
    chain: "Solana",
    ecosystem: "solana",
    website: "https://believe.app/",
    narrativeIds: ["launchpads", "consumer-crypto"],
    keywords: ["believe app", "believe launchpad"],
  },
  {
    id: "bonk",
    name: "Bonk.fun",
    description:
      "A Solana memecoin launchpad from the BONK community, an alternative venue for new token launches.",
    chain: "Solana",
    ecosystem: "solana",
    website: "https://bonk.fun/",
    narrativeIds: ["memecoins", "launchpads"],
    keywords: ["bonk.fun", "bonk fun", "letsbonk"],
  },
];

/* ------------------------- curated builders ------------------------- */

export interface CuratedBuilder {
  /** Detail route slug (the GitHub login when available). */
  slug: string;
  name: string;
  role: string;
  ecosystems: string[];
  /** Verifiable GitHub login (enables live hydration + avatar). */
  github?: string;
  /** Verifiable X handle (no @). Avatar resolved via unavatar when no GitHub. */
  x?: string;
  website?: string;
}

/**
 * Notable ecosystem personalities with verifiable handles. Discovered builders
 * (from repo contributor graphs) make up the bulk of the dataset; these are
 * pinned so key founders surface regardless of recent commit volume.
 */
export const CURATED_BUILDERS: CuratedBuilder[] = [
  { slug: "jessepollak", name: "Jesse Pollak", role: "Creator of Base", ecosystems: ["base"], github: "jessepollak", x: "jessepollak" },
  { slug: "mvines", name: "Michael Vines", role: "Solana core contributor", ecosystems: ["solana"], github: "mvines" },
  { slug: "0xdeployer", name: "0xDeployer", role: "Base builder", ecosystems: ["base"], x: "0xDeployer" },
];

export const curatedBySlug = (slug: string): CuratedBuilder | undefined =>
  CURATED_BUILDERS.find((b) => b.slug === slug || b.github === slug);

export const launchpadById = (id: string): LaunchpadConfig | undefined =>
  LAUNCHPADS.find((l) => l.id === id);

export const launchpadsForEcosystem = (ecosystem: string): LaunchpadConfig[] =>
  LAUNCHPADS.filter((l) => l.ecosystem === ecosystem);
