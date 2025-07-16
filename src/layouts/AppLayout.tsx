import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar/navbar";

export default function AppLayout() {
  return (
    <>
      <NavbarComponent />
      <main>
        <Outlet />
      </main>
    </>
  );
}