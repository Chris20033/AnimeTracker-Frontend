import { useEffect, useRef } from 'react'

const defaultScrollIntoViewOptions: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }

export function useScrollIntoViewOnChange<T>(value: T, options: ScrollIntoViewOptions = defaultScrollIntoViewOptions) {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const isFirstRunRef = useRef(true)

  useEffect(() => {
    if (isFirstRunRef.current) {
      isFirstRunRef.current = false
      return
    }

    elementRef.current?.scrollIntoView(options)
  }, [value, options])

  return elementRef
}
