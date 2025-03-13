import Schedule from "../../models/Schedule";
import AppError from "../../errors/AppError";
import Contact from "../../models/Contact";
import User from "../../models/User";
import Whatsapp from "../../models/Whatsapp";
import { channel } from "diagnostics_channel";

const ScheduleService = async (id: string | number, companyId: number): Promise<Schedule> => {
  const schedule = await Schedule.findByPk(id, {
    include: [
      { model: Contact, as: "contact", attributes: ["id", "name"] },
      { model: User, as: "user", attributes: ["id", "name"] },
      { model: User, as: "ticketUser", attributes: ["id", "name"] },
      { model: Whatsapp, as: "whatsapp", attributes: ["id", "name", "channel"] },
    ]
  });

  if (schedule?.companyId !== companyId) {
    throw new AppError("No es posible eliminar el registro de otra empresa.");
  }

  if (!schedule) {
    throw new AppError("ERR_NO_SCHEDULE_FOUND", 404);
  }

  return schedule;
};

export default ScheduleService;
