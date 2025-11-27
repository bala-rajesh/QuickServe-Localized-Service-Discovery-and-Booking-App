import React from 'react';

const ProfileDetailPage = () => {
  return (
    <main className="flex-1 p-6 md:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {/* PageHeading */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
          <div className="flex min-w-72 flex-col gap-2">
            <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Set Up Your Profile</p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Complete your profile to start getting booked by customers.</p>
          </div>
        </div>
        {/* ProgressBar */}
        <div className="flex flex-col gap-3 p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-8">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-[#111418] dark:text-white text-base font-medium leading-normal">Profile Completion</p>
            <p className="text-primary text-sm font-bold leading-normal">85%</p>
          </div>
          <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700 h-2"><div className="h-2 rounded-full bg-primary" style={{ width: '85%' }}></div></div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">You're almost there! Complete the final steps to reach 100%.</p>
        </div>
        {/* Profile Details Section */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 pb-3 pt-5 border-b border-gray-200 dark:border-gray-800">Profile Details</h2>
            <form className="p-6 space-y-6">
              <div className="flex items-center gap-6">
                <img className="size-24 rounded-full object-cover" data-alt="Current user avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRrmqwzslmHinHTDgJx-2YMfxNt_sTCd7U7xReI9QUpivwRv_RcfBEo_BhbTY6wqql0A1o0OolG9DumX-lWOTnVbzaN-hu2l86BMI0u6fRvEZrRsOM-4PLGGwTpBv_-VqG7ywIHRs4pNlTrjoP_OnI-P9X3rCvx9Rv7mFHhmEHJAUy0FDr2oclp8On1IO5KHdbL7b91DrMCS1q8xwOjmBP7tD8r3iMm66I1Eqb7-cmtvrWMRAnDXCFy3HDvChvceNrXLYlQ7Ois80" />
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90" htmlFor="file-upload">Upload New Picture</label>
                  <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="business-name">Business Name</label>
                  <input className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="business-name" name="business-name" type="text" defaultValue="XYZ's Plumbing" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="personal-name">Personal Name</label>
                  <input className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="personal-name" name="personal-name" type="text" defaultValue="XYZ" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="service-category">Service Category</label>
                  <select className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="service-category" name="service-category">
                    <option>Plumbing</option>
                    <option>Electrician</option>
                    <option>Landscaping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="service-area">Service Area / Location</label>
                  <input className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="service-area" name="service-area" type="text" defaultValue="India" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="tagline">Short Bio / Tagline</label>
                <input className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="tagline" name="tagline" type="text" defaultValue="Reliable plumbing services, 24/7." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="about">About Me/Us Section</label>
                <textarea className="block w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm" id="about" name="about" rows="4" defaultValue="With over 15 years of experience in the plumbing industry, I provide top-quality service for both residential and commercial clients. No job is too big or too small."></textarea>
              </div>
            </form>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 flex justify-end">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileDetailPage;