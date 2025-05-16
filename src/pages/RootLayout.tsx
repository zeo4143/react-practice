import { Outlet } from "react-router-dom";
import BaseFrom from '../components/forms/BaseFrom';


const RootLayout = () => {
    return (
        <>
            <BaseFrom/>
            <Outlet/>
        </>
    )
}

export default RootLayout;