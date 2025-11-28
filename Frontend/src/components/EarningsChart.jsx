import React from 'react';
import { useRecoilValue } from 'recoil';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { earningsOverviewSelector } from '../state/selectors';

const EarningsChart = () => {
    const data = useRecoilValue(earningsOverviewSelector);

    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-bold pb-3">Earnings Overview</h2>
            <div className="rounded-lg border border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark p-6" style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
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
