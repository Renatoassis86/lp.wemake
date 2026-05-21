import { z } from "zod";

/* Lead capture schema — used by the strategic contact form. */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Informe seu nome.")
    .max(120, "Nome muito longo."),
  email: z
    .string()
    .email("Email inválido."),
  role: z.enum(["diretor", "mantenedor", "coordenador", "outro"], {
    message: "Selecione sua função.",
  }),
  institution: z
    .string()
    .min(2, "Informe sua instituição.")
    .max(160),
  students: z.enum(["<200", "200-500", "500-1000", "1000-2500", ">2500"], {
    message: "Selecione o porte da escola.",
  }),
  message: z.string().max(2000).optional().default(""),
  consent: z
    .boolean()
    .refine((v) => v === true, "É preciso consentir o tratamento de dados."),
});

export type ContactInput = z.infer<typeof contactSchema>;
