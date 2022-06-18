import TopNavBarComponent from "./TopNavBarComponent";

export default function about(){
    return(
        <div className="main">
            <TopNavBarComponent/>
            <div className={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
               <h1 style={{color:'white'}}>About</h1>
            </div>
        </div>
    );
}