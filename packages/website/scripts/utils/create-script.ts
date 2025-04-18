import { Logger } from './logger';

const logger = new Logger('Scripts');

export function createScript(name: string, scriptFunction: ScriptFunction) {
  return async () => {
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
