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

  const selectedParkingLot = (viewId !== null ? packageData[viewId] : null) || (editId !== null ? packageData[editId] : null);

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="flex justify-between mb-4">
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={openModal}>
          Thêm mới
        </button>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border border-stroke px-4 py-2 rounded"
          />
          {/* <select className="border border-stroke px-4 py-2 rounded">
            <option value="">Lọc theo....</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Pending">Pending</option>
          </select> */}
        </div>
      </div>
      <div className="max-w-full overflow-x-auto relative">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Bãi đậu xe  
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Địa chỉ
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Tổng số chỗ 
              </th>
              <th className="px-4 py-4 text-start font-medium text-dark dark:text-white xl:pr-7.5">
                Số chỗ trống
              </th>
              <th className="px-4 py-4 text-start font-medium text-dark dark:text-white xl:pr-7.5">
                Số điện thoại liên hệ
              </th>             
              <th className="px-4 py-4 text-center font-medium text-dark dark:text-white xl:pr-7.5">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, index) => (
              <tr key={index}>
                <td className="hidden">{packageItem.id}</td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <h5 className="text-dark dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.formatted_address}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.total_spaces}
                  </p>
                </td>
              
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.available_spaces}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.formatted_phone_number}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <div className="flex items-center justify-end space-x-4 ">
                    <button className="hover:text-primary" onClick={() => openViewModal(index)}>
                      <FaEye className="text-2xl" />
                    </button>
                    <button className="hover:text-primary" onClick={() => openEditModal(index)}>
                      <RiEditBoxFill className="text-xl"/>
                    </button>
                    <button className="hover:text-primary" onClick={() => openDeleteModal(packageItem.id)}>
                      <FaTrash className="text-lg"/>
                    </button>                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <RiResetLeftFill className="cursor-pointer text-2xl ml-auto" onClick={refreshData}/>
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