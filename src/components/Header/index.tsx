import { useAuth, type User } from "@/context/authContext";
import logo from "../../assets/img/logo.png";
import { HeaderContainer } from "./styles";
import { Link } from "react-router-dom";

export const Header = () =>{
    const { getUser } = useAuth();
    const user: User = getUser();
    return(
        <HeaderContainer>
            <img src={logo} alt="Discovery Care Logo" width="50" height="50" className="mx-auto"/>

            <nav>
                <ul>
                    <li>
                        <Link to="/adm">Home</Link>
                        <Link to="/addCar">Add Car</Link>
                        <Link to="/updateCar">Update Car</Link>
                        <Link to="/deleteCar">Remove Car</Link>

                        {user.isAdmin && (<>
                            <Link to="/addUsers">Add Users</Link>
                            <Link to="/updateUsers">Update Users</Link>
                            <Link to="/removeUsers">Remove Users</Link>
                        </>)}
                    </li>
                </ul>
            </nav>
        </HeaderContainer>
    )
};