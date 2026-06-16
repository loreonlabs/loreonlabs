import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, SectionHeader, StatCard, BackLink } from "@/components/ui";
import { ExternalLinks } from "@/components/ui/ExternalLinks";
import { getToken } from "@/lib/intel/markets";
import { formatUsd, formatCompact, formatPct } from "@/lib/format";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await getToken(id);
  return { title: data ? `${data.name} market` : "Market" };
}

export default async function TokenDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { status, data } = await getToken(id);
  if (status === "ok" && !data) notFound();
  if (status === "empty") notFound();

  if (!data) {
    return (
      <>
        <div className="mb-4">
          <BackLink href="/markets" label="Markets" />
        </div>
        <PageHeader eyebrow="Market" title="Token unavailable" description="CoinGecko did not return data for this asset." />
      </>
    );
  }

  return (
    <>
      <div className="mb-4">
        <BackLink href="/markets" label="Markets" />
      </div>

      <PageHeader
        eyebrow={`Market · ${data.symbol}`}
        title={data.name}
        description={data.description || `Live market data for ${data.name}.`}
      >
        <ExternalLinks
          links={[
            { kind: "coingecko", label: "CoinGecko", href: `https://www.coingecko.com/en/coins/${data.id}` },
            { kind: "website", label: "Website", href: data.homepage ?? "" },
          ]}
        />
      </PageHeader>

      <section className="page-section">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard label="Price" value={formatUsd(data.price)} />
          <StatCard
            label="24h change"
            value={formatPct(data.change24h)}
            trend={data.change24h >= 0 ? "up" : "down"}
          />
          <StatCard label="Market cap" value={formatCompact(data.marketCap)} />
        </div>
      </section>

      <section className="page-section">
        <SectionHeader title="About" />
        <p className="t-body max-w-2xl text-[15px]">
          {data.description || "No description available from CoinGecko."}
        </p>
      </section>
    </>
  );
}
