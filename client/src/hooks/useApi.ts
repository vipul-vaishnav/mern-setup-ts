import { useState, useEffect, DependencyList } from 'react'

export type UseApiReturnType<T> = {
  data: Array<T>
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export const useApi = <T>(func: () => Promise<Array<T>>, deps?: DependencyList): UseApiReturnType<T> => {
  const [data, setData] = useState<Array<T>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const getData = async () => {
    try {
      setIsLoading(true)
      const data = await func()
      setData(data)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = async () => {
    const data = await func()
    setData(data)
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || [])

  return {
    data,
    isError,
    isLoading,
    refetch
  }
}
