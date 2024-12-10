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

const PopupDetails: React.FC<PopupDetailsProps> = ({ isOpen, onRequestClose }) => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 21.0278,
    longitude: 105.8342,
    zoom: 12,
    bearing: 0,
    pitch: 0
  });
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);

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

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
        <Box sx={headerStyle}>
          <h2 id="modal-title">Thêm Mới Bãi Đậu Xe</h2>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField fullWidth label="Tên bãi đậu xe" margin="normal" />
          <TextField fullWidth label="Sức chứa" margin="normal" />
          <TextField fullWidth label="Mô tả" margin="normal" />
          <TextField fullWidth label="Địa chỉ" margin="normal" value={address || ''} />
          <TextField fullWidth label="Vĩ độ" margin="normal" value={marker?.latitude || ''} />
          <TextField fullWidth label="Kinh độ" margin="normal" value={marker?.longitude || ''} />          
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
          <Button variant="contained" color="primary">Lưu</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopupDetails;