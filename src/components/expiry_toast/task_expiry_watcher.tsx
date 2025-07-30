import { useEffect } from "react";
import { addToast } from "@heroui/react";

export default function TaskExpiryWatcher({ isLogged }: { isLogged: boolean }) {
  const convertDateTo12HourFormat = (date: Date) => {
    const h = date.getHours();
    const m = date.getMinutes().toString().padStart(2, "0");
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m} ${suffix}`;
  };

  const playNotificationSound = () => {
    const audio = new Audio("/sounds/alert.mp3");
    audio.play().catch((err) => {
      console.warn("Error al reproducir sonido:", err);
    });
  };

  useEffect(() => {
    if (!isLogged) return;

    const interval = setInterval(() => {
      const finishDatesRaw = sessionStorage.getItem("finishDates");
      const notifiedMapRaw = sessionStorage.getItem("notifiedTimestamps");

      if (!finishDatesRaw) return;

      try {
        const finishDates: string[] = JSON.parse(finishDatesRaw);
        const now = new Date();

        const notifiedMap: Record<string, number> = notifiedMapRaw
          ? JSON.parse(notifiedMapRaw)
          : {};

        Object.keys(notifiedMap).forEach((key) => {
          if (!finishDates.includes(key)) {
            delete notifiedMap[key];
          }
        });

        finishDates.forEach((dateStr) => {
          const finishDate = new Date(dateStr);

          if (finishDate < now) {
            const lastNotified = notifiedMap[dateStr];
            const elapsedMs = now.getTime() - (lastNotified || 0);

            if (!lastNotified || elapsedMs > 10000) {
              addToast({
                title: "Atención",
                description: `Una tarea venció a las ${convertDateTo12HourFormat(
                  finishDate
                )}`,
                color: "warning",
              });

              playNotificationSound();

              notifiedMap[dateStr] = now.getTime();
            }
          }
        });

        sessionStorage.setItem(
          "notifiedTimestamps",
          JSON.stringify(notifiedMap)
        );
      } catch (err) {
        console.error("Error manejando notificaciones:", err);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isLogged]);

  return null;
}
