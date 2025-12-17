import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import TomTomMap from '../components/TomTomMap';

const ServiceListings = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await api.services.getAll();
                setServices(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch services", error);
                // Fallback to empty or keep loading false
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
                        <p className="text-sm font-medium text-gray-800 dark:text-white">Showing {services.length} services near you</p>
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
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 flex-shrink-0" style={{ backgroundImage: `url("${service.image || 'https://via.placeholder.com/150'}")` }}></div>
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
            <div className="lg:col-span-7 xl:col-span-2 h-96 lg:h-auto lg:h-full relative">
                <TomTomMap services={services} />
            </div>
        </div>
    );
};

export default ServiceListings;
