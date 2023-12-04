import { z as zod } from 'zod'

export const createUser = zod.object({
  body: zod.object({
    first_name: zod
      .string({ required_error: 'First Name is required!' })
      .toLowerCase(),
    last_name: zod
      .string({ required_error: 'Last name is required!' })
      .toLowerCase(),
    email: zod
      .string({ required_error: 'E-mail is required!' })
      .email('An e-mail is expected')
      .toLowerCase(),
    password: zod
      .string({ required_error: 'Password is required!' })
      .min(6, 'Must be at least 6 characters long')
  })
})

export const getUser = zod.object({
  params: zod.object({
    id: zod.string().max(4)
  })
})

export const getUsers = zod.object({
  query: zod.object({
    page: zod.string().min(1).optional(),
    limit: zod.string().min(1).optional(),
    sort: zod.enum(['first_name', 'last_name', 'email', 'created_at']).optional(),
    order: zod.enum(['asc', 'desc']).optional()
  })
})
