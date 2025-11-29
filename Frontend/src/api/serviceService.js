const mockServices = [
    { id: 'svc_1', name: 'Standard Plumbing Repair', description: 'Fixing leaks, clogs, and drips. Price is per hour.', price: 2500, category: 'Plumbing', active: true },
    { id: 'svc_2', name: 'Geyser Installation', description: 'Installation of new water heaters and geysers.', price: 4000, category: 'Plumbing', active: true },
    { id: 'svc_3', name: 'Emergency Call-out', description: '24/7 emergency service for any urgent issues.', price: 5000, category: 'Plumbing', active: false },
];

let nextId = 4;

/**
 * Fetches the list of services.
 */
export const fetchServicesAPI = async () => {
    console.log("Fetching services from API...");
    return new Promise(resolve => setTimeout(() => resolve([...mockServices]), 500));
};

/**
 * Creates a new service.
 * @param {object} serviceData - The data for the new service.
 */
export const createServiceAPI = async (serviceData) => {
    console.log("Creating new service via API with:", serviceData);
    const newService = { ...serviceData, id: `svc_${nextId++}` };
    mockServices.push(newService);
    return new Promise(resolve => setTimeout(() => resolve(newService), 500));
};

/**
 * Deletes a service.
 * @param {string} serviceId - The ID of the service to delete.
 */
export const deleteServiceAPI = async (serviceId) => {
    console.log(`Deleting service ${serviceId} via API.`);
    const index = mockServices.findIndex(s => s.id === serviceId);
    if (index > -1) mockServices.splice(index, 1);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
};

/**
 * Updates a service.
 * @param {string} serviceId - The ID of the service to update.
 * @param {object} updatedData - The data to update.
 */
export const updateServiceAPI = async (serviceId, updatedData) => {
    console.log(`Updating service ${serviceId} with`, updatedData);
    const index = mockServices.findIndex(s => s.id === serviceId);
    if (index > -1) {
        mockServices[index] = { ...mockServices[index], ...updatedData };
        return new Promise(resolve => setTimeout(() => resolve(mockServices[index]), 500));
    }
    return Promise.reject(new Error('Service not found'));
};