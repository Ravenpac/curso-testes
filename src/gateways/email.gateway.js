export class EmailGateway {
  async enviarEmail({ destinatario, remetente, assunto, mensagem }) {
    console.log(
      `Enviando email de ${remetente} para ${destinatario} com assunto "${assunto}" e mensagem: ${mensagem}`,
    );
  }
}
