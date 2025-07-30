import { Button, Form, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiMiniUser } from "react-icons/hi2";

export default function ModuleProfile() {
  const user_name = sessionStorage.getItem("username") || "";
  const [data, setData] = useState({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData);
    const file = formData.get("profile_picture");

    if (e.currentTarget.checkValidity()) {
      if (file && file instanceof File) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;
          const finalData = {
            ...entries,
            profile_picture: base64,
          };
          setData(finalData);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-col items-center justify-center w-full h-full gap-8">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <HiMiniUser size={190} />
        </motion.div>
        <div className="container flex flex-col justify-center items-center">
          <Form
            className="flex flex-col justify-center items-center gap-6 w-[50%]"
            validationBehavior="native"
            onSubmit={handleSubmit}
          >
            <Input
              isDisabled={user_name ? true : false}
              isClearable
              className="w-full"
              variant="flat"
              label="Nombre de usuario"
              labelPlacement="outside"
              placeholder="Ingrese su nombre de usuario"
              name="user_name"
              value={user_name}
              type="text"
              errorMessage="Debe ingresar su nombre de usuario"
              isRequired
            />

            <Input
              isClearable
              className="w-full"
              variant="flat"
              label="Nombres"
              labelPlacement="outside"
              placeholder="Ingrese sus nombres"
              name="first_name"
              type="text"
              errorMessage="Debe ingresar sus nombres"
              isRequired
            />

            <Input
              isClearable
              className="w-full"
              variant="flat"
              label="Apellidos"
              labelPlacement="outside"
              placeholder="Ingrese sus apellidos"
              name="last_name"
              type="text"
              errorMessage="Debe ingresar sus apellidos"
              isRequired
            />

            <Input
              isClearable
              className="w-full"
              variant="flat"
              label="Correo electrónico"
              labelPlacement="outside"
              placeholder="Ingrese su correo electrónico"
              name="email"
              type="email"
              errorMessage="Debe ingresar su correo electrónico"
              isRequired
            />

            <Input
              isClearable
              className="w-full"
              variant="flat"
              label="Foto de perfil"
              labelPlacement="outside"
              name="profile_picture"
              type="file"
              accept="image/*"
              errorMessage="Debe ingresar su foto de perfil"
              isRequired
            />

            <Button
              className="w-[50%]"
              variant="solid"
              color="primary"
              type="submit"
              size="lg"
            >
              Guardar cambios
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
