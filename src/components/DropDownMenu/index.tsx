import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import * as uuid from "uuid"
import useClickOutside from "../../hooks/useClickOutside"
import classes from "./style.module.css"

interface Props {
	options: any[]
	selected: string
	setSelected: (value: string) => void
}
export default function DropDownMenu({
	selected,
	setSelected,
	options,
}: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const domNode = useClickOutside(() => {
		setIsOpen(false)
	})

	return (
		<div ref={domNode} className={classes.dropdownContainer}>
			<button
				type="submit"
				onClick={() => {
					setIsOpen(!isOpen)
				}}
				className={classes.dropdownBtn}
			>
				{selected}
				<FontAwesomeIcon className={classes.arrow} icon={faChevronDown} />
				<span className="fas fa-caret-down" />
			</button>
			{isOpen && (
				<div className={classes.dropdownContent}>
					{options
						.filter(e => e !== selected)
						.map((option: string) => (
							<button
								type="submit"
								onClick={() => {
									setSelected(option)
									setIsOpen(!isOpen)
								}}
								key={uuid.v4()}
								className="dropdown-item"
							>
								{option}
							</button>
						))}
				</div>
			)}
		</div>
	)
}
