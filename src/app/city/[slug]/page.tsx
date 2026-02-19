import CityPageInfo from "@/components/CityPageInfo/CityPageInfo";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;

  return <CityPageInfo slug={slug} />;
}
