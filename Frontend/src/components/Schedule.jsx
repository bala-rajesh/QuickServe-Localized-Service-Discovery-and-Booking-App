import React from 'react';

const Schedule = () => {
    return (
        <div>
            <h2 className="text-xl font-bold pb-3">Your Week Ahead</h2>
            <div className="rounded-lg border border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20 p-2 w-14">
                        <span className="text-xs font-bold uppercase text-primary">OCT</span>
                        <span className="text-xl font-bold text-primary">28</span>
                    </div>
                    <div>
                        <p className="font-medium">House Cleaning</p>
                        <p className="text-sm text-text-light/70 dark:text-text-dark/70">11:00 AM - Tom Wilson</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20 p-2 w-14">
                        <span className="text-xs font-bold uppercase text-primary">OCT</span>
                        <span className="text-xl font-bold text-primary">29</span>
                    </div>
                    <div>
                        <p className="font-medium">Landscaping</p>
                        <p className="text-sm text-text-light/70 dark:text-text-dark/70">9:00 AM - Maria Garcia</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20 p-2 w-14">
                        <span className="text-xs font-bold uppercase text-primary">OCT</span>
                        <span className="text-xl font-bold text-primary">30</span>
                    </div>
                    <div>
                        <p className="font-medium">Electrical Repair</p>
                        <p className="text-sm text-text-light/70 dark:text-text-dark/70">3:30 PM - Ben Carter</p>
                    </div>
                </div>
                <button className="mt-2 w-full flex items-center justify-center h-10 rounded-lg bg-background-light dark:bg-background-dark text-sm font-medium hover:bg-primary/10 dark:hover:bg-primary/20">View Full Calendar</button>
            </div>
        </div>
    );
};

export default Schedule;
