import { Logs } from '../models/logs';

export async function createLog(
  level: string,
  endpoint: string,
  request: object,
  response: object
) {
  const logRecord = await Logs.create({
    level,
    endpoint,
    request,
    response,
  });

  return logRecord;
}
