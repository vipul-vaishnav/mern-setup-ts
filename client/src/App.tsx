import React from 'react'
import { useApi } from './hooks/useApi'
import api from './services/api'

const App: React.FC = (): React.ReactElement => {
  const func = async () => {
    const res = await api.get<{
      status: 'OK' | 'NOT OK'
      message: string
      data: Array<{ name: string; age: number }>
    }>('/test')
    return res.data.data
  }
  const { data, isLoading, isError, refetch } = useApi(func)

  return (
    <div>
      <h1>Welcome to MERN APP BUILT USING TS</h1>

      {isLoading ? (
        <>Loading...</>
      ) : isError ? (
        <>Error</>
      ) : data.length > 0 ? (
        <ul>
          {data.map((item, idx) => (
            <li key={idx}>{`${item.name} - ${item.age}`}</li>
          ))}
        </ul>
      ) : (
        <>List is empty</>
      )}

      <br />
      <br />
      <br />
      <button onClick={refetch}>Refetch</button>
    </div>
  )
}
export default App
