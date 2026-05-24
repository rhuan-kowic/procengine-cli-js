export const StatusProcess = Object.freeze({
  ABERTO: "ABERTO",
  EM_ANDAMENTO: "EM ANDAMENTO",
  CONCLUÍDO: "CONCLUÍDO",
  CANCELADO: "CANCELADO",
});

const validStatusValues = Object.values(StatusProcess);

export class History {
  #status;
  #newStatus;
  #timestamp;
  #justification;

  constructor(status, newStatus, justification) {
    if (!validStatusValues.includes(status)) {
      throw new Error("Status atual inválido");
    }
    if (!validStatusValues.includes(newStatus)) {
      throw new Error("Novo status inválido");
    }

    if (newStatus === status) {
      throw new Error("Novo status deve ser diferente do status atual");
    }

    if (!justification || justification.trim() === "") {
      throw new Error("Justificativa é obrigatória");
    }

    this.#status = status;
    this.#newStatus = newStatus;
    this.#timestamp = new Date().toISOString();
    this.#justification = justification.trim();
  }

  get status() {
    return this.#status;
  }
  get newStatus() {
    return this.#newStatus;
  }
  get timestamp() {
    return this.#timestamp;
  }
  get justification() {
    return this.#justification;
  }

  toString() {
    return `Status: ${this.#status}, New Status: ${this.#newStatus}, Timestamp: ${this.#timestamp}, Justification: ${this.#justification}`;
  }
}
