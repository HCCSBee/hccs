import Link from "next/link";

const services = [
	"EP / PR Applications",
	"HR Compliance",
	"Workforce Planning",
	"Recruitment",
	"Fractional HR",
	"AI HR Solutions",
];

export default function HomePage() {
	return (
		<div>
			<section className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white py-24 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<p className="text-amber-400 font-semibold uppercase tracking-widest text-sm mb-4">
						MOM-Registered · Licensed EA Agency · 25+ Years Experience
					</p>
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
						Start-Staff-Scale Your SG Business
					</h1>
					<p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto mb-8">
						End-to-end HR consulting, immigration, and AI-driven HR solutions for Singapore businesses.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link href="/consultation" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg">
							Book Free Consultation
						</Link>
						<Link href="/compliance-scan" className="border border-white text-white hover:bg-white hover:text-emerald-800 font-semibold px-8 py-3 rounded-lg transition-colors text-lg">
							Free Compliance Scan
						</Link>
					</div>
				</div>
			</section>

			<section className="py-16 px-4">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Core Services</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{services.map((service) => (
							<div key={service} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
								<h3 className="font-semibold text-gray-900">{service}</h3>
							</div>
						))}
					</div>
					<div className="text-center mt-10">
						<Link href="/employer" className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
							Explore Employer Services
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
