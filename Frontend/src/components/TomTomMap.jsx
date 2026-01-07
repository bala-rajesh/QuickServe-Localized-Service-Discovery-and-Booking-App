import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import * as ttServices from '@tomtom-international/web-sdk-services';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import quickServeLogo from '../assets/quickserve-logo.png';

// MODIFIED: Refactored to accept dynamic provider data instead of hardcoded services
const TomTomMap = ({
    center = [77.5946, 12.9716],
    zoom = 14,
    providers = [],  // DATABASE: Dynamic provider data from API
    onMarkerClick = null  // ADDED: Callback to communicate selected provider to parent
}) => {
    const [mapContainer, setMapContainer] = useState(null); // MODIFIED: Changed to useState for callback ref
    const [map, setMap] = useState(null);
    const [mapCenter, setMapCenter] = useState(center);
    const [userLocation, setUserLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_TOMTOM_API_KEY;
    const markersRef = useRef([]); // ADDED: Track markers for cleanup

    // ADDED: Get user's current location via browser geolocation
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { longitude, latitude } = position.coords;
                    const userLoc = [longitude, latitude];
                    setMapCenter(userLoc);
                    setUserLocation(userLoc);
                },
                (error) => {
                    console.warn("Geolocation access denied or failed", error);
                    // Use default center if geolocation fails
                }
            );
        }
    }, []);

    // ADDED: Initialize map when container becomes available (triggered by callback ref)
    useEffect(() => {
        console.log("[TomTomMap] Map container changed:", mapContainer);

        if (!apiKey) {
            console.error("[TomTomMap] Missing API key");
            setError("Missing TomTom API key");
            setIsLoading(false);
            return;
        }

        if (!mapContainer) {
            console.log("[TomTomMap] No map container yet, waiting...");
            return; // Wait for callback ref to set the container
        }

        console.log("[TomTomMap] Creating map instance...");
        let mapInstance = null;
        try {
            mapInstance = tt.map({
                key: apiKey,
                container: mapContainer,
                center: mapCenter,
                zoom: zoom,
            });

            console.log("[TomTomMap] Map instance created successfully");
            setMap(mapInstance);

            // Add navigation controls (zoom buttons)
            mapInstance.addControl(new tt.NavigationControl());

            // Add geolocation control (user location button)
            mapInstance.addControl(new tt.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            }));

            console.log("[TomTomMap] Map initialized successfully");
            setIsLoading(false);
        } catch (error) {
            console.error("[TomTomMap] Failed to initialize map:", error);
            setError("Failed to load map");
            setIsLoading(false);
        }

        // Cleanup on unmount
        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    }, [apiKey, mapContainer, mapCenter, zoom]); // React to mapContainer changes

    // ADDED: Clear existing route from map
    const clearRoute = () => {
        if (!map) return;
        if (map.getLayer('route')) {
            map.removeLayer('route');
            map.removeSource('route');
        }
    };

    // ADDED: Calculate and display route from user location to destination
    const calculateRoute = (destination) => {
        const startPoint = userLocation || mapCenter;
        if (!map || !startPoint) return;

        clearRoute();

        const routeOptions = {
            key: apiKey,
            locations: [startPoint, destination],
            travelMode: 'car',
        };

        ttServices.services.calculateRoute(routeOptions)
            .then((response) => {
                const geojson = response.toGeoJson();

                // Add route to map
                map.addSource('route', {
                    type: 'geojson',
                    data: geojson,
                });

                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    paint: {
                        'line-color': '#4a90e2',
                        'line-width': 6,
                        'line-opacity': 0.8,
                    },
                });

                // Fit map to show entire route
                const bounds = new tt.LngLatBounds();
                geojson.features[0].geometry.coordinates.forEach((point) => {
                    bounds.extend(tt.LngLat.convert(point));
                });
                map.fitBounds(bounds, { padding: 50 });
            })
            .catch((error) => {
                console.error('Error calculating route:', error);
            });
    };

    // ADDED: Calculate distance between two coordinates (Haversine formula)
    const calculateDistance = (loc1, loc2) => {
        if (!loc1 || !loc2) return null;
        const R = 6371; // Radius of the earth in km
        const dLat = (loc2[1] - loc1[1]) * (Math.PI / 180);
        const dLon = (loc2[0] - loc1[0]) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(loc1[1] * (Math.PI / 180)) * Math.cos(loc2[1] * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d.toFixed(1);
    };

    // DATABASE: Add markers for providers
    useEffect(() => {
        if (!map || !providers || providers.length === 0) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Filter providers
        const validProviders = [];
        const providersToGeocode = [];

        providers.forEach(p => {
            if (p.latitude != null && p.longitude != null && !isNaN(p.latitude) && !isNaN(p.longitude)) {
                validProviders.push(p);
            } else if (p.address && p.address.length > 5) { // Only attempt geocode if address exists and looks real
                providersToGeocode.push(p);
            }
        });

        // Helper to add marker
        const addMarker = (provider, lngLat) => {
            // Calculate distance from user
            const dist = calculateDistance(userLocation, lngLat);

            // Create marker
            const marker = new tt.Marker()
                .setLngLat(lngLat)
                .addTo(map);

            // Click handler
            marker.getElement().addEventListener('click', () => {
                if (onMarkerClick) {
                    onMarkerClick({
                        ...provider,
                        distance: dist,
                        calculateRoute: () => calculateRoute(lngLat),
                        clearRoute: clearRoute
                    });
                }
            });

            // Store for cleanup
            markersRef.current.push(marker);
        };

        // 1. Add markers for providers with valid DB coordinates
        validProviders.forEach(provider => {
            addMarker(provider, [provider.longitude, provider.latitude]);
        });

        // 2. Geocode providers without coordinates (Client-side Geocoding)
        providersToGeocode.forEach(provider => {
            ttServices.services.geocode({
                key: apiKey,
                query: provider.address,
            })
                .then(response => {
                    if (response.results && response.results.length > 0) {
                        const position = response.results[0].position; // {lat, lng}
                        const lngLat = [position.lng, position.lat];
                        console.log(`[TomTomMap] Geocoded ${provider.name}:`, lngLat);
                        addMarker(provider, lngLat);
                    } else {
                        console.warn(`[TomTomMap] Could not geocode address via API: ${provider.address}`);
                    }
                })
                .catch(err => {
                    console.error(`[TomTomMap] Geocoding error for ${provider.name}:`, err);
                });
        });


        // Cleanup markers on unmount or when providers change
        return () => {
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];
        };
    }, [map, providers, userLocation]);

    // Error state
    if (error || !apiKey) {
        return (
            <div className="w-full h-full rounded-lg shadow-md border border-red-300 bg-red-50 flex items-center justify-center p-4">
                <div className="text-center text-red-600">
                    <p className="font-bold">Map unavailable</p>
                    <p className="text-sm">
                        {error || "Missing VITE_TOMTOM_API_KEY in .env file"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-50 w-full h-full rounded-lg shadow-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                        <p className="font-bold">Loading map...</p>
                    </div>
                </div>
            )}
            {/* Map Container - MODIFIED: Using callback ref for proper conditional rendering support */}
            <div
                ref={setMapContainer}
                className="w-full h-full rounded-lg shadow-md border border-gray-200"
                style={{ minHeight: '400px' }}
            />

            {/* ADDED: Logo overlay for branding */}
            <div
                className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 z-10"
                style={{ pointerEvents: 'none' }}
            >
                <img
                    src={quickServeLogo}
                    alt="QuickServe"
                    className="h-8"
                />
            </div>
        </div>
    );
};

export default TomTomMap;