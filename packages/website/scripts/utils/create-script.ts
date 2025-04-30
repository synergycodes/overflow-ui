import { Logger } from './logger';

export function createScript(name: string, scriptFunction: ScriptFunction) {
  return async () => {
    const logger = new Logger(name);

    const startTime = performance.now();
    try {
      await scriptFunction({ logger });
    } catch (error) {
      logger.taskFailure(name, error.message);
    }

    const endTime = performance.now();

    const elapsedTime = endTime - startTime;

    logger.taskSuccess(name, elapsedTime);
  };
}

type ScriptFunction = (context: ScriptContext) => Promise<void>;
type ScriptContext = {
  logger: Logger;
};
