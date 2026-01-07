import React, { useState, useEffect, useCallback } from 'react';
import { useProfile } from '../../hooks/useProfile';

const ProfileDetailPage = () => {
    const { loading, error, profile, updateProfile } = useProfile();
    const [formData, setFormData] = useState({});
    const [isEditingBasic, setIsEditingBasic] = useState(false);
    const [isEditingHours, setIsEditingHours] = useState(false);
    const [savingBasic, setSavingBasic] = useState(false);
    const [savingHours, setSavingHours] = useState(false);

    const resetForm = useCallback(() => {
        if (profile) {
            setFormData({
                ...profile,
                skills: profile.skills ? profile.skills.join(', ') : '',
                workingHours: (profile.workingHours && profile.workingHours.length > 0)
                    ? profile.workingHours
                    : [
                        { day: 'Monday', open: '09:00', close: '17:00', closed: false },
                        { day: 'Tuesday', open: '09:00', close: '17:00', closed: false },
                        { day: 'Wednesday', open: '09:00', close: '17:00', closed: false },
                        { day: 'Thursday', open: '09:00', close: '17:00', closed: false },
                        { day: 'Friday', open: '09:00', close: '17:00', closed: false },
                        { day: 'Saturday', open: '10:00', close: '15:00', closed: false },
                        { day: 'Sunday', open: '', close: '', closed: true },
                    ]
            });
        }
    }, [profile]);

    // Initialize form data when profile loads
    useEffect(() => {
        resetForm();
    }, [resetForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWorkingHoursChange = (index, field, value) => {
        const updatedHours = [...formData.workingHours];
        updatedHours[index] = { ...updatedHours[index], [field]: value };
        setFormData(prev => ({ ...prev, workingHours: updatedHours }));
    };

    const handleSaveBasic = async () => {
        setSavingBasic(true);
        try {
            const payload = {
                ...formData,
                skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : []
            };
            await updateProfile(payload);
            setIsEditingBasic(false);
        } catch (e) {
            // Error handled in hook
        } finally {
            setSavingBasic(false);
        }
    };

    const handleCancelBasic = () => {
        setIsEditingBasic(false);
        resetForm();
    };

    const handleSaveHours = async () => {
        setSavingHours(true);
        try {
            // Sanitize working hours: convert empty strings to null to avoid backend 500 errors
            const sanitizedHours = formData.workingHours.map(day => {
                const formatTime = (t) => {
                    if (!t || t === '') return null;
                    // Append seconds if missing (HH:mm -> HH:mm:ss)
                    if (t.length === 5) return t + ':00';
                    return t;
                };
                return { ...day, open: formatTime(day.open), close: formatTime(day.close) };
            });
            await updateProfile({ ...formData, workingHours: sanitizedHours });
            setIsEditingHours(false);
        } catch (e) {
            // Error handled in hook
        } finally {
            setSavingHours(false);
        }
    };

    const handleCancelHours = () => {
        setIsEditingHours(false);
        resetForm();
    };

    const calculateCompletion = () => {
        if (!profile) return 0;
        const fields = ['fullName', 'businessName', 'phone', 'email', 'category', 'serviceArea', 'about', 'profileImageUrl', 'bio'];
        let filled = 0;
        fields.forEach(f => {
            if (profile[f] && String(profile[f]).trim() !== '') filled++;
        });
        return Math.round((filled / fields.length) * 100);
    };

    if (loading) return <div className="p-8 text-center">Loading profile...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading profile.</div>;

    const completion = calculateCompletion();

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-10">
            {/* Header & Profile Picture */}
            <div className="flex items-center gap-6">
                <img
                    src={profile.profileImageUrl || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-gray-200"
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.fullName || 'Service Provider'}</h1>
                    <p className="text-gray-500 dark:text-gray-400">{profile.businessName}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Completion</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${completion}%` }}></div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                    {!isEditingBasic ? (
                        <button onClick={() => setIsEditingBasic(true)} className="text-sm font-medium text-primary hover:underline">Edit</button>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={handleCancelBasic} className="text-sm font-medium text-gray-500 hover:text-gray-700" disabled={savingBasic}>Cancel</button>
                            <button onClick={handleSaveBasic} className="text-sm font-medium text-primary hover:text-primary/80" disabled={savingBasic}>
                                {savingBasic ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName || ''}
                            onChange={handleChange}
                            disabled={!isEditingBasic || savingBasic}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Name</label>
                        <input
                            type="text"
                            name="businessName"
                            value={formData.businessName || ''}
                            onChange={handleChange}
                            disabled={!isEditingBasic || savingBasic}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            disabled={!isEditingBasic || savingBasic}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            disabled={!isEditingBasic || savingBasic}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category || ''}
                            onChange={handleChange}
                            disabled={!isEditingBasic || savingBasic}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Area</label>
                        <input
                            type="text"
                            name="serviceArea"
                            value={formData.serviceArea || ''}
                            onChange={handleChange}
                            disabled={!isEditingBasic || savingBasic}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tagline / Bio</label>
                        <input
                            type="text"
                            name="bio"
                            value={formData.bio || ''}
                            onChange={handleChange}
                            disabled={!isEditingBasic || savingBasic}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skills</label>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills || ''}
                            onChange={handleChange}
                            disabled={!isEditingBasic || savingBasic}
                            placeholder="e.g. Plumbing, Pipe Fitting, Leak Repair"
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">About</label>
                        <textarea
                            name="about"
                            rows="3"
                            value={formData.about || ''}
                            onChange={handleChange}
                            disabled={!isEditingBasic || savingBasic}
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Working Hours</h2>
                    {!isEditingHours ? (
                        <button onClick={() => setIsEditingHours(true)} className="text-sm font-medium text-primary hover:underline">Edit</button>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={handleCancelHours} className="text-sm font-medium text-gray-500 hover:text-gray-700" disabled={savingHours}>Cancel</button>
                            <button onClick={handleSaveHours} className="text-sm font-medium text-primary hover:text-primary/80" disabled={savingHours}>
                                {savingHours ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    {formData.workingHours && formData.workingHours.map((day, index) => (
                        <div key={day.day} className="flex items-center gap-4">
                            <div className="w-24 font-medium text-gray-700 dark:text-gray-300">{day.day}</div>
                            <div className="flex items-center gap-2 flex-1">
                                <input
                                    type="time"
                                    value={day.open || ''}
                                    onChange={(e) => handleWorkingHoursChange(index, 'open', e.target.value)}
                                    disabled={!isEditingHours || day.closed}
                                    className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                                />
                                <span className="text-gray-500">-</span>
                                <input
                                    type="time"
                                    value={day.close || ''}
                                    onChange={(e) => handleWorkingHoursChange(index, 'close', e.target.value)}
                                    disabled={!isEditingHours || day.closed}
                                    className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={`closed-${index}`}
                                    checked={day.closed || false}
                                    onChange={(e) => handleWorkingHoursChange(index, 'closed', e.target.checked)}
                                    disabled={!isEditingHours}
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor={`closed-${index}`} className="text-sm text-gray-600 dark:text-gray-400">Closed</label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileDetailPage;