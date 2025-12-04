import AboutContent from "@/components/pages/AboutContent";
import { client } from "@/lib/sanity/client";
import {
  teamMembersQuery,
  timelineQuery,
  aboutQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";

export const revalidate = 3600;

async function getData() {
  try {
    const [teamMembers, timeline, about, siteSettings] = await Promise.all([
      client.fetch(teamMembersQuery),
      client.fetch(timelineQuery),
      client.fetch(aboutQuery),
      client.fetch(siteSettingsQuery),
    ]);
    return { teamMembers, timeline, about, siteSettings };
  } catch (error) {
    console.error("Error Fetching About Data:", error);
    return { teamMembers: null, timeline: null, about: null, siteSettings: null };
  }
}

export default async function AboutPage() {
  const { teamMembers, timeline, about, siteSettings } = await getData();

  return (
    <AboutContent
      initialTeamMembers={teamMembers}
      initialTimeline={timeline}
      initialAbout={about}
      siteSettings={siteSettings}
    />
  );
}
