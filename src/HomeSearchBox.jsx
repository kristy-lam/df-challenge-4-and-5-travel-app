const HomeSearchBox = () => {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '70vh' }}>
            <form className="w-100" style={{ maxWidth: '400px' }}>
                <div className="form-group">
                    <h1 style={{ textAlign: "center" }}>Tell me about...</h1>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Location name..."
                        name="search"
                    />
                </div>
                <br />
                <div className="form-group text-center">
                    <button
                        type="submit"
                        className="btn"
                    style={{backgroundColor:"#2EC4B6", color:"#FFFFFF" }}>
                        Search
                    </button>                    
                </div>
            </form>
        </div>
    )
}

export default HomeSearchBox
