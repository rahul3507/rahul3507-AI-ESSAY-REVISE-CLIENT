/** @format */

import useLoggedUser from "../../../components/hook/useLoggedUser";
import StudentAssignment from "./StudentAssignment";
import TeacherAssignment from "./TeacherAssignment/TeacherAssignment";

const Assignment = () => {
  const { user } = useLoggedUser();
  return (
    <div className="px-4">
      {user?.role === "student" ? <StudentAssignment /> : <TeacherAssignment />}
    </div>
  );
};

export default Assignment;
