import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

const TomTomMap = ({ center = [77.5946, 12.9716], zoom = 14 }) => {
    const mapElement = useRef();
    const [map, setMap] = useState(null);
    const [mapCenter, setMapCenter] = useState(center);
    const markerRef = useRef(null);

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
        let mapInstance = null;
        if (mapElement.current) {
            mapInstance = tt.map({
                key: import.meta.env.VITE_TOMTOM_API_KEY,
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
        }

        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
            if (markerRef.current) {
                markerRef.current.remove();
            }
        };
    }, []);

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


    return (
        <div
            ref={mapElement}
            className="w-full h-full rounded-lg shadow-md border border-gray-200"
            style={{ minHeight: '400px' }}
        />
    );
};

export default TomTomMap;
