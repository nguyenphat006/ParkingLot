import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

interface PopupViewProps {
  isOpen: boolean;
  onRequestClose: () => void;
  parkingLot: any; // Replace 'any' with the appropriate type
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

const booleanOptions = [
  { value: true, label: 'Có' },
  { value: false, label: 'Không' }
];

const PopupView: React.FC<PopupViewProps> = ({ isOpen, onRequestClose, parkingLot }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box sx={headerStyle}>
          <h2 id="modal-title">Chi Tiết Bãi Đậu Xe</h2>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField fullWidth label="Tên bãi đậu xe" margin="normal" value={parkingLot.name} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Mô tả" margin="normal" value={parkingLot.description} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Địa chỉ" margin="normal" value={parkingLot.address} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Số điện thoại liên hệ" margin="normal" value={parkingLot.phone} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Vĩ độ" margin="normal" value={parkingLot.latitude} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Kinh độ" margin="normal" value={parkingLot.longitude} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Email liên hệ" margin="normal" value={parkingLot.email} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Website" margin="normal" value={parkingLot.website} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Giá theo giờ cơ bản" margin="normal" value={parkingLot.pricePerHour} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Giờ mở cửa" margin="normal" value={parkingLot.openTime} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Giờ đóng cửa" margin="normal" value={parkingLot.closeTime} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Loại Slots" margin="normal" value={parkingLot.slotType} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Gía tiền theo loại xe" margin="normal" value={parkingLot.priceByVehicleType} InputProps={{ readOnly: true }} />
          <Box sx={{ display: 'flex', gap: 2, gridColumn: 'span 2' }}>
            <TextField select fullWidth label="Có camera" margin="normal" value={parkingLot.hasCamera} InputProps={{ readOnly: true }}>
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có mái che" margin="normal" value={parkingLot.hasRoof} InputProps={{ readOnly: true }}>
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có đỗ qua đêm" margin="normal" value={parkingLot.hasOvernightParking} InputProps={{ readOnly: true }}>
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có lối đi cho người khuyết tật" margin="normal" value={parkingLot.hasDisabledAccess} InputProps={{ readOnly: true }}>
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có rửa xe" margin="normal" value={parkingLot.hasCarWash} InputProps={{ readOnly: true }}>
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có bảo dưỡng" margin="normal" value={parkingLot.hasMaintenance} InputProps={{ readOnly: true }}>
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ gridColumn: 'span 2' }}>
            <label htmlFor="image-upload">Hình ảnh</label>
            <input type="file" id="image-upload" name="image-upload" multiple disabled />
          </Box>
        </Box>
        <Box sx={footerStyle}>
          <Button onClick={onRequestClose} sx={{ mr: 2 }}>Đóng</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopupView;
