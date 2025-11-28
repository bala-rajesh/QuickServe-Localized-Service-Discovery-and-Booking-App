import { atom } from 'recoil';

// Mock data simulation
const mockBookings = [
    { id: 1, customer: 'Jane Smith', service: 'House Cleaning', datetime: '2025-10-26T14:00:00.000Z', status: 'pending' },
    { id: 2, customer: 'Carlos Ray', service: 'Plumbing Repair', datetime: '2025-10-27T10:00:00.000Z', status: 'pending' },
    { id: 3, customer: 'Aisha Khan', service: 'Garden Maintenance', datetime: '2025-10-27T16:00:00.000Z', status: 'pending' },
    { id: 4, customer: 'John Doe', service: 'Electrical Wiring', datetime: '2025-11-28T09:00:00.000Z', status: 'confirmed' },
    { id: 5, customer: 'Emily White', service: 'Painting', datetime: '2025-11-29T13:00:00.000Z', status: 'confirmed' },
    { id: 6, customer: 'Michael Brown', service: 'Appliance Repair', datetime: '2025-12-01T11:00:00.000Z', status: 'confirmed' },
    { id: 7, customer: 'Jessica Green', service: 'Roofing Inspection', datetime: '2025-11-20T11:00:00.000Z', status: 'completed', earnings: 150 },
    { id: 8, customer: 'David Blue', service: 'HVAC Maintenance', datetime: '2025-11-15T10:00:00.000Z', status: 'completed', earnings: 200 },
    { id: 9, customer: 'Sarah Wilson', service: 'Interior Design Consultation', datetime: '2025-12-02T15:00:00.000Z', status: 'pending' },
    { id: 10, customer: 'Tom Clark', service: 'Custom Furniture Build', datetime: '2025-12-05T09:00:00.000Z', status: 'confirmed' },
    { id: 11, customer: 'Linda Harris', service: 'Home Security System Installation', datetime: '2025-11-25T14:00:00.000Z', status: 'completed', earnings: 350 },
    { id: 12, customer: 'Peter Parker', service: 'Spider Removal', datetime: '2025-12-03T18:00:00.000Z', status: 'pending' },
    { id: 13, customer: 'Bruce Wayne', service: 'Pest Control', datetime: '2025-11-28T10:00:00.000Z', status: 'confirmed' },
    { id: 14, customer: 'Diana Prince', service: 'Landscaping', datetime: '2025-11-29T11:00:00.000Z', status: 'confirmed' },
    { id: 15, customer: 'Clark Kent', service: 'Flooring Installation', datetime: '2025-12-04T09:00:00.000Z', status: 'confirmed' },
    { id: 16, customer: 'Barry Allen', service: 'Smart Home Setup', datetime: '2025-12-08T14:00:00.000Z', status: 'confirmed' },
    { id: 17, customer: 'Hal Jordan', service: 'Lantern Repair', datetime: '2025-12-09T10:00:00.000Z', status: 'confirmed' },
    { id: 18, customer: 'Arthur Curry', service: 'Aquarium Cleaning', datetime: '2025-12-10T12:00:00.000Z', status: 'confirmed' },
];

const mockEarnings = {
    total: 8750,
    overview: [
        { month: 'Jan', earnings: 4500 },
        { month: 'Feb', earnings: 4200 },
        { month: 'Mar', earnings: 5000 },
        { month: 'Apr', earnings: 4800 },
        { month: 'May', earnings: 5500 },
        { month: 'Jun', earnings: 5300 },
        { month: 'Jul', earnings: 6000 },
        { month: 'Aug', earnings: 5800 },
        { month: 'Sep', earnings: 6200 },
        { month: 'Oct', earnings: 6500 },
        { month: 'Nov', earnings: 7000 },
        { month: 'Dec', earnings: 7500 },
    ]
};

export const bookingsState = atom({
    key: 'bookingsState',
    default: [],
});

export const earningsState = atom({
    key: 'earningsState',
    default: {
        total: 0,
        overview: [],
    },
});

// Mock API fetch function
export const fetchAllData = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                bookings: mockBookings,
                earnings: mockEarnings,
            });
        }, 1000);
    });
};
