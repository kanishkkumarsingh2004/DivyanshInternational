import CommunityContent from "@/components/pages/CommunityContent";
import { SectionVisualElements } from "@/components/VisualElements";
import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";

export const revalidate = 3600;

const communityQuery = groq`
  *[_type == "community"][0] {
    _id,
    teamPhotos,
    csrInitiatives,
    tradeEvents
  }
`;

async function getData() {
  try {
    const community = await client.fetch(communityQuery);
    return { community };
  } catch (error) {
    console.error("Error Fetching Community Data:", error);
    return { community: null };
  }
}

export const metadata = {
  title: "Community & CSR | Divyansh International",
  description:
    "Learn about our community initiatives, CSR programs, and trade events. Divyansh International is committed to sustainable practices and community development.",
};

export default async function CommunityPage() {
  const { community } = await getData();

  return (
    <div className="relative overflow-hidden">
      {/* Background Visual Elements */}
      <SectionVisualElements />

      {/* Content */}
      <div className="relative z-10">
        <CommunityContent initialCommunity={community} />
      </div>
    </div>
  );
}
