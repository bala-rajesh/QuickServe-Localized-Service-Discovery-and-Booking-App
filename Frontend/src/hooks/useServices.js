import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { servicesState } from '../state/atoms';
import { fetchServicesAPI, createServiceAPI, deleteServiceAPI, updateServiceAPI } from '../api/serviceService';

/**
 * A custom hook to manage the provider's services.
 */
export const useServices = () => {
    const [services, setServices] = useRecoilState(servicesState);

    const loadServices = useCallback(async () => {
        try {
            const data = await fetchServicesAPI();
            setServices(data);
        } catch (error) {
            console.error("Failed to load services:", error);
        }
    }, [setServices]);

    const addService = useCallback(async (serviceData) => {
        try {
            const newService = await createServiceAPI(serviceData);
            setServices(prev => [...prev, newService]);
        } catch (error) {
            console.error("Failed to add service:", error);
        }
    }, [setServices]);

    const deleteService = useCallback(async (serviceId) => {
        try {
            await deleteServiceAPI(serviceId);
            setServices(prev => prev.filter(s => s.id !== serviceId));
        } catch (error) {
            console.error("Failed to delete service:", error);
        }
    }, [setServices]);

    const updateService = useCallback(async (serviceId, dataToUpdate) => {
        try {
            const updatedService = await updateServiceAPI(serviceId, dataToUpdate);
            setServices(prev =>
                prev.map(s => s.id === serviceId ? updatedService : s)
            );
        } catch (error) {
            console.error("Failed to update service:", error);
        }
    }, [setServices]);

    return { services, loadServices, addService, deleteService, updateService };
};