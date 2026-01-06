import { useNavigate } from "react-router-dom";

const OrgDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-3xl font-bold">
        Welcome, {localStorage.getItem("orgName")}
      </h2>

      <button onClick={()=>navigate("/org/manage-stock")}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Manage Blood Stock
      </button>

      <button onClick={()=>navigate("/org/manage-events")}
        className="bg-green-600 text-white px-6 py-2 rounded-lg">
        Create / Manage Events
      </button>

      <button onClick={()=>{
        localStorage.clear();
        navigate("/");
      }}
      className="bg-red-600 text-white px-6 py-2 rounded-lg">
        Logout
      </button>
    </div>
  );
};

export default OrgDashboard;
