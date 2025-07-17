import { useState } from "react";
import {
  Form,
  Input,
  Button,
  addToast,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import type { Key } from "@react-types/shared";

export default function ContactFormComponent() {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contactTypeValue, setContactTypeValue] = useState<Set<Key>>(
    new Set([])
  );

  const contactTypes = [
    { key: "fallo", label: "Fallo" },
    { key: "duda", label: "Duda" },
    { key: "sugerencia", label: "Sugerencia" },
    { key: "otro", label: "Otro" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsLoading(true);
      try {
        const objectData = Object.fromEntries(new FormData(e.currentTarget));
        setMessage(`submit ${JSON.stringify(objectData)}`);
        addToast({
          title: "Mensaje enviado",
          description: "Gracias por contactarnos, pronto nos pondremos en contacto contigo",
          color: "success",
        });
        form.reset();
      } catch (error) {
        console.error("Error al procesar el mensaje:", error);
        addToast({
          title: "Error al procesar el mensaje",
          description: "Por favor, intenta nuevamente",
          color: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      form.reportValidity();
    }
  };

  return (
    <Form
      className="w-full flex flex-col items-center justify-center gap-8"
      onSubmit={handleSubmit}
      validationBehavior="native"
    >
      <Input
        isRequired
        errorMessage="Por favor, ingresa un correo electrónico válido"
        label="Correo electrónico"
        labelPlacement="outside"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        type="email"
      />

      <Input
        isRequired
        errorMessage="Por favor, ingresa un usuario o nombre válido"
        label="Usuario"
        labelPlacement="outside"
        name="user_name"
        placeholder="Ingresa tu usuario de la aplicación o tu nombre"
        type="text"
      />
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <p className="text-sm text-foreground">
          Categoría de la solicitud <span className="text-red-500">*</span>
        </p>
        <Select
          aria-label="Selecciona el tipo de contacto"
          isRequired
          errorMessage="Por favor, selecciona la categoría de la solicitud"
          className="w-full"
          selectedKeys={contactTypeValue}
          name="contact_type"
          placeholder="Selecciona la categoría"
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={(keys) =>
            setContactTypeValue(new Set(keys as Iterable<Key>))
          }
        >
          {contactTypes.map((item) => (
            <SelectItem
              key={item.key}
              color={
                item.key === "fallo"
                  ? "danger"
                  : item.key === "duda"
                  ? "warning"
                  : item.key === "sugerencia"
                  ? "success"
                  : "default"
              }
              variant="flat"
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="w-full flex flex-col items-start justify-start gap-2">
        <p className="text-sm text-foreground">
          Mensaje <span className="text-red-500">*</span>
        </p>
        <Textarea
          isRequired
          errorMessage="Por favor, ingresa el mensaje de la solicitud"
          name="message"
          placeholder="Ingresa el mensaje"
          description="Aquí puedes describir tu solicitud, sugerencias, dudas, etc."
        />
      </div>

      <div className="flex gap-2 w-[500px]">
        <Button color="primary" type="submit" isLoading={isLoading} className="w-full font-bold" variant="flat" isDisabled={isLoading} size="lg">
          Enviar
        </Button>
      </div>
      {message && (
        <div className="text-small text-default-500">
          Action: <code>{message}</code>
        </div>
      )}
    </Form>
  );
}
