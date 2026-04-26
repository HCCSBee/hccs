"use client";

import { useLang } from "@/lib/i18n";

const videoData = [
  {
    href: "https://www.tiktok.com/@askbeebeesghr/video/7574314970700320007",
    image: "https://p16-common-sign.tiktokcdn.com/tos-alisg-i-photomode-sg/19352c1672d84a0c85fe923388bb6ebb~tplv-photomode-image.jpeg?dr=14555&x-expires=1777230000&x-signature=xdZudgJgyIG569NRR6GdG2hI2kU%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=9b759fb9&idc=my&ftpl=1",
  },
  {
    href: "https://www.tiktok.com/@askbeebeesghr/video/7573168450344865042",
    image: "https://p19-common-sign.tiktokcdn.com/tos-alisg-p-0037/oYPDEo2Ggx8RAQnYpJQAnfFLEoByUUfmBEI6Du~tplv-tiktokx-origin.image?dr=14575&x-expires=1777230000&x-signature=Lp%2B%2BIsQVT3jdqwgs2Oe2EbcI%2Bm8%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my",
  },
  {
    href: "https://www.tiktok.com/@askbeebeesghr/video/7572807734526020882",
    image: "https://p16-common-sign.tiktokcdn.com/tos-alisg-i-photomode-sg/577d53a5ec9142e38d397d209dd55e5e~tplv-photomode-image.jpeg?dr=14555&x-expires=1777230000&x-signature=cggS%2FtDMxA8dv1ZQPZPMhAcohqY%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=9b759fb9&idc=my&ftpl=1",
  },
  {
    href: "https://www.tiktok.com/@askbeebeesghr/video/7581376848811035912",
    image: "https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oUEJxAREIBAfDQBsApAgWWENUCFY77NDnMOZei~tplv-tiktokx-dmt-logom:tos-alisg-i-0068/o82Epi2PiZiYhATIdAA09l9ABvaBA09UKEdGA.image?dr=14573&x-expires=1777230000&x-signature=KC8x8G7bRZ7fv4qe853tGCGPqvA%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my",
  },
  {
    href: "https://www.tiktok.com/@askbeebeesghr/video/7582825411839593748",
    image: "https://p16-common-sign.tiktokcdn.com/tos-alisg-p-0037/oUUD2sPEEkdAI5FgpaeA7m5fqskRBGEO7EBHvp~tplv-tiktokx-origin.image?dr=14575&x-expires=1777230000&x-signature=VvPRNQ2SrN%2FgZfFc1tHlzueqVxo%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my",
  },
  {
    href: "https://www.tiktok.com/@askbeebeesghr/video/7575441231510129927",
    image: "https://p19-common-sign.tiktokcdn.com/tos-alisg-i-photomode-sg/7558ff7ea1b9450dacec61f0f7a1ec7c~tplv-photomode-image.jpeg?dr=14555&x-expires=1777230000&x-signature=lUnGGbkVCe5%2BFmTYVCrArvN7ydk%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=9b759fb9&idc=my&ftpl=1",
  },
];

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
              key={video.href}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-amber-300/50 transition-all"
              style={{ aspectRatio: "9 / 16" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={video.image} alt="TikTok video" className="w-full h-full object-contain bg-slate-900" />
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
