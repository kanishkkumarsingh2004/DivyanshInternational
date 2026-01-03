import { client } from "@/lib/sanity/client";
import { contactPageQuery, siteSettingsQuery, productListQuery } from "@/lib/sanity/queries";
import ContactContent from "@/components/pages/ContactContent";
import { SectionVisualElements } from "@/components/VisualElements";

export const revalidate = 3600;

async function getData() {
  try {
    const [contactPage, siteSettings, productList] = await Promise.all([
      client.fetch(contactPageQuery),
      client.fetch(siteSettingsQuery),
      client.fetch(productListQuery),
    ]);
    return { contactPage, siteSettings, productList };
  } catch (error) {
    console.error("Error Fetching Contact Page Data:", error);
    return { contactPage: null, siteSettings: null, productList: [] };
  }
}

export default async function ContactPage() {
  const { contactPage, siteSettings, productList } = await getData();

  return (
    <div className="relative overflow-hidden">
      {/* Background Visual Elements */}
      <SectionVisualElements />
      
      {/* Content */}
      <div className="relative z-10">
        <ContactContent
          initialContact={contactPage}
          siteSettings={siteSettings}
          productList={productList}
        />
      </div>
    </div>
  );
}
