import { useEffect, useRef } from "react"

const useClickOutside = (handler: any) => {
	const domNode = useRef(null) as any

	useEffect(() => {
		const maybeHandler = (event: any) => {
			if (!domNode?.current?.contains(event.target)) {
				handler()
			}
		}
		document.addEventListener("mousedown", maybeHandler)

		return () => {
			document.removeEventListener("mousedown", maybeHandler)
		}
	})

	return domNode
}
export default useClickOutside
