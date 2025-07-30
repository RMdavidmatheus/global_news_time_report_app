import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  addToast,
  useDisclosure,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsDot } from "react-icons/bs";
import { HiPlus, HiCheck } from "react-icons/hi2";
import ModalAddWork from "./modal_add/modal_add_work";
import { ModalAddUtil, type AuditoryModel } from "./modal_add/util/modal_util";

export default function ModuleWork() {
  const {
    isOpen: ModalOpen,
    onOpen: ModalOnOpen,
    onClose: ModalOnClose,
  } = useDisclosure();

  const constraintsRefButton1 = useRef(null);
  const constraintsRefButton2 = useRef(null);

  const [dataAuditory, setDataAuditory] = useState<AuditoryModel[]>([]);
  const [idAuditoryArray, setIdAuditoryArray] = useState<string[]>([]);
  const [idTaskArray, setIdTaskArray] = useState<string[]>([]);

  useEffect(() => {
    console.log("idAuditoryArray", idAuditoryArray);
    console.log("idTaskArray", idTaskArray);
  }, [idAuditoryArray, idTaskArray]);

  const onHandlePatchAuditory = async (
    idArray: string[] | null,
    idTask: string[] | null
  ) => {
    console.log("idTask", idTask);
    const arrayForUpdate =
      idArray && idArray.length > 0 ? idArray : idAuditoryArray;
    const arrayForDelete = idTask && idTask.length > 0 ? idTask : idTaskArray;

    if (arrayForUpdate.length > 0 || arrayForDelete.length > 0) {
      await ModalAddUtil.updateAuditory(arrayForUpdate);
      await ModalAddUtil.deleteTask(arrayForDelete);
      const finishDates: string[] = sessionStorage.getItem("finishDates") ? JSON.parse(sessionStorage.getItem("finishDates") || "[]") : [];
      const finishDatesFiltered = finishDates.filter(date => !arrayForUpdate.includes(date));
      sessionStorage.setItem("finishDates", JSON.stringify(finishDatesFiltered));
      setIdAuditoryArray([]);
      setIdTaskArray([]);
      addToast({
        title: "Tareas finalizadas",
        description: "Tareas finalizadas correctamente",
        color: "success",
      });
    } else {
      addToast({
        title: "Error",
        description:
          "No se puede finalizar las tareas, por favor seleccione al menos una tarea",
        color: "danger",
      });
    }
  };

  const fetchAuditories = useCallback(async () => {
    const response = await ModalAddUtil.getAuditories();
    if (JSON.stringify(response) !== JSON.stringify(dataAuditory)) {
      setDataAuditory(response as AuditoryModel[]);
      const currentUsername = sessionStorage.getItem("username");
      const isAuth = sessionStorage.getItem("auth") === "true";
  
      if (isAuth && currentUsername) {
        const userAuditories = response.filter(
          (item) => item.user.user_name === currentUsername && item.status === true
        );
  
        const finishDates = userAuditories.map(
          (item) => item.task.details.task_final_time
        );
  
        sessionStorage.setItem("finishDates", JSON.stringify(finishDates));
      }
    }
  }, [dataAuditory]);

  useEffect(() => {
    fetchAuditories();
    const interval = setInterval(fetchAuditories, 3000);
    return () => clearInterval(interval);
  }, [fetchAuditories]);

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-6 3xl:grid-cols-6 gap-4 items-center justify-center mt-10 px-20">
      {/* Card with data of task*/}
      {dataAuditory.map((item) => (
        <div className="2xl:col-span-2 3xl:col-span-2" key={item.id}>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                duration: 0.4,
              }}
            >
              <Card className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[125%] 3xl:w-[125%]">
                <CardHeader className="flex flex-col justify-center items-center">
                  <Checkbox
                    className="absolute top-0 left-0 mt-2 px-5 2xl:ml-2 3xl:ml-2"
                    isSelected={idAuditoryArray.includes(item.id)}
                    onValueChange={(isSelected) => {
                      setIdAuditoryArray((prev) =>
                        isSelected
                          ? [...prev, item.id]
                          : prev.filter((id) => id !== item.id)
                      );

                      setIdTaskArray((prev) =>
                        isSelected
                          ? [...prev, item.task.id]
                          : prev.filter((id) => id !== item.task.id)
                      );
                    }}
                  />
                  <h1 className="text-2xl font-bold">
                    {item.task.details.task_name.length > 2
                      ? item.task.details.task_name
                      : item.task.details.task_name.toUpperCase()}
                  </h1>
                  {/* Estado */}
                  <div className="flex items-center justify-center rounded-full w-25 h-25">
                    <BsDot
                      size={200}
                      className={`${
                        item.status ? "text-warning" : "text-success"
                      }`}
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-row items-center justify-start m-2 gap-4">
                    {/* Datos */}
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-1">
                        <p className="text-sm font-bold">Usuario:</p>
                        <p className="text-sm font-thin">
                          {item.user.user_name}
                        </p>
                      </div>
                      <div className="flex flex-row gap-1">
                        <p className="text-sm font-bold">Cliente:</p>
                        <p className="text-sm font-thin">
                          {item.task.details.task_client}
                        </p>
                      </div>
                      <div className="flex flex-row gap-1">
                        <p className="text-sm font-bold">Hora inicio:</p>
                        <p className="text-sm font-thin">
                          {ModalAddUtil.convertTo12HourFormat(
                            item.task.details.task_initial_time
                          )}
                        </p>
                      </div>
                      <div className="flex flex-row gap-1">
                        <p className="text-sm font-bold">Hora fin:</p>
                        <p className="text-sm font-thin">
                          {ModalAddUtil.convertTo12HourFormat(
                            item.task.details.task_final_time
                          )}
                        </p>
                      </div>
                      <div className="flex flex-row gap-1">
                        <p className="text-sm font-bold">
                          Tiempo transcurrido:
                        </p>
                        <p className="text-sm font-thin">
                          {item.task.details.task_elapsed_time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    color="success"
                    size="sm"
                    variant="flat"
                    onPress={async () => {
                      const idArray = [item.id];
                      const idTaskArray = [item.task.id];
                      onHandlePatchAuditory(idArray, idTaskArray);
                    }}
                  >
                    Finalizar
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      ))}

      <div className="fixed bottom-6 right-6 z-50" ref={constraintsRefButton1}>
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0.3}
          dragConstraints={constraintsRefButton1}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Button
            color="secondary"
            size="lg"
            variant="solid"
            isIconOnly
            radius="full"
            className="shadow-md"
            startContent={<HiPlus size={20} />}
            onPress={ModalOnOpen}
          />
        </motion.div>
      </div>
      <div
        className="fixed bottom-20 right-7.5 z-50"
        ref={constraintsRefButton2}
      >
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0.3}
          dragConstraints={constraintsRefButton2}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Button
            color="success"
            size="md"
            variant="solid"
            isIconOnly
            radius="full"
            className="shadow-md text-white"
            startContent={<HiCheck size={20} />}
            onPress={() => onHandlePatchAuditory(null, null)}
          />
        </motion.div>
      </div>
      <ModalAddWork
        isOpen={ModalOpen}
        onOpenChange={ModalOnOpen}
        onClose={ModalOnClose}
        lengthAuditory={dataAuditory.length}
      />
    </div>
  );
}
