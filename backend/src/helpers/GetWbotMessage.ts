import { proto, WASocket } from "@whiskeysockets/baileys";
import Ticket from "../models/Ticket";
import AppError from "../errors/AppError";
import GetMessageService from "../services/MessageServices/GetMessagesService";
import Message from "../models/Message";

export const GetWbotMessage = async (
  ticket: Ticket,
  messageId: string
): Promise<proto.WebMessageInfo | Message> => {
  const fetchWbotMessagesGradually = async (): Promise<
    proto.WebMessageInfo | Message | null | undefined
  > => {
    const msgFound = await GetMessageService({
      id: messageId
    });

    return msgFound;
  };

  try {
    const msgFound = await fetchWbotMessagesGradually();

    if (!msgFound) {
      throw new Error("No se puede encontrar el mensaje dentro de los 100 últimos mensajes");
    }

    return msgFound;
  } catch (err) {
    console.log(err);
    throw new AppError("ERR_FETCH_WAPP_MSG");
  }
};

export default GetWbotMessage;
