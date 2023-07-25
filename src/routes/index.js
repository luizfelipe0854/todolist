import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import Protect from "./Protect";

function RoutesApp(){
    return(
            <Routes>
                <Route path="/" element={ <Login /> }/>
                <Route path="/cadastro" element={ <Register /> }/>
                <Route path="/dashboard" element={ <Protect> <Dashboard /> </Protect> }/>

                {/* FAZER PAGINA INEXISTENTE */}
            </Routes>
    )
}

export default RoutesApp;