import React from 'react';

const EarningsChart = () => {
    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-bold pb-3">Earnings Overview</h2>
            <div className="rounded-lg border border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark p-6">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-text-light/70 dark:text-text-dark/70">Last 30 Days</p>
                    <p className="text-2xl font-bold text-secondary">₹854.00</p>
                </div>
                <div className="mt-4 h-60 flex items-end justify-center">
                    <div className="w-full h-full bg-cover bg-center bg-no-repeat" data-alt="A bar chart showing daily earnings over the last month, with varying bar heights representing revenue." style={{ backgroundImage: 'url(\'https://lh3.googleusercontent.com/aida-public/AB6AXuCX3oKel9z5CsHC_sYTugiYzEy-QvyJ0qwVJH3zWEAGTWKePSqDz72tWkMqM2JZ--wkcwQoqhOrJCsJvNrnFSozRR5rM09DVyzwp_1PjW4EcmCv-SWdXWnocSlAfdpRk9y-Rf-a-Ik9K96zoIGay6Ey9I51AhqfxmuARdwyPybG1GbQ2GA_QDLBZqSOPTb-V4liU3yWrhinl_djeTInhzjkaIatdu6Qf7xBVPpZQITc6VMYWy0IK6uPandPecC-oMtA0Ybe1YlGaog\')' }}></div>
                </div>
            </div>
        </div>
    );
};

export default EarningsChart;
