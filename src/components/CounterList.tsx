import { FC } from 'react'
import { useQueryCounters } from '@/hooks/useQueryCounters'
import { Spinner } from './Spinner'
import { CounterItem } from './CounterItem'

export const CounterList: FC = () => {
  const { data: counters, status } = useQueryCounters()
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <p>{'Error'}</p>
  return (
    <ul>
      {counters?.map((counter) => (
        <CounterItem
          key={counter.id}
          id={counter.id}
          number={counter.number}
          brand_id={counter.brand_id}
        />
      ))}
    </ul>
  )
}
