import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Input,
  Link,
  addToast,
} from "@heroui/react";
import { useState } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineKey,
  HiOutlineUser,
} from "react-icons/hi2";
import LogoBigComponent from "../logo/logo_big";
import { useNavigate } from "react-router-dom";
import { LoginUtil, type BodyLogin } from "./util/login_form_util";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const form = e.currentTarget;

      if (form.checkValidity()) {
        setIsLoading(true);
        const objectData = Object.fromEntries(new FormData(e.currentTarget));
        const body: BodyLogin = {
          user_name: objectData.user_name as string,
          password: objectData.password as string,
        };
        const response = await LoginUtil.login(body);
        const sessionDecode = await LoginUtil.sessionDecode();
        const sessionValues = await LoginUtil.gatSessionValues(sessionDecode);
        const fullName = LoginUtil.capitalizeWords(sessionValues[3] as string);

        sessionStorage.setItem("admin", sessionValues[0] as string);
        sessionStorage.setItem("user_id", sessionValues[1] as string);
        sessionStorage.setItem("username", sessionValues[2] as string);
        sessionStorage.setItem("full_name", fullName);
        sessionStorage.setItem("auth", "true");

        if (response === "Successfully logged in") {
          addToast({
            title: "Exito",
            description: "Inicio de sesión exitoso",
            color: "success",
          });
          navigate("/");
        } else {
          addToast({
            title: "Error",
            description: "Usuario o contraseña incorrectos",
            color: "danger",
          });
        }
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: "Error",
        description: "Error al iniciar sesión, contacta a soporte",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="z-10 w-[100%] 2xl:w-[140%] 3xl:w-[140%]">
        <CardHeader className="flex flex-col items-center p-10 gap-4">
          <div className="flex flex-col items-center justify-center text-center ml-9">
            <Button
              onPress={() => navigate("/")}
              isIconOnly
              variant="light"
              className="absolute top-5 left-5"
              size="md"
              startContent={<HiOutlineArrowLeft className="text-foreground" />}
            />
            <LogoBigComponent />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-semibold text-foreground">
              Bienvenido de nuevo
            </h1>
            <p className="text-xs font-thin text-foreground">
              Aqui podras ingresar a tu cuenta y gestionar tus actividades
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={handleLogin}
            className="space-y-4"
            validationBehavior="native"
          >
            <Input
              isRequired
              isClearable
              name="user_name"
              type="text"
              size="lg"
              errorMessage="Ingresa un nombre de usuario valido"
              placeholder="Ingresa tu nombre de usuario"
              startContent={<HiOutlineUser className="text-default-400" />}
            />
            <Input
              isRequired
              isClearable
              name="password"
              type="password"
              size="lg"
              errorMessage="Ingresa una contraseña valida"
              placeholder="Ingresa tu contraseña"
              startContent={<HiOutlineKey className="text-default-400" />}
            />
            <div className="flex items-center text-center justify-center w-full">
              <Link
                size="sm"
                className="text-primary"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button
              type="submit"
              color="primary"
              className="w-[70%] mx-auto"
              size="lg"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Iniciar sesión
            </Button>
          </Form>
        </CardBody>
        <div className="text-center p-4">
          <span className="text-default-500">¿No tienes una cuenta? </span>
          <Link
            href=""
            onPress={() => navigate("/register")}
            size="sm"
            className="text-primary"
          >
            Registrate
          </Link>
        </div>
      </Card>
    </div>
  );
}
