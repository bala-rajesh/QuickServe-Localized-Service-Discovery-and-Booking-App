import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PageTransition, StaggerContainer, StaggerItem, CardHover, ButtonTap } from '../components/AnimationWrapper';

const ProviderServices = () => {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                if (user?.id) {
                    const data = await api.services.getByProvider(user.id);
                    setServices(data);
                }
            } catch (err) {
                setError('Failed to load services');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [user]);

    if (loading) return <div className="p-8 text-center">Loading services...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <PageTransition className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400">Manage the services you offer to customers.</p>
                <ButtonTap className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add New Service
                </ButtonTap>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        You haven't added any services yet.
                    </div>
                ) : (
                    services.map((service) => (
                        <StaggerItem key={service.id}>
                            <CardHover className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm overflow-hidden group cursor-default">
                                <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
                                    {/* Image Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <span className="material-symbols-outlined text-4xl">cleaning_services</span>
                                    </div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ButtonTap className="p-2 bg-white dark:bg-gray-900 rounded-full shadow-md hover:text-primary">
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </ButtonTap>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{service.name}</h3>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold rounded-full">Active</span>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <span className="font-bold text-lg">${service.price}</span>
                                        <span className="text-sm text-gray-500">per service</span>
                                    </div>
                                </div>
                            </CardHover>
                        </StaggerItem>
                    ))
                )}

                {/* Add New Placeholder Card */}
                <StaggerItem>
                    <ButtonTap className="flex flex-col items-center justify-center h-full min-h-[300px] w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all gap-4 group">
                        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-2xl">add</span>
                        </div>
                        <span className="font-semibold text-gray-600 dark:text-gray-300 group-hover:text-primary">Create New Service</span>
                    </ButtonTap>
                </StaggerItem>
            </StaggerContainer>
        </PageTransition>
    );
};

export default ProviderServices;
