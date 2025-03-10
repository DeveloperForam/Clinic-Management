import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to Hospital Management System</h2>
      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
}
