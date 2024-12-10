import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MapGL, { Marker } from '@goongmaps/goong-map-react';

interface PopupDetailsProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onRequestClose: () => void;
  parkingLot?: {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    capacity: number;
    description: string;
    availableSpots: number;
    isActive: boolean;
  };
  refreshData: () => void; // Add this line
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const headerStyle = {
  fontSize: '1.5rem',
  borderBottom: '1px solid #ccc',
  pb: 2,
  mb: 2
};

const footerStyle = {
  borderTop: '1px solid #ccc',
  pt: 2,
  mt: 2,
  display: 'flex',
  justifyContent: 'flex-end'
};

const GOONG_API_KEY = 'YJTajS80fLlhJ4a2BG0gXqXXdZzdLG5V3iivOK9e';
const GOONG_API_ACCESS = 'WlmIT8XtdGdBS6pBOePEve49zUx9waRQDSOXrVRv';

const PopupDetails: React.FC<PopupDetailsProps> = ({ isOpen, onRequestClose, parkingLot, refreshData }) => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 21.0278,
    longitude: 105.8342,
    zoom: 12,
    bearing: 0,
    pitch: 0
  });
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(
    parkingLot ? { latitude: parkingLot.latitude, longitude: parkingLot.longitude } : null
  );
  const [address, setAddress] = useState<string | null>(parkingLot?.address || null);
  const [name, setName] = useState<string>(parkingLot?.name || '');
  const [capacity, setCapacity] = useState<number | ''>(parkingLot?.capacity || '');
  const [description, setDescription] = useState<string>(parkingLot?.description || '');
  const [availableSpots, setAvailableSpots] = useState<number | ''>(parkingLot?.availableSpots || '');
  const [isActive, setIsActive] = useState<boolean>(parkingLot?.isActive || false);

  const handleToggleContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  const handleMapClick = async (event: any) => {
    const [longitude, latitude] = event.lngLat;
    setMarker({ latitude, longitude });
    console.log(`Coordinates: ${latitude}, ${longitude}`);

    try {
      const response = await fetch(`https://rsapi.goong.io/Geocode?latlng=${latitude},${longitude}&api_key=${GOONG_API_ACCESS}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const address = data.results[0]?.formatted_address;
      setAddress(address);
      console.log(`Address: ${address}`);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  const resetFields = () => {
    setName('');
    setCapacity('');
    setDescription('');
    setAddress(null);
    setMarker(null);
    setAvailableSpots('');
    setIsActive(false);
  };

  
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Hết thời hạn token');
      window.location.href = '/auth/signin';
      return;
    }

    const parkingLotData = {
      id: parkingLot?.id,
      name,
      address,
      latitude: marker?.latitude,
      longitude: marker?.longitude,
      capacity,
      description,
      availableSpots,
      isActive
    };

    try {
      const response = await fetch(`http://localhost:5257/api/ParkingLots/${parkingLot?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(parkingLotData)
      });

      if (response.status === 401) {
        window.location.href = '/auth/signin';
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Parking lot updated successfully:', data);
      resetFields(); // Reset fields after successful save
      onRequestClose();
      refreshData(); // Add this line
    } catch (error) {
      console.error('Error updating parking lot:', error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        resetFields(); // Reset fields when modal is closed
        onRequestClose();
      }}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
        <Box sx={headerStyle}>
          <h2 id="modal-title">Sửa Bãi Đậu Xe</h2>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField fullWidth label="Tên bãi đậu xe" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Sức chứa" margin="normal" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
          <TextField fullWidth label="Mô tả" margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
          <TextField fullWidth label="Địa chỉ" margin="normal" value={address || ''} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Vĩ độ" margin="normal" value={marker?.latitude || ''} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Kinh độ" margin="normal" value={marker?.longitude || ''} InputProps={{ readOnly: true }} />          
          <TextField fullWidth label="Sức chứa còn lại" margin="normal" value={availableSpots} onChange={(e) => setAvailableSpots(Number(e.target.value))} />
          <TextField
            select
            fullWidth
            label="Trạng thái"
            margin="normal"
            value={isActive ? 'true' : 'false'}
            onChange={(e) => setIsActive(e.target.value === 'Hoạt động')}
            SelectProps={{
              native: true,
            }}
          >
            <option value="Hoạt động">Hoạt động</option>
            <option value="false">Không hoạt động</option>
          </TextField>
          <Button onClick={handleToggleContent} sx={{ gridColumn: 'span 2' }}>
            {showAdditionalContent ? 'Ẩn nội dung' : 'Chọn vị trí'}
          </Button>
          {showAdditionalContent && (
            <Box sx={{ gridColumn: 'span 2', height: '400px' }}>
              <MapGL
                {...viewport}
                width="100%"
                height="100%"
                mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
                onViewportChange={setViewport}
                goongApiAccessToken={GOONG_API_KEY}
                onClick={handleMapClick}
              >
                {marker && (
                  <Marker latitude={marker.latitude} longitude={marker.longitude} offsetLeft={-15} offsetTop={-30}>
                    <img src="/images/marker.png" alt="Marker" style={{ width: '30px', height: '30px' }} />
                  </Marker>
                )}
              </MapGL>
            </Box>
          )}
        </Box>
        <Box sx={footerStyle}>
          <Button onClick={onRequestClose} sx={{ mr: 2 }}>Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>Lưu</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopupDetails;