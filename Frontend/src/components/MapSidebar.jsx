import React from 'react';
import '../Styles/MapSidebar.css';

// ADDED: Sidebar component to display selected provider information
const MapSidebar = ({ provider, userLocation, onClose, onBook }) => {
    if (!provider) return null;

    // Handle "Get Directions" button click
    const handleGetDirections = () => {
        if (provider.calculateRoute) {
            provider.calculateRoute();
        }
    };

    // Handle "Book Service" button click  
    const handleBook = () => {
        if (onBook) {
            onBook(provider);
        }
    };

    return (
        <>
            {/* Backdrop overlay */}
            <div className="map-sidebar-backdrop" onClick={onClose} />

            {/* Sidebar panel */}
            <div className="map-sidebar">
                {/* Close button */}
                <button className="map-sidebar-close" onClick={onClose} aria-label="Close sidebar">
                    ✕
                </button>

                {/* Scrollable content area */}
                <div className="map-sidebar-content">
                    {/* Provider name and category */}
                    <div className="map-sidebar-header">
                        <h2>{provider.name || provider.businessName}</h2>
                        {provider.category && (
                            <span className="map-sidebar-category">{provider.category}</span>
                        )}
                    </div>

                    {/* Rating and completed jobs */}
                    <div className="map-sidebar-stats">
                        <div className="map-sidebar-rating">
                            ⭐ {provider.rating ? Number(provider.rating).toFixed(1) : '0.0'}
                        </div>
                        <div className="map-sidebar-jobs">
                            {provider.completedJobs || 0} jobs completed
                        </div>
                    </div>

                    {/* Distance from user */}
                    {provider.distance && (
                        <div className="map-sidebar-distance">
                            📍 {provider.distance} km away
                        </div>
                    )}

                    {/* Full address */}
                    {(provider.address || provider.providerAddress) && (
                        <div className="map-sidebar-section">
                            <h3>Address</h3>
                            <p>{provider.address || provider.providerAddress}</p>
                        </div>
                    )}

                    {/* Experience */}
                    {provider.experience && (
                        <div className="map-sidebar-section">
                            <h3>Experience</h3>
                            <p>{provider.experience}</p>
                        </div>
                    )}

                    {/* Description */}
                    {(provider.description || provider.bioShort) && (
                        <div className="map-sidebar-section">
                            <h3>About</h3>
                            <p>{provider.description || provider.bioShort}</p>
                        </div>
                    )}

                    {/* Skills */}
                    {provider.skills && provider.skills.length > 0 && (
                        <div className="map-sidebar-section">
                            <h3>Skills</h3>
                            <div className="map-sidebar-skills">
                                {provider.skills.map((skill, index) => (
                                    <span key={index} className="map-sidebar-skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contact Information */}
                    <div className="map-sidebar-section">
                        <h3>Contact Information</h3>
                        {provider.phone && (
                            <p>
                                <strong>Phone:</strong> <a href={`tel:${provider.phone}`}>{provider.phone}</a>
                            </p>
                        )}
                        {provider.email && (
                            <p>
                                <strong>Email:</strong> <a href={`mailto:${provider.email}`}>{provider.email}</a>
                            </p>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="map-sidebar-actions">
                        <button
                            className="map-sidebar-btn map-sidebar-btn-directions"
                            onClick={handleGetDirections}
                        >
                            🗺️ Get Directions
                        </button>
                        <button
                            className="map-sidebar-btn map-sidebar-btn-book"
                            onClick={handleBook}
                        >
                            📅 Book Service
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MapSidebar;
