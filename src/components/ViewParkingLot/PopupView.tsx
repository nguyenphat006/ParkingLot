import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ParkingLot } from "@/types/parkinglot";

interface PopupViewProps {
  isOpen: boolean;
  onRequestClose: () => void;
  parkingLot: ParkingLot;
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

const PopupView: React.FC<PopupViewProps> = ({ isOpen, onRequestClose, parkingLot }) => {
  const [parkingLotData, setParkingLotData] = useState<ParkingLot | null>(null);

  useEffect(() => {
    const fetchParkingLotData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Hết thời hạn token');
        window.location.href = '/auth/signin';
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/ParkingLots/${parkingLot.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setParkingLotData(data);
      } catch (error) {
        console.error('Error fetching parking lot data:', error);
      }
    };

    if (isOpen) {
      fetchParkingLotData();
    }
  }, [isOpen, parkingLot.id]);

  if (!parkingLotData) {
    return null;
  }

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
          <TextField fullWidth label="Tên bãi đậu xe" margin="normal" value={parkingLotData.name} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Mô tả" margin="normal" value={parkingLotData.description} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Địa chỉ" margin="normal" value={parkingLotData.formatted_address} InputProps={{ readOnly: true }} sx={{ gridColumn: 'span 2' }} />
          <TextField fullWidth label="Sức chứa còn lại" margin="normal" value={parkingLotData.available_spaces} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Sức chứa" margin="normal" value={parkingLotData.total_spaces} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Số điện thoại liên hệ" margin="normal" value={parkingLotData.formatted_phone_number} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Giá mỗi giờ" margin="normal" value={parkingLotData.price_per_hour} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Giờ mở cửa" margin="normal" value={parkingLotData.openingtime} InputProps={{ readOnly: true }} />
          <TextField fullWidth label="Giờ đóng cửa" margin="normal" value={parkingLotData.closingtime} InputProps={{ readOnly: true }} />
        </Box>
        <Box sx={footerStyle}>
          <Button onClick={onRequestClose} sx={{ mr: 2 }}>Đóng</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PopupView;
