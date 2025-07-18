import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Form,
  addToast,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import type { Key } from "@react-types/shared";
import {
  ModalAddUtil,
  type BodyTask,
  type BodyAuditory,
} from "./util/modal_util";

export default function ModalAddWork({
  isOpen,
  onOpenChange,
  onClose,
  lengthAuditory,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  lengthAuditory: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [minutesValue, setMinutesValue] = useState<Set<Key>>(new Set([]));
  const [taskLimit, setTaskLimit] = useState<number>(0);

  const minutesValues = [
    { key: "5", label: "5 minutos" },
    { key: "10", label: "10 minutos" },
    { key: "15", label: "15 minutos" },
    { key: "30", label: "30 minutos" },
    { key: "45", label: "45 minutos" },
    { key: "60", label: "1 hora" },
    { key: "75", label: "1 hora 15 minutos" },
    { key: "90", label: "1 hora 30 minutos" },
    { key: "105", label: "1 hora 45 minutos" },
    { key: "120", label: "2 horas" },
  ];

  useEffect(() => {
    console.log("maxPost", taskLimit);
    console.log("lengthAuditory", lengthAuditory);
  }, [taskLimit, lengthAuditory]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsLoading(true);
      try {
        const objectData = Object.fromEntries(new FormData(e.currentTarget));

        if (lengthAuditory < 6) {
          const body: BodyTask = {
            task_name: objectData.task as string,
            task_client: objectData.client as string,
            task_minutes: parseInt(
              minutesValue.values().next().value as string
            ),
          };

          const response_task = await ModalAddUtil.createTask(body);
          const task_id: string | undefined = response_task.match(
            /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
          )?.[0];

          const body_auditory: BodyAuditory = {
            id_user: "93de28f5-c17a-4701-9205-6896563169c2",
            id_task: task_id ?? "",
          };
          await ModalAddUtil.createAuditory(body_auditory);
          setTaskLimit(lengthAuditory);
          addToast({
            title: "Exito",
            description: "Tarea asignada correctamente",
            color: "success",
          });
        }
        else if(taskLimit === 5 || lengthAuditory === 6){
            addToast({
                title: "Error",
                description: "No se puede asignar más tareas, por favor finalice las tareas pendientes",
                color: "danger",
            });
        }

        form.reset();
        onClose();
      } catch (error) {
        console.error("Error al procesar el mensaje:", error);
        addToast({
          title: "Error",
          description:
            "No se pudo asignar la tarea, contacta con el administrador",
          color: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h1 className="text-2xl font-semibold">Añadir tarea</h1>
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={onSubmit}
            className="flex flex-col w-full"
            validationBehavior="native"
          >
            <div className="flex flex-col gap-5 w-full">
              <Input
                placeholder="Ingrese el nombre de la tarea"
                className="w-full"
                variant="flat"
                label="Tarea"
                name="task"
                labelPlacement="outside"
                isRequired
                isClearable
              />

              <Input
                placeholder="Ingrese el nombre del cliente"
                className="w-full"
                variant="flat"
                name="client"
                label="Cliente"
                labelPlacement="outside"
                isRequired
                isClearable
              />

              <Select
                placeholder="Seleccione el tiempo de la tarea"
                className="w-full"
                variant="flat"
                name="time"
                label="Tiempo"
                labelPlacement="outside"
                isRequired
                selectedKeys={minutesValue}
                onSelectionChange={(keys) =>
                  setMinutesValue(new Set(keys as Iterable<Key>))
                }
              >
                {minutesValues.map((item) => (
                  <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
              </Select>
            </div>
            <ModalFooter className="flex flex-row gap-2 w-full">
              <Button
                color="primary"
                variant="solid"
                className="w-full"
                type="submit"
                isLoading={isLoading}
              >
                Guardar
              </Button>
              <Button
                color="danger"
                onPress={onClose}
                variant="solid"
                className="w-full"
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
