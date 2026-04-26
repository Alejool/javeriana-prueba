import { z } from 'zod';

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'El nombre completo es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras')
    .transform((val) => 
      val.split(' ')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    ),
  
  email: z
    .string()
    .trim()
    .min(1, 'El email es requerido')
    .email('Debe ser una estructura válida de email')
    .toLowerCase()
    .refine(
      (email) => email.endsWith('@javeriana.edu.co'),
      'El email debe terminar en @javeriana.edu.co'
    ),

  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || (val.length >= 7 && val.length <= 15 && /^[\d\s+\-()]+$/.test(val)), {
      message: 'El teléfono debe tener entre 7 y 15 caracteres (solo números y símbolos básicos)',
    }),
  
  eventId: z.number(),
  eventTitle: z.string(),
});

export type LeadFormData = z.output<typeof leadFormSchema>;
