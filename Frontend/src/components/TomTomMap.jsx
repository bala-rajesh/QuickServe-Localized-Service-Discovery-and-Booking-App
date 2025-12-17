import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const TomTomMap = ({ center = [77.5946, 12.9716], zoom = 14 }) => {
    const mapElement = useRef();
    const [map, setMap] = useState(null);
    const [mapCenter, setMapCenter] = useState(center);
    const markerRef = useRef(null);
    const apiKey = import.meta.env.VITE_TOMTOM_API_KEY;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { longitude, latitude } = position.coords;
                    setMapCenter([longitude, latitude]);
                },
                (error) => {
                    console.warn("Geolocation access denied or failed", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (!apiKey) return;

        let mapInstance = null;
        if (mapElement.current) {
            try {
                mapInstance = tt.map({
                    key: apiKey,
                    container: mapElement.current,
                    center: mapCenter,
                    zoom: zoom,
                });

                setMap(mapInstance);
                mapInstance.addControl(new tt.NavigationControl());
                mapInstance.addControl(new tt.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    trackUserLocation: true,
                }));

                // Add initial marker
                const marker = new tt.Marker().setLngLat(mapCenter).addTo(mapInstance);
                markerRef.current = marker;
            } catch (error) {
                console.error("Failed to initialize TomTom map:", error);
            }
        }

        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
            if (markerRef.current) {
                markerRef.current.remove();
            }
        };
    }, [apiKey]); // Added apiKey dependency

    useEffect(() => {
        if (map) {
            map.setCenter(mapCenter);
            map.setZoom(zoom);

            // Update marker position
            if (markerRef.current) {
                markerRef.current.setLngLat(mapCenter);
            } else {
                const marker = new tt.Marker().setLngLat(mapCenter).addTo(map);
                markerRef.current = marker;
            }
        }
    }, [mapCenter, zoom, map]);

    if (!apiKey) {
        return (
            <div className="w-full h-full rounded-lg shadow-md border border-red-300 bg-red-50 flex items-center justify-center p-4">
                <div className="text-center text-red-600">
                    <p className="font-bold">Map unavailable</p>
                    <p className="text-sm">Missing VITE_TOMTOM_API_KEY in .env file</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={mapElement}
            className="w-full h-full rounded-lg shadow-md border border-gray-200"
            style={{ minHeight: '400px' }}
        />
    );
};

export default TomTomMap;
