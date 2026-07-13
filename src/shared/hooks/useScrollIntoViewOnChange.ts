import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

interface UseScrollIntoViewOnChangeOptions {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
}

export function useScrollIntoViewOnChange<TElement extends HTMLElement>(value: unknown, options: UseScrollIntoViewOnChangeOptions = {}): RefObject<TElement | null> {
  const elementRef = useRef<TElement>(null)
  const previousValueRef = useRef(value)

  useEffect(() => {
    if (previousValueRef.current === value) {
      return
    }

    previousValueRef.current = value
    elementRef.current?.scrollIntoView({
      behavior: options.behavior ?? 'smooth',
      block: options.block ?? 'start',
    })
  }, [options.behavior, options.block, value])

  return elementRef
}
