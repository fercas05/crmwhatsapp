import { FlowAudioModel } from "../../models/FlowAudio";
import { FlowBuilderModel } from "../../models/FlowBuilder";
import { FlowImgModel } from "../../models/FlowImg";
import { WebhookModel } from "../../models/Webhook";
import { randomString } from "../../utils/randomCode";

interface Request {
  userId: number;
  name: string;
  companyId: number
}

const UploadAudioFlowBuilderService = async ({
  userId,
  name,
  companyId
}: Request): Promise<FlowAudioModel> => {
  try {
    const flowImg = await FlowAudioModel.create({
      userId: userId,
      companyId: companyId,
      name: name,
    });

    return flowImg;
  } catch (error) {
    console.error("Error al ingresar usuario:", error);

    return error
  }
};

export default UploadAudioFlowBuilderService;
