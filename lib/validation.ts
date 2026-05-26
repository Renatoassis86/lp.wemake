import { z } from "zod";

/**
 * Lead capture schema — usado tanto pelo formulário de reunião estratégica
 * quanto pelo de material gratuito. Os campos capturam a qualificação
 * mínima que o time comercial precisa para preparar a conversa.
 */

export const lengthUF = 2;

/** UFs válidas (validação leve, evita erros de digitação). */
const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

export type Uf = (typeof UFS)[number];

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Informe seu nome completo.")
    .max(120, "Nome muito longo."),

  role: z.enum(["mantenedor", "gestor", "diretor", "coordenador", "professor"], {
    message: "Selecione qual é o seu papel na escola.",
  }),

  email: z
    .string()
    .email("Email inválido."),

  whatsapp: z
    .string()
    .min(10, "Informe um WhatsApp válido com DDD.")
    .max(20)
    .regex(/^[\d\s()+\-]+$/, "Use apenas números e símbolos de telefone."),

  institution: z
    .string()
    .min(2, "Informe o nome da escola.")
    .max(160),

  city: z
    .string()
    .min(2, "Informe a cidade.")
    .max(80),

  state: z.enum(UFS, { message: "Selecione o estado." }),

  message: z.string().max(2000).optional().default(""),

  /** Sugestão de data para a reunião (YYYY-MM-DD). Opcional. */
  preferred_date: z.string().optional(),
  /** Sugestão de horário (HH:MM). Opcional. */
  preferred_time: z.string().optional(),

  consent: z
    .boolean()
    .refine((v) => v === true, "É preciso consentir o tratamento de dados."),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Versão enxuta usada quando o objetivo é só baixar material. */
export const leadShortSchema = contactSchema
  .pick({
    name: true,
    email: true,
    whatsapp: true,
    role: true,
    institution: true,
    city: true,
    state: true,
    consent: true,
  });

export type LeadShortInput = z.infer<typeof leadShortSchema>;

/* ────────────────────────────────────────────
   Diagnóstico — Form curto da LP /diagnostico
   8 campos + LGPD consent. Lead chega na tabela diagnostico_escola.
──────────────────────────────────────────── */

export const PERFIL_ESCOLA = [
  "privada",
  "publica",
  "terceiro_setor",
  "outro",
] as const;

export const PERFIL_ESCOLA_LABEL: Record<typeof PERFIL_ESCOLA[number], string> = {
  privada: "Privada",
  publica: "Pública",
  terceiro_setor: "Terceiro setor",
  outro: "Outro",
};

export const diagnosticoLeadSchema = z.object({
  nome: z.string().min(2, "Informe seu nome.").max(120),
  email: z.string().email("Email inválido."),
  telefone: z
    .string()
    .min(10, "Informe um telefone válido com DDD.")
    .max(20)
    .regex(/^[\d\s()+\-]+$/, "Use apenas números e símbolos de telefone."),
  cargo: z.enum(["mantenedor", "gestor", "diretor", "coordenador", "professor", "outro"], {
    message: "Selecione seu cargo.",
  }),
  nome_escola: z.string().min(2, "Informe o nome da escola.").max(160),
  perfil_escola: z.enum(PERFIL_ESCOLA, { message: "Selecione o perfil da escola." }),
  cidade: z.string().min(2, "Informe a cidade.").max(80),
  ja_conversou_especialista: z.boolean(),
  consent: z
    .boolean()
    .refine((v) => v === true, "É preciso consentir o tratamento de dados."),
});

export type DiagnosticoLeadInput = z.infer<typeof diagnosticoLeadSchema>;

export const ROLES_LABEL: Record<ContactInput["role"], string> = {
  mantenedor: "Mantenedor(a)",
  gestor: "Gestor(a)",
  diretor: "Diretor(a)",
  coordenador: "Coordenador(a)",
  professor: "Professor(a)",
};

export const UF_OPTIONS = UFS;
