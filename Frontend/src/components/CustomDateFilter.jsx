import React  from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { dateFilterState } from '../state/atoms';

const CustomDateFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [globalDateRange, setGlobalDateRange] = useRecoilState(dateFilterState);

    // Temp state while popup is open
    const [tempRange, setTempRange] = useState(globalDateRange);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isRangeSelectionActive, setIsRangeSelectionActive] = useState(false);

    const presets = useMemo(() => [
        { key: 'all', label: 'All time' },
        { key: 'today', label: 'Today' },
        { key: 'last-7-days', label: 'Last 7 days' },
        { key: 'last-30-days', label: 'Last 30 days' },
        { key: 'last-month', label: 'Last month' },
    ], []);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const numDays = daysInMonth(year, month);
        const firstDay = firstDayOfMonth(year, month);
        const grid = [];
        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    week.push(null);
                } else if (dayCounter > numDays) {
                    week.push(null);
                } else {
                    week.push(dayCounter);
                    dayCounter++;
                }
            }
            grid.push(week);
            if (dayCounter > numDays) break;
        }
        return grid;
    }, [currentDate]);

    const handleDayDoubleClick = (day) => {
        if (!day) return;
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setTempRange([newDate, null]);
        setIsRangeSelectionActive(true); // Start range selection
    };

    const handleDayClick = (day) => {
        if (!day) return;

        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

        if (isRangeSelectionActive) {
            // If range selection is active, complete the range.
            const [start] = tempRange;
            setTempRange(newDate.getTime() < start.getTime() ? [newDate, start] : [start, newDate]);
        } else {
            // If not in range selection, just select a single day.
            setTempRange([newDate, newDate]);
        }
        setIsRangeSelectionActive(false); // Always end range selection after a single click.
    };

    const handlePresetClick = (key) => {
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        switch (key) {
            case 'all':
                setIsRangeSelectionActive(false);
                setTempRange('all');
                break;
            case 'today':
                setTempRange([todayStart, todayEnd]);
                break;
            case 'last-7-days':
                const sevenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
                setTempRange([sevenDaysAgo, todayEnd]);
                break;
            case 'last-30-days':
                const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29);
                setTempRange([thirtyDaysAgo, todayEnd]);
                break;
            case 'last-month':
                const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
                setTempRange([lastMonthStart, lastMonthEnd]);
                break;
            default:
                break;
        }
    };

    const handleApply = () => {
        setGlobalDateRange(tempRange);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setTempRange(globalDateRange); // Reset to global state
        setIsOpen(false);
    };

    const getDisplayValue = () => {
        if (globalDateRange === 'all' || !Array.isArray(globalDateRange)) {
            return 'All time';
        }
        const [start, end] = globalDateRange;
        const formatDate = (date) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
        if (end) {
            return `${formatDate(start)} - ${formatDate(end)}`;
        }
        return formatDate(start);
    };

    const getDayClass = (day) => {
        if (!day || !Array.isArray(tempRange) || !tempRange[0]) {
            return `p-1 rounded-full ${day ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700' : ''}`;
        }

        const [start, end] = tempRange;
        const current = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        current.setHours(12); // Normalize time to avoid timezone issues

        let classes = `p-1 cursor-pointer `;

        if (end) {
            const isStart = current.toDateString() === start.toDateString();
            const isEnd = current.toDateString() === end.toDateString();
            const isInRange = current > start && current < end;

            if (isStart) {
                classes += 'bg-primary text-white rounded-l-full';
            } else if (isEnd) {
                classes += 'bg-primary text-white rounded-r-full';
            } else if (isInRange) {
                classes += 'bg-primary/20 dark:bg-primary/30 rounded-none';
            } else {
                classes += 'rounded-full hover:bg-gray-200 dark:hover:bg-gray-700';
            }
        } else if (current.toDateString() === start.toDateString()) {
            classes += 'bg-primary text-white rounded-full';
        }
        return classes;
    };

    return (
        <div className="relative">
            <input
                readOnly
                value={getDisplayValue()}
                onClick={() => setIsOpen(true)}
                className="w-full cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-96 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 z-10 p-4">
                    <div className="flex justify-between">
                        {/* Presets */}
                        <div className="flex flex-col gap-2 w-1/3">
                            {presets.map(p => (
                                <button key={p.key} onClick={() => handlePresetClick(p.key)} className="text-left text-sm p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">{p.label}</button>
                            ))}
                        </div>
                        {/* Calendar */}
                        <div className="w-2/3">
                            <div className="flex items-center justify-between mb-2">
                                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>&lt;</button>
                                <div className="font-semibold">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>&gt;</button>
                            </div>
                            <div className="grid grid-cols-7 text-center text-xs">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="font-medium text-gray-500">{d}</div>)}
                                {calendarGrid.flat().map((day, i) => (
                                    <div
                                        key={`${currentDate.getMonth()}-${i}`}
                                        onClick={() => handleDayClick(day)}
                                        onDoubleClick={() => handleDayDoubleClick(day)}
                                        className={getDayClass(day)}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                        <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Cancel</button>
                        <button onClick={handleApply} className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary/90">Apply</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDateFilter;
