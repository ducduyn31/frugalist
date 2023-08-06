'use client'
import React from 'react'
import { GroupMember } from '@prisma/client'
import { FiEdit2 } from 'react-icons/fi'
import { AiFillCheckCircle, AiOutlineDelete } from 'react-icons/ai'
import { useTranslations } from 'use-intl'
import { FaHouseUser } from 'react-icons/fa6'
import { DateTime } from 'luxon'

interface Props {
  person: GroupMember
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  const t = useTranslations('bill-splitting.people.PersonItem')
  return (
    <div className="card bordered rounded">
      <div className="card-body bg-base-300">
        <div className="grid grid-cols-2 gap-4">
          <div className="tooltip" data-tip={person.name}>
            <h2 className="card-title truncate">{person.name}</h2>
          </div>
          <div className="flex flex-row-reverse">
            {person.isGuest && (
              <div
                className="tooltip flex items-center"
                data-tip={t('isGuest')}
              >
                <FaHouseUser />
              </div>
            )}
            {person.isActive && (
              <div
                className="tooltip flex items-center"
                data-tip={t('isActive')}
              >
                <AiFillCheckCircle />
              </div>
            )}
          </div>
          <p className="text-base-content text-opacity-60">
            {person.fromDate && (
              <>
                {DateTime.fromJSDate(person.fromDate).toLocaleString(
                  DateTime.DATE_SHORT,
                )}
              </>
            )}
            {person.toDate && (
              <>
                -{' '}
                {DateTime.fromJSDate(person.toDate).toLocaleString(
                  DateTime.DATE_SHORT,
                )}
              </>
            )}
          </p>
        </div>
        <div className="flex mt-6 gap-x-4">
          <button className="btn btn-square btn-outline btn-primary">
            <FiEdit2 />
          </button>
          <button className="btn btn-square btn-outline btn-secondary">
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  )
}
