import { Button, Divider, User } from "@heroui/react";
import { Folder, Gear, LightBulb } from "react-ios-icons";
import { HiOutlineArrowRightOnRectangle, HiCalendar, HiMiniTableCells  } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ModuleWork from "../components/module_work/module_work";
import { useState } from "react";

function Activities() {
  const navigate = useNavigate();
  const [module, setModule] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col w-[20%] h-[100vh] border-r-1 border-foreground/15 shadow-md">
          {/* Div title */}
          <div className="flex flex-col h-[17%] text-center justify-center items-center gap-1">
            <div className="flex flex-col items-center justify-center mt-3">
              <h1 className="text-3xl font-Bold">Bienvenido</h1>
              <p className="text-xs font-thin">
                Aqui podras crear, editar y eliminar tus tareas
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <Folder filled className="text-foreground w-20 h-20" />
            </div>
          </div>
          {/* Div menu */}
          <div className="flex flex-col h-[83%] px-2">
            <Button
              radius="none"
              color="default"
              variant="flat"
              className="justify-start text-left w-full"
              startContent={<HiMiniTableCells size={23} className="ml-1"/>}
            >
              Módulo de tareas
            </Button>
            <Button
              radius="none"
              color="default"
              variant="flat"
              className="justify-start text-left w-full"
              startContent={<HiCalendar size={23} className="ml-1" />}
            >
              Módulo de horarios
            </Button>
            <Button
              radius="none"
              color="default"
              variant="flat"
              className="justify-start text-left w-full"
              startContent={<LightBulb />}
            >
              Reportes
            </Button>
            <Button
              radius="none"
              color="default"
              variant="flat"
              className="justify-start text-left w-full"
              startContent={<Gear />}
            >
              Perfil
            </Button>

            <Button
              radius="none"
              color="default"
              variant="flat"
              className="justify-start text-left w-full"
              startContent={<Gear />}
            >
              Módulo para administradores
            </Button>
          </div>
          <Divider className="my-1 w-[100%] border-1" />
          <div className="flex flex-row justify-center items-center h-20 gap-2">
            <User
              description="Soporte Online"
              name="Leonardo Gomez Gomez"
              avatarProps={{ src: "/images/1.png" }}
            />
            <Button
              color="danger"
              variant="light"
              startContent={<HiOutlineArrowRightOnRectangle size={20} />}
              isIconOnly
              onPress={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
        {/* Div content */}
        <div className="flex flex-col w-[100%] h-[100vh] bg-foreground/5">
          <div className="w-full bg-white py-3 px-6 shadow-xs">
            <h1 className="text-2xl font-bold text-black">Módulo de tareas</h1>
          </div>
          <div className="flex flex-col m-5">
            <ModuleWork />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
