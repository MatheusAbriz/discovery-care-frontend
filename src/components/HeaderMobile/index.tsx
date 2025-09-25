import { HeaderLayout } from "./styles"
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

export const HeaderMobile = () =>{
    return(
        <HeaderLayout>
            <nav>
                <ul>
                    <li>
                        <img src={logo} alt="Discovery Care Logo" width="50" height="50"/>
                    </li>
                    <li>
                        <Link to="/adm">Home</Link>
                        <Link to="/addCar">Add Car</Link>
                        <Link to="/updateCar">Update Car</Link>
                        <Link to="/deleteCar">Remove Car</Link>
                    </li>
                </ul>
            </nav>
        </HeaderLayout>
    )
}