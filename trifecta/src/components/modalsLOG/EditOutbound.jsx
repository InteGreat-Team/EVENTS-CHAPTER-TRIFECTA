import { useState } from "react";

const EditOutbound = ({ show, onClose, data, onSave }) => {
  const [shipmentDate, setShipmentDate] = useState(data.shipmentDate || "");
  const [receiveDate, setReceiveDate] = useState(data.receiveDate || "");
  const [paymentStatus, setPaymentStatus] = useState(data.paymentStatus || "");
  const [deliveryStatus, setDeliveryStatus] = useState(
    data.deliveryStatus || ""
  );
  const [goodsReceived, setGoodsReceived] = useState(data.goodsReceived || "");

  const handleSave = () => {
    onSave({
      shipmentDate,
      receiveDate,
      deliveryStatus,
      goodsReceived,
    });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl mb-4">Edit Details</h2>
        {/* Shipment Date */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Shipment Date</label>
          <input
            type="date"
            value={shipmentDate}
            onChange={(e) => setShipmentDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Receive Date */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Arrival Date</label>
          <input
            type="date"
            value={receiveDate}
            onChange={(e) => setReceiveDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Payment Status */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        {/* Delivery Status */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Delivery Status</label>
          <select
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="For Shipment">For Shipment</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        {/* Goods received */}
        <div className="mb-4">
          <label className="block text-sm font-semibold">Goods Received</label>
          <select
            value={goodsReceived}
            onChange={(e) => setGoodsReceived(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-save text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOutbound;
