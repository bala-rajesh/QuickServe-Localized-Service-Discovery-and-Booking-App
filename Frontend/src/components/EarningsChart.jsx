import React from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardEarningsChartSelector } from '../state/selectors';

const EarningsChart = () => {
    const data = useRecoilValue(dashboardEarningsChartSelector);

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center pb-3">
                <h2 className="text-xl font-bold">Earnings Overview</h2>
                <Link to="/service-provider/earnings" className="text-sm font-medium text-primary hover:underline">View More</Link>
            </div>
            <div className="rounded-lg border border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark p-6" style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        className="focus:outline-none"
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="label" />
                        <YAxis/>
                        <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Earnings']} />
                        <Bar dataKey="earnings" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EarningsChart;
