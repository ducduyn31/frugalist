import { authorizedProcedure } from '@/trpc/trpc-server'
import {
  PersonFormValues,
  PersonFormValuesSchema,
} from '@/app/[lang]/bill-splitting/people/person-form'
import { db } from '@/lib/db'
import { Prisma } from '.prisma/client'
import GroupMemberCreateInput = Prisma.GroupMemberCreateInput

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

export const createMember = authorizedProcedure
  .input(PersonFormValuesSchema)
  .mutation(async opts => {
    const session = opts.ctx.session
    if (!session?.user?.email) {
      throw new Error('Not authorized')
    }

    const { isGuest, ...rest } = opts.input

    if (isGuest) {
      return createNewGuest({
        ...rest,
        ownerEmail: session.user.email,
      })
    }

    return createNewMember({ ...rest, ownerEmail: session.user.email })
  })

const createNewGuest = async ({
  name,
  email,
  ownerEmail,
}: Pick<GroupMemberCreateInput, 'name' | 'email'> & { ownerEmail: string }) =>
  db.groupMember.create({
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

const createNewMember = async ({
  name,
  email,
  isActive,
  range,
  ownerEmail,
}: Partial<PersonFormValues> & { ownerEmail: string }) => {
  if (!range || !name) {
    throw new Error('Invalid arguments')
  }

  db.groupMember.create({
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
