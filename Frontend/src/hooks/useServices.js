import { useCallback, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { servicesState } from '../state/atoms';
import { fetchServicesAPI, updateServiceAPI, createServiceAPI, deleteServiceAPI } from '../api/serviceService';

/**
 * Hook to fetch and manage provider services.
 */
export const useServices = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useRecoilState(servicesState);

    const fetchServices = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchServicesAPI();
            setServices(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch services:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [setServices]);

    const updateService = useCallback(async (serviceId, updatedData) => {
        // Optimistic update
        const originalServices = services;
        setServices(prev => prev.map(s => s.id === serviceId ? { ...s, ...updatedData } : s));

        try {
            await updateServiceAPI(serviceId, updatedData);
        } catch (err) {
            console.error("Failed to update service:", err);
            setServices(originalServices); // Rollback
            throw err;
        }
    }, [services, setServices]);

    const createService = useCallback(async (newServiceData) => {
        setLoading(true);
        try {
            const data = await createServiceAPI(newServiceData);
            setServices(prev => [...prev, data]);
            setError(null);
            return data;
        } catch (err) {
            console.error("Failed to create service:", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [setServices]);

    const deleteService = useCallback(async (serviceId) => {
        const originalServices = services;
        setServices(prev => prev.filter(s => s.id !== serviceId));

        try {
            await deleteServiceAPI(serviceId);
        } catch (err) {
            console.error("Failed to delete service:", err);
            setServices(originalServices); // Rollback
            throw err;
        }
    }, [services, setServices]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    return { loading, error, services, fetchServices, updateService, createService, deleteService };
};