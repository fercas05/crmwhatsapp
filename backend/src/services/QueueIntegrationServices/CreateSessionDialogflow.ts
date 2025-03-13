import { SessionsClient } from "@google-cloud/dialogflow";
import QueueIntegration from "../../models/QueueIntegrations";
import dir from 'path';
import fs from 'fs';
import os from 'os';
import logger from "../../utils/logger";

const sessions : Map<number, SessionsClient> = new Map<number, SessionsClient>();

const createDialogflowSession = async (id:number, projectName:string, jsonContent:string) : Promise<SessionsClient | undefined> => {
    if(sessions.has(id)) {
        return sessions.get(id);
    }

    const keyFilename = dir.join(os.tmpdir(), `crmwhatsapp_${id}.json`);

    logger.info(`Abriendo una nueva sesión de dialogflow #${projectName} en '${keyFilename}'`)

    await fs.writeFileSync(keyFilename, jsonContent);
    const session = new SessionsClient({ keyFilename });

    sessions.set(id, session);

    return session;
}

const createDialogflowSessionWithModel = async (model: QueueIntegration) : Promise<SessionsClient | undefined> => {
    console.log("ID:" + model.id + " nombre:" +  model.projectName + " json:" +   model.jsonContent)
    return createDialogflowSession(model.id, model.projectName, model.jsonContent);
}

export { createDialogflowSession, createDialogflowSessionWithModel };