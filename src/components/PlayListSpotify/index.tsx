import useClickOutside from "../../hooks/useClickOutside"
import classes from "./style.module.css"

const PlaylistSpotify = ({ setShowPlaylist, showPlaylist }: any) => {
	const domNode = useClickOutside(() => {
		setShowPlaylist(false)
	})
	return (
		<div
			className={classes.container}
			style={{ visibility: showPlaylist ? "visible" : "hidden" }}
		>
			<div className={classes.blackFilter} />

			<div ref={domNode} className={classes.windowWrapper}>
				<h1 className={classes.titleContainer}>Spotify Playlist</h1>
				<iframe
					className={classes.playlist}
					title="Playlist Spotify"
					style={{ borderRadius: "12px" }}
					src="https://open.spotify.com/embed/playlist/5FmmxErJczcrEwIFGIviYo?utm_source=generator"
					width="100%"
					height="380"
					allowFullScreen
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
				/>
			</div>
		</div>
	)
}
export default PlaylistSpotify
