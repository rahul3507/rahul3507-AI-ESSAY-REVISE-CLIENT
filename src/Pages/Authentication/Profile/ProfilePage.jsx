import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
// import { FaTrashCan } from "react-icons/fa6";
import { FiEdit2, FiExternalLink, FiLock, FiUpload } from "react-icons/fi";
import useLoggedUser from "../../../components/hook/useLoggedUser";
import apiClient from "../../../lib/api-client";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function ProfilePage() {
  const { user, loading, refetch } = useLoggedUser([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    if (user?.user) {
      setFormData({
        first_name: user.user.user_profile?.first_name || "",
        last_name: user.user.user_profile?.last_name || "",
        email: user.user.email || "",
        phone_number: user.user.user_profile?.phone_number || "",
        address: user.user.user_profile?.address || "",
        profile_picture: "",
        profile_picture_preview: user.user.user_profile?.profile_picture || "",
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
  // const openDeleteModal = () => setIsDeleteModalOpen(true);
  // const closeDeleteModal = () => setIsDeleteModalOpen(false);

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

      const response = await apiClient.put("auth/profile/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data) {
        const updated = response.data;
        refetch();
        setFormData((prev) => ({
          ...prev,
          first_name: updated.user_profile?.first_name || "",
          last_name: updated.user_profile?.last_name || "",
          email: updated.email || "",
          phone_number: updated.user_profile?.phone_number || "",
          address: updated.user_profile?.address || "",
          profile_picture_preview: updated.user_profile?.profile_picture || "",
        }));
        alert("Profile updated successfully!");
        closeEditProfileModal();
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Failed to update profile.");
    }
  };

  const handleSavePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Password changed successfully!");
    alert("Password changed successfully!");
    closePasswordModal();
  };

  // const handleDeleteAccount = () => {
  //   console.log("Account deleted!");
  //   alert("Your account has been deleted!");
  //   closeDeleteModal();
  // };

  if (loading) return <LoadingSpinner/>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="p-5">
      {/* Profile Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl shadow-md border border-base-300">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <img
              src={
                formData.profile_picture_preview
                  ? `https://aissayrevise.pythonanywhere.com${formData.profile_picture_preview}`
                  : "https://i.pravatar.cc/150?img=32"
              }
              alt="Profile"
              crossOrigin="anonymous"
              className="w-full h-full rounded-full object-cover"
            />
            <button className="absolute bottom-1 right-1 p-2 cursor-pointer rounded-full bg-white/60">
              <FaEdit
                onClick={openEditProfileModal}
                className="text-gray-600"
              />
            </button>
          </div>
          <div className="text-center md:text-left">
            <span className="mt-2 text-sm font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {user?.user?.role}
            </span>
            <h2 className="text-lg font-semibold mt-2">
              {formData.first_name} {formData.last_name}
            </h2>
          </div>
        </div>

        <div className="text-sm md:text-end text-center space-y-3">
          <div>
            <p className="font-medium">E-mail</p>
            <p className="text-gray-600">{formData.email || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-gray-600">{formData.phone_number || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium">Address</p>
            <p className="text-gray-600">{formData.address || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Update Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Name</label>
          <div className="relative">
            <input
              type="text"
              value={`${user?.user?.user_profile?.first_name || ""} ${
                user?.user?.user_profile?.last_name || ""
              }`.trim()}
              readOnly
              className="w-full bg-blue-100 text-blue-500 rounded-lg py-2 px-4 pr-10 outline-none"
            />

            <FiEdit2
              onClick={openEditProfileModal}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">E-mail</label>
          <div className="relative">
            <input
              type="email"
              value={user?.user?.email}
              readOnly
              className="w-full bg-blue-100 text-blue-500 rounded-lg py-2 px-4 pr-10 outline-none"
            />
            <FiEdit2
              onClick={openEditProfileModal}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="mt-8 p-6 rounded-2xl border border-blue-200 shadow-md gap-4">
        <button
          onClick={openPasswordModal}
          className="text-gray-500 hover:text-blue-500 transition py-3"
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

      {/* Delete Account Section */}
      {/* <div className="md:flex justify-between items-center mt-8 p-6 shadow-md rounded-2xl border border-red-300">
        <div>
          <h4 className="text-red-500 font-semibold text-lg">Delete Account</h4>
          <p className="text-gray-500 text-sm mt-2">
            Contact our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              support team
            </a>{" "}
            to process the deletion of your account.
          </p>
        </div>
        <div className="py-3">
          <button
            onClick={openDeleteModal}
            className="bg-red-500 hover:bg-red-600 shadow-md text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Apply Delete
          </button>
        </div>
      </div> */}

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
                          : `https://aissayrevise.pythonanywhere.com${formData.profile_picture_preview}`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
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
                className="p-2 border border-gray-200 rounded-lg"
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

      {/* Delete Account Modal */}
      {/* {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-md">
            <div className="w-10 h-10 bg-red-100 rounded-lg mb-4 flex items-center justify-center">
              <FaTrashCan className="text-red-500 text-xl" />
            </div>
            <h5 className="text-gray-600 font-semibold">
              Are you sure you want to delete your account?
            </h5>
            <p className="mb-5">
              Enter your current password you used to login with
            </p>
            <div className="flex justify-between gap-4 w-full">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg border border-base-300 text-gray-600 hover:bg-gray-100 w-full"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 w-full"
              >
                Yes Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
