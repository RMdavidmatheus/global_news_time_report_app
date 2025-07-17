import { Button, Image, Link } from "@heroui/react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="text-foreground py-4 border-1 border-foreground/10 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-4 justify-center items-center mt-1 mb-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Link href="https://www.facebook.com/DavidMatheus9808/" target="_blank">
                <Button isIconOnly color="default" variant="light">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={30}
                  height={30}
                />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Link href="https://x.com/DavidMatheus980" target="_blank">
              <Button isIconOnly color="default" variant="light">
                <Image
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  width={30}
                  height={30}
                />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Link href="https://github.com/RMdavidmatheus" target="_blank">
              <Button isIconOnly color="default" variant="light">
                <Image
                  src="/icons/github.svg"
                  alt="Github"
                  width={30}
                  height={30}
                />
              </Button>
            </Link>
          </motion.div>
        </div>
        <p className="text-center">
          &copy; {new Date().getFullYear()} - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
