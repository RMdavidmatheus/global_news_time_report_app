import { Button, User, addToast } from "@heroui/react";
import { Gear, LightBulb } from "react-ios-icons";
import {
  HiOutlineArrowRightOnRectangle,
  HiCalendar,
  HiMiniTableCells,
  HiBars3,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ModuleWork from "../components/module_work/module_work";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoginUtil } from "../components/login_form/util/login_form_util";
import LogoBigComponent from "../components/logo/logo_big";

function Activities() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [module, setModule] = useState<string>("");

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row w-full h-full overflow-hidden">
        {/* SIDEBAR */}
        <div
          className={`fixed sm:static z-50 bg-white shadow-md border-r-1 border-foreground/15 h-full
            w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[18%] 2xl:w-[18%] 3xl:w-[18%]
            sm:block transition-all duration-300 ${
              menuOpen ? "left-0" : "-left-full"
            }`}
        >
          <div className="flex flex-col justify-between h-full">
            {/* CABECERA MENÚ */}
            <div className="flex flex-col">
              {/* Botón cerrar solo visible en móvil */}
              <div className="sm:hidden flex justify-end p-4">
                <Button
                  onPress={() => setMenuOpen(false)}
                  isIconOnly
                  variant="light"
                >
                  <span className="text-2xl font-bold">&times;</span>
                </Button>
              </div>

              {/* Título y logo */}
              <div className="flex flex-col text-center items-center gap-1 mt-2">
                <div className="flex flex-col items-center justify-center ml-6">
                  <LogoBigComponent />
                </div>
                <h1 className="text-xl font-bold sm:text-3xl">Bienvenido</h1>
                <p className="text-xs font-thin px-2 text-center">
                  Aquí podrás crear, editar y eliminar tus tareas
                </p>
              </div>

              {/* Botones del menú */}
              <div className="flex flex-col px-4 py-4 gap-2">
                <Button
                  size="lg"
                  radius="sm"
                  variant="flat"
                  className="justify-start"
                  startContent={<HiMiniTableCells size={20} />}
                  onPress={() => setModule("works")}
                >
                  Módulo de tareas
                </Button>
                <Button
                  size="lg"
                  radius="sm"
                  variant="flat"
                  className="justify-start"
                  startContent={<HiCalendar size={20} />}
                >
                  Módulo de horarios
                </Button>
                <Button
                  size="lg"
                  radius="sm"
                  variant="flat"
                  className="justify-start"
                  startContent={<LightBulb />}
                >
                  Reportes
                </Button>
                <Button
                  size="lg"
                  radius="sm"
                  variant="flat"
                  className="justify-start"
                  startContent={<Gear />}
                >
                  Perfil
                </Button>
                <Button
                  size="lg"
                  radius="sm"
                  variant="flat"
                  className="justify-start"
                  startContent={<Gear />}
                >
                  Módulo para administradores
                </Button>
              </div>
            </div>

            {/* Usuario logueado */}
            <div className="px-4 py-3 border-t border-default">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <User
                  description="Soporte Online"
                  name={sessionStorage.getItem("full_name") as string}
                  className="text-sm"
                />
                <Button
                  color="danger"
                  variant="light"
                  isIconOnly
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
                  startContent={<HiOutlineArrowRightOnRectangle size={20} />}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex flex-col flex-grow h-screen bg-foreground/5 overflow-hidden">
          {/* Encabezado del contenido */}
          <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
            <div className="flex items-center gap-3">
              {/* Botón hamburguesa solo en móviles */}
              <Button
                className="sm:hidden"
                onPress={() => setMenuOpen(true)}
                isIconOnly
                variant="light"
              >
                <HiBars3 size={24} />
              </Button>
              <AnimatePresence mode="wait">
                <div className="text-xl sm:text-2xl font-bold text-black">
                  <motion.h1
                    key={module}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {module === "works"
                      ? "Módulo de tareas"
                      : "Módulo de horarios"}
                  </motion.h1>
                </div>
              </AnimatePresence>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-grow p-4 overflow-auto">
            <ModuleWork />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
