const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid" style={{ backgroundColor: '#ffffff' }}>
        <a className="navbar-brand" href="#">
          <img src="/assets/logo.png" alt="Logo" width="115" height="140" className="d-inline-block align-text-top" />
        </a>      
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#" style={{color:'#2EC4B6'}}>Home</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar