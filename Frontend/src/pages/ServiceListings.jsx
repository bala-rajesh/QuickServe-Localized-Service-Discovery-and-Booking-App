import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import TomTomMap from '../components/TomTomMap';

const ServiceListings = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // In a real scenario, we would fetch from the API
                // const data = await api.services.getAll();
                // setServices(data);

                // For demo purposes, we'll use the mock data if API fails or is empty
                // simulating API call
                setTimeout(() => {
                    setServices([
                        {
                            id: '1',
                            providerName: 'Sarah Jenkins',
                            title: 'Master Plumber',
                            rating: 4.9,
                            reviewCount: 124,
                            description: 'Fast, reliable, and affordable plumbing services for your home or business.',
                            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf0YhNwRh1vq5HgjUQLYSTz4uNu_nlSYwdY8mKQYv7s0ibBcu_JCx-x2qFen-z4I7xgXMJKa4Hoka1J_PeTOcsmW1rYvolVyfqs-1Ur9by-c7Kv_m0Z7c0jW2qgCVf0o7SRkq2SVisXP20vjaLImsMncTx26cn8jVcnTSJDJsdBnu0vR7MyNVGm8mQJBeTyXH3SI6xdMgq5nM1wN2eYc36X87PzKllr4dfh7xi1RopGgSmTWnUQkc0n2HIYioWF8XRHX6xIntGcoE'
                        },
                        {
                            id: '2',
                            providerName: "Mike's Plumbing Co.",
                            title: 'Commercial & Residential',
                            rating: 4.8,
                            reviewCount: 88,
                            description: '24/7 emergency services available. Licensed and insured for your peace of mind.',
                            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1A19MdHP5NG68It-tJzzq2ppp5TftyI0N2h-_3TmzkVL53fPAR4YOBpgJc_doO5_tbqF9nZNUAdlhxM9FL5C7-C-Pg8k5MD3Eq9Ud7Jk5QIv1cv5hrL4M0irrQI2Qaoxzj-6nVDVob6GV_oJ9Mt81bZnJiS6mS-EPK-Mb2BqWFa1NyoYfYWa2GeOVG67z8WFbZ5YkbCDZP63J4jvCp_ceymSVXFgloejASemGFnSR8CJ-62EW9zi8BhZ_r4f2rfptX-19ZPkViA4'
                        },
                        {
                            id: '3',
                            providerName: 'AquaFlow Experts',
                            title: 'Eco-Friendly Solutions',
                            rating: 4.7,
                            reviewCount: 45,
                            description: 'Specializing in water heaters and green plumbing solutions.',
                            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu-24UdFVh987krB0LgD6w1fKZm_jlnFF5t4EWCvdJN8QUKf1j2rZ28bnHoVEH1UI_pWPofKHtLSa2L-FAo1bYtxNTiMfDLcyK9x-F2tx6p1OhXaZv9K4A_4zJzNPQRV6gWoDvRKkG7XvfcPgn4mpf7ssho0QBJU24EO8NNi-7NcGAkMt8lBFlyaHK0-Xb8pdjUmqfloXxz6IEbV0iLv_UUrlELxXGD5Y5qk6QesdLQh6ph4Wv8lW16jUGc0QOceS-FAbn15jxQaM'
                        }
                    ]);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Failed to fetch services", error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-3 h-[calc(100vh-64px)]">
            {/* Left Panel: Search, Filters, and Results */}
            <div className="lg:col-span-5 xl:col-span-1 flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
                    {/* PageHeading */}
                    <h1 className="text-gray-800 dark:text-white text-[28px] font-bold leading-tight min-w-72 mb-6">Find the help you need, right away.</h1>
                    {/* Search & Location */}
                    <div className="space-y-4">
                        {/* Service TextField */}
                        <label className="flex flex-col w-full">
                            <p className="text-gray-800 dark:text-white text-sm font-medium leading-normal pb-2">Service</p>
                            <div className="flex w-full flex-1 items-stretch rounded-lg">
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-opacity-50 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-primary h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal" placeholder="Plumber, dog walker..." defaultValue="" />
                                <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center -ml-10">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                            </div>
                        </label>
                        {/* Location TextField */}
                        <label className="flex flex-col w-full">
                            <p className="text-gray-800 dark:text-white text-sm font-medium leading-normal pb-2">Location</p>
                            <div className="flex w-full flex-1 items-stretch rounded-lg">
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-opacity-50 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-primary h-12 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal leading-normal" placeholder="Your address or neighborhood" defaultValue="" />
                                <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center -ml-10">
                                    <span className="material-symbols-outlined">my_location</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                {/* Filter Panel */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
                    <h3 className="text-gray-800 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4">Filter by</h3>
                    <div className="space-y-6">
                        <div>
                            <p className="text-gray-800 dark:text-white text-sm font-medium leading-normal pb-2">Category</p>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="text-center rounded-lg px-3 py-2 text-sm font-semibold bg-primary/20 text-primary">Home</button>
                                <button className="text-center rounded-lg px-3 py-2 text-sm font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Wellness</button>
                                <button className="text-center rounded-lg px-3 py-2 text-sm font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Pets</button>
                                <button className="text-center rounded-lg px-3 py-2 text-sm font-medium bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">Lessons</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-800 dark:text-white text-sm font-medium leading-normal pb-2">Rating</p>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="material-symbols-outlined text-gray-300 dark:text-gray-600">star</span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">4.0+</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Results List */}
                <div className="flex-grow overflow-y-auto">
                    <div className="p-6 flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">Showing {services.length} plumbers near you</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>Sort by:</span>
                            <select className="form-select bg-transparent border-0 focus:ring-0 p-1 font-semibold text-gray-800 dark:text-white">
                                <option>Relevance</option>
                                <option>Distance</option>
                                <option>Rating</option>
                            </select>
                        </div>
                    </div>
                    {/* Provider Cards */}
                    <div className="space-y-px">
                        {loading ? (
                            <div className="p-6 text-center text-gray-500">Loading services...</div>
                        ) : (
                            services.map((service) => (
                                <div key={service.id} className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-white/5">
                                    <div className="flex gap-4">
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 flex-shrink-0" style={{ backgroundImage: `url("${service.image}")` }}></div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-gray-800 dark:text-white">{service.providerName}</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{service.title}</p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    <span className="text-sm font-semibold text-gray-800 dark:text-white">{service.rating}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">({service.reviewCount})</span>
                                                </div>
                                            </div>
                                            <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">{service.description}</p>
                                            <button className="w-full mt-4 text-center rounded-lg px-4 py-2.5 text-sm font-semibold text-primary border border-primary hover:bg-primary/10 dark:hover:bg-primary/20">View Profile</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* Right Panel: Interactive Map */}
            <div className="lg:col-span-7 xl:col-span-2 h-96 lg:h-auto relative">
                <TomTomMap />
            </div>
        </div>
    );
};

export default ServiceListings;
