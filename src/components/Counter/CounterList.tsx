import { FC } from 'react'
import { useQueryCounters } from '@/hooks/useQueryCounters'
import { Spinner } from '../Spinner'
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
          name={counter.name}
          brands_id={counter.brands_id}
          user_id={counter.user_id}
        />
      ))}
    </ul>
  )
}
