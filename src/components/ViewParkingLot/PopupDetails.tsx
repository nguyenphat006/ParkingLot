import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

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

const booleanOptions = [
  { value: true, label: 'Có' },
  { value: false, label: 'Không' }
];

const PopupDetails: React.FC<PopupDetailsProps> = ({ isOpen, onRequestClose }) => {
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
          <TextField fullWidth label="Mô tả" margin="normal" />
          <TextField fullWidth label="Địa chỉ" margin="normal" />
          <TextField fullWidth label="Số điện thoại liên hệ" margin="normal" />
          <TextField fullWidth label="Vĩ độ" margin="normal" />
          <TextField fullWidth label="Kinh độ" margin="normal" />
          <TextField fullWidth label="Email liên hệ" margin="normal" />
          <TextField fullWidth label="Website" margin="normal" />
          <TextField fullWidth label="Giá theo giờ cơ bản" margin="normal" />
          <TextField fullWidth label="Giờ mở cửa" margin="normal" />
          <TextField fullWidth label="Giờ đóng cửa" margin="normal" />
          <TextField fullWidth label="Loại Slots" margin="normal" />
          <TextField fullWidth label="Gía tiền theo loại xe" margin="normal" />
          <Box sx={{ display: 'flex', gap: 2, gridColumn: 'span 2' }}>
            <TextField select fullWidth label="Có camera" margin="normal">
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có mái che" margin="normal">
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có đỗ qua đêm" margin="normal">
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có lối đi cho người khuyết tật" margin="normal">
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có rửa xe" margin="normal">
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField select fullWidth label="Có bảo dưỡng" margin="normal">
              {booleanOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ gridColumn: 'span 2' }}>
            <label htmlFor="image-upload">Hình ảnh</label>
            <input type="file" id="image-upload" name="image-upload" multiple />
          </Box>
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