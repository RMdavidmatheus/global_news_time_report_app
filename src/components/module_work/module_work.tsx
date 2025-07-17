import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";
import { BsDot } from "react-icons/bs";

export default function ModuleWork() {
  return (
    <div className="grid grid-cols-6 gap-8 items-center justify-center ml-40 mr-10 mt-10">

      {/* Card with data of task*/}  
      <div className="col-span-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Card className="w-[80%]">
            <CardHeader className="flex flex-row justify-center items-center">
              <h1 className="text-2xl font-bold">Postproducción</h1>
            </CardHeader>
            <CardBody>
              <div className="flex flex-row items-center justify-start m-3 gap-4">
                {/* Datos */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Usuario:</p>
                    <p className="text-sm font-thin">LGOMEZ</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Cliente:</p>
                    <p className="text-sm font-thin">BBVA</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Hora inicio:</p>
                    <p className="text-sm font-thin">13:00</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Hora fin:</p>
                    <p className="text-sm font-thin">14:00</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Tiempo transcurrido:</p>
                    <p className="text-sm font-thin">1 hora</p>
                  </div>
                </div>

                {/* Estado */}
                <div className="flex items-center justify-center">
                  <BsDot size={100} className="text-success" />
                </div>
              </div>
              <Button color="success" size="sm" variant="flat">
                Finalizar
              </Button>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      <div className="col-span-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Card className="w-[80%]">
            <CardHeader className="flex flex-row justify-center items-center">
              <h1 className="text-2xl font-bold">OT</h1>
            </CardHeader>
            <CardBody>
              <div className="flex flex-row items-center justify-start m-3 gap-4">
                {/* Datos */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Usuario:</p>
                    <p className="text-sm font-thin">LGOMEZ</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Cliente:</p>
                    <p className="text-sm font-thin">BBVA</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Hora inicio:</p>
                    <p className="text-sm font-thin">13:00</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Hora fin:</p>
                    <p className="text-sm font-thin">14:00</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    <p className="text-sm font-bold">Tiempo transcurrido:</p>
                    <p className="text-sm font-thin">1 hora</p>
                  </div>
                </div>

                {/* Estado */}
                <div className="flex items-center justify-center">
                  <BsDot size={100} className="text-warning" />
                </div>
              </div>
              <Button color="success" size="sm" variant="flat">
                Finalizar
              </Button>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
