import React from 'react'

interface Props {
  member: {
    name: string
  }
  payComponents: {
    amount: number
  }[]
}

export const PayResult: React.FC<Props> = ({ member, payComponents }) => {
  return (
    <div key={member.name} className="card bordered rounded">
      <div className="card-body bg-base-300">
        <div className="grid grid-cols-2 gap-4">
          <div className="tooltip" data-tip={member.name}>
            <h2 className="card-title truncate">{member.name}</h2>
          </div>
          <div className="flex flex-row-reverse">
            $
            {payComponents
              .reduce((acc, { amount }) => acc + amount, 0)
              .toFixed(2)}
          </div>
        </div>
        <div className="collapse">
          <input type="checkbox" />
          <div className="pl-0 collapse-title text-xl font-medium">Details</div>
          <div className="collapse-content">
            <p>TBD</p>
          </div>
        </div>
      </div>
    </div>
  )
}
