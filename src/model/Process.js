import { StatusProcess, History } from "./History.js";

export const priorityProcess = Object.freeze({
  BAIXA: "BAIXA",
  MEDIA: "MEDIA",
  ALTA: "ALTA",
});

export class Process {
  #id;
  #title;
  #status;
  #priority;
  #creationDate;
  #limitDate;
  #listHistory;

  constructor(title, priority, limitDate) {
    if (!Object.values(priorityProcess).includes(priority)) {
      throw new Error("Prioridade inválida");
    }
    this.#id = crypto.randomUUID();
    this.#title = title;
    this.#status = StatusProcess.ABERTO;
    this.#priority = priority;
    this.#creationDate = new Date().toISOString();
    this.#limitDate = this.#calculateLimitDate(this.#creationDate);
    this.#listHistory = [];
  }

  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  get status() {
    return this.#status;
  }
  get creationDate() {
    return this.#creationDate;
  }
  get limitDate() {
    return this.#limitDate;
  }
  get listHistory() {
    return [...this.#listHistory];
  }
  get priority() {
    return this.#priority;
  }

  #calculateLimitDate(creationDate) {
    const days =
      this.#priority === priorityProcess.BAIXA
        ? 5
        : this.#priority === priorityProcess.MEDIA
          ? 3
          : 1;
    const creationDateObj = new Date(creationDate);
    const limitDate = new Date(
      creationDateObj.getTime() + days * 24 * 60 * 60 * 1000,
    );
    return limitDate.toISOString();
  }

  changeStatus(newStatus, justification) {
    const listStatusValid = Object.values(StatusProcess);
    if (!listStatusValid.includes(newStatus)) {
      throw new Error("Status inválido");
    }
    const history = new History(this.#status, newStatus, justification);
    this.#listHistory.push(history);
    this.#status = newStatus;
  }
}
