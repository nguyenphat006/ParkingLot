"use client";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "@goongmaps/goong-map-react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const GOONG_MAPTILES_KEY = 'jQz7dTS6LtjN9z5JjoBFc7fQ2stAk4UocQnvm51F';

const MapOne: React.FC = () => {
  const [viewport, setViewport] = useState({
    longitude: 108.2772, // Center of Vietnam
    latitude: 14.0583, // Center of Vietnam
    zoom: 4 // Zoom out to view the entire country
  });
  interface Marker {
    id: number;
    name: string;
    formatted_address: string;
    weekday_text: string[];
    latitude: number;
    longitude: number;
    open_now: boolean;
    formatted_phone_number: string;
    available_spaces: number;
    total_spaces: number;
    price_per_hour: number;
    description: string | null;
  }
  
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

  const filteredMarkers = markers.filter(marker =>
    marker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    marker.formatted_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Fetch parking data and set markers
    fetch('http://localhost:8000/api/ParkingLots')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK' && Array.isArray(data.results)) {
          setMarkers(data.results.map((parking: any) => ({
            id: parking.id,
            name: parking.name,
            formatted_address: parking.formatted_address,
            weekday_text: parking.opening_hours.weekday_text,
            latitude: parking.geometry.location.lat,
            longitude: parking.geometry.location.lng,
            open_now: parking.opening_hours.open_now,
            formatted_phone_number: parking.formatted_phone_number,
            available_spaces: parking.available_spaces,
            total_spaces: parking.total_spaces,
            price_per_hour: parking.price_per_hour,
            description: parking.description
          })));
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => console.error('Error fetching parking data:', error));
  }, []);

  const handleMarkerClick = (marker: Marker) => {
    setSelectedMarker(marker);
  };

  const handleClose = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-10 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-12">
      <h4 className="mb-7 text-body-2xlg font-bold text-dark dark:text-white">
        Bãi đậu xe 
      </h4>
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 w-1/4">
          <Autocomplete
            className="bg-white"
            freeSolo
            options={markers}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tìm kiếm bãi đậu xe"
                variant="outlined"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id} className="p-2">
                <strong>{option.name}</strong>
                <p className="text-sm">{option.formatted_address}</p>
              </li>
            )}
          />
        </div>
        <div className="h-[450px] relative">
          <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={setViewport}
            goongApiAccessToken={GOONG_MAPTILES_KEY}
          >
            {filteredMarkers.map(marker => (
              <Marker
                key={marker.id}
                latitude={marker.latitude}
                longitude={marker.longitude}
                offsetLeft={-15}
                offsetTop={-30}
              >
                <div
                  className={`marker ${selectedMarker?.id === marker.id ? 'active' : ''}`}
                  onClick={() => handleMarkerClick(marker)}
                />
              </Marker>
            ))}
            <NavigationControl style={{ right: 10, top: 10 }} />
          </ReactMapGL>
        </div>
      </div>
      <Modal
        open={!!selectedMarker}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
          {selectedMarker && (
            <>
              <h2 id="modal-title" className="text-lg font-bold">{selectedMarker.name}</h2>
              <p id="modal-description" className="mt-2">{selectedMarker.formatted_address}</p>
              <p className="mt-2">Điện thoại liên hệ: {selectedMarker.formatted_phone_number}</p>
              <p className="mt-2">Tổng số chỗ: {selectedMarker.total_spaces} chỗ</p>
              <p className="mt-2">Số chỗ hiện có: {selectedMarker.available_spaces} chỗ</p>
              <p className="mt-2">Gía thành/tiếng: {selectedMarker.price_per_hour}$</p>
              <p className="mt-2">Mô tả: {selectedMarker.description}</p>
            </>
          )}
        </Box>
      </Modal>
      <style jsx>{`
        .mapboxgl-control-container {
          z-index: 1;
        }
        .marker {
          background-image: url('/images/marker.png');
          background-size: cover;
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
        .marker.active {
          background-image: url('/images/marker-active.png');
        }
      `}</style>
    </div>
  );
};

export default MapOne;
