const API_BASE_URL = '/api'; // Replace with your actual API base URL

/**
 * Fetches profile data. For now, it returns mock data.
 */
export const fetchProfileDataAPI = async () => {
    console.log("Fetching profile data from API...");
    // In a real app, this would be: await fetch(`${API_BASE_URL}/profile`);
    return new Promise(resolve => setTimeout(() => resolve({
        businessName: "XYZ's Plumbing",
        personalName: "XYZ",
        serviceCategory: "Plumbing",
        serviceArea: "India",
        tagline: "Reliable plumbing services, 24/7.",
        about: "With over 15 years of experience in the plumbing industry, I provide top-quality service for both residential and commercial clients. No job is too big or too small.",
        phone: "9876543210",
        email: "xyz.plumbing@example.com",
        pincode: "110001",
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXZ77yi52dAlwyhaD0gqhBumC0iwbc4BvLknN5D3Tt4-7QFZK9y5GpMD3tgMULftzIhOeLHp9XE2Ho3YqO4X7HQ-h9J1PTDPaNcptntJ8TGT7PUj4nEO05Lyr6qoc6Q-c5QLsk2t49GfDj9tvG9dY8KkPgPlp-W71LI7CdaWJp1I4d8KJCdLB7tDakfFcynH89uJ9A7DEbpwfdfqKmf3atgI5SibQOhwkNkyWqjHqz4LW8DFgcIapgdTWbpYiK4zCcOGhsOau92jA",
        workingHours: [
            { day: 'Monday', start: '09:00', end: '18:00', enabled: true },
            { day: 'Tuesday', start: '09:00', end: '18:00', enabled: true },
            { day: 'Wednesday', start: '09:00', end: '18:00', enabled: true },
            { day: 'Thursday', start: '09:00', end: '18:00', enabled: true },
            { day: 'Friday', start: '09:00', end: '18:00', enabled: true },
            { day: 'Saturday', start: '10:00', end: '16:00', enabled: false },
            { day: 'Sunday', start: '10:00', end: '16:00', enabled: false },
        ]
    }), 500));
};

/**
 * Updates profile data. For now, it logs the update and returns it.
 * @param {object} updatedData - An object containing the profile fields to update.
 */
export const updateProfileDataAPI = async (updatedData) => {
    console.log("Updating profile data via API with:", updatedData);
    // In a real app, this would be a PATCH or PUT request.
    return new Promise(resolve => setTimeout(() => resolve(updatedData), 500));
};