import PrivacyPolicyContent from "@/components/pages/PrivacyPolicyContent";
import { client } from "@/lib/sanity/client";
import { privacyPolicyQuery, siteSettingsQuery } from "@/lib/sanity/queries";

export const revalidate = 3600;

async function getData() {
  try {
    const [privacyPolicy, siteSettings] = await Promise.all([
      client.fetch(privacyPolicyQuery),
      client.fetch(siteSettingsQuery),
    ]);
    return { privacyPolicy, siteSettings };
  } catch (error) {
    console.error("Error Fetching Privacy Policy Data:", error);
    return { privacyPolicy: null, siteSettings: null };
  }
}

export const metadata = {
  title: "Privacy Policy | Divyansh International",
  description:
    "Privacy Policy for Divyansh International. Learn how we collect, use, and protect your information.",
};

export default async function PrivacyPolicyPage() {
  const { privacyPolicy, siteSettings } = await getData();

  return <PrivacyPolicyContent privacyPolicy={privacyPolicy} siteSettings={siteSettings} />;
}
