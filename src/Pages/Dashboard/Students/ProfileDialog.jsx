/** @format */

import { Mail, MapPin, Phone, Calendar, Shield } from "lucide-react";
import PropTypes from "prop-types";

const ProfileDialog = ({ teacher }) => {
  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get full profile image URL - Fixed to match ProfilePage logic
  const getProfileImageUrl = (profileImg) => {
    if (!profileImg) return "/default-avatar.png"; // Use local default image

    // If it's already a full URL, return as is
    if (profileImg.startsWith("http")) return profileImg;

    // If it's a relative path, construct the full URL using the same base URL as ProfilePage
    return `http://10.10.12.15:8000${profileImg}`;
  };

  return (
    <div className="gap-6 p-6 rounded-2xl shadow-md border border-base-300 max-w-md mx-auto">
      {/* Header Section */}
      <div className="flex justify-between border-b border-gray-200 pb-4">
        <div className="flex flex-col md:flex-row text-left items-start gap-0 md:gap-5">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <img
              src={getProfileImageUrl(teacher.profileImg)}
              alt={`${teacher.name}'s profile`}
              crossOrigin="anonymous"
              className="w-full h-full rounded-full object-cover bg-gray-200 ring-2 ring-gray-100"
              onError={(e) => {
                e.target.src = "/default-avatar.png"; // Use local fallback image
              }}
            />
            {teacher.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                <Shield className="w-3 h-3" />
              </div>
            )}
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold mt-2 flex items-center gap-2">
              {teacher.name}
              {teacher.isVerified && (
                <span className="text-green-500 text-sm">✓</span>
              )}
            </h2>
            <p className="text-gray-500 text-sm">{teacher.email || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="mt-2 text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-lg capitalize">
            {teacher.role || "Student"}
          </span>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="text-sm space-y-4 mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium text-gray-800">
            Personal Information
          </h1>
        </div>

        <div className="grid grid-cols-1 space-y-4">
          {/* Email */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="text-gray-400 mt-1 flex-shrink-0" size={18} />
            <div className="text-start">
              <p className="text-black font-medium">{teacher.email || "N/A"}</p>
              <p className="text-gray-500 text-xs">Email Address</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="text-gray-400 mt-1 flex-shrink-0" size={18} />
            <div className="text-start">
              <p className="text-black font-medium">
                {teacher.phoneNumber || "N/A"}
              </p>
              <p className="text-gray-500 text-xs">Phone Number</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={18} />
            <div className="text-start">
              <p className="text-black font-medium">
                {teacher.address || "N/A"}
              </p>
              <p className="text-gray-500 text-xs">Location</p>
            </div>
          </div>

          {/* Join Date */}
          {teacher.joinedDate && (
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar
                className="text-gray-400 mt-1 flex-shrink-0"
                size={18}
              />
              <div className="text-start">
                <p className="text-black font-medium">
                  {formatDate(teacher.joinedDate)}
                </p>
                <p className="text-gray-500 text-xs">Joined Date</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileDialog.propTypes = {
  teacher: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    profileImg: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.string,
    role: PropTypes.string,
    isVerified: PropTypes.bool,
    joinedDate: PropTypes.string,
    teacherProfile: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      phone_number: PropTypes.string,
      address: PropTypes.string,
      profile_picture: PropTypes.string,
      joined_date: PropTypes.string,
    }),
  }).isRequired,
};

export default ProfileDialog;
