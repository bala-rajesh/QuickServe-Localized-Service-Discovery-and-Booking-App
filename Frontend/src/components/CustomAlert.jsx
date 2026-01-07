import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertCard } from "./ui/alert-card.jsx";
import { CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

const AlertContext = createContext();

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((message, type = 'info', duration = 3000) => {
        setAlert({ message, type, isVisible: true });
        if (duration > 0) {
            setTimeout(() => {
                hideAlert();
            }, duration);
        }
    }, []);

    const hideAlert = useCallback(() => {
        setAlert((prev) => (prev ? { ...prev, isVisible: false } : null));
        // Allow animation to finish before removing from DOM (optional, handled by AnimatePresence in AlertCard but we need to unmount eventually or keep it hidden)
        // Since AlertCard uses AnimatePresence internally for isVisible, we can keep the alert state but set isVisible false.
        // However, to completely clear it, we might want a delay.
        // For simplicity, let's rely on AlertCard's internal AnimatePresence handling the exit animation when isVisible becomes false.
        setTimeout(() => setAlert(null), 300);
    }, []);

    const getIcon = (type) => {
        const props = { className: "h-6 w-6 text-destructive-foreground" };
        switch (type) {
            case 'success': return <CheckCircle {...props} />;
            case 'error': return <AlertCircle {...props} />;
            case 'warning': return <AlertTriangle {...props} />;
            default: return <Info {...props} />;
        }
    };

    const getTitle = (type) => {
        switch (type) {
            case 'success': return 'Success';
            case 'error': return 'Error';
            case 'warning': return 'Warning';
            default: return 'Information';
        }
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {alert && (
                <div className="fixed inset-0 flex items-center justify-center z-[2000] px-4 bg-black/20 backdrop-blur-sm">
                    <div className="w-full max-w-sm">
                        <AlertCard
                            isVisible={alert.isVisible}
                            title={getTitle(alert.type)}
                            description={alert.message}
                            buttonText="Dismiss"
                            onButtonClick={hideAlert}
                            onDismiss={hideAlert}
                            icon={getIcon(alert.type)}
                            className={alert.type === 'success' ? 'bg-green-600 text-white' :
                                alert.type === 'warning' ? 'bg-amber-500 text-white' :
                                    alert.type === 'info' ? 'bg-blue-500 text-white' : undefined}
                        />
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
};
