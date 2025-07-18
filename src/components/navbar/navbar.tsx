import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  addToast,
  Avatar,
} from "@heroui/react";
import { useState } from "react";
import LogoComponent from "../logo/logo";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginUtil } from "../login_form/util/login_form_util";

export default function NavbarComponent() {
  //* State for the navbar (Mobile)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated: boolean =
    sessionStorage.getItem("auth") === "true" ? true : false;

  return (
    <Navbar
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      {/* Mobile Menu */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarBrand>
        <div className="flex items-center space-x-2">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <LogoComponent />
            </motion.div>
          </Link>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === "/"}>
          <Link
            aria-current="page"
            color={location.pathname === "/" ? "primary" : "foreground"}
            href={location.pathname === "/" ? "#home" : "/"}
          >
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem hidden={location.pathname !== "/"}>
          <Link
            color="foreground"
            href={location.pathname !== "/" ? "" : "#about"}
          >
            Acerca de nuestro proyecto
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={location.pathname === "/activities"}
          hidden={isAuthenticated ? false : true}
        >
          <Link
            color={
              location.pathname === "/activities" ? "primary" : "foreground"
            }
            href=""
            onPress={() => navigate("/activities")}
          >
            Actividades
          </Link>
        </NavbarItem>
        <NavbarItem hidden={location.pathname !== "/"}>
          <Link
            color="foreground"
            href={location.pathname !== "/" ? "" : "#contact"}
          >
            Contacto
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem hidden={isAuthenticated ? true : false}>
          <Link
            href=""
            className="text-md"
            onPress={() => navigate("/register")}
          >
            Registrarse
          </Link>
        </NavbarItem>
        <NavbarItem hidden={isAuthenticated ? true : false}>
          <Button
            as={Link}
            color="primary"
            variant="flat"
            className="text-md"
            onPress={() => navigate("/login")}
          >
            Iniciar sesión
          </Button>
        </NavbarItem>

        <NavbarItem hidden={isAuthenticated ? false : true}>
          <Avatar
            color="default"
            size="lg"
          />
        </NavbarItem>
        <NavbarItem hidden={isAuthenticated ? false : true}>
          <Button
            as={Link}
            color="danger"
            variant="flat"
            className="text-md"
            onPress={async () => {
              const response = await LoginUtil.logout();
              if (response === "Successfully logged out") {
                addToast({
                  title: "Exito",
                  description: "Cierre de sesión exitoso",
                  color: "success",
                });
                sessionStorage.clear();
                navigate("/");
              }
              else {
                addToast({
                  title: "Error",
                  description: "Error al cerrar sesión",
                  color: "danger",
                });
              }
            }}
          >
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <NavbarMenuItem isActive={location.pathname === "/"}>
          <Link
            className="w-full"
            color={location.pathname === "/" ? "primary" : "foreground"}
            href="#home"
            size="lg"
          >
            Inicio
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#about" size="lg">
            Acerca de nuestro proyecto
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem hidden={isAuthenticated ? false : true}>
          <Link
            className="w-full"
            color="foreground"
            href=""
            size="lg"
            onPress={() => navigate("/activities")}
          >
            Actividades
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="#contact" size="lg">
            Contacto
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
