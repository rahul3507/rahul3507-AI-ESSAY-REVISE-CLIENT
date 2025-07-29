/** @format */

import { Mail, MapPin, Phone } from "lucide-react";

import PropTypes from "prop-types";

const ProfileDialog = ({ teacher }) => {
  return (
    <div className="gap-6 p-6 rounded-2xl shadow-md border border-base-300">
      <div className="flex justify-between border-b border-gray-200 pb-4">
        <div className="flex flex-col md:flex-row text-left items-start gap-0 md:gap-5">
          <div className="relative w-14 h-14 md:w-18 md:h-18">
            <img
              src={teacher.profileImg || "https://i.pravatar.cc/150?img=32"}
              alt="Profile"
              crossOrigin="anonymous"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold mt-2">
              {teacher.teacherName}
            </h2>
            <p className="text-gray-400">{teacher.email || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="mt-2 text-sm font-semibold bg-gray-100 text-black px-2 py-1 rounded-lg">
            {teacher.role}
          </span>
        </div>
      </div>

      <div className="text-sm md:text-end text-center space-y-3 mt-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Personal Information</h1>
        </div>
        <div className="grid grid-cols-1  space-y-6">
          <div className="flex items-center gap-2">
            <Mail className="text-gray-400" />
            <div className="text-start">
              <p className="text-black">{teacher.email || "N/A"}</p>
              <p className="text-gray-400">E-mail</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="text-gray-400" />
            <div className="text-start">
              <p className="text-black">{teacher.phoneNumber || "N/A"}</p>
              <p className="text-gray-400">Phone</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="text-gray-400" />
            <div className="text-start">
              <p className="text-black">{teacher.address || "N/A"}</p>
              <p className="text-gray-400">Location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ProfileDialog.propTypes = {
  teacher: PropTypes.shape({
    profileImg: PropTypes.string,
    teacherName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default ProfileDialog;
