"use client"
import React, { useState, useEffect } from 'react';
import PopupDetails from './PopupDetails';
import PopupEdit from './PopupEdit';
import PopupView from './PopupView';
import { ParkingLot } from "@/types/parkinglot";
import { RiEditBoxFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [viewId, setViewId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [packageData, setPackageData] = useState<ParkingLot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/ParkingLots');
        const data = await response.json();
        if (data.status === 'OK' && Array.isArray(data.results)) {
          setPackageData(data.results);
        } else {
          console.error('Fetched data is not in expected format:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const refreshData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/ParkingLots');
      const data = await response.json();
      if (data.status === 'OK' && Array.isArray(data.results)) {
        setPackageData(data.results);
      } else {
        console.error('Fetched data is not in expected format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openModal = () => {
    setEditId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: number) => {
    setEditId(id);
    setIsEditModalOpen(true);
  };

  const openViewModal = (id: number) => {
    setViewId(id);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    refreshData();
  };
  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewId(null);
    refreshData();
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditId(null);
    refreshData();
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Hết thời hạn token');
        window.location.href = '/auth/signin';
        return;
      }

      const response = await fetch(`http://localhost:8000/api/ParkingLots/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPackageData(packageData.filter(item => item.id !== deleteId));
        closeDeleteModal();
      } else {
        console.error('Failed to delete parking lot');
      }
    } catch (error) {
      console.error('Error deleting parking lot:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Bãi đậu xe', width: 220 },
    { field: 'formatted_address', headerName: 'Địa chỉ', width: 550 },
    { field: 'total_spaces', headerName: 'Tổng số chỗ', width: 120 },
    { field: 'available_spaces', headerName: 'Số chỗ trống', width: 120 },
    { field: 'formatted_phone_number', headerName: 'Số điện thoại liên hệ', width: 200 },
    {
      field: 'actions',
      headerName: 'Chức năng',
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center justify-start space-x-4 mt-3">
          <button className="hover:text-primary" onClick={() => openViewModal(params.row.id)}>
            <FaEye className="text-2xl" />
          </button>
          <button className="hover:text-primary" onClick={() => openEditModal(params.row.id)}>
            <RiEditBoxFill className="text-xl" />
          </button>
          <button className="hover:text-primary" onClick={() => openDeleteModal(params.row.id)}>
            <FaTrash className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  const selectedParkingLot = packageData.find(item => item.id === viewId) || packageData.find(item => item.id === editId);

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="flex justify-between mb-4">
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={openModal}>
          Thêm mới
        </button>       
      </div>
      <div className="max-w-full overflow-x-auto relative" style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={packageData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </div>
      <PopupDetails isOpen={isModalOpen} onRequestClose={closeModal} />
      {selectedParkingLot && (
        <>
          <PopupView isOpen={isViewModalOpen} onRequestClose={closeViewModal} parkingLot={selectedParkingLot} />
          <PopupEdit isOpen={isEditModalOpen} onRequestClose={closeEditModal} parkingLot={selectedParkingLot} refreshData={refreshData} />
        </>
      )}
      <Modal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">Xác nhận xóa</h2>
          <p id="modal-description">Bạn có chắc chắn muốn xóa bãi đậu xe này?</p>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={closeDeleteModal} sx={{ mr: 2 }}>Hủy</Button>
            <Button variant="contained" color="error" onClick={handleDelete}>Xóa</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Index;