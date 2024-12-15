import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MapGL, { Marker } from '@goongmaps/goong-map-react';
import AlertSuccess from "../Alerts/AlertSuccess";
import AlertError from "../Alerts/AlertError";

interface PopupDetailsProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onRequestClose: () => void;
  refreshData: () => void; // Add this line
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxHeight: '90vh',
  overflowY: 'auto',
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

const GOONG_MAPTILES_KEY = 'jQz7dTS6LtjN9z5JjoBFc7fQ2stAk4UocQnvm51F';
const GOONG_API_KEY = 'zR0c6DjYs3YWpvi5zSfywPUPesH2G1Liy7rqfVin';

const PopupDetails: React.FC<PopupDetailsProps> = ({ isOpen, onRequestClose, refreshData }) => {
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
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [alert, setAlert] = useState<{ title: string; body: string } | null>(null);
  const [error, setError] = useState<{ title: string; body: string } | null>(null);
  const [closingTime, setClosingTime] = useState<string>('');
  const [openingTime, setOpeningTime] = useState<string>('');
  const [plusCodeCompound, setPlusCodeCompound] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [totalSpaces, setTotalSpaces] = useState<number | ''>('');
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [placeId, setPlaceId] = useState<string>('');
  const [availableSpaces, setAvailableSpaces] = useState<number | ''>('');
  const [pricePerHour, setPricePerHour] = useState<number | ''>('');
  const [isOpen24Hours, setIsOpen24Hours] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = 'Tên bãi đậu xe không được để trống';
    if (!address) newErrors.address = 'Địa chỉ không được để trống';
    if (!contactNumber) newErrors.contactNumber = 'Số điện thoại liên hệ không được để trống';
    if (!marker) newErrors.marker = 'Vui lòng chọn vị trí trên bản đồ';
    if (!openingTime) newErrors.openingTime = 'Giờ mở cửa không được để trống';
    if (!closingTime) newErrors.closingTime = 'Giờ đóng cửa không được để trống';
    if (totalSpaces === '') newErrors.totalSpaces = 'Tổng số chỗ không được để trống';
    if (availableSpaces === '') newErrors.availableSpaces = 'Số chỗ trống không được để trống';
    if (pricePerHour === '') newErrors.pricePerHour = 'Giá mỗi giờ không được để trống';
    return newErrors;
  };

  const handleToggleContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  const handleMapClick = async (event: any) => {
    const [longitude, latitude] = event.lngLat;
    setMarker({ latitude, longitude });
    console.log(`Coordinates: ${latitude}, ${longitude}`);

    try {
      const response = await fetch(`https://rsapi.goong.io/Geocode?latlng=${latitude},${longitude}&api_key=${GOONG_API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const address = data.results[0]?.formatted_address;
      setAddress(address);
      console.log(`Address: ${address}`);

      const placeId = data.results[0]?.place_id;
      setPlaceId(placeId || '');
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleSave = async () => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      window.location.href = '/auth/signin';
      return;
    }

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Types', 'parkinglot');
    formData.append('Place_id', placeId);
    formData.append('ClosingTime', closingTime);
    formData.append('OpeningTime', openingTime);
    formData.append('TotalSpaces', totalSpaces.toString());
    formData.append('PricePerHour', pricePerHour.toString());
    formData.append('IsOpen24Hours', isOpen24Hours ? 'true' : 'false');
    formData.append('AvailableSpaces', availableSpaces.toString());
    formData.append('Formatted_address', address);
    formData.append('Compound.Commune', 'Sample Commune');
    formData.append('Compound.District', 'Sample District');
    formData.append('Compound.Province', 'Sample Province');
    formData.append('Geometry.Location.Lat', marker?.latitude.toString());
    formData.append('Geometry.Location.Lng', marker?.longitude.toString());
    formData.append('ContactNumber', contactNumber);
    formData.append('Url', url);
    formData.append('Description', description);

    try {
      const response = await fetch('http://localhost:8000/api/ParkingLots', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.status === 401) {
        window.location.href = '/auth/signin';
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Parking lot added successfully:', data);
      setAlert({
        title: "Thêm bãi đậu xe thành công",
        body: "Bãi đậu xe đã được thêm thành công.",
      });
      setTimeout(() => {
        setAlert(null);
        onRequestClose();
        resetFields();
        refreshData();
      }, 3000);
    } catch (error) {
      console.error('Error adding parking lot:', error);
      setError({
        title: "Thêm bãi đậu xe thất bại",
        body: "Đã xảy ra lỗi khi thêm bãi đậu xe.",
      });
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleClose = () => {
    onRequestClose();
    resetFields();
  };

  const resetFields = () => {
    setName('');
    setDescription('');
    setAddress(null);
    setMarker(null);
    setClosingTime('');
    setOpeningTime('');
    setPlusCodeCompound('');
    setContactNumber('');
    setUrl('');
    setTotalSpaces('');
    setFormattedAddress('');
    setPlaceId('');
    setAvailableSpaces('');
    setPricePerHour('');
    setIsOpen24Hours(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <div>
        <div className="z-99 fixed top-4 right-4 transition-transform duration-300 transform" style={{ transform: alert || error ? 'translateY(0)' : 'translateY(-100%)' }}>
          {alert && <AlertSuccess message={alert} />}
          {error && <AlertError message={error} />}
        </div>
        <Box sx={style}>
          <Box sx={headerStyle}>
            <h2 id="modal-title">Thêm Mới Bãi Đậu Xe</h2>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              fullWidth
              label="Tên bãi đậu xe"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              label="Mô tả"
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={!!errors.description}
            />
            <TextField
              fullWidth
              label="Địa chỉ"
              margin="normal"
              value={address || ''}
              InputProps={{ readOnly: true }}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              fullWidth
              label="Số điện thoại liên hệ"
              margin="normal"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber}
            />           
            <TextField
              fullWidth
              label="Vĩ độ"
              margin="normal"
              value={marker?.latitude || ''}
              InputProps={{ readOnly: true }}
              error={!!errors.marker}
              helperText={errors.marker}
            />
            <TextField
              fullWidth
              label="Kinh độ"
              margin="normal"
              value={marker?.longitude || ''}
              InputProps={{ readOnly: true }}
              error={!!errors.marker}
              helperText={errors.marker}
            />  
            <TextField
              fullWidth
              label="Giờ mở cửa"
              margin="normal"
              type="time"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              InputLabelProps={{
                shrink: true, // Giúp nhãn hiển thị khi dùng type="time"
              }}
              error={!!errors.openingTime}
              helperText={errors.openingTime}
            />
            <TextField
              fullWidth
              label="Giờ đóng cửa"
              margin="normal"
              type="time"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.closingTime}
              helperText={errors.closingTime}
            />

            <TextField
              fullWidth
              label="Tổng số chỗ"
              margin="normal"
              value={totalSpaces}
              onChange={(e) => setTotalSpaces(Number(e.target.value))}
              error={!!errors.totalSpaces}
              helperText={errors.totalSpaces}
            />
            <TextField
              fullWidth
              label="Số chỗ trống"
              margin="normal"
              value={availableSpaces}
              onChange={(e) => setAvailableSpaces(Number(e.target.value))}
              error={!!errors.availableSpaces}
              helperText={errors.availableSpaces}
            />
            <TextField
              fullWidth
              label="Giá mỗi giờ"
              margin="normal"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(Number(e.target.value))}
              error={!!errors.pricePerHour}
              helperText={errors.pricePerHour}
            />
            <TextField
              fullWidth
              label="Mở cửa 24 giờ"
              margin="normal"
              value={isOpen24Hours}
              onChange={(e) => setIsOpen24Hours(e.target.checked)}
              type="checkbox"
            />            
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
                  goongApiAccessToken={GOONG_MAPTILES_KEY}
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
            <Button onClick={handleClose} sx={{ mr: 2 }}>Hủy</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>Lưu</Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
};

export default PopupDetails;