import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseconnect";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "./register.css"


function Register() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function realizarCadastro(e) {
        e.preventDefault();

        if (email !== "" && senha.length >= 6) {
            await createUserWithEmailAndPassword(auth, email, senha)
                .then(() => {
                    navigate("/dashboard", { replace: true });
                })
                .catch(() => {
                    console.log("erro ao realizar cadastro :/")
                })        
        } else if (email === "" || senha === "") {
            alert("Preencha as informações corretamente");
            return;
        }else if ( senha.length < 6 ){
            alert("A senha deve ter ao menos 6 digitos");
            return;
        }

    }


    return (
        <div className="container-cadastro">
            <h1> Cadastre-se</h1>
            <form className="form" onSubmit={realizarCadastro}>
                <input
                    type="text"
                    placeholder="Digite seu email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="******"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/">Já possui cadastro? Faça o login!</Link>
        </div>
    )
}

export default Register;