import { motion } from "framer-motion";
import GearIcon from "../components/logo/gearIcon";
import HomeCardsComponent from "../components/home_cards/home_cards";
import ContactFormComponent from "../components/contact_form/contact_form";
import Footer from "../components/footer/footer";

function Home() {
  return (
    //Principal div
    <div className="w-full h-full" id="home">
      {/* Div body content */}
      <div className="flex flex-col items-center justify-center">
        {/* Div title */}
        <div className="w-full flex flex-col items-center justify-center text-center h-[100vh] bg-[#0C1842]">
          <h1 className="font-bold 2xl:text-7xl 3xl:text-7xl text-3xl text-white bg-gradient-to-r from-[#0C1842] to-[#0E498F]">
            Bienvenido colaborador
          </h1>
          <p className="font-light 2xl:text-3xl 3xl:text-4xl text-sm mt-2 text-white">
            Aquí podrás llevar un control de tus actividades
          </p>
          <div className="mt-25 w-40 h-40 2xl:w-70 2xl:h-40 3xl:w-70 3xl:h-40">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <GearIcon />
            </motion.div>
          </div>
        </div>
        {/* Div cards */}
        <div
          className="w-full flex flex-col items-center justify-center text-center h-[100vh] bg-[#C77700]"
          id="about"
        >
          <section
            id="cards"
            className="flex flex-col items-center justify-center text-center gap-20"
          >
            <div>
              <h1 className="font-bold 2xl:text-7xl 3xl:text-7xl text-3xl text-white bg-gradient-to-r from-[#C77700] to-[#e98c00]">
                Eficiencia
              </h1>
              <p className="font-light 2xl:text-3xl 3xl:text-4xl text-sm mt-2 text-white">
                Nuestro objetivo es mejorar la eficiencia de tu equipo
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center mt-10">
              <HomeCardsComponent />
            </div>
          </section>
        </div>
        {/* Div contact */}
        <div className="w-full flex flex-col items-center justify-center text-center h-[100vh]">
          <section
            id="contact"
            className="flex flex-col items-center justify-center text-center gap-20"
          >
            <div>
              <h1 className="font-bold 2xl:text-7xl 3xl:text-7xl text-3xl text-foreground bg-gradient-to-r from-bg-white to-[#c7c7c7]">
                Contacto a soporte
              </h1>
              <p className="font-light 2xl:text-3xl 3xl:text-4xl text-sm mt-2 text-foreground">
                Si tienes algún fallo, duda o sugerencia, no dudes en contactarnos.
              </p>
            </div>
            <ContactFormComponent />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
