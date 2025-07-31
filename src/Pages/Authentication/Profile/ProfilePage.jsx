/** @format */

import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { FiEdit2, FiExternalLink, FiLock, FiUpload } from "react-icons/fi";
import useLoggedUser from "../../../components/hook/useLoggedUser";
import apiClient from "../../../lib/api-client";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Mail, MapPin, Phone } from "lucide-react";
import BillingHistoryTable from "./BillingHistoryTable";

import { Bounce, toast, ToastContainer } from "react-toastify";

export default function ProfilePage() {
  const { user, loading, refetch } = useLoggedUser([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    profile_picture: "",
    profile_picture_preview: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      console.log("User data received:", user);
      setFormData({
        first_name: user.user_profile?.first_name || "",
        last_name: user.user_profile?.last_name || "",
        email: user.email || "",
        phone_number: user.user_profile?.phone_number || "",
        address: user.user_profile?.address || "",
        profile_picture: "",
        profile_picture_preview: user.user_profile?.profile_picture
          ? `http://10.10.12.15:8000${user.user_profile.profile_picture}`
          : "/default-avatar.png",
      });
    }
  }, [user]);

  const openEditProfileModal = () => setIsEditProfileModalOpen(true);
  const closeEditProfileModal = () => setIsEditProfileModalOpen(false);
  const openPasswordModal = () => setIsModalOpen(true);
  const closePasswordModal = () => {
    setIsModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEditProfileChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const previewURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profile_picture: file,
        profile_picture_preview: previewURL,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditProfileSave = async () => {
    try {
      const payload = new FormData();
      payload.append("first_name", formData.first_name);
      payload.append("last_name", formData.last_name);
      payload.append("email", formData.email);
      payload.append("phone_number", formData.phone_number);
      payload.append("address", formData.address);
      if (formData.profile_picture instanceof File) {
        payload.append("profile_picture", formData.profile_picture);
      }

      const response = await apiClient.put("/auth/profile/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data) {
        const updated = response.data;
        // console.log("API response:", updated); // Debug log to inspect response

        // Construct the profile picture URL
        let profilePictureUrl = "/default-avatar.png"; // Default fallback
        if (updated.user_profile?.profile_picture) {
          // Check if the URL is absolute or relative
          const isAbsoluteUrl =
            updated.user_profile.profile_picture.startsWith("http");
          profilePictureUrl = isAbsoluteUrl
            ? updated.user_profile.profile_picture
            : `http://10.10.12.15:8000${updated.user_profile.profile_picture}`;
        }

        // Update formData with validated URL
        setFormData((prev) => ({
          ...prev,
          first_name: updated.user_profile?.first_name || prev.first_name,
          last_name: updated.user_profile?.last_name || prev.last_name,
          email: updated.email || prev.email,
          phone_number: updated.user_profile?.phone_number || prev.phone_number,
          address: updated.user_profile?.address || prev.address,
          profile_picture: "", // Reset file input
          profile_picture_preview: profilePictureUrl,
        }));

        refetch(); // Refresh user data
        toast.success("Profile updated successfully!");
        closeEditProfileModal();
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long!");
      return;
    }

    try {
      const response = await apiClient.post("/auth/password-change/", {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword, // Include if required by API
      });

      if (response?.data) {
        toast.success("Password changed successfully!");
        closePasswordModal();
      }
    } catch (error) {
      // console.error("Password change failed:", error.response?.data);
      const errorMessage =
        error.response?.data?.details ||
        error.response?.data?.message ||
        "Please check your current password.";
      toast.error(`Failed to change password: ${errorMessage}`);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="p-5">
      {/* Profile Header */}
      <div className="gap-6 p-6 rounded-2xl shadow-md border border-base-300">
        <div className="flex justify-between border-b border-gray-200 pb-4">
          <div className="flex flex-col md:flex-row text-left items-start gap-0 md:gap-5">
            <div className="relative w-14 h-14 md:w-18 md:h-18">
              <img
                src={formData.profile_picture_preview}
                alt="Profile"
                crossOrigin="anonymous"
                className="w-full h-full rounded-full object-cover bg-gray-200"
                onError={(e) => {
                  e.target.src = "/default-avatar.png"; // Fallback image
                }}
              />
              <button className="absolute bottom-0.5 right-0 p-1 cursor-pointer rounded-full bg-white/60 m-auto">
                <FaEdit
                  onClick={openEditProfileModal}
                  className="text-gray-600"
                />
              </button>
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold mt-2">
                {formData.first_name} {formData.last_name}
              </h2>
              <p className="text-gray-400">{formData.email || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mt-2 text-sm font-semibold bg-gray-100 text-black px-2 py-1 rounded-lg">
              {user?.role}
            </span>
          </div>
        </div>

        <div className="text-sm md:text-end text-center space-y-3 mt-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-medium">Personal Information</h1>
            <button
              className="text-blue-500 flex gap-1 justify-center items-center cursor-pointer"
              onClick={openEditProfileModal}
            >
              <FiEdit2 className="text-black w-3 h-3" />
              <p className="text-sm text-black">Edit</p>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 space-y-6">
            <div className="flex items-center gap-2">
              <Mail className="text-gray-400" />
              <div className="text-start">
                <p className="text-black">{formData.email || "N/A"}</p>
                <p className="text-gray-400">E-mail</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-gray-400" />
              <div className="text-start">
                <p className="text-black">{formData.phone_number || "N/A"}</p>
                <p className="text-gray-400">Phone</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-gray-400" />
              <div className="text-start">
                <p className="text-black">{formData.address || "N/A"}</p>
                <p className="text-gray-400">Location</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openPasswordModal}
                className="text-gray-500 hover:text-blue-500 transition py-3 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gray-200">
                    <FiLock className="text-gray-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Change Password</h4>
                  </div>
                  <FiExternalLink size={20} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* billing history */}
      <div className="gap-6 p-6 rounded-2xl shadow-md border border-base-300 mt-8">
        <h1 className="text-xl text-black font-semibold mb-6">
          Billing History
        </h1>
        <BillingHistoryTable />
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-2xl shadow-md w-full max-w-xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Edit Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Profile Image Upload */}
              <div className="sm:col-span-2 flex flex-col items-center space-y-2">
                <div className="relative group w-28 h-28 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500 transition">
                  {formData.profile_picture_preview ? (
                    <img
                      src={
                        formData.profile_picture_preview?.startsWith("blob:")
                          ? formData.profile_picture_preview
                          : formData.profile_picture_preview
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/default-avatar.png";
                      }}
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <FiUpload className="text-white text-2xl" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    name="profile_picture"
                    onChange={handleEditProfileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload Profile Picture
                </p>
              </div>

              {/* Other Fields */}
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleEditProfileChange}
                placeholder="First Name"
                className="p-2 border border-gray-200 rounded-lg"
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleEditProfileChange}
                placeholder="Last Name"
                className="p-2 border border-gray-200 rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleEditProfileChange}
                placeholder="Email"
                disabled
                className="p-2 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleEditProfileChange}
                placeholder="Phone Number"
                className="p-2 border border-gray-200 rounded-lg"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleEditProfileChange}
                placeholder="Address"
                className="p-2 border border-gray-200 rounded-lg sm:col-span-2"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={closeEditProfileModal}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProfileSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Change Password
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border p-3 rounded-lg outline-none"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-3 rounded-lg outline-none"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-3 rounded-lg outline-none"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closePasswordModal}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePassword}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
