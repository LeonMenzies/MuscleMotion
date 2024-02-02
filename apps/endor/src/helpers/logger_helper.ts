import { ApiLog } from '../models/api_log';

export async function createLog(
  level: string,
  endpoint: string,
  request: object,
  response: object
) {
  const logRecord = await ApiLog.create({
    level,
    endpoint,
    request,
    response,
  });

  return logRecord;
}
