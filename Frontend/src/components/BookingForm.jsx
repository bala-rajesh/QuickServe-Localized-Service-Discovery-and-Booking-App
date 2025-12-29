import React, { useState, useEffect } from 'react';

const BookingForm = ({ onCancel, initialCategory, initialData, onSubmit }) => {
    const [category, setCategory] = useState(initialCategory || '');
    const [address, setAddress] = useState('');
    const [requestDetails, setRequestDetails] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (initialData) {
            setCategory(initialData.serviceType || '');
            setAddress(initialData.address || '');
            setRequestDetails(initialData.description || '');
            setDate(initialData.date || '');
            setTime(initialData.time || '');
        } else if (initialCategory) setCategory(initialCategory);
    }, [initialCategory, initialData]);

    // Styles
    const styles = {
        pageWrapper: {
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 20px 40px 20px', // Top padding for header, side padding for mobile
            boxSizing: 'border-box',
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            padding: '40px',
            maxWidth: '800px',
            width: '100%',
            boxSizing: 'border-box',
        },
        input: {
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            width: '100%',
            fontSize: '1rem',
            boxSizing: 'border-box',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: 600,
            color: '#555',
        },
        sectionTitle: {
            color: '#007bff',
            fontWeight: 700,
            fontSize: '1.4rem',
            margin: '30px 0 15px',
            borderBottom: '2px solid #eee',
            paddingBottom: '5px',
        }
    };

    const handleContinue = () => {
        if (category && address && requestDetails && date && time) {
            setStep(2);
        } else {
            alert('Please fill all fields');
        }
    };

    const handleSubmit = () => {
        if (category && address && requestDetails && date && time) {
            if (onSubmit) {
                onSubmit({ category, address, description: requestDetails, date, time });
            }
        } else {
            alert('Please fill all fields');
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.card}>
                <h1 style={{ color: '#007bff', fontSize: '2.2rem', marginTop: 0 }}>
                    {initialData ? 'Reschedule Service' : 'Schedule a Service'}
                </h1>

                <p style={{ color: '#666', marginBottom: '30px' }}>
                    Enter your service request details below. We'll find the best professionals near you.
                </p>

                {step === 1 && (
                    <>
                        <h3 style={styles.sectionTitle}>1. What & Where</h3>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '250px' }}>
                                <label style={styles.label}>Service Category</label>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)} 
                                    style={{
                                        ...styles.input,
                                        backgroundColor: initialData ? '#f3f4f6' : '#fff',
                                        cursor: initialData ? 'not-allowed' : 'default'
                                    }}
                                    disabled={!!initialData}
                                >
                                    <option value="">Select category</option>
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Cleaning">Deep House Cleaning</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Handyman">Handyman</option>
                                </select>
                            </div>
                            <div style={{ flex: 1, minWidth: '250px' }}>
                                <label style={styles.label}>Service Address</label>
                                <input type="text" placeholder="Start typing your address..." value={address} onChange={(e) => setAddress(e.target.value)} style={styles.input} />
                            </div>
                        </div>

                        <label style={styles.label}>Describe the Request</label>
                        <textarea value={requestDetails} onChange={(e) => setRequestDetails(e.target.value)} style={{ ...styles.input, minHeight: '100px' }} />

                        <h3 style={styles.sectionTitle}>2. When Do You Need Service?</h3>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '250px' }}>
                                <label style={styles.label}>Date</label>
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} />
                            </div>
                            <div style={{ flex: 1, minWidth: '250px' }}>
                                <label style={styles.label}>Time</label>
                                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={styles.input} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                            <button onClick={onCancel} style={{ backgroundColor: '#f1f1f1', color: '#333', padding: '12px 25px', borderRadius: '8px', border: '1px solid #ddd', fontWeight: '600', cursor: 'pointer' }}>
                                Cancel
                            </button>
                            {initialData ? (
                                <button onClick={handleSubmit} style={{ backgroundColor: '#007bff', color: '#fff', padding: '12px 25px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                                    Confirm Reschedule
                                </button>
                            ) : (
                                <button onClick={handleContinue} style={{ backgroundColor: '#007bff', color: '#fff', padding: '12px 25px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                                    Continue
                                </button>
                            )}
                        </div>
                    </>
                )}

                {step === 2 && (
                    <div style={{ textAlign: 'center', padding: '30px' }}>
                        <h2 style={{ color: '#007bff' }}>Select Provider</h2>
                        <p>Matching you with professionals...</p>
                        <button onClick={() => setStep(1)} style={{ backgroundColor: '#f1f1f1', border: '1px solid #ddd', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                            ← Back
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingForm;