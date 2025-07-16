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
} from "@heroui/react";
import { useState } from "react";
import LogoComponent from "../logo/logo";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavbarComponent() {
  //* State for the navbar (Mobile)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //* Menu Items for the navbar (Mobile)
  const menuItems = [
    "Inicio",
    "Acerca de nuestro proyecto",
    "Actividades",
    "Contacto",
  ];

  const routeMap: Record<string, string> = {
    inicio: "/",
    acerca: "#about",
    actividades: "/activities",
    contacto: "#contact",
  };

  const navigate = useNavigate();

  const location = useLocation();

  const handleNavigate = (route: string) => {
    if (route === "#contact") {
      setIsMenuOpen(false);

      if (location.pathname !== "/") {
        navigate("/");

        setTimeout(() => {
          const el = document.getElementById("contact");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setIsMenuOpen(false);
      navigate(route);
    }
  };

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
        <NavbarItem isActive={location.pathname === "/activities"} hidden>
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
        <NavbarItem>
          <Link
            href=""
            className="text-md"
            onPress={() => navigate("/register")}
          >
            Registrarse
          </Link>
        </NavbarItem>
        <NavbarItem>
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
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href=""
              size="lg"
              onPress={() => handleNavigate(routeMap[item.toLowerCase()])}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
