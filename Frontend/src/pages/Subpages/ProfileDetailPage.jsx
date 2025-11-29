import React, { useEffect, useState } from 'react';
import { useProfile } from '../../hooks/useProfile';

const ProfileDetailPage = () => {
  const { profile, loadProfile, updateProfile } = useProfile();
  const [formData, setFormData] = useState(profile);
  const [errors, setErrors] = useState({});

  // Load profile data when component mounts
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // When global profile state changes, update local form data
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      // A more robust regex based on standard email structure.
      if (value && !/^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        error = 'Please enter a valid email address.';
      }
    }
    if (name === 'phone') {
      // Simple 10-digit Indian phone number validation
      if (value && !/^[6-9]\d{9}$/.test(value)) {
        error = 'Please enter a valid 10-digit phone number.';
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
      alert('Please fix the errors before saving.');
      return;
    }
    updateProfile(formData);
    alert('Profile saved!');
  };

  const calculateProfileCompletion = () => {
    const fields = ['businessName', 'personalName', 'serviceCategory', 'serviceArea', 'tagline', 'about', 'phone', 'email', 'pincode', 'avatarUrl'];
    const filledFields = fields.filter(field => formData[field] && String(formData[field]).trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const completionPercentage = calculateProfileCompletion();

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* PageHeading */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
          <div className="flex min-w-72 flex-col gap-2">
            <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              {completionPercentage < 100 ? 'Set Up Your Profile' : 'Your Profile'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              {completionPercentage < 100 ? 'Complete your profile to start getting booked by customers.' : 'Your profile is complete and visible to customers.'}
            </p>
          </div>
        </div>
        {/* ProgressBar */}
        {completionPercentage < 100 && (
          <div className="flex flex-col gap-3 p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-8">
            <div className="flex gap-6 justify-between items-center">
              <p className="text-[#111418] dark:text-white text-base font-medium leading-normal">Profile Completion</p>
              <p className="text-primary text-sm font-bold leading-normal">{completionPercentage}%</p>
            </div>
            <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700 h-2"><div className="h-2 rounded-full bg-primary" style={{ width: `${completionPercentage}%` }}></div></div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">You're almost there! Complete the final steps to reach 100%.</p>
          </div>
        )}
        {/* Profile Details Section */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 pb-3 pt-5 border-b border-gray-200 dark:border-gray-800">Profile Details</h2>
            <form className="p-6 space-y-6" onSubmit={handleSaveChanges}>
              <div className="flex items-center gap-6">
                <img className="size-24 rounded-full object-cover" data-alt="Current user avatar" src={formData.avatarUrl} />
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90" htmlFor="file-upload">Upload New Picture</label>
                  <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="business-name">Business Name</label>
                  <input className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="business-name" name="businessName" type="text" value={formData.businessName} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="personal-name">Personal Name</label>
                  <input className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="personal-name" name="personalName" type="text" value={formData.personalName} onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email Address</label>
                  <input className={`block w-full rounded-lg shadow-sm sm:text-sm ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} dark:bg-gray-800 dark:text-white`} id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="phone">Phone Number</label>
                  <input className={`block w-full rounded-lg shadow-sm sm:text-sm ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-primary'} dark:bg-gray-800 dark:text-white`} id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="service-category">Service Category</label>
                  <select className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="service-category" name="serviceCategory" value={formData.serviceCategory} onChange={handleChange}>
                    <option>Plumbing</option>
                    <option>Electrician</option>
                    <option>Landscaping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="pincode">Pincode</label>
                  <input className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="pincode" name="pincode" type="text" value={formData.pincode} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="service-area">Service Area / Location</label>
                <input className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="service-area" name="serviceArea" type="text" value={formData.serviceArea} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="tagline">Short Bio / Tagline</label>
                <input className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="tagline" name="tagline" type="text" value={formData.tagline} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="about">About Me/Us Section</label>
                <textarea className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="about" name="about" rows="4" value={formData.about} onChange={handleChange}></textarea>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 flex justify-end -mx-6 -mb-6 rounded-b-xl">
                <button type="submit" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;