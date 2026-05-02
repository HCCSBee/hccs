"use client";

import { useLang } from "@/lib/i18n";

const videoData = [{ "idx": 0, "id": 1, "created_at": "2026-04-24 20:18:29.885091+00", "image": "/images/news/news_6.jpeg", "link": "https://www.tiktok.com/@askbeebeesghr/video/7575441231510129927", "title": "Growth Strategies", "short_description": "Scale your business with confidence" }, { "idx": 1, "id": 2, "created_at": "2026-04-24 20:19:06.201491+00", "image": "/images/news/news_5.jfif", "link": "https://www.tiktok.com/@askbeebeesghr/video/7582825411839593748", "title": "Compliance Updates", "short_description": "Latest Singapore employment regulations" }, { "idx": 2, "id": 3, "created_at": "2026-04-24 20:19:44.929735+00", "image": "/images/news/news_3.jpeg", "link": "https://www.tiktok.com/@askbeebeesghr/video/7581376848811035912", "title": "Workforce Management", "short_description": "Best practices in managing your team." }, { "idx": 3, "id": 4, "created_at": "2026-04-24 20:20:26.411064+00", "image": "/images/news/news_4.jfif", "link": "https://www.tiktok.com/@askbeebeesghr/video/7572807734526020882", "title": "Business Strategy Tips", "short_description": "Strategic advice for growing your business" }, { "idx": 4, "id": 5, "created_at": "2026-04-24 20:21:03.329185+00", "image": "/images/news/news_2.jfif", "link": "https://www.tiktok.com/@askbeebeesghr/video/7573168450344865042", "title": "HR Compliance Guide", "short_description": "Everything you need to know about Singapore HR" }, { "idx": 5, "id": 6, "created_at": "2026-04-24 20:21:36.800129+00", "image": "/images/news/news_1.jpeg", "link": "https://www.tiktok.com/@askbeebeesghr/video/7574314970700320007", "title": "Expert Insights", "short_description": "Curated content for Singapore business leaders." }]

export default function MediaClient() {
  const { t } = useLang();
  const media = t.media;

  const socialLinks = [
    {
      href: "https://www.tiktok.com/@askbeebeesghr",
      label: media.followTikTok,
      className: "bg-white text-slate-900 hover:bg-amber-400 hover:text-slate-900",
    },
    {
      href: "https://www.facebook.com/hccs.sg/",
      label: media.facebook,
      className: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      href: "https://sg.linkedin.com/in/bee-bee-ker",
      label: media.linkedin,
      className: "bg-sky-700 text-white hover:bg-sky-800",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="pt-20 pb-10 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
            {media.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {media.title}
          </h1>
          <p className="text-white/60 text-base max-w-xl mx-auto mb-8">{media.desc}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-full text-sm transition-all ${item.className}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {videoData.map((video) => (
            <a
              key={video.link}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-amber-300/50 transition-all"
              style={{ aspectRatio: "9 / 16" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={process.env.NEXT_PUBLIC_STORAGE_URL + video.image} alt="TikTok video" className="w-full h-full object-contain bg-slate-900" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all" />
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{media.ctaTitle}</h2>
        <p className="text-white/60 text-sm mb-6">{media.ctaDesc}</p>
        <a
          href="https://www.tiktok.com/@askbeebeesghr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-amber-400 transition-all"
        >
          {media.followTikTok}
        </a>
      </section>
    </div>
  );
}
