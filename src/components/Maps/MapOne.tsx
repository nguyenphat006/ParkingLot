"use client";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "@goongmaps/goong-map-react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const GOONG_MAPTILES_KEY = 'EZNYawkacQB3WH9yK7dIFTYVkrNxWJgnHkw2v1WE';

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
    open: string;
    close: string;
    formatted_phone_number: string;
    available_spaces: number;
    total_spaces: number;
    price_per_hour: number;
    description: string | null;
    photo_reference: string;
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
            open: parking.opening_hours.operating_hours.open,
            close: parking.opening_hours.operating_hours.close,
            formatted_phone_number: parking.formatted_phone_number,
            available_spaces: parking.available_spaces,
            total_spaces: parking.total_spaces,
            price_per_hour: parking.price_per_hour,
            description: parking.description,
            photo_reference: parking.photos[0]?.photo_reference || ''
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

  const handleSearchResultClick = (marker: Marker) => {
    setViewport({
      ...viewport,
      longitude: marker.longitude,
      latitude: marker.latitude,
      zoom: 14,
      transitionDuration: 1000
    });
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
            className="bg-white  shadow-md"
            freeSolo
            options={filteredMarkers}
            getOptionLabel={(option) => `${option.name} - ${option.formatted_address}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tìm kiếm bãi đậu xe"
                variant="outlined"
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  className: "rounded-full",
                  style: { border: "none", boxShadow: "none", padding: "8px 16px" }
                }}
                InputLabelProps={{
                  style: { paddingLeft: "16px" }
                }}
              />
            )}
            renderOption={(props, option) => (
              <li
                {...props}
                key={option.id}
                className="p-2 cursor-pointer"
                onClick={() => handleSearchResultClick(option)}
              >
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
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[32rem]">
          {selectedMarker && (
            <>
              <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <img src={`http://localhost:8000${selectedMarker.photo_reference}`} alt="Parking Lot" className="max-w-full max-h-full object-cover rounded-md" />
              </div>
              <h2 id="modal-title" className="text-xl font-bold mb-2">{selectedMarker.name}</h2>
              <p id="modal-description" className="text-sm text-gray-600 mb-2">{selectedMarker.formatted_address}</p>
              <p className="text-sm text-gray-600 mb-2">Điện thoại liên hệ: {selectedMarker.formatted_phone_number}</p>
              <p className="text-sm text-gray-600 mb-2">Tổng số chỗ: {selectedMarker.total_spaces} chỗ</p>
              <p className="text-sm text-gray-600 mb-2">Số chỗ hiện có: {selectedMarker.available_spaces} chỗ</p>
              <p className="text-sm text-gray-600 mb-2">Thời gian hoạt động: {selectedMarker.open}</p>
              <p className="text-sm text-gray-600 mb-2">Gía thành/tiếng: {selectedMarker.price_per_hour}$</p>
              <p className="text-sm text-gray-600 mb-2">Mô tả: {selectedMarker.description}</p>
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
