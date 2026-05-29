/**
 * Lista de e-mails dos administradores que recebem notificação sempre
 * que um usuário preenche algum formulário (lead, diagnóstico, etc).
 *
 * Pode ser sobrescrita pela env var ADMIN_NOTIFY_EMAILS (separada por
 * vírgula) sem precisar mexer no código — útil pra adicionar/remover
 * admin direto no Vercel.
 */
export function getNotifyEmails(): string[] {
  const env = process.env.ADMIN_NOTIFY_EMAILS;
  if (env && env.trim()) {
    return env
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
  }
  // Fallback — admins padrão
  return [
    "contato@wemake.tec.br", // Denis
    "renato086@gmail.com", // Renato
    // Emanuel: adicionar o e-mail aqui (ou via ADMIN_NOTIFY_EMAILS no Vercel)
  ];
}
