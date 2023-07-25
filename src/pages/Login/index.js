import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { auth } from "../../firebaseconnect";
import { signInWithEmailAndPassword } from "firebase/auth";

import "./login.css"


function Login(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();
    

    async function verificarCadastro(e){        
        e.preventDefault();

        if (email !== "" && senha.length >= 6) {
            await signInWithEmailAndPassword(auth, email, senha)
                .then(() => {
                    navigate("/dashboard", { replace: true });
                })
                .catch(() => {
                    console.log("erro ao realizar login :/")
                    alert("Parece que você ainda não possui um login")
                })        
        } else if (email === "" || senha === "") {
            alert("Preencha as informações");
            return;
        }else if (senha.length < 6) {
                alert("Verifique suas informações");
                return;   
            }
        }
       
    return(
        <div className="container-login">
            <h1> To do list</h1>
            <span>sua rotina de uma maneira organizada!</span>
            <form className="form" onSubmit={verificarCadastro}>
                <input 
                type="text" 
                placeholder="Digite seu email..."
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="******"
                value={senha}
                onChange={(e)=> setSenha(e.target.value)}
                />
                <button type="submit">Acessar</button>              
            </form>
            <Link to="/cadastro">Não possui cadastro? Cadastre-se aqui!</Link>
        </div>
    )
}

export default Login;