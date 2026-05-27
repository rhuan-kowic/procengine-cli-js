class ConsoleView {
  static printHeader() {
    console.log("=============================================");
    console.log("       PROCENGINE ENTERPRISE CLI v1.0.1      ");
    console.log("=============================================");
  }

  static printMenu() {
    console.log("\n[1] Criar novo processo");
    console.log("[2] Listar processos");
    console.log("[3] Movimentar Status de um Processo");
    console.log("[4] Ver Relatório de Métricas");
    console.log("[5] Ver Processos Atrasados");
    console.log("[6] Sair");
    console.log("\n=============================================");
  }

  static printProcess(process) {
    console.log(`\n PROCESSO: ${process.title}`);
    console.log(`   ID:        ${process.id}`);
    console.log(`   Status:    [ ${process.status} ]`);
    console.log(`   SLA Limite: ${process.limitDate}`);
    console.log("   -----------------------------------------");
  }

  static printSuccess(mensagem) {
    console.log(`\n✅ SUCESSO: ${mensagem}`);
  }

  static printError(mensagem) {
    console.log(`\n❌ ERRO DO MOTOR: ${mensagem}`);
  }

  static consoleClear() {
    console.clear();
  }
}
