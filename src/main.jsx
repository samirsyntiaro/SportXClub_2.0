
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/index.css";
import "./mock-api";

createRoot(document.getElementById("root")).render(<App />);
