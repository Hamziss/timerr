/* eslint-disable react/no-array-index-key */
import { useSession } from "next-auth/react"
import Image from "next/image"
import Cactus from "../../../public/images/Garden/sskoo.png"
import circle from "../../../public/images/Home/circle.png"
import rightCircle from "../../../public/images/Home/circleRight.png"
import { GetRowTree } from "../../../utils/helpers"
import classes from "../../styles/garden.module.css"
import useStore from "../../zustand/store"
import NotFoundPage from "../404"

const Garden = () => {
	const { userState } = useStore()
	const { status } = useSession()
	const trees = userState.datauser.trees as any[] // 20 trees
	const devidedTrees: any = []
	let rowIndex = 0 // current row

	while (rowIndex <= trees?.length) {
		const newRow = GetRowTree(trees, rowIndex)

		devidedTrees.push(newRow)
		rowIndex += 8
	}
	if (status === "loading") {
		return <div>Loading...</div>
	}
	if (status === "authenticated") {
		return (
			<>
				<div className={classes.titleContainer}>
					<h1>Garden</h1>
					<Image height={30} width={40} src={Cactus} />
				</div>
				<div className={classes.circleContainer2}>
					<Image layout="responsive" src={rightCircle} />
				</div>
				<div className={classes.circleContainer}>
					<Image layout="responsive" src={circle} />
				</div>
				<div className={classes.gardenWrapper}>
					{devidedTrees.map((row: any) => (
						<div className={classes.terreContainer}>
							{row.map((tree: any) => (
								<div>
									<Image layout="fill" objectFit="contain" src={tree?.image} />
								</div>
							))}
						</div>
					))}
				</div>
			</>
		)
	}
	return <NotFoundPage />
}

export default Garden
