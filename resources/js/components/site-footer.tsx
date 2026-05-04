import { Link } from '@inertiajs/react';

export default function SiteFooter() {
    return (
        <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-6 lg:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div
                                className="w-7 h-7 rounded-md flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)' }}
                            >
                                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2L3 7v10h5v-6h4v6h5V7L10 2z" fill="white" />
                                </svg>
                            </div>
                            <span className="font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                EliteCoach
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-500">
                            The premium platform for coaches who demand precision.
                        </p>
                    </div>
                    {[
                        { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
                        { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
                        { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Help Center'] },
                    ].map((col) => (
                        <div key={col.title}>
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">{col.title}</h4>
                            <ul className="space-y-2.5">
                                {col.links.map((l) => (
                                    <li key={l}>
                                        <a href="#" className="text-sm hover:text-white transition-colors">{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-600">© 2024 EliteCoach Premium. All rights reserved.</p>
                    <p className="text-xs text-gray-600">Trusted by 5,000+ coaches across 6 continents</p>
                </div>
            </div>
        </footer>
    );
}
