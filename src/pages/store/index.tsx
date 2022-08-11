/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify"
import { FreeMode } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import circle from "../../../public/images/Home/circle.png"
import rightCircle from "../../../public/images/Home/circleRight.png"
import bimbo from "../../../public/images/Store/bimbo.png"
import girafe from "../../../public/images/Store/girafe.png"
import store from "../../../public/images/Store/store.png"
import AnimalCard from "../../components/AnimalCard"
import ConfirmBuy from "../../components/ConfirmBuy"
import Footer from "../../components/Footer"
import getData from "../../services/fetchData/getData"
import classes from "../../styles/store.module.css"
import { IAnimal } from "../../types/animal"

interface Props {
	legendaryAnimals: IAnimal[]
	rareAnimals: IAnimal[]
	epiqueAnimals: IAnimal[]
}
const Store = ({ epiqueAnimals, legendaryAnimals, rareAnimals }: Props) => {
	const [ShowAnimals, setShowAnimals] = useState("All")
	const { status } = useSession()
	const [Open, setOpen] = useState(false)
	const [selectedAnimal, setSelectedAnimal] = useState<IAnimal>({
		_id: 0,
		name: "",
		category: "",
		price: 0,
		image: "",
		feeling: "",
		ownedSince: new Date(),
		rarety: "",
	})

	const handleClose = () => {
		setOpen(false)
	}
	const handleChange = (event: SelectChangeEvent) => {
		setShowAnimals(event.target.value)
	}
	const handleBuy = (animal: IAnimal) => {
		if (status === "authenticated") {
			setSelectedAnimal(animal)
			setOpen(true)
		} else {
			toast.error("You need to be logged in to buy an animal")
		}
	}
	return (
		<>
			<main className={classes.mainStore}>
				<div className={classes.wrapperStore}>
					<div className={classes.circleContainer}>
						<Image layout="responsive" src={circle} />
					</div>
					<div className={classes.circleContainer2}>
						<Image layout="responsive" src={rightCircle} />
					</div>
					<div className={classes.mainTitle}>
						<h1>Store</h1>
						<Image priority src={store} />
					</div>
					<ConfirmBuy
						animal={selectedAnimal}
						open={Open}
						handleClose={handleClose}
					/>
					<div className={classes.heroContainer}>
						<div className={classes.textSide}>
							<span>New Release ! </span>
							<strong>
								Bimbo The New Creature <br />
								Is Out
							</strong>
							<button type="submit">Purchase</button>
						</div>
						<div className={classes.ImageContainer}>
							<Image placeholder="blur" src={bimbo} />
						</div>
						<div className={classes.girafeContainer}>
							<Image placeholder="blur" priority src={girafe} />
						</div>
					</div>
					<div className={classes.storeBar}>
						<span>Store</span>
						<div className={classes.selectAnimal}>
							<FormControl sx={{ marginLeft: "auto", minWidth: 80 }}>
								<Select
									sx={{ height: 35 }}
									value={ShowAnimals}
									onChange={handleChange}
									displayEmpty
									inputProps={{
										MenuProps: { disableScrollLock: true },
										"aria-label": "Without label",
									}}
								>
									<MenuItem value="All">All</MenuItem>
									<MenuItem value="Epique">Epique</MenuItem>
									<MenuItem value="Legendary">Legendary</MenuItem>
									<MenuItem value="Rare">Rare</MenuItem>
								</Select>
							</FormControl>
						</div>
					</div>
					{(ShowAnimals === "All" || ShowAnimals === "Epique") && (
						<>
							<span className={classes.epique}>Epique</span>

							<Swiper
								slidesPerView={1}
								spaceBetween={10}
								style={{ width: "100%", marginBottom: "25px" }}
								modules={[FreeMode]}
								breakpoints={{
									640: {
										slidesPerView: 1,
										spaceBetween: 20,
									},
									768: {
										slidesPerView: 3,
										spaceBetween: 20,
									},
									1024: {
										slidesPerView: 3,
										spaceBetween: 50,
									},
									1524: {
										slidesPerView: 4,
										spaceBetween: 70,
									},
								}}
								className="mySwiper"
							>
								<div className={classes.whiteEffect} />
								{epiqueAnimals.map(animal => (
									<SwiperSlide
										onClick={() => handleBuy(animal)}
										style={{ minWidth: "200px" }}
										key={animal._id}
									>
										<AnimalCard animal={animal} />
									</SwiperSlide>
								))}
							</Swiper>
						</>
					)}
					{(ShowAnimals === "All" || ShowAnimals === "Legendary") && (
						<>
							<span className={classes.legendary}>Legendary</span>
							<Swiper
								slidesPerView={1}
								spaceBetween={10}
								style={{ width: "100%", marginBottom: "25px" }}
								modules={[FreeMode]}
								breakpoints={{
									640: {
										slidesPerView: 1,
										spaceBetween: 20,
									},
									768: {
										slidesPerView: 3,
										spaceBetween: 20,
									},
									1024: {
										slidesPerView: 3,
										spaceBetween: 50,
									},
									1524: {
										slidesPerView: 4,
										spaceBetween: 70,
									},
								}}
								className="mySwiper"
							>
								<div className={classes.whiteEffect} />
								{legendaryAnimals.map(animal => (
									<SwiperSlide
										onClick={() => handleBuy(animal)}
										key={animal._id}
									>
										<AnimalCard animal={animal} />
									</SwiperSlide>
								))}
							</Swiper>
						</>
					)}
					{(ShowAnimals === "All" || ShowAnimals === "Rare") && (
						<>
							<span className={classes.rare}>Rare</span>
							<Swiper
								slidesPerView={1}
								spaceBetween={10}
								style={{ width: "100%", marginBottom: "25px" }}
								modules={[FreeMode]}
								breakpoints={{
									640: {
										slidesPerView: 1,
										spaceBetween: 20,
									},
									768: {
										slidesPerView: 3,
										spaceBetween: 20,
									},
									1024: {
										slidesPerView: 3,
										spaceBetween: 50,
									},
									1524: {
										slidesPerView: 4,
										spaceBetween: 70,
									},
								}}
								className="mySwiper"
							>
								<div className={classes.whiteEffect} />
								{rareAnimals.map(animal => (
									<SwiperSlide
										onClick={() => handleBuy(animal)}
										key={animal._id}
									>
										<AnimalCard animal={animal} />
									</SwiperSlide>
								))}
							</Swiper>
						</>
					)}
				</div>
			</main>
			<Footer />
		</>
	)
}

export default Store
export const getServerSideProps = async () => {
	const res = await getData("animals")

	const { animals } = res
	const legendaryAnimals = animals.filter(
		(animal: IAnimal) => animal.rarety === "legendary"
	)
	const epiqueAnimals = animals.filter(
		(animal: IAnimal) => animal.rarety === "epique"
	)
	const rareAnimals = animals.filter(
		(animal: IAnimal) => animal.rarety === "rare"
	)

	return {
		props: {
			legendaryAnimals,
			epiqueAnimals,
			rareAnimals,
		},
	}
}
