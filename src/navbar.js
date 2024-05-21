import { faDoorOpen, faMoon, faShare, faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Navbar = () => {
    return (
        <nav>
            <span>Demo Travel Tool</span>
            <div style={{display:'flex', gap: 20}}>
            <FontAwesomeIcon size="xl" icon={faUserCircle}/>
            <FontAwesomeIcon size="xl" icon={faMoon}/>
            <FontAwesomeIcon size="xl" icon={faShare}/>
            <FontAwesomeIcon size="xl" icon={faDoorOpen}/>
            </div>
        </nav>
    )
}

export default Navbar