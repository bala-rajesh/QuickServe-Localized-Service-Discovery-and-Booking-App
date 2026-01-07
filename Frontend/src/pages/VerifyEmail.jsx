import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../api/AuthService';
// We'll add some inline styles or create a new CSS file for this specific component
// to keep it self-contained and neat.

export default function VerifyEmail() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(0);

    const inputRefs = useRef([]);

    useEffect(() => {
        // Focus the first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.every(char => !isNaN(char))) {
            const newOtp = [...otp];
            pastedData.forEach((val, i) => {
                if (i < 6) newOtp[i] = val;
            });
            setOtp(newOtp);
            // Focus the last filled input or the next empty one
            const nextIndex = Math.min(pastedData.length, 5);
            inputRefs.current[nextIndex].focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter a complete 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const response = await AuthService.verifyOtp(email, otpString);
            setSuccess(response.message || 'Email verified successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (timer > 0) return;

        setError('');
        setSuccess('');
        setResending(true);

        try {
            const response = await AuthService.resendOtp(email);
            setSuccess(response.message || 'New OTP sent to your email');
            setTimer(60); // 60 seconds cooldown
        } catch (err) {
            setError(err.message || 'Failed to resend OTP');
        } finally {
            setResending(false);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            padding: '20px',
        },
        card: {
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
            width: '100%',
            maxWidth: '450px',
            textAlign: 'center',
        },
        title: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '10px',
        },
        subtitle: {
            color: '#6b7280',
            marginBottom: '30px',
            lineHeight: '1.5',
        },
        email: {
            fontWeight: '600',
            color: '#111827',
        },
        otpContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            marginBottom: '30px',
        },
        input: {
            width: '100%',
            height: '50px',
            fontSize: '24px',
            textAlign: 'center',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#f9fafb',
            transition: 'all 0.2s',
            outline: 'none',
        },
        button: {
            width: '100%',
            padding: '14px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        resend: {
            marginTop: '24px',
            color: '#6b7280',
            fontSize: '14px',
        },
        resendLink: {
            color: timer > 0 ? '#9ca3af' : '#2563eb',
            fontWeight: '600',
            cursor: timer > 0 ? 'default' : 'pointer',
            textDecoration: 'none',
            marginLeft: '5px',
            background: 'none',
            border: 'none',
            padding: 0,
        },
        error: {
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
        },
        success: {
            backgroundColor: '#dcfce7',
            color: '#16a34a',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
        },
        backLink: {
            display: 'block',
            marginTop: '20px',
            color: '#6b7280',
            textDecoration: 'none',
            fontSize: '14px',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={{ marginBottom: '20px', fontSize: '40px' }}>✉️</div>
                <h2 style={styles.title}>Check your email</h2>
                <p style={styles.subtitle}>
                    We've sent a verification code to <br />
                    <span style={styles.email}>{email}</span>
                </p>

                {error && <div style={styles.error}>{error}</div>}
                {success && <div style={styles.success}>{success}</div>}

                <form onSubmit={handleVerify}>
                    <div style={styles.otpContainer}>
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                name="otp"
                                maxLength="1"
                                value={data}
                                ref={el => inputRefs.current[index] = el}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                onFocus={e => e.target.style.borderColor = '#2563eb'}
                                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                                style={styles.input}
                                autoComplete="off"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        style={{
                            ...styles.button,
                            backgroundColor: loading ? '#93c5fd' : '#2563eb',
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                <div style={styles.resend}>
                    Didn't receive the code?
                    <button
                        onClick={handleResendOtp}
                        style={styles.resendLink}
                        disabled={resending || timer > 0}
                    >
                        {resending ? 'Sending...' : timer > 0 ? `Resend in ${timer}s` : 'Click to resend'}
                    </button>
                </div>

                <a href="/login" style={styles.backLink}>&larr; Back to Login</a>
            </div>
        </div>
    );
}
