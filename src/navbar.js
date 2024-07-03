import { faList, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Navbar = () => {
    return (
        <nav>
            <span>Demo Travel Tool</span>
            <div style={{display:'flex', gap: 20}}>
            <FontAwesomeIcon size="xl" icon={faSearch}/>
            <FontAwesomeIcon size="xl" icon={faList}/>
            </div>
        </nav>
    )
}

export default Navbar