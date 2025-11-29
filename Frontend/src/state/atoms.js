import { atom } from 'recoil';

// Mock data simulation
const mockBookings = [
    { id: 1, customer: 'Priya Sharma', service: 'House Cleaning', datetime: '2025-10-26T14:00:00.000Z', status: 'pending', phone: '9876543210', address: '12B, Lodhi Road, New Delhi', amount: 1500, providerChanges: false },
    { id: 2, customer: 'Rohan Gupta', service: 'Plumbing Repair', datetime: '2025-10-27T10:00:00.000Z', status: 'pending', phone: '9876543211', address: '45, MG Road, Bengaluru', amount: null, providerChanges: false },
    { id: 3, customer: 'Aisha Khan', service: 'Garden Maintenance', datetime: '2025-10-27T16:00:00.000Z', status: 'pending', phone: '9876543212', address: '78, Juhu Tara Road, Mumbai', amount: 2200, providerChanges: false },
    { id: 4, customer: 'Arjun Singh', service: 'Electrical Wiring', datetime: '2025-11-28T09:00:00.000Z', status: 'confirmed', phone: '9876543213', address: '101, Sector 17, Chandigarh', amount: 3000, providerChanges: false },
    { id: 5, customer: 'Sneha Reddy', service: 'Painting', datetime: '2025-11-29T13:00:00.000Z', status: 'confirmed', phone: '9876543214', address: '21, Banjara Hills, Hyderabad', amount: 10000, providerChanges: false },
    { id: 6, customer: 'Vikram Patel', service: 'Appliance Repair', datetime: '2025-12-01T11:00:00.000Z', status: 'confirmed', phone: '9876543215', address: '33, CG Road, Ahmedabad', amount: 800, providerChanges: false },
    { id: 7, customer: 'Ananya Iyer', service: 'Roofing Inspection', datetime: '2025-11-20T11:00:00.000Z', status: 'completed', earnings: 150, phone: '9876543216', address: '44, Anna Salai, Chennai', amount: 1500, providerChanges: false },
    { id: 8, customer: 'Siddharth Menon', service: 'HVAC Maintenance', datetime: '2025-11-15T10:00:00.000Z', status: 'completed', earnings: 200, phone: '9876543217', address: '55, FC Road, Pune', amount: 2000, providerChanges: false },
    { id: 9, customer: 'Diya Das', service: 'Interior Design Consultation', datetime: '2025-12-02T15:00:00.000Z', status: 'pending', phone: '9876543218', address: '66, Park Street, Kolkata', amount: null, providerChanges: false },
    { id: 10, customer: 'Kabir Joshi', service: 'Custom Furniture Build', datetime: '2025-12-05T09:00:00.000Z', status: 'confirmed', phone: '9876543219', address: '77, MI Road, Jaipur', amount: 25000, providerChanges: false },
    { id: 11, customer: 'Meera Krishnan', service: 'Home Security System Installation', datetime: '2025-11-25T14:00:00.000Z', status: 'completed', earnings: 350, phone: '9876543220', address: '88, Infopark, Kochi', amount: 3500, providerChanges: false },
    { id: 12, customer: 'Aditya Rao', service: 'Spider Removal', datetime: '2025-12-03T18:00:00.000Z', status: 'pending', phone: '9876543221', address: '99, Candolim Beach Road, Goa', amount: 500, providerChanges: false },
    { id: 13, customer: 'Ishaan Malhotra', service: 'Pest Control', datetime: '2025-11-28T10:00:00.000Z', status: 'confirmed', phone: '9876543222', address: '10, Hauz Khas Village, New Delhi', amount: 1200, providerChanges: false },
    { id: 14, customer: 'Zara Begum', service: 'Landscaping', datetime: '2025-11-29T11:00:00.000Z', status: 'confirmed', phone: '9876543223', address: '20, Koramangala, Bengaluru', amount: 8000, providerChanges: false },
    { id: 15, customer: 'Vivaan Nair', service: 'Flooring Installation', datetime: '2025-12-04T09:00:00.000Z', status: 'confirmed', phone: '9876543224', address: '30, Bandra West, Mumbai', amount: 15000, providerChanges: false },
    { id: 16, customer: 'Aryan Kumar', service: 'Smart Home Setup', datetime: '2025-12-08T14:00:00.000Z', status: 'confirmed', phone: '9876543225', address: '40, Jubilee Hills, Hyderabad', amount: 4500, providerChanges: false },
    { id: 17, customer: 'Neha Desai', service: 'Lantern Repair', datetime: '2025-12-09T10:00:00.000Z', status: 'confirmed', phone: '9876543226', address: '50, Satellite, Ahmedabad', amount: 600, providerChanges: false },
    { id: 18, customer: 'Ravi Varma', service: 'Aquarium Cleaning', datetime: '2025-12-10T12:00:00.000Z', status: 'confirmed', phone: '9876543227', address: '60, T. Nagar, Chennai', amount: 750, providerChanges: false },
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

export const profileState = atom({
    key: 'profileState',
    default: {
        businessName: '', personalName: '', serviceCategory: '', serviceArea: '',
        tagline: '', about: '', phone: '', email: '', pincode: '', avatarUrl: '', workingHours: []
    },
});

export const servicesState = atom({
    key: 'servicesState',
    default: [],
});

export const statusFilterState = atom({
    key: 'statusFilterState',
    default: 'all',
});

export const dateFilterState = atom({
    key: 'dateFilterState',
    default: 'all', // Can be 'all' or an array [startDate, endDate]
});

export const earningsFilterState = atom({
    key: 'earningsFilterState',
    default: 'month', // 'day', 'week', 'month'
});

export const earningsDateContextState = atom({
    key: 'earningsDateContextState',
    default: new Date(), // Defaults to today, used for calculating current week/month/year
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
