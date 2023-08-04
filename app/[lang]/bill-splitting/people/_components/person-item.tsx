'use client'
import React from 'react'
import { GroupMember } from '@prisma/client'
import { FiEdit2 } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'

interface Props {
  person: GroupMember
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  return (
    <div className="card bordered rounded">
      <div className="card-body bg-base-300">
        <div className="grid grid-cols-2 gap-4">
          <div className="tooltip" data-tip={person.name}>
            <h2 className="card-title truncate">{person.name}</h2>
          </div>
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
