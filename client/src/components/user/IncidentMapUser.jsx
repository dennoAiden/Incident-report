import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet';
import { Info } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const incidents = [
  { id: 1, position: [-1.2921, 36.8219], title: 'Traffic Accident', description: 'Multi-vehicle collision', severity: 'high', time: '10 minutes ago' },
  { id: 2, position: [-1.2864, 36.8172], title: 'Fire Emergency', description: 'Building fire reported', severity: 'critical', time: '25 minutes ago' },
  { id: 3, position: [-1.2954, 36.8080], title: 'Medical Emergency', description: 'Ambulance requested', severity: 'medium', time: '1 hour ago' }
];

function IncidentMapUser() {
  const [mapType, setMapType] = useState('streets');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'rgb(220, 38, 38)';
      case 'high': return 'rgb(234, 88, 12)';
      case 'medium': return 'rgb(234, 179, 8)';
      default: return 'rgb(59, 130, 246)';
    }
  };

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh]">
      {/* Map Type Switch */}
      <div className="absolute top-4 left-1/2 sm:left-4 transform -translate-x-1/2 sm:translate-x-0 z-[1000] bg-gray-900/70 backdrop-blur-md rounded-lg p-2 flex space-x-2">
        <button
          onClick={() => setMapType('streets')}
          className={`px-3 py-1 rounded-md text-sm sm:text-base transition-all ${
            mapType === 'streets' ? 'bg-yellow-500 text-black' : 'text-white hover:bg-white/10'
          }`}
        >
          Streets
        </button>
        <button
          onClick={() => setMapType('satellite')}
          className={`px-3 py-1 rounded-md text-sm sm:text-base transition-all ${
            mapType === 'satellite' ? 'bg-yellow-500 text-black' : 'text-white hover:bg-white/10'
          }`}
        >
          Satellite
        </button>
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 left-1/2 sm:left-auto sm:right-4 transform -translate-x-1/2 sm:translate-x-0 z-[1000] bg-gray-900/80 backdrop-blur-md rounded-lg p-3 sm:p-4 w-[90%] sm:w-72 md:w-80 max-h-56 overflow-y-auto">
        <h3 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
          <Info className="h-4 w-4 mr-2" /> Incident Summary
        </h3>
        <div className="space-y-2">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className={`p-2 rounded-md transition-all cursor-pointer ${
                selectedIncident === incident.id
                  ? 'bg-yellow-500/20 border border-yellow-500/50'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => setSelectedIncident(incident.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-white font-medium text-sm sm:text-base">{incident.title}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">{incident.time}</p>
                </div>
                <span className="text-yellow-400 text-xs sm:text-sm font-semibold">{incident.severity.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[-1.2921, 36.8219]}
        zoom={13}
        zoomControl={false}
        className="h-full w-full"
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          url={mapType === 'streets'
            ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          }
        />
        {incidents.map((incident) => (
          <React.Fragment key={incident.id}>
            <Marker position={incident.position} icon={defaultIcon}>
              <Popup>
                <div>
                  <h3 className="font-bold">{incident.title}</h3>
                  <p>{incident.description}</p>
                  <small>{incident.time}</small>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={incident.position}
              radius={400}
              pathOptions={{
                color: getSeverityColor(incident.severity),
                fillColor: getSeverityColor(incident.severity),
                fillOpacity: 0.3,
              }}
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}

export default IncidentMapUser;
