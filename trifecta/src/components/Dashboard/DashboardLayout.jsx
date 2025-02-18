import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import PowerBI from "../Dashboard/PowerBI";

const DashboardLayout = () => {
  const [data, setData] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState(0);
  const [rejectedRequests, setRejectedRequests] = useState(0);

  const embedUrl =
    "https://app.powerbi.com/reportEmbed?reportId=4a9445e8-54a6-4717-b59d-f70fd88d26e7&autoAuth=true&ctid=2840082d-702c-4fb1-9885-abddd1ddaa1e";

  useEffect(() => {
    const fetchTotalRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/totalPurchaseRequests"
        );
        setTotalRequests(response.data.totalCount);
      } catch (error) {
        console.error("Error fetching total requests:", error);
      }
    };

    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/pendingPurchaseRequests"
        ); // Fetch pending requests count
        setPendingRequests(response.data.pendingCount); // Set the count of pending requests
      } catch (error) {
        console.error("Error fetching pending requests count:", error);
      }
    };
    const fetchRejectedRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/rejectedPurchaseRequests"
        ); // Fetch pending requests count
        setRejectedRequests(response.data.pendingCount); // Set the count of pending requests
      } catch (error) {
        console.error("Error fetching pending requests count:", error);
      }
    };
    const fetchApprovedRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/approvedPurchaseRequests"
        ); // Fetch pending requests count
        setApprovedRequests(response.data.pendingCount); // Set the count of pending requests
      } catch (error) {
        console.error("Error fetching pending requests count:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/dashboardProductStatus"
        );
        const mappedData = response.data.map((data) => ({
          purchaseno: data.purchaseno,
          suppliername: data.suppliername,
          targetdeliverydate: formatDate(data.targetdeliverydate),
          ordercreated: formatDate(data.ordercreated),
          itemname: data.itemname,
          itemdesc: data.itemdesc,
          quantity: data.quantity,
          status: data.status,
          companyemail: data.companyemail,
        }));
        setData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTotalRequests();
    fetchApprovedRequests();
    fetchRejectedRequests();
    fetchPendingRequests();
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const customStyles = {
    headRow: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
  };

  const columns = [
    {
      name: "Purchase No.",
      selector: (row) => row.purchaseno,
      sortable: true,
    },
    {
      name: "Supplier",
      selector: (row) => row.suppliername,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Order Created",
      selector: (row) => row.ordercreated,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <div
          className={`font-bold text-[12px] status-indicator ${
            row.status.toLowerCase() === "pending"
              ? "text-orange"
              : row.status.toLowerCase() === "approved"
              ? "text-green"
              : row.status.toLowerCase() === "rejected"
              ? "text-red"
              : ""
          }`}
        >
          {row.status}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full lg:mx-[5rem] min-h-screen">
      <header className="bg-[#6366F1] dark:bg-[#4338CA] p-6 border-b">
        <div className="container ">
          <h1 className="text-2xl font-bold text-white">
            Procurement Dashboard
          </h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-2 text-[#6366F1] dark:text-[#4338CA]">
              Total Requests
            </h2>
            <p className="text-4xl font-bold">{totalRequests}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-2 text-[#6366F1] dark:text-[#4338CA]">
              Pending Requests
            </h2>
            <p className="text-4xl font-bold">{pendingRequests}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-2 text-[#6366F1] dark:text-[#4338CA]">
              Approved Requests
            </h2>
            <p className="text-4xl font-bold">{approvedRequests}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-2 text-[#6366F1] dark:text-[#4338CA]">
              Rejected Requests
            </h2>
            <p className="text-4xl font-bold">{rejectedRequests}</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#6366F1] dark:text-[#4338CA]">
              Recent Procurement Requests
            </h2>
            <Link to="/ProductStatus">
              <h5 className="text-black underline cursor-pointer hover:text-blue">
                See More
              </h5>
            </Link>
          </div>
          <div className="overflow-auto rounded-lg shadow-md w-full">
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationRowsPerPageOptions={[5, 10]}
              customStyles={customStyles}
            />
            <div className="mt-8">
              <PowerBI embedUrl={embedUrl} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
