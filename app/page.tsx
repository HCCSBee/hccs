import { supabase } from "@/lib/supabase/client";
import HomePageClient from "@/components/HomePageClient";

export default async function HomePage() {
const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL ?? "";
const { data: mediaItems } = await supabase
.from("media")
.select("id, title, short_description, image, link")
.order("id");
const insights = (mediaItems ?? []).filter((m) => m.image && m.link);

return <HomePageClient mediaItems={insights} storageUrl={storageUrl} />;
}
 