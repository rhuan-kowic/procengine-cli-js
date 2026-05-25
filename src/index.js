import { Process, priorityProcess } from "./model/Process.js";
import { StatusProcess } from "./model/History.js";

console.log("=== INICIANDO PROCENGINE CLI ===");

try {
  const processServer = new Process(
    "Instabilidade no servidor",
    priorityProcess.ALTA,
  );
  console.log(`\nProcesso criado com sucesso!`);
  console.log(`ID: ${processServer.id}`);
  console.log(`Título: ${processServer.title}`);
  console.log(`Status: ${processServer.status}`);
  console.log(`Prioridade: ${processServer.priority}`);
  console.log(`Data de Criação: ${processServer.creationDate}`);
  console.log(`Data Limite: ${processServer.limitDate}`);

  console.log("\n--------------------------------------------------");
  processServer.changeStatus(
    StatusProcess.EM_ANDAMENTO,
    "Análise iniciada pela equipe de Infraestrutura.",
  );
  console.log(`Status atualizado para: ${processServer.status}`);

  processServer.changeStatus(
    StatusProcess.CONCLUÍDO,
    "Problema resolvido e monitoramento concluído.",
  );
  console.log(`Status atualizado para: ${processServer.status}`);

  console.log("\n------------------ HISTÓRICO DE STATUS -----------------");
  processServer.listHistory.forEach((log, index) => {
    console.log(`[Registro: ${index + 1}] ${log.toString()}`);
  });
  console.log("\n--------------------------------------------------");
  console.log(`Teste de erro: Tentando atualizar para o mesmo status...`);
  processServer.changeStatus(
    StatusProcess.CONCLUÍDO,
    "Tentativa de atualização para o mesmo status.",
  );
} catch (error) {
  {
    console.error(`Erro: ${error.message}`);
  }
}
