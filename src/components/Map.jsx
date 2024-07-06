import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from 'next-themes';

const Map = ({ mapData, cyberpunkMode, onMarkerClick, filters, route }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([37.7749, -122.4194], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);
      }

      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add new markers
      const { safetyInfo, restaurants, events } = mapData;

      const createMarkerIcon = (emoji, type) => {
        const cyberpunkClass = cyberpunkMode ? 'cyberpunk-marker' : '';
        return L.divIcon({
          html: `<div class="marker-icon ${cyberpunkClass} ${type}-icon">${emoji}</div>`,
          className: 'custom-div-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });
      };

      if (filters.safety) {
        safetyInfo.forEach(info => {
          const marker = L.circleMarker([info.lat, info.lng], {
            radius: 8,
            fillColor: info.level === 'Low' ? '#00ff00' : info.level === 'Medium' ? '#ffff00' : '#ff0000',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(mapRef.current);
          
          marker.on('click', () => {
            setSelectedMarker({ type: 'safety', data: info });
            onMarkerClick({ type: 'safety', data: info });
          });

          markersRef.current.push(marker);
        });
      }

      if (filters.restaurants) {
        restaurants.forEach(restaurant => {
          const marker = L.marker([restaurant.lat, restaurant.lng], {
            icon: createMarkerIcon(cyberpunkMode ? '🍖' : '🍽️', 'restaurant')
          }).addTo(mapRef.current);
          
          marker.on('click', () => {
            setSelectedMarker({ type: 'restaurant', data: restaurant });
            onMarkerClick({ type: 'restaurant', data: restaurant });
          });

          markersRef.current.push(marker);
        });
      }

      if (filters.events) {
        events.forEach(event => {
          const marker = L.marker([event.lat, event.lng], {
            icon: createMarkerIcon(cyberpunkMode ? '🎭' : '🎉', 'event')
          }).addTo(mapRef.current);
          
          marker.on('click', () => {
            setSelectedMarker({ type: 'event', data: event });
            onMarkerClick({ type: 'event', data: event });
          });

          markersRef.current.push(marker);
        });
      }

      // Add route if available
      if (route) {
        const routeCoordinates = route.steps.map(step => [step.lat, step.lng]);
        L.polyline(routeCoordinates, { color: cyberpunkMode ? '#00ff00' : '#3388ff' }).addTo(mapRef.current);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapData, cyberpunkMode, onMarkerClick, filters, route]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [theme]);

  return (
    <div id="map" style={{ width: '100%', height: '100%' }} className={cyberpunkMode ? 'cyberpunk-map' : ''} />
  );
};

export default Map;