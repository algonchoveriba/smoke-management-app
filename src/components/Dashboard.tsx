import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Session } from '@supabase/supabase-js'

import { useEffect, useState } from 'react'
import { Database } from 'schema'
type Counters = Database['public']['Tables']['counters']['Row']

export const Dashboard = ({ session }: { session: Session }) => {
  console.log(session)

  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [counters, setCounters] = useState<Counters[]>()
  const [loading, setLoading] = useState(true)
  const [number, setNumber] = useState<Counters['number']>(null)
  const [kind, setKind] = useState<Counters['kind']>(null)

  useEffect(() => {
    getCounters()
    console.log('ダッシュボード更新')
  }, [session])

  async function getCounters() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('counters')
        .select('*')
        .eq('u_id', user.id)
        .order('created_at', { ascending: true })

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setCounters(data)
      }
    } catch (error) {
      alert('Error loading counter data!')
      console.log(error)
      setCounters([])
    } finally {
      setLoading(false)
    }
  }

  async function addCounter({
    number,
    kind,
  }: {
    number: Counters['number']
    kind: Counters['kind']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      console.log('counter adding ...')

      const adds = {
        u_id: user.id,
        number,
        kind,
        created_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('counters').insert(adds)
      if (error) throw error
      alert('Counter added!')
    } catch (error) {
      alert('Error adding the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="">
        {counters?.map((counter, id) => (
          <div key={id} className="flex flex-row justify-between">
            <div>{counter.created_at?.substring(0, 10)}</div>
            <div>{counter.number}</div>
            <div>{counter.kind}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <label htmlFor="number">吸った本数</label>
        <input
          id="number"
          type="number"
          value={number || ''}
          onChange={(e) => setNumber(e.target.valueAsNumber)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="kind">タバコの種類</label>
        <input
          id="kind"
          type="text"
          value={kind || ''}
          onChange={(e) => setKind(e.target.value)}
        />
      </div>
      <button onClick={() => addCounter({ number, kind })}>
        {loading ? 'loading...' : 'update'}
      </button>
      <form action=""></form>
    </div>
  )
}
