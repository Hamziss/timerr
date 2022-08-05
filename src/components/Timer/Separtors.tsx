import _ from "lodash"

function Separator({ turns, style }: any) {
	return (
		<div
			style={{
				position: "absolute",
				height: "100%",
				transform: `rotate(${turns}turn)`,
			}}
		>
			<div style={style} />
		</div>
	)
}

function RadialSeparators({ count, style }: any) {
	const turns = 1 / count
	return (
		<>
			{_.range(count).map(index => (
				<Separator key={index} turns={index * turns} style={style} />
			))}
		</>
	)
}

export default RadialSeparators
