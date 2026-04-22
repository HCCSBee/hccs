import Link from "next/link";
import AIHROverlayTrigger from "@/components/AIHROverlayTrigger";

const stats = [
	{ value: "1000+", label: "Clients Trust Us" },
	{ value: "350+", label: "Projects Managed" },
	{ value: "25+", label: "Years Experience" },
	{ value: "250+", label: "Associated Partners" },
	{ value: "100%", label: "Success Rate" },
];

const services = [
	{
		title: "New EP/PR Application and Renewals",
		description:
			"Strategic guidance for professionals earning S$5,600+ with eligibility checks and end-to-end support.",
	},
	{
		title: "HR Compliance and Advisory",
		description:
			"Meet MOM requirements, reduce regulatory risk, and improve approval outcomes with practical HR governance.",
	},
	{
		title: "AI HR",
		description:
			"Tech-enabled, cost-effective HR support for SMEs looking to scale with better process consistency.",
	},
	{
		title: "Fractional HR Business Partner",
		description:
			"Access senior HR leadership part-time or by project to drive strategic hiring and organizational change.",
	},
	{
		title: "Workforce Planning and Organisation Design",
		description:
			"Align team capability, automation, and AI readiness with your business growth roadmap.",
	},
	{
		title: "Learning and Development",
		description:
			"Strategic upskilling and AI-focused training initiatives to future-proof your workforce.",
	},
	{
		title: "Performance and Culture",
		description:
			"Build high-performing teams with better OKRs, KPIs, leadership rhythms, and accountability.",
	},
];

const advantagePoints = [
	"MOM-registered HR consultancy with practical, on-the-ground Singapore market experience.",
	"End-to-end support from business setup and immigration to compliance and daily HR operations.",
	"AI-powered HR services and membership options for faster response and stronger execution.",
	"Bilingual support and advisory that balances business speed with legal and regulatory discipline.",
];

const insightLinks = [
	{
		url: "https://www.tiktok.com/@askbeebeesghr/video/7574314970700320007",
		image:
			"https://p16-common-sign.tiktokcdn.com/tos-alisg-i-photomode-sg/19352c1672d84a0c85fe923388bb6ebb~tplv-photomode-image.jpeg?dr=14555&x-expires=1776985200&x-signature=lKQnBc7dCX7Jn56spPw%2BOxTBniw%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=9b759fb9&idc=my3&ftpl=1",
		title: "Expert Insights",
	},
	{
		url: "https://www.tiktok.com/@askbeebeesghr/video/7573168450344865042",
		image:
			"https://p16-common-sign.tiktokcdn.com/tos-alisg-p-0037/oYPDEo2Ggx8RAQnYpJQAnfFLEoByUUfmBEI6Du~tplv-tiktokx-origin.image?dr=14575&x-expires=1776985200&x-signature=5biqudH6v7EKmu736EzEvihllFM%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my3",
		title: "HR Compliance Guide",
	},
	{
		url: "https://www.tiktok.com/@askbeebeesghr/video/7572807734526020882",
		image:
			"https://p16-common-sign.tiktokcdn.com/tos-alisg-i-photomode-sg/577d53a5ec9142e38d397d209dd55e5e~tplv-photomode-image.jpeg?dr=14555&x-expires=1776985200&x-signature=HWPGsz0xIQ%2BED89i0b4OJtVxnKY%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=9b759fb9&idc=my3&ftpl=1",
		title: "Business Strategy Tips",
	},
	{
		url: "https://www.tiktok.com/@askbeebeesghr/video/7581376848811035912",
		image:
			"https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oUEJxAREIBAfDQBsApAgWWENUCFY77NDnMOZei~tplv-tiktokx-dmt-logom:tos-alisg-i-0068/o82Epi2PiZiYhATIdAA09l9ABvaBA09UKEdGA.image?dr=14573&x-expires=1776985200&x-signature=FmJQU%2FV0AhMPK%2F9pF8PJQvvE5r4%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my3",
		title: "Workforce Management",
	},
	{
		url: "https://www.tiktok.com/@askbeebeesghr/video/7582825411839593748",
		image:
			"https://p16-common-sign.tiktokcdn.com/tos-alisg-p-0037/oUUD2sPEEkdAI5FgpaeA7m5fqskRBGEO7EBHvp~tplv-tiktokx-origin.image?dr=14575&x-expires=1776985200&x-signature=jSAgGkMCECsRQK6OxaVVZ3knBAY%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my3",
		title: "Compliance Updates",
	},
	{
		url: "https://www.tiktok.com/@askbeebeesghr/video/7575441231510129927",
		image:
			"https://p16-common-sign.tiktokcdn.com/tos-alisg-i-photomode-sg/7558ff7ea1b9450dacec61f0f7a1ec7c~tplv-photomode-image.jpeg?dr=14555&x-expires=1776985200&x-signature=8Y7%2FeeUSwDk2AVqTJf24l1299IE%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=9b759fb9&idc=my3&ftpl=1",
		title: "Growth Strategies",
	},
];

const partnerLogos = [
	"https://media.base44.com/images/public/69c3928519db1fee4acc175a/83461faec_image.png",
	"https://media.base44.com/images/public/69c3928519db1fee4acc175a/fd0e5f007_image.png",
	"https://media.base44.com/images/public/69c3928519db1fee4acc175a/d094f8c4a_image.png",
	// "https://media.base44.com/images/public/69c3928519db1fee4acc175a/971708cdc_image.png",
	// "https://media.base44.com/images/public/69c3928519db1fee4acc175a/83461faec_image.png",
	// "https://media.base44.com/images/public/69c3928519db1fee4acc175a/fd0e5f007_image.png",
	// "https://media.base44.com/images/public/69c3928519db1fee4acc175a/d094f8c4a_image.png",
	// "https://media.base44.com/images/public/69c3928519db1fee4acc175a/971708cdc_image.png",
];

const testimonials = [
	{
		image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/725a43920_generated_image.png",
		name: "ComfortDelGro Group",
		role: "Strategic Workforce Advisory",
		quote:
			"HCCS provided strategic workforce advisory, HR digital transformation support, and industrial relations expertise to selected entities within the ComfortDelGro Group.",
	},
	{
		image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/5ae69c846_generated_image.png",
		name: "Amer Group",
		role: "Executive Search",
		quote:
			"HCCS provided end-to-end HR architecture support, executive search expertise, and cross-border workforce advisory to build a scalable HR foundation.",
	},
	{
		image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/a620c78f8_generated_image.png",
		name: "Mr Ong Beng Ann",
		role: "Chairman / CEO, Fullion Group",
		quote:
			"Under Florence's guidance, Fullion Holdings strengthened HR foundations and secured significant HR compliance and transformation grants.",
	},
	{
		image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/d18ca897e_generated_image.png",
		name: "RH Synergy",
		role: "Management and HR",
		quote:
			"During business transformation, HCCS delivered stringent HR compliance support and strategic workforce restructuring guidance.",
	},
	{
		image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/51f439541_generated_image.png",
		name: "Idemitsu",
		role: "HR and Operations",
		quote:
			"HCCS delivered qualified recruitment outcomes quickly while ensuring full MOM compliance throughout the hiring process.",
	},
	{
		image: "https://media.base44.com/images/public/69c3928519db1fee4acc175a/d18ca897e_generated_image.png",
		name: "Janice Foo",
		role: "Former Senior Consultant, WSG",
		quote:
			"Florence produced exceptional results in placement strategy and talent matching across multiple industries.",
	},
];

export default function HomePage() {
	return (
		<div className="bg-white">
			<section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white py-20 sm:py-24 px-4">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl" />
					<div className="absolute -bottom-20 -right-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
				</div>
				<div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
					<div className="text-center lg:text-left">
						<p className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1.5 text-amber-200 font-semibold uppercase tracking-widest text-xs mb-5">
							MOM-Registered · Licensed EA Agency · 25+ Years Experience
						</p>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
							Start-Staff-Scale Your SG Business
						</h1>
						<p className="text-base sm:text-lg text-emerald-100/90 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
							We provide end-to-end support to companies, from incorporation to industry-specific guidance on
							operating in Singapore, while managing HR functions and compliance with AI-driven solutions.
						</p>
						<div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
							<Link
								href="/consultation"
								className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-7 py-3 rounded-xl transition-colors"
							>
								Book Free Consultation
							</Link>
							<Link
								href="/compliance-scan"
								className="border border-white/35 bg-white/5 text-white hover:bg-white hover:text-emerald-900 font-semibold px-7 py-3 rounded-xl transition-colors"
							>
								Free Compliance Scan
							</Link>
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
							<div className="rounded-lg border border-white/15 bg-white/5 px-3 py-2">
								<p className="text-amber-300 text-lg font-bold">1000+</p>
								<p className="text-xs text-emerald-100/80">Clients Trust Us</p>
							</div>
							<div className="rounded-lg border border-white/15 bg-white/5 px-3 py-2">
								<p className="text-amber-300 text-lg font-bold">100%</p>
								<p className="text-xs text-emerald-100/80">Success Rate</p>
							</div>
							<div className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 col-span-2 sm:col-span-1">
								<p className="text-amber-300 text-lg font-bold">25+ Years</p>
								<p className="text-xs text-emerald-100/80">Market Experience</p>
							</div>
						</div>
					</div>
					<div className="relative">
						<div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-amber-400/25 to-emerald-400/10 blur-xl" />
						<img
							src="https://p16-common-sign.tiktokcdn.com/tos-alisg-i-photomode-sg/577d53a5ec9142e38d397d209dd55e5e~tplv-photomode-image.jpeg?dr=14555&x-expires=1776985200&x-signature=HWPGsz0xIQ%2BED89i0b4OJtVxnKY%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=9b759fb9&idc=my3&ftpl=1"
							alt="HCCS professional team in Singapore office"
							className="relative w-full rounded-3xl border border-white/15 shadow-2xl shadow-black/50"
						/>
						<div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 rounded-xl border border-emerald-200/25 bg-emerald-900/80 backdrop-blur px-4 py-3">
							<p className="text-xs uppercase tracking-widest text-amber-300">Trusted Team</p>
							<p className="text-sm font-semibold text-white">End-to-end HR and compliance delivery</p>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-emerald-950 text-white py-12 px-4">
				<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
					{stats.map((item) => (
						<div key={item.label} className="text-center">
							<p className="text-3xl font-bold text-amber-400">{item.value}</p>
							<p className="text-sm text-emerald-100 mt-1">{item.label}</p>
						</div>
					))}
				</div>
			</section>

			<section className="relative py-20 px-4 bg-gradient-to-b from-white via-emerald-50/40 to-white overflow-hidden">
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute top-10 left-1/3 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl" />
					<div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-emerald-300/30 blur-3xl" />
				</div>
				<div className="relative max-w-6xl mx-auto">
					<p className="text-center text-xs font-bold text-amber-700 uppercase tracking-[0.22em]">Our Services</p>
					<h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mt-3 mb-3">Strategic HR Solutions Built To Scale</h2>
					<p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
						HCCS offers practical, execution-ready HR and compliance services aligned with evolving workforce and AI trends.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{services.map((service, index) => (
							<div
								key={service.title}
								className="group relative rounded-2xl border border-emerald-100 bg-white/95 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
							>
								<div className="absolute top-0 left-0 h-1.5 w-full rounded-t-2xl bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-500" />
								<div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-amber-300 text-xs font-bold">
									{String(index + 1).padStart(2, "0")}
								</div>
								<h3 className="font-semibold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{service.title}</h3>
								<p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
								<div className="mt-5 text-xs font-semibold uppercase tracking-widest text-emerald-700/80">Learn more</div>
							</div>
						))}
					</div>
					<div className="text-center mt-12">
						<Link
							href="/employer"
							className="inline-flex items-center gap-2 bg-emerald-700 text-white px-8 py-3.5 rounded-xl hover:bg-emerald-800 transition-colors font-semibold shadow-lg shadow-emerald-900/20"
						>
							Explore Employer Services
							<span aria-hidden>→</span>
						</Link>
					</div>
				</div>
			</section>

			<section className="py-16 px-4 bg-emerald-950 text-white">
				<div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
					<div>
						<p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Strategic Value</p>
						<h2 className="text-3xl font-bold mb-4">The HCCS Advantage</h2>
						<p className="text-emerald-100 text-sm leading-relaxed">
							We convert HR compliance and advisory work into scalable, practical systems that lower operational
							risk and strengthen long-term business performance.
						</p>
					</div>
					<div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
						{advantagePoints.map((point) => (
							<div key={point} className="rounded-xl border border-emerald-700 bg-emerald-900/50 p-4">
								<p className="text-sm text-emerald-100 leading-relaxed">{point}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<div className="flex flex-wrap items-end justify-between gap-4 mb-8">
						<div>
							<h2 className="text-3xl font-bold text-gray-900">Insights in 60 Seconds</h2>
							<p className="text-gray-600 mt-2">
								Follow Florence and team for quick takes on HR compliance, AI adoption, and Singapore workforce trends.
							</p>
						</div>
						<a
							href="https://www.tiktok.com/@askbeebeesghr"
							target="_blank"
							rel="noopener noreferrer"
							className="border border-emerald-800 text-emerald-900 hover:bg-emerald-900 hover:text-white px-4 py-2 rounded-full font-semibold text-sm transition-colors"
						>
							Follow @askbeebeesghr
						</a>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{insightLinks.map((item, i) => (
							<a
								key={item.url}
								href={item.url}
								target="_blank"
								rel="noopener noreferrer"
								className="bg-white border border-gray-200 rounded-xl p-5 hover:border-emerald-500 hover:shadow-sm transition-all"
							>
								<img src={item.image} alt={item.title} className="w-full h-56 object-cover rounded-lg mb-4" />
								<p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">Video {i + 1}</p>
								<h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
								<p className="text-sm text-gray-600">Curated content for Singapore business leaders.</p>
							</a>
						))}
					</div>
				</div>
			</section>

			<section className="py-14 bg-white border-y border-gray-200 overflow-hidden">
				{/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
					<p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Trusted By Leading Associations</p>
				</div> */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{partnerLogos.map((logo, index) => (

						<img key={index} src={logo} alt={`Partner ${index + 1}`} className="h-24 w-full object-contain" style={{
							width: "100%",
							height: "auto"
						}} />

					))}
					{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{partnerLogos.map((logo, index) => (
							<div key={`${logo}-${index}`} className="rounded-xl border border-gray-200 bg-white p-4">
								<img src={logo} alt={`Partner ${index + 1}`} className="h-24 w-full object-contain" />
							</div>
						))}
					</div> */}
				</div>
			</section>

			<section className="py-20 px-4 bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="mb-10">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What Our Clients Say</h2>
						<div className="w-12 h-1 bg-amber-500 rounded-full mt-3" />
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{testimonials.map((item) => (
							<div key={`${item.name}-${item.role}`} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
								<p className="text-gray-700 text-sm leading-relaxed italic">"{item.quote}"</p>
								<div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-200">
									<img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover object-top" />
									<div>
										<p className="font-semibold text-gray-900 text-sm">{item.name}</p>
										<p className="text-xs text-gray-500 uppercase tracking-wide">{item.role}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-16 px-4 bg-emerald-950 text-white relative overflow-hidden">
				<div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
					<div>
						<p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-4">New: AIHR Membership Platform</p>
						<h2 className="text-3xl sm:text-4xl font-bold mb-4">AI-Powered HR Guidance, Built for Singapore SMEs</h2>
						<p className="text-emerald-100 mb-6">
							Access instant HR compliance guidance, EP/PR support, templates, and expert video insights through HCCS's
							AI-powered membership platform.
						</p>
						<div className="flex flex-wrap gap-3">
							<Link href="/membership" className="bg-amber-400 text-emerald-950 hover:bg-amber-300 px-6 py-3 rounded-lg font-semibold">
								View Plans
							</Link>
							<Link href="/member-portal" className="border border-white/40 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold">
								Try Free
							</Link>
						</div>
					</div>
					<div className="space-y-4">
						<img
							src="https://media.base44.com/images/public/69c3928519db1fee4acc175a/4e980830e_ChineseSimplified.png"
							alt="HCCS Logo"
							className="h-16 w-auto object-contain"
						/>
						<img
							src="https://media.base44.com/images/public/69c3928519db1fee4acc175a/6331e89ab_Untitleddesign1.png/v1/fill/w_1200,h_630/6331e89ab_Untitleddesign1.png"
							alt="HCCS Access Banner"
							className="w-full rounded-2xl border border-emerald-800"
						/>
					</div>
				</div>
			</section>

			<section className="py-20 px-4 bg-gradient-to-br from-amber-100 via-white to-emerald-50">
				<div className="max-w-4xl mx-auto text-center">
					<p className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
						Free 30-Minute Consultation
					</p>
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Ready to Build a Stronger, More Compliant Business?</h2>
					<p className="text-gray-600 max-w-2xl mx-auto mb-8">
						Book a free consultation with our MOM-registered HR and workforce advisory team. No obligation, just
						clear and practical guidance.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							href="/consultation"
							className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
						>
							Book Free Consultation
						</Link>
						<a
							href="https://wa.me/6594362866"
							target="_blank"
							rel="noopener noreferrer"
							className="border border-gray-300 text-gray-800 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
						>
							WhatsApp Us
						</a>
					</div>
					<p className="text-sm text-gray-600 mt-6">
						Or explore our <Link href="/membership" className="text-emerald-700 hover:text-emerald-800 underline">AIHR membership plans</Link> for ongoing HR support.
					</p>
				</div>
			</section>

			<div className="fixed bottom-20 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
				<AIHROverlayTrigger />
				<a
					href="https://wa.me/6594362866"
					target="_blank"
					rel="noopener noreferrer"
					className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
				>
					WhatsApp Us
				</a>
			</div>
		</div>
	);
}
