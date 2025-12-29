// import React, { useEffect, useRef, useState } from 'react';
// import tt from '@tomtom-international/web-sdk-maps';
// import * as ttServices from '@tomtom-international/web-sdk-services';
// import '@tomtom-international/web-sdk-maps/dist/maps.css';

// const TomTomMap = ({ center = [77.5946, 12.9716], zoom = 14, services = [] }) => {
//     const mapElement = useRef();
//     const [map, setMap] = useState(null);
//     const [mapCenter, setMapCenter] = useState(center);
//     const [userLocation, setUserLocation] = useState(null);
//     const apiKey = import.meta.env.VITE_TOMTOM_API_KEY; // Removed markerRef as it wasn't strictly needed for the list logic

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { longitude, latitude } = position.coords;
//                     const userLoc = [longitude, latitude];
//                     setMapCenter(userLoc);
//                     setUserLocation(userLoc);
//                 },
//                 (error) => {
//                     console.warn("Geolocation access denied or failed", error);
//                 }
//             );
//         }
//     }, []);

//     useEffect(() => {
//         if (!apiKey) return;

//         let mapInstance = null;
//         if (mapElement.current) {
//             try {
//                 mapInstance = tt.map({
//                     key: apiKey,
//                     container: mapElement.current,
//                     center: mapCenter,
//                     zoom: zoom,
//                 });

//                 setMap(mapInstance);
//                 mapInstance.addControl(new tt.NavigationControl());
//                 mapInstance.addControl(new tt.GeolocateControl({
//                     positionOptions: {
//                         enableHighAccuracy: true,
//                     },
//                     trackUserLocation: true,
//                 }));

//             } catch (error) {
//                 console.error("Failed to initialize TomTom map:", error);
//             }
//         }

//         return () => {
//             if (mapInstance) {
//                 mapInstance.remove();
//             }
//         };
//     }, [apiKey]);

//     const clearRoute = () => {
//         if (!map) return;
//         if (map.getLayer('route')) {
//             map.removeLayer('route');
//             map.removeSource('route');
//         }
//     };

//     const calculateRoute = (destination) => {
//         const startPoint = userLocation || mapCenter;
//         if (!map || !startPoint) return;

//         // Clear existing route before calculating new one
//         clearRoute();

//         const routeOptions = {
//             key: apiKey,
//             locations: [startPoint, destination],
//             travelMode: 'car',
//         };

//         ttServices.services.calculateRoute(routeOptions)
//             .then((response) => {
//                 const geojson = response.toGeoJson();

//                 // clearRoute() is called above, but just in case
//                 if (map.getLayer('route')) {
//                     map.removeLayer('route');
//                     map.removeSource('route');
//                 }

//                 map.addSource('route', {
//                     type: 'geojson',
//                     data: geojson,
//                 });

//                 map.addLayer({
//                     id: 'route',
//                     type: 'line',
//                     source: 'route',
//                     paint: {
//                         'line-color': '#4a90e2',
//                         'line-width': 6,
//                         'line-opacity': 0.8,
//                     },
//                 });

//                 const bounds = new tt.LngLatBounds();
//                 geojson.features[0].geometry.coordinates.forEach((point) => {
//                     bounds.extend(tt.LngLat.convert(point));
//                 });
//                 map.fitBounds(bounds, { padding: 50 });
//             })
//             .catch((error) => {
//                 console.error('Error calculating route:', error);
//             });
//     };

//     const calculateDistance = (loc1, loc2) => {
//         if (!loc1 || !loc2) return null;
//         const R = 6371; // Radius of the earth in km
//         const dLat = (loc2[1] - loc1[1]) * (Math.PI / 180);
//         const dLon = (loc2[0] - loc1[0]) * (Math.PI / 180);
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(loc1[1] * (Math.PI / 180)) * Math.cos(loc2[1] * (Math.PI / 180)) *
//             Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const d = R * c; // Distance in km
//         return d.toFixed(1);
//     };

//     useEffect(() => {
//         if (map && services.length > 0) {
//             // Note: In a real app, clear existing markers to avoid duplicates on re-render
//             // For now, we assume this effect runs once or services don't change often in this view

//             services.forEach(service => {
//                 if (service.latitude && service.longitude) {
//                     const popupOffset = 25;
//                     const destination = [service.longitude, service.latitude];

//                     const dist = calculateDistance(userLocation, destination);
//                     const distanceDisplay = dist ? `${dist} km` : (service.distance ? `${service.distance} km` : 'N/A');

//                     const popupNode = document.createElement('div');
//                     popupNode.style.padding = '10px';
//                     popupNode.style.minWidth = '200px';
//                     popupNode.style.fontFamily = 'Inter, sans-serif';

//                     popupNode.innerHTML = `
//                         <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px;">
//                             <div style="width: 40px; height: 40px; border-radius: 50%; background-image: url('${service.image || "https://via.placeholder.com/150"}'); background-size: cover; background-position: center;"></div>
//                             <div>
//                                 <h4 style="margin: 0; font-weight: bold; font-size: 14px; color: #111827;">${service.providerName}</h4>
//                                 <p style="margin: 0; font-size: 12px; color: #6B7280;">${service.title}</p>
//                             </div>
//                         </div>
//                         <div style="margin-bottom: 8px; font-size: 13px;">
//                             <span style="font-weight: 600; color: #111827;">Rating:</span> <span style="color: #F59E0B;">${service.rating} ★</span>
//                         </div>
//                         <div style="margin-bottom: 12px; font-size: 13px;">
//                              <span style="font-weight: 600; color: #111827;">Distance:</span> <span style="color: #6B7280;">${distanceDisplay}</span>
//                         </div>
//                     `;

//                     const routeBtn = document.createElement('button');
//                     routeBtn.innerText = 'Get Directions';
//                     routeBtn.style.width = '100%';
//                     routeBtn.style.padding = '8px 12px';
//                     routeBtn.style.backgroundColor = '#4A90E2';
//                     routeBtn.style.color = 'white';
//                     routeBtn.style.border = 'none';
//                     routeBtn.style.borderRadius = '6px';
//                     routeBtn.style.cursor = 'pointer';
//                     routeBtn.style.fontSize = '12px';
//                     routeBtn.style.fontWeight = '500';
//                     routeBtn.style.transition = 'background-color 0.2s';

//                     routeBtn.onmouseover = () => routeBtn.style.backgroundColor = '#357ABD';
//                     routeBtn.onmouseout = () => routeBtn.style.backgroundColor = '#4A90E2';

//                     routeBtn.onclick = () => calculateRoute(destination);
//                     popupNode.appendChild(routeBtn);

//                     const popup = new tt.Popup({ offset: popupOffset }).setDOMContent(popupNode);

//                     // Clear route when popup closes
//                     popup.on('close', () => {
//                         clearRoute();
//                     });

//                     const marker = new tt.Marker()
//                         .setLngLat(destination)
//                         .setPopup(popup)
//                         .addTo(map);
//                 }
//             });
//         }
//     }, [map, services, userLocation]);

//     useEffect(() => {
//         if (map) {
//             // Optional: update map view if needed
//         }
//     }, [mapCenter, zoom, map]);

//     if (!apiKey) {
//         return (
//             <div className="w-full h-full rounded-lg shadow-md border border-red-300 bg-red-50 flex items-center justify-center p-4">
//                 <div className="text-center text-red-600">
//                     <p className="font-bold">Map unavailable</p>
//                     <p className="text-sm">Missing VITE_TOMTOM_API_KEY in .env file</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div
//             ref={mapElement}
//             className="w-full h-full rounded-lg shadow-md border border-gray-200"
//             style={{ minHeight: '400px' }}
//         />
//     );
// };

// export default TomTomMap;