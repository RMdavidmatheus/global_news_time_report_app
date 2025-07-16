import { Card, CardFooter, Image } from "@heroui/react";

export default function HomeCardsComponent() {
  return (
    <div className="grid grid-cols-4 gap-20 w-full">
      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          alt="Woman listing to music"
          className="object-cover"
          height={400}
          src="/images/1.png"
          width={400}
        />
        <CardFooter className="flex flex-col justify-center bg-black/60 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-[45px] text-center">
          <p className="text-md font-bold text-white/80">
            Control total de tus actividades
          </p>
          <p className="text-md text-white/80">
            Crea, edita y elimina actividades
          </p>
        </CardFooter>
      </Card>

      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          alt="Woman listing to music"
          className="object-cover"
          height={400}
          src="/images/1.png"
          width={400}
        />
        <CardFooter className="flex flex-col justify-center bg-black/60 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-[45px] text-center">
          <p className="text-md font-bold text-white/80">
            Control total de tus actividades
          </p>
          <p className="text-md text-white/80">
            Crea, edita y elimina actividades
          </p>
        </CardFooter>
      </Card>

      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          alt="Woman listing to music"
          className="object-cover"
          height={400}
          src="/images/1.png"
          width={400}
        />
        <CardFooter className="flex flex-col justify-center bg-black/60 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-[45px] text-center">
          <p className="text-md font-bold text-white/80">
            Control total de tus actividades
          </p>
          <p className="text-md text-white/80">
            Crea, edita y elimina actividades
          </p>
        </CardFooter>
      </Card>

      <Card isFooterBlurred className="border-none" radius="lg">
        <Image
          alt="Woman listing to music"
          className="object-cover"
          height={400}
          src="/images/1.png"
          width={400}
        />
        <CardFooter className="flex flex-col justify-center bg-black/60 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-[45px] text-center">
          <p className="text-md font-bold text-white/80">
            Control total de tus actividades
          </p>
          <p className="text-md text-white/80">
            Crea, edita y elimina actividades
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
