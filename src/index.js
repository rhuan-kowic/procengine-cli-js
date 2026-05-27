import { Process, priorityProcess } from "./model/Process.js";
import { StatusProcess } from "./model/History.js";
import { ProcessManager } from "./model/ProcessManager.js";
import { ConsoleView } from "./utils/console.js";
import readline from "readline";

ConsoleView.printHeader();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const processManager = new ProcessManager();

async function main() {
  while (true) {
    ConsoleView.printMenu();

    const option = await question("Escolha uma opção: ");

    try {
      switch (option) {
        case "1": {
          ConsoleView.consoleClear();
          ConsoleView.printHeader();
          const title = await question("Digite o título do processo: ");
          const priority = await question(
            "Digite a prioridade do processo (BAIXA, MEDIA, ALTA): ",
          );
          const priorityUpper = priority.toUpperCase();

          const newProcess = processManager.addProcess(title, priorityUpper);
          ConsoleView.printSuccess(
            `Processo "${newProcess.title}" criado com ID ${newProcess.id}`,
          );
          break;
        }

        case "2": {
          ConsoleView.consoleClear();
          ConsoleView.printHeader();
          console.log("\nLISTA DE PROCESSOS:");
          const listProcesses = processManager.processes;

          if (listProcesses.length === 0) {
            console.log("\nNenhum processo encontrado.");
          } else {
            listProcesses.forEach((process) =>
              ConsoleView.printProcess(process),
            );
          }
          break;
        }

        case "3": {
          ConsoleView.consoleClear();
          ConsoleView.printHeader();

          const id = await question("Digite o ID do processo: ");
          const newStatus = await question(
            "Digite o novo status do processo (CANCELADO, EM ANDAMENTO, CONCLUIDO): ",
          );
          const justification = await question(
            "Digite a justificativa para a mudança: ",
          );

          const newStatusUpper = newStatus.toUpperCase();

          processManager.moveStatus(id, newStatusUpper, justification);
          ConsoleView.printSuccess(
            `Processo ${id} movido para status ${newStatusUpper}`,
          );
          break;
        }

        case "4": {
          ConsoleView.consoleClear();
          ConsoleView.printHeader();

          console.log("\nMÉTRICAS CORPORATIVAS: ");
          console.table(processManager.getMetrics());
          break;
        }

        case "5": {
          ConsoleView.consoleClear();
          ConsoleView.printHeader();

          console.log("\nPROCESSOS ATRASADOS: ");
          const delayedProcesses = processManager.getDelayedProcesses();

          if (delayedProcesses.length === 0) {
            console.log("\nNenhum processo atrasado encontrado.");
          } else {
            delayedProcesses.forEach((process) =>
              ConsoleView.printProcess(process),
            );
          }
          break;
        }

        case "6": {
          ConsoleView.consoleClear();
          ConsoleView.printHeader();
          console.log("\nSaindo do ProcEngine CLI. Até logo!");
          rl.close();
          return;
        }

        default:
          ConsoleView.printError("Opção inválida. Por favor, tente novamente.");
      }
    } catch (error) {
      ConsoleView.printError(error.message);
    }
  }
}

main();
