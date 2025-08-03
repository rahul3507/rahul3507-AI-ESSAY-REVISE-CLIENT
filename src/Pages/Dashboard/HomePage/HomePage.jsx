/** @format */

import useLoggedUser from "../../../components/hook/useLoggedUser";
import StudentHomePage from "./StudentHomePage";
import TeacherHome from "./TeacherHome/TeacherHome";

const HomePage = () => {
  const { user } = useLoggedUser([]);
  return (
    <div className="px-4">
      {user?.role === "student" ? <StudentHomePage /> : <TeacherHome />}
    </div>
  );
};

export default HomePage;
