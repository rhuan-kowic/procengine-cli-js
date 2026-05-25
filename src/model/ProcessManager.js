import { Process, priorityProcess } from "./Process.js";
import { StatusProcess } from "./History.js";
export class ProcessManager {
  #processes;
  constructor() {
    this.#processes = [];
  }

  get processes() {
    return [...this.#processes];
  }

  addProcess(title, priority) {
    if (title === undefined || title.trim().length < 3)
      throw new Error("Título inválido");

    if (!Object.values(priorityProcess).includes(priority))
      throw new Error("Status inválido");

    const process = new Process(title.trim(), priority);
    this.#processes.push(process);

    return process;
  }

  findDelayed() {
    const dateNow = new Date().toISOString();

    return this.#processes.filter((process) => {
      const isOpenOrInProcess =
        process.status !== StatusProcess.CONCLUÍDO &&
        process.status !== StatusProcess.CANCELADO;
      const isDateLimit = dateNow > process.limitDate;

      return isDateLimit && isOpenOrInProcess;
    });
  }
}
