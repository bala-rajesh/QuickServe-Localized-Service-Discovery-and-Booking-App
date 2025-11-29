import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useServices } from '../../hooks/useServices';
import { useProfile } from '../../hooks/useProfile';

const ServiceCard = ({ service, onDelete, onUpdate }) => (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{service.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {service.active ? 'Active' : 'Inactive'}
                </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{service.category}</p>
            <p className="text-2xl font-bold text-secondary mt-4">₹{service.price.toLocaleString('en-IN')}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{service.description}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
            <button onClick={() => onUpdate(service.id, { active: !service.active })} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${service.active ? 'bg-primary' : 'bg-gray-200'}`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${service.active ? 'translate-x-2.5' : 'translate-x-0'}`} />
            </button>
            <div className="flex gap-2">
                <button onClick={() => alert('Edit not implemented yet!')} className="text-xs font-medium text-blue-600 hover:underline">Edit</button>
                <button onClick={() => onDelete(service.id)} className="text-xs font-medium text-red-600 hover:underline">Delete</button>
            </div>
        </div>
    </div>
);

const AddServiceCard = ({ onSave, onCancel, serviceCategory }) => {
    const [formData, setFormData] = useState({ name: '', category: serviceCategory || '', price: '', description: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.name || !formData.price) {
            alert('Service Name and Price are required.');
            return;
        }
        onSave({ ...formData, price: parseFloat(formData.price) });
    };

    return (
        <div className="bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 flex flex-col gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Service Name" className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm sm:text-sm" />
            <input name="category" value={formData.category} readOnly disabled placeholder="Service Category" className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm sm:text-sm disabled:opacity-70" />
            <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price (₹)" className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm sm:text-sm" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Service Description" rows="3" className="block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm sm:text-sm"></textarea>
            <div className="flex justify-end gap-2 mt-2">
                <button onClick={onCancel} className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90">Save Service</button>
            </div>
        </div>
    );
};

const MyServicesPage = () => {
    const { services, loadServices, addService, deleteService, updateService } = useServices();
    const { profile, loadProfile, updateProfile } = useProfile();
    const [isAdding, setIsAdding] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Load both services and profile data
        loadServices();
        if (!profile.businessName) { // Only load profile if it's not already there
            loadProfile();
        }
    }, [loadServices, loadProfile, profile.businessName]);

    useEffect(() => {
        // Check for state passed from the "Add New Service" button
        if (location.state?.addService) {
            setIsAdding(true);
        }
    }, [location.state]);

    const handleSaveNewService = async (serviceData) => {
        await addService(serviceData);
        setIsAdding(false);
    };

    const handleWorkingHoursChange = (index, field, value) => {
        const newWorkingHours = [...profile.workingHours];
        newWorkingHours[index] = { ...newWorkingHours[index], [field]: value };
        updateProfile({ ...profile, workingHours: newWorkingHours });
    };

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Services</h1>
            {/* Working Hours Section */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
                <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 pb-3 pt-5 border-b border-gray-200 dark:border-gray-800">Working Hours</h2>
                <div className="p-4 divide-y divide-gray-200 dark:divide-gray-800">
                    {profile.workingHours?.map((hour, index) => (
                        <div key={index} className="flex items-center justify-between py-3">
                            <div className="flex flex-col">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{hour.day}</p>
                                {!hour.enabled && <p className="text-xs text-gray-500">Closed</p>}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center gap-2 transition-opacity duration-300 ${!hour.enabled ? 'opacity-50' : 'opacity-100'}`}>
                                    <input type="time" value={hour.start} onChange={(e) => handleWorkingHoursChange(index, 'start', e.target.value)} disabled={!hour.enabled} className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed" />
                                    <span className="text-gray-500">-</span>
                                    <input type="time" value={hour.end} onChange={(e) => handleWorkingHoursChange(index, 'end', e.target.value)} disabled={!hour.enabled} className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed" />
                                </div>
                                <button onClick={() => handleWorkingHoursChange(index, 'enabled', !hour.enabled)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${hour.enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${hour.enabled ? 'translate-x-2.5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center">
                <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Your Services</h2>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold">
                        Add Service
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <ServiceCard key={service.id} service={service} onDelete={deleteService} onUpdate={updateService} />
                ))}
                {isAdding && <AddServiceCard serviceCategory={profile.serviceCategory} onSave={handleSaveNewService} onCancel={() => setIsAdding(false)} />}
            </div>
        </div>
    );
};

export default MyServicesPage;