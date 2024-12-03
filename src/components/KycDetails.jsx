// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   FaEnvelope,
//   FaIdCard,
//   FaCheck,
//   FaTimes,
//   FaInfoCircle,
//   FaCalendarAlt,
//   FaFlag,
//   FaLocationArrow,
// } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
// import { useGetKycDataQuery } from "../features/api/kycApiSlice";
// import { useParams } from "react-router-dom";

// const CustomerDetail = () => {
//   // const kycData = {
//   //   kyc: {
//   //     id: "kyc-68cd25f0-0c00-4eb7-98c3-4c0f9add2f60",
//   //     documentType: "passport",
//   //     name: "KRUPA VARGHESE",
//   //     email: "krupa@cnetric.com",
//   //     selfieImage:
//   //       "https://media.istockphoto.com/id/1990548785/photo/portrait-of-happy-mature-women.jpg?s=612x612&w=0&k=20&c=dQhW96HBFzoNH35YObdRpcm6ZjkAtLccntwi_NWJ8nk=",
//   //     documentImage:
//   //       "https://veridas.com/wp-content/uploads/elementor/thumbs/documento-manipulado-veridas-q6nbvwk6stjis5ue9yby21jjd8ep60wzqsbnegr048.jpg",
//   //     kycStatus: "Pending", // Initial status in JSON
//   //     nationality: "Indian",
//   //     dob: "1995-09-08",
//   //     idNumber: "U4989371",
//   //     idIssueDate: "2020-03-11",
//   //     idExpiryDate: "2030-03-10",
//   //     idIssuingCountry: "India",
//   //     countryOfResidence: "India",
//   //     addressLine1: "Richard Park",
//   //     city: "Bangalore",
//   //     state: "Karnataka",
//   //     zipCode: "560001",
//   //     moderation: {
//   //       ocrMatch: true,
//   //       faceMatch: { match: true, matchConfidence: 0.8172 },
//   //       liveliness: {
//   //         passed: false,
//   //         livelinessDetails: "Failed checks: size",
//   //       },
//   //     },
//   //   },
//   // };

//   // const { kyc } = kycData;

//   // Initialize kycStatus with the value from kycData
//   const { id } = useParams(); // Fetch the ID from the route params
//   const { data: kyc, isLoading, error } = useGetKycDataQuery(id);
//   const [kycStatus, setKycStatus] = useState(kyc.kycStatus);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const toggleModal = () => setIsModalOpen(!isModalOpen);
//   const openImageModal = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setIsImageModalOpen(true);
//   };
//   const closeImageModal = () => {
//     setIsImageModalOpen(false);
//     setSelectedImage(null);
//   };

//   const showToast = (status) => {
//     if (kycStatus === status) {
//       const icon =
//         status === "Approved" ? (
//           <FaCheck className="text-green-500" />
//         ) : (
//           <FaTimes className="text-red-500" />
//         );
//       toast.custom(
//         (t) => (
//           <div
//             className={`${
//               t.visible ? "animate-enter" : "animate-leave"
//             } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
//           >
//             <div className="flex-1 w-0 p-4">
//               <div className="flex items-center">
//                 {icon}
//                 <p className="ml-3 font-medium text-gray-900">
//                   This user’s KYC is already {status.toLowerCase()}.
//                 </p>
//               </div>
//             </div>
//             <div className="flex border-l border-gray-200">
//               <button
//                 onClick={() => toast.dismiss(t.id)}
//                 className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         ),
//         { duration: 3000 }
//       );
//     } else {
//       setKycStatus(status);
//       toast.success(`User KYC marked as ${status.toLowerCase()}`);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="text-center mt-10">
//         <p className="text-blue-500 font-semibold">Loading KYC details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-10">
//         <p className="text-red-500 font-semibold">
//           Error loading KYC details. Please try again later.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-2xl">
//       <Toaster position="top-center" reverseOrder={false} />
//       <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
//         Customer KYC Details
//       </h1>

//       {/* Personal Info Section */}
//       <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Personal Information
//         </h2>
//         <div className="flex flex-col items-center sm:flex-row sm:items-start mb-4">
//           <img
//             src={kyc.selfieImage}
//             alt="Selfie"
//             onClick={() => openImageModal(kyc.selfieImage)}
//             className="w-20 h-20 rounded-full shadow-lg mb-4 sm:mb-0 sm:mr-4 border-2 border-blue-300 cursor-pointer hover:opacity-90 transition-opacity transform hover:scale-105"
//           />
//           <div className="flex-grow text-center sm:text-left">
//             <p className="text-xl font-medium text-gray-800">{kyc.name}</p>
//             <p className="text-gray-500 flex items-center justify-center sm:justify-start">
//               <FaEnvelope className="mr-1 text-gray-400" /> {kyc.email}
//             </p>
//           </div>
//           <div className="mt-2 sm:mt-0 sm:ml-4">
//             <span
//               className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${
//                 kycStatus === "Rejected"
//                   ? "bg-red-600 shadow-lg border border-red-800"
//                   : kycStatus === "Approved"
//                   ? "bg-green-600 shadow-lg border border-green-800"
//                   : "bg-yellow-500 shadow-lg border border-yellow-600"
//               } transition-all duration-300 ease-in-out`}
//             >
//               <strong>Status:</strong> {kycStatus}
//             </span>
//           </div>
//         </div>

//         {/* Contact Details Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
//           <DetailItem icon={<FaEnvelope />} label="Email" value={kyc.email} />
//           <DetailItem
//             icon={<FaIdCard />}
//             label="ID Number"
//             value={kyc.idNumber}
//           />
//           <DetailItem
//             icon={<FaInfoCircle />}
//             label="Nationality"
//             value={kyc.nationality}
//           />
//           <DetailItem
//             icon={<FaCalendarAlt />}
//             label="Date of Birth"
//             value={new Date(kyc.dob).toLocaleDateString()}
//           />
//           <DetailItem
//             icon={<FaFlag />}
//             label="Country of Residence"
//             value={kyc.countryOfResidence}
//           />
//           <DetailItem
//             icon={<FaLocationArrow />}
//             label="Address"
//             value={`${kyc.addressLine1}, ${kyc.city}, ${kyc.state} - ${kyc.zipCode}`}
//           />
//         </div>

// <button
//   onClick={toggleModal}
//   className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 mt-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 font-semibold"
// >
//   <FaInfoCircle className="mr-2 inline-block" /> Moderation Check
// </button>
//       </div>

//       {/* Document Details Section */}
//       <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Document Information
//         </h2>
//         <div className="flex items-center mb-4">
//           <img
//             src={kyc.documentImage}
//             alt="Document"
//             onClick={() => openImageModal(kyc.documentImage)}
//             className="w-32 h-20 rounded-lg shadow-lg mr-4 border-2 border-gray-300 cursor-pointer hover:opacity-90 transition-opacity transform hover:scale-105"
//           />
//           <div className="flex-grow">
//             <p className="text-gray-800">
//               <strong>Document Type:</strong> <span>{kyc.documentType}</span>
//             </p>
//             <p className="mt-2 text-gray-800">
//               <strong>ID Number:</strong> <span>{kyc.idNumber}</span>
//             </p>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//           <DetailItem
//             icon={<FaCalendarAlt />}
//             label="Issue Date"
//             value={new Date(kyc.idIssueDate).toLocaleDateString()}
//           />
//           <DetailItem
//             icon={<FaCalendarAlt />}
//             label="Expiry Date"
//             value={new Date(kyc.idExpiryDate).toLocaleDateString()}
//           />
//           <DetailItem
//             icon={<FaFlag />}
//             label="Issuing Country"
//             value={kyc.idIssuingCountry}
//           />
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-center space-x-6 mt-8">
//         <ActionButton
//           status="Approved"
//           currentStatus={kycStatus}
//           onClick={() => showToast("Approved")}
//         />
//         <ActionButton
//           status="Rejected"
//           currentStatus={kycStatus}
//           onClick={() => showToast("Rejected")}
//         />
//       </div>

//       {/* Moderation Details Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative transition-transform transform scale-100 hover:scale-105">
//             <button
//               onClick={toggleModal}
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//             >
//               <MdClose className="text-2xl" />
//             </button>
//             <h2 className="text-xl font-semibold mb-4 text-center">
//               Moderation Details
//             </h2>
//             <div className="text-gray-700 space-y-3">
//               <p>
//                 <strong>OCR Match:</strong>{" "}
//                 {kyc.moderation.ocrMatch ? (
//                   <FaCheck className="text-green-500 inline ml-1" />
//                 ) : (
//                   <FaTimes className="text-red-500 inline ml-1" />
//                 )}
//               </p>
//               <p>
//                 <strong>Face Match:</strong>{" "}
//                 {kyc.moderation.faceMatch.match ? (
//                   <FaCheck className="text-green-500 inline ml-1" />
//                 ) : (
//                   <FaTimes className="text-red-500 inline ml-1" />
//                 )}
//               </p>
//               <p>
//                 <strong>Liveliness Passed:</strong>{" "}
//                 {kyc.moderation.liveliness.passed ? (
//                   <FaCheck className="text-green-500 inline ml-1" />
//                 ) : (
//                   <FaTimes className="text-red-500 inline ml-1" />
//                 )}
//               </p>
//               <p>
//                 <strong>Liveliness Details:</strong>{" "}
//                 {kyc.moderation.liveliness.livelinessDetails}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Image Modal */}
//       {isImageModalOpen && selectedImage && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
//           <div className="relative">
//             <img
//               src={selectedImage}
//               alt="Full View"
//               className="max-w-full max-h-screen rounded-lg shadow-lg"
//             />
//             <button
//               onClick={closeImageModal}
//               className="absolute top-3 right-3 text-white hover:text-red-500"
//             >
//               <MdClose className="text-3xl" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Helper component for rendering detail items with icons
// const DetailItem = ({ icon, label, value }) => (
//   <div className="flex items-center">
//     <div className="flex items-center justify-center rounded-lg bg-blue-100 p-3 mr-3">
//       {icon}
//     </div>
//     <div>
//       <strong>{label}:</strong> <span>{value}</span>
//     </div>
//   </div>
// );

// // Helper component for rendering action buttons
// const ActionButton = ({ status, currentStatus, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`px-5 py-2 rounded-lg font-semibold shadow-md transition-all transform hover:scale-105 ${
//       currentStatus === status
//         ? `bg-${status === "Approved" ? "green" : "red"}-500 text-white`
//         : "bg-gray-300 text-gray-700 hover:bg-green-500 hover:text-white"
//     }`}
//   >
//     {status === "Approved" ? (
//       <FaCheck className="inline mr-2" />
//     ) : (
//       <FaTimes className="inline mr-2" />
//     )}
//     {status}
//   </button>
// );

// export default CustomerDetail;

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaEnvelope,
  FaIdCard,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaCalendarAlt,
  FaFlag,
  FaLocationArrow,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import {
  useGetKycDataQuery,
  useUpdateKycStatusMutation,
} from "../features/api/kycApiSlice";
import { useParams } from "react-router-dom";

const CustomerDetail = () => {
  const { id } = useParams(); // Fetch the KYC ID from the route parameters
  const { data: kycData, isLoading, error, refetch } = useGetKycDataQuery(id); // Fetch KYC data
  const [updateKycStatus, { isLoading: isUpdating }] =
    useUpdateKycStatusMutation(); // Mutation for updating KYC status
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCard, setSelectedCard] = useState("ocr"); // Tracks the selected card

  const kyc = kycData?.kyc;

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  const handleStatusChange = async (status) => {
    try {
      if (kyc?.kycStatus === status) {
        toast(`User's KYC is already ${status.toLowerCase()}`, {
          icon: status === "Verified" ? "✅" : "❌",
          style: {
            background: status === "Verified" ? "#a7f3d0" : "#fecaca",
            color: "#333",
          },
        });
        return;
      }

      await updateKycStatus({ id, status }).unwrap(); // Update the status dynamically
      toast.success(`KYC status updated to ${status}`);
      // refetch(); // Revalidate the data
    } catch (err) {
      toast.error("Failed to update KYC status. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <p className="text-blue-500 font-semibold">Loading KYC details...</p>
      </div>
    );
  }

  if (error || !kyc) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-semibold">
          Error loading KYC details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-2xl">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
        Customer KYC Details
      </h1>

      {/* Personal Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>
        <div className="flex flex-col items-center sm:flex-row sm:items-start mb-4">
          <img
            src={kyc.selfieImage}
            alt="Selfie"
            crossOrigin="anonymous"
            onClick={() => openImageModal(kyc.selfieImage)}
            className="w-20 h-20 rounded-full object-cover shadow-lg mb-4 sm:mb-0 sm:mr-4 border-2 border-blue-300 cursor-pointer hover:opacity-90 transform hover:scale-105"
          />
          <div className="flex-grow text-center sm:text-left">
            <p className="text-xl font-medium text-gray-800">{kyc.name}</p>
            <p className="text-gray-500 flex items-center justify-center sm:justify-start">
              <FaEnvelope className="mr-1 text-gray-400" /> {kyc.email}
            </p>
          </div>
          <div className="mt-2 sm:mt-0 sm:ml-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${
                kyc.kycStatus === "Rejected"
                  ? "bg-red-600"
                  : kyc.kycStatus === "Verified"
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}
            >
              {kyc.kycStatus}
            </span>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <DetailItem icon={<FaEnvelope />} label="Email" value={kyc.email} />
          <DetailItem
            icon={<FaIdCard />}
            label="ID Number"
            value={kyc.idNumber}
          />
          <DetailItem
            icon={<FaInfoCircle />}
            label="Nationality"
            value={kyc.nationality}
          />
          <DetailItem
            icon={<FaCalendarAlt />}
            label="Date of Birth"
            value={new Date(kyc.dob).toLocaleDateString()}
          />
          <DetailItem
            icon={<FaFlag />}
            label="Country of Residence"
            value={kyc.countryOfResidence}
          />
          <DetailItem
            icon={<FaLocationArrow />}
            label="Address"
            value={`${kyc.addressLine1}, ${kyc.city}, ${kyc.state} - ${kyc.zipCode}`}
          />
        </div>
        {/* <button
          onClick={toggleModal}
          className="bg-blue-500 text-white px-5 py-2 mt-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 font-semibold"
        >
          <FaInfoCircle className="mr-2 inline-block" /> Moderation Check
        </button> */}
      </div>

      {/* Document Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-transform">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Document Information
        </h2>
        <div className="flex items-center mb-4">
          <img
            src={kyc.documentImage}
            crossOrigin="anonymous"
            alt="Document"
            onClick={() => openImageModal(kyc.documentImage)}
            className="w-32 h-20 rounded-lg shadow-lg mr-4 border-2 border-gray-300 cursor-pointer hover:opacity-90 transition-opacity transform hover:scale-105"
          />
          <div className="flex-grow">
            <p className="text-gray-800">
              <strong>Document Type:</strong> <span>{kyc.documentType}</span>
            </p>
            <p className="mt-2 text-gray-800">
              <strong>ID Number:</strong> <span>{kyc.idNumber}</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <DetailItem
            icon={<FaCalendarAlt />}
            label="Issue Date"
            value={new Date(kyc.idIssueDate).toLocaleDateString()}
          />
          <DetailItem
            icon={<FaCalendarAlt />}
            label="Expiry Date"
            value={new Date(kyc.idExpiryDate).toLocaleDateString()}
          />
          <DetailItem
            icon={<FaFlag />}
            label="Issuing Country"
            value={kyc.idIssuingCountry}
          />
        </div>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg shadow-md flex flex-col sm:flex-row items-start sm:items-center mb-8 gap-4">
        {/* Icon Section */}
        <div className="w-12 h-12 flex items-center justify-center bg-blue-300 text-blue-700 rounded-full">
          <FaInfoCircle className="text-xl" />
        </div>

        {/* Prompt Section */}
        <div className="flex-grow">
          <p className="text-gray-800 font-medium mb-2">
            Review Moderation Checks
          </p>
          <p className="text-sm text-gray-600">
            Review moderation results including face match, OCR, and liveliness
            details.
          </p>
        </div>

        {/* Button Section */}
        <div className="w-full sm:w-auto">
          <button
            onClick={toggleModal}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105 whitespace-nowrap"
          >
            Check Now
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-6 mt-8">
        <ActionButton
          buttonText="Approve"
          status="Verified"
          onClick={() => handleStatusChange("Verified")}
          isLoading={isUpdating}
        />
        <ActionButton
          buttonText="Decline"
          status="Rejected"
          onClick={() => handleStatusChange("Rejected")}
          isLoading={isUpdating}
        />
      </div>

      {/* Moderation Details Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-8 relative overflow-y-auto max-h-[90vh] animate-fadeInDown">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-transform transform hover:rotate-45 hover:scale-125"
            >
              <MdClose className="text-3xl" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-gray-900">
                Moderation Results
              </h2>
              <p className="text-gray-600 mt-2">
                Review the results of the moderation process below.
              </p>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* OCR Match Card */}
              <div
                onClick={() => setSelectedCard("ocr")}
                className={`p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 ${
                  kyc.moderation.ocr.ocrMatch
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                    : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                } ${
                  selectedCard === "ocr"
                    ? "ring-4 ring-green-300 scale-105"
                    : "ring-2 ring-transparent"
                }`}
              >
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <span className="mr-2">OCR Match</span>
                  {kyc.moderation.ocr.ocrMatch ? (
                    <FaCheck className="text-2xl" />
                  ) : (
                    <FaTimes className="text-2xl" />
                  )}
                </h3>
                <p>{kyc.moderation.ocr.ocrMatch ? "Matched" : "Mismatched"}</p>
              </div>

              {/* Face Match Card */}
              <div
                onClick={() => setSelectedCard("face")}
                className={`p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 ${
                  kyc.moderation.faceMatch.match
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                    : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                } ${
                  selectedCard === "face"
                    ? "ring-4 ring-blue-500 scale-105"
                    : "ring-2 ring-transparent"
                }`}
              >
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <span className="mr-2">Face Match</span>
                  {kyc.moderation.faceMatch.match ? (
                    <FaCheck className="text-2xl" />
                  ) : (
                    <FaTimes className="text-2xl" />
                  )}
                </h3>
                <p>
                  {kyc.moderation.faceMatch.match ? "Matched" : "Not Matched"}
                </p>
              </div>

              {/* Liveliness Card */}
              <div
                onClick={() => setSelectedCard("liveliness")}
                className={`p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 ${
                  kyc.moderation.liveliness.passed
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                    : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                } ${
                  selectedCard === "liveliness"
                    ? "ring-4 ring-yellow-300 scale-105"
                    : "ring-2 ring-transparent"
                }`}
              >
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <span className="mr-2">Liveliness</span>
                  {kyc.moderation.liveliness.passed ? (
                    <FaCheck className="text-2xl" />
                  ) : (
                    <FaTimes className="text-2xl" />
                  )}
                </h3>
                <p>{kyc.moderation.liveliness.passed ? "Passed" : "Failed"}</p>
              </div>
            </div>

            {/* Dynamic Details Section */}
            {/* {selectedCard === "ocr" &&  (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">
            OCR Mismatch Details
          </h3>
          <div className="space-y-6">
            {Object.entries(kyc.moderation.ocr.ocrMismatchDetails).map(([field, details]) => (
              <div
                key={field}
                className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-red-100 to-red-200 border-l-4 border-red-500 transform transition-transform hover:scale-105"
              >
                <h4 className="text-lg font-bold text-red-700 capitalize mb-2">
                  {field.replace(/([A-Z])/g, " $1")}
                </h4>
                <p className="text-sm text-gray-700">
                  <strong>OCR Value:</strong> {details.ocrValue}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>KYC Value:</strong> {details.kycValue}
                </p>
                <p className="text-sm text-red-600 italic mt-2">{details.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )} */}

            {selectedCard === "ocr" && (
              <div className="mb-8">
                {kyc?.moderation?.ocr?.ocrMatch ? (
                  // If OCR matches, show OCR data in a single card
                  <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-l-8 border-green-500">
                    <div className="flex items-center mb-6">
                      <svg
                        className="w-8 h-8 text-green-600 mr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <h3 className="text-2xl font-semibold text-green-700">
                        OCR Matched Successfully
                      </h3>
                    </div>
                    <p className="text-lg text-gray-700 mb-6">
                      All OCR values have been verified and matched with the
                      provided KYC data.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {Object.entries(kyc?.moderation?.ocr?.ocrData)
                        .filter(([key]) => key !== "sex")
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="flex flex-col bg-white p-4 rounded-md shadow border border-gray-200"
                          >
                            <h4 className="text-sm font-bold text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </h4>
                            <p className="text-base font-medium text-gray-800 mt-1">
                              {value}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  // If OCR mismatch, show mismatch details
                  <div>
                    <h3 className="text-2xl font-semibold text-red-600 mb-4">
                      OCR Mismatch Details
                    </h3>
                    <div className="space-y-6">
                      {Object.entries(
                        kyc.moderation.ocr.ocrMismatchDetails
                      ).map(([field, details]) => (
                        <div
                          key={field}
                          className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-red-100 to-red-200 border-l-4 border-red-500 transform transition-transform hover:scale-105"
                        >
                          <h4 className="text-lg font-bold text-red-700 capitalize mb-2">
                            {field.replace(/([A-Z])/g, " $1")}
                          </h4>
                          <p className="text-sm text-gray-700">
                            <strong>OCR Value:</strong> {details.ocrValue}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>KYC Value:</strong> {details.kycValue}
                          </p>
                          <p className="text-sm text-red-600 italic mt-2">
                            {details.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedCard === "face" && (
              <div className="mb-8 flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-blue-600 mb-6">
                  Face Match Confidence
                </h3>
                <div className="relative w-48 h-48">
                  {/* Animated Circular Progress */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-gray-300"
                      strokeWidth="12"
                      stroke="currentColor"
                      fill="transparent"
                      r="70"
                      cx="96"
                      cy="96"
                    />
                    <circle
                      className="text-blue-500 transition-all duration-500 ease-out"
                      strokeWidth="12"
                      strokeDasharray="440"
                      strokeDashoffset={`${
                        440 -
                        (
                          440 * kyc.moderation.faceMatch.matchConfidence
                        ).toFixed(2)
                      }`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="70"
                      cx="96"
                      cy="96"
                    />
                  </svg>
                  {/* Inner Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-blue-600">
                        {(
                          kyc.moderation.faceMatch.matchConfidence * 100
                        ).toFixed(1)}
                        %
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Confidence Level
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-center mt-6">
                  The above circle represents the face match confidence score. A
                  higher score indicates a better match.
                </p>
              </div>
            )}

            {selectedCard === "liveliness" && (
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
                  Liveliness Check Details
                </h3>
                <p>{kyc.moderation.liveliness.livelinessDetails}</p>
                <div className="mt-4 space-y-4">
                  {Object.entries(
                    kyc.moderation.liveliness.livelinessResults
                  ).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key}:</span>
                      <span
                        className={`font-semibold ${
                          value.passed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {value.passed ? "Passed" : "Failed"} (Score:{" "}
                        {value.score})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={selectedImage}
              crossOrigin="anonymous"
              alt="Full View"
              className="max-w-full max-h-screen rounded-lg shadow-lg"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-3 right-3 text-white hover:text-red-500"
            >
              <MdClose className="text-3xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for rendering detail items with icons
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="flex items-center justify-center rounded-lg bg-blue-100 p-3 mr-3">
      {icon}
    </div>
    <div>
      <strong>{label}:</strong> {value}
    </div>
  </div>
);

// Helper component for rendering action buttons
const ActionButton = ({ buttonText, onClick, isLoading }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-lg font-semibold shadow-md ${
      isLoading
        ? "bg-gray-300"
        : buttonText === "Approve"
        ? "bg-green-500"
        : "bg-red-500"
    } text-white`}
    disabled={isLoading}
  >
    {isLoading ? "Processing..." : buttonText}
  </button>
);

export default CustomerDetail;
