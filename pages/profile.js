import ProfileComponent from "../components/ProfileComponent"
import BottomNavBarComponent from "@/components/BottomNavBarComponent"

export default function profile(){
    return(
        <div>
            <BottomNavBarComponent/>

            <h1 style={{color:'white',fontSize:55,fontWeight:'bold',marginTop:55,marginLeft:10}}>Profile</h1>
            <ProfileComponent />
        </div>
    )
}