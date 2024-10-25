function Crud(){
    return(
        <>
            <div className="container">
                {/* VIEW DO GET */}
                <div className="get">
                    <h2>GET</h2>
                    <p>ID: </p>
                    <input
                        value={index}
                        onChange={(e) => {setIndex(e)}}
                        className="input"
                    />
                    <button className="btnGET" onClick={pesquisarSensor}>GET Sensor</button>
                </div>
            </div>
        
        </>
    )
}