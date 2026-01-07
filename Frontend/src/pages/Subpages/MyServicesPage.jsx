import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useServices } from '../../hooks/useServices';

const MyServicesPage = () => {
    const { loading, error, services, updateService, createService, deleteService } = useServices();
    const location = useLocation();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const [newServiceForm, setNewServiceForm] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        active: true
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (location.state?.openAddService || searchParams.get('action') === 'create') {
            setIsCreating(true);
        }
    }, [location]);

    const handleEditClick = (service) => {
        setEditingId(service.id);
        setEditForm(service);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSave = async () => {
        const originalService = services.find(s => s.id === editingId);
        const hasChanged =
            originalService.name !== editForm.name ||
            originalService.description !== editForm.description ||
            originalService.price != editForm.price ||
            originalService.duration != editForm.duration ||
            originalService.active !== editForm.active;

        if (!hasChanged) {
            setEditingId(null);
            return;
        }

        try {
            await updateService(editingId, editForm);
            setEditingId(null);
        } catch (e) {
            console.error("Failed to save service", e);
            // Optionally handle error in UI
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCreateClick = () => {
        setIsCreating(true);
        setNewServiceForm({ name: '', description: '', price: '', duration: '', active: true });
    };

    const handleCreateSave = async () => {
        if (!newServiceForm.name || !newServiceForm.price) return; // Basic validation
        try {
            await createService(newServiceForm);
            setIsCreating(false);
        } catch (e) {
            console.error("Failed to create service", e);
        }
    };

    const handleNewServiceChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewServiceForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDelete = async (serviceId) => {
        if (window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
            try {
                await deleteService(serviceId);
            } catch (e) {
                // Error is logged in the hook
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Loading services...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading services.</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Services</h1>
                <button onClick={handleCreateClick} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90">
                    Add New Service
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isCreating && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden border-l-4 border-l-primary">
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newServiceForm.name}
                                    onChange={handleNewServiceChange}
                                    placeholder="e.g. AC Repair"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={newServiceForm.description}
                                    onChange={handleNewServiceChange}
                                    rows="3"
                                    placeholder="Describe the service..."
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newServiceForm.price}
                                    onChange={handleNewServiceChange}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (mins)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={newServiceForm.duration}
                                    onChange={handleNewServiceChange}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="active"
                                    id="new-active"
                                    checked={newServiceForm.active}
                                    onChange={handleNewServiceChange}
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="new-active" className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button onClick={handleCreateSave} className="px-3 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90">Create</button>
                                <button onClick={() => setIsCreating(false)} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {services.map(service => (
                    <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                        <div className="p-6 flex flex-col gap-4">
                            {editingId === service.id ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name || ''}
                                            onChange={handleChange}
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={editForm.description || ''}
                                            onChange={handleChange}
                                            rows="3"
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={editForm.price || ''}
                                            onChange={handleChange}
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (mins)</label>
                                        <input
                                            type="number"
                                            name="duration"
                                            value={editForm.duration || ''}
                                            onChange={handleChange}
                                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="active"
                                            id={`active-${service.id}`}
                                            checked={editForm.active || false}
                                            onChange={handleChange}
                                            className="rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={`active-${service.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button onClick={handleSave} className="px-3 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90">Save</button>
                                        <button onClick={handleCancelEdit} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {service.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{service.description}</p>
                                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold text-secondary">₹{service.price}</span>
                                            {service.duration && <span className="text-xs text-gray-500 dark:text-gray-400">{service.duration} mins</span>}
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleEditClick(service)} className="text-sm font-medium text-primary hover:text-primary/80">Edit</button>
                                            <button onClick={() => handleDelete(service.id)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyServicesPage;