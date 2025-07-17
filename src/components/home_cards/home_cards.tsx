import { Card, CardFooter, Image } from "@heroui/react";
import { motion } from "framer-motion";

export default function HomeCardsComponent() {
  return (
    <div className="grid grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-4 gap-10 2xl:gap-15 3xl:gap-15 w-[90%] 2xl:w-full 3xl:w-full">
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Card isFooterBlurred className="border-none" radius="lg">
          <Image
            alt="Activities"
            className="object-cover w-[200px] h-[200px] 2xl:w-[400px] 2xl:h-[400px] 3xl:w-[400px] 3xl:h-[400px]"
            src="/images/1.png"
          />
          <CardFooter className="flex flex-col justify-center bg-black/60 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-[80px] text-center">
            <p className="text-xs 2xl:text-lg 3xl:text-lg font-bold text-white/80">
              Control total de tus actividades
            </p>
            <p className="text-xs 2xl:text-lg 3xl:text-lg text-white/80">
              Crea, edita y elimina tareas diarias que llegan a tu correo
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Card isFooterBlurred className="border-none" radius="lg">
          <Image
            alt="Time and efficiency"
            className="object-cover w-[200px] h-[200px] 2xl:w-[400px] 2xl:h-[400px] 3xl:w-[400px] 3xl:h-[400px]"
            src="/images/2.png"
          />
          <CardFooter className="flex flex-col justify-center bg-black/60 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-[80px] text-center">
            <p className="text-xs 2xl:text-lg 3xl:text-lg font-bold text-white/80">
              Eficiencia y productividad
            </p>
            <p className="text-xs 2xl:text-lg 3xl:text-lg text-white/80">
              Mejora tu tiempo y eficiencia disminuyendo los tiempos muertos
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Card isFooterBlurred className="border-none" radius="lg">
          <Image
            alt="Intuitive interface"
            className="object-cover w-[200px] h-[200px] 2xl:w-[400px] 2xl:h-[400px] 3xl:w-[400px] 3xl:h-[400px]"
            src="/images/3.png"
          />
          <CardFooter className="flex flex-col justify-center bg-black/60 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-[80px] text-center">
            <p className="text-xs 2xl:text-lg 3xl:text-lg font-bold text-white/80">
              Interfaz intuitiva
            </p>
            <p className="text-xs 2xl:text-lg 3xl:text-lg text-white/80">
              Fácil de usar y entender, no necesitas ser un experto en
              tecnología para usarlo
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Card isFooterBlurred className="border-none" radius="lg">
          <Image
            alt="Security"
            className="object-cover w-[200px] h-[200px] 2xl:w-[400px] 2xl:h-[400px] 3xl:w-[400px] 3xl:h-[400px]"
            src="/images/4.png"
          />
          <CardFooter className="flex flex-col justify-center bg-black/60 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-[80px] text-center">
            <p className="text-xs 2xl:text-lg 3xl:text-lg font-bold text-white/80">Seguridad</p>
            <p className="text-xs 2xl:text-lg 3xl:text-lg text-white/80">
              Tu información está protegida y no se comparte con terceros
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
