import { Button, Form, Switch, TimeInput } from "@heroui/react";
import { HiCalendar } from "react-icons/hi2";
import { useState } from "react";
import { formatTimeStringToHHMM, selectSchedule, type ScheduleTimeData, type ScheduleBody } from "./util/modal_util";

export default function ModuleSchedule() {

  const [is_lunching, setIs_lunching] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = e.currentTarget;
    if (formData.checkValidity()) {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      
      const initialTimeString = formatTimeStringToHHMM(data.initial_value as string);
      const endTimeString = formatTimeStringToHHMM(data.end_value as string);

      const scheduleData: ScheduleTimeData = {
        initialTime: initialTimeString,
        endTime: endTimeString
      }
      
      const scheduleType = selectSchedule(scheduleData);
      const scheduleBody: ScheduleBody = {
        is_lunching: is_lunching,
        schedule_user: scheduleType
      }

      console.log('Datos del horario:', scheduleBody);
      console.log('Datos del formulario:', data);
      formData.reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-10">
      <div className="container flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-bold">
          Bienvenido al módulo de gestion de horarios
        </h1>
        <HiCalendar size={190} />
      </div>
      <div className="container flex flex-col items-center justify-center gap-2">
        <Form
          className="flex flex-col items-center justify-center gap-6 w-[50%]"
          onSubmit={handleSubmit}
        >
          <TimeInput
            isRequired
            hideTimeZone
            granularity="minute"
            hourCycle={12}
            label="Hora de entrada"
            name="initial_value"
          />
          <TimeInput
            isRequired
            hideTimeZone
            granularity="minute"
            hourCycle={12}
            label="Hora de salida"
            name="end_value"
          />

          <div className="flex flex-row items-center justify-center gap-3">
            <p className="text-md font-semibold">¿Entrarás a almuerzo?</p>
            <Switch name="is_lunching" value={is_lunching.toString()} onValueChange={() => setIs_lunching(!is_lunching)} size="sm" />
          </div>

          <Button type="submit" color="primary" variant="solid" className="w-[50%]" size="lg">
            Guardar
          </Button>
        </Form>
      </div>
    </div>
  );
}
