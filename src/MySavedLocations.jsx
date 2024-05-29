const MySavedLocations = () => {
  return (
      <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              My Saved Locations
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Location 1</a></li>
              <li><a className="dropdown-item" href="#">Location 2</a></li>
              <li><a className="dropdown-item" href="#">Location 3</a></li>
            </ul>
          </li>
  )
}

export default MySavedLocations
