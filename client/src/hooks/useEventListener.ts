/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* HOOK: USE_EVENT_LISTENER
   ========================================================================== */

/**
 * It takes as parameters a eventName, a call-back functions (handler)
 * and optionally a reference element. You can see above two examples
 * using useRef and window based event.
 *
 * @param eventName name of event (native or custom)
 * @param handler callback function will be called when the event is fired
 * @param element which the event will be referenced. Default is window
 *
 * @example
 * ```
 * import React, { useRef } from 'react'
 * import { useEventListener } from 'usehooks-ts'
 *
 * export default function Component() {
 *    // Define button ref
 *    const buttonRef = useRef<HTMLButtonElement>(null)
 *
 *    const onScroll = (event: Event) => {
 *        console.log('window scrolled!', event)
 *    }
 *
 *    const onClick = (event: Event) => {
 *        console.log('button clicked!', event)
 *    }
 *
 *    // example with window based event
 *    useEventListener('scroll', onScroll)
 *
 *    // example with element based event
 *    useEventListener('click', onClick, buttonRef)
 *
 *    return (
 *        <div style={{ minHeight: '200vh' }}>
 *            <button ref={buttonRef}>Click me</button>
 *        </div>
 *    )
 * }
 * ```
 */

import { RefObject, useEffect, useRef } from 'react'

const useEventListener = <T extends HTMLElement = HTMLDivElement>(
  eventName: keyof WindowEventMap | string, // string to allow custom event
  handler: (event: Event) => void,
  element?: RefObject<T>
) => {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: Event) => void>()

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = ((element?.current) != null) ? window : window
    if (!(targetElement && targetElement.addEventListener)) {
      return
    }

    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!((savedHandler?.current) == null)) {
        savedHandler.current(event)
      }
    }

    targetElement.addEventListener(eventName, eventListener)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, handler])
}

export default useEventListener
