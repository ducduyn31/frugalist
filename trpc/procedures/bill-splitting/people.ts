import { authorizedProcedure } from '@/trpc/trpc-server'
import {
  PersonFormValues,
  PersonFormValuesSchema,
} from '@/app/[lang]/bill-splitting/people/person-form'
import db from '@/lib/db'
import { Prisma } from '.prisma/client'
import GroupMemberCreateInput = Prisma.GroupMemberCreateInput
import * as yup from 'yup'

export const listMembers = authorizedProcedure.query(async opts => {
  const session = opts.ctx.session
  if (!session?.user?.email) {
    throw new Error('Not authorized')
  }

  return db.groupMember.findMany({
    where: {
      owner: {
        email: session.user.email,
      },
    },
  })
})

export const createOrUpdateMember = authorizedProcedure
  .input(PersonFormValuesSchema)
  .mutation(async opts => {
    const session = opts.ctx.session
    if (!session?.user?.email) {
      throw new Error('Not authorized')
    }

    const { isGuest, ...rest } = opts.input

    if (isGuest) {
      return upsertGuest({
        ...rest,
        ownerEmail: session.user.email,
      })
    }

    return upsertMember({ ...rest, ownerEmail: session.user.email })
  })

const upsertGuest = async ({
  id,
  name,
  email,
  ownerEmail,
}: Pick<GroupMemberCreateInput, 'id' | 'name' | 'email'> & {
  ownerEmail: string
}) => {
  if (!id) {
    return db.groupMember.create({
      data: {
        name,
        email,
        isGuest: true,
        isActive: false,
        owner: {
          connect: {
            email: ownerEmail,
          },
        },
      },
    })
  }

  return db.groupMember.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      isGuest: true,
      isActive: false,
      fromDate: undefined,
      toDate: undefined,
    },
  })
}

const upsertMember = async ({
  id,
  name,
  email,
  isActive,
  range,
  ownerEmail,
}: Partial<PersonFormValues> & { ownerEmail: string }) => {
  if (!range || !name) {
    throw new Error('Invalid arguments')
  }

  if (!id) {
    return db.groupMember.create({
      data: {
        name,
        email,
        isActive,
        isGuest: false,
        fromDate: range.from,
        toDate: !isActive ? range.to : undefined,
        owner: {
          connect: {
            email: ownerEmail,
          },
        },
      },
    })
  }

  return db.groupMember.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      isActive,
      isGuest: false,
      fromDate: range.from,
      toDate: !isActive ? range.to : undefined,
    },
  })
}

const PersonIdSchema = yup.object().shape({
  id: yup.string().required(),
})

export const getMemberById = authorizedProcedure
  .input(PersonIdSchema)
  .query(async ({ input, ctx }) => {
    const { session } = ctx
    if (!session?.user?.email) {
      throw new Error('Not authorized')
    }

    return db.groupMember.findFirst({
      where: {
        id: input.id,
        owner: {
          email: session.user.email,
        },
      },
    })
  })
