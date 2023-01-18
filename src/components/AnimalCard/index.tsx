import Image from "next/image"
import { IAnimal } from "../../types/animal"
import {
	chooseBgColorCard,
	choosebgColorUpperDivCard,
} from "../../utils/helpers"
import classes from "./style.module.css"

type Props = {
	animal: IAnimal
}

const AnimalCard = ({ animal }: Props) => (
	<div
		style={{
			backgroundColor: chooseBgColorCard(animal.rarety),
		}}
		className={classes.cardContainer}
	>
		<div
			style={{ backgroundColor: choosebgColorUpperDivCard(animal.rarety) }}
			className={classes.upperContainer}
		>
			<span>{animal.rarety}</span>
			<div className={classes.imgContainer}>
				<Image layout="fill" objectFit="contain" src={animal.image} />
			</div>
			<span>{animal.name}</span>
			<span>{animal.price}</span>
		</div>
		<span>{animal.category}</span>
	</div>
)

export default AnimalCard
