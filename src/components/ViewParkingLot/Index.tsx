"use client"
import React, { useState, useEffect } from 'react';
import PopupDetails from './PopupDetails';
import PopupView from './PopupView';
import { ParkingLot } from "@/types/parkinglot";
import { RiEditBoxFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [viewId, setViewId] = useState<number | null>(null);
  const [packageData, setPackageData] = useState<ParkingLot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5257/api/ParkingLots');
        const data = await response.json();
        setPackageData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setEditId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: number) => {
    setEditId(id);
    setIsModalOpen(true);
  };

  const openViewModal = (id: number) => {
    setViewId(id);
    setIsViewModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const closeViewModal = () => setIsViewModalOpen(false);

  const selectedParkingLot = viewId !== null ? packageData[viewId] : null;

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
          <select className="border border-stroke px-4 py-2 rounded">
            <option value="">Lọc theo....</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
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
                Sức chứa
              </th>
              <th className="px-4 py-4 text-start font-medium text-dark dark:text-white xl:pr-7.5">
                Sức chứa còn lại
              </th>
              <th className="px-4 py-4 text-center font-medium text-dark dark:text-white xl:pr-7.5">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, index) => (
              <tr key={index}>
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
                    {packageItem.address}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.capacity}
                  </p>
                </td>
                <td
                  className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageData.length - 1 ? "border-b-0" : "border-b"}`}
                >
                  <p className="text-dark dark:text-white">
                    {packageItem.availableSpots}
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
                    <button className="hover:text-primary">
                      <FaTrash className="text-lg"/>
                    </button>                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PopupDetails isOpen={isModalOpen} onRequestClose={closeModal} />
      {selectedParkingLot && (
        <PopupView isOpen={isViewModalOpen} onRequestClose={closeViewModal} parkingLot={selectedParkingLot} />
      )}
    </div>
  );
};

export default Index;