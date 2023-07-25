import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseconnect"
import { signOut } from "firebase/auth"

import {
    addDoc,
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";

import "./dashboard.css"


function Dashboard() {
    const [infoUser, setInfoUser] = useState([]);
    const [tarefa, setTarefa] = useState("");
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(() => {
        const userDetail = JSON.parse(localStorage.getItem("@userInfo"));
        setInfoUser(userDetail);

        async function getTasks() {
            const tarefaRef = collection(db, "Tarefas");
            const busca = query(tarefaRef, orderBy("uid", "desc"), where("uid", "==", userDetail.uid))

            const tasks = onSnapshot(busca, (snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        uid: doc.data().uid,
                    })
                })
                setTarefas(lista);
            })



        }
        getTasks();
    }, [])

    async function handleAddtarefa() {
        if (tarefa === "") {
            alert("Digite uma tarefa!");
            return;
        }

        if(edit?.id){
            handleUpdatetarefa();
            return;
        }

        await addDoc(collection(db, "Tarefas"), {
            tarefa: tarefa,
            uid: infoUser.uid,
        })
        .then(()=>{
            setTarefa("")
        })
        .catch((error)=>{
            console.log("Erro ao adicionar tarefa" + error);
        }         
        )
    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function deleteTask(id){
        const tarefaRef = doc(db, "Tarefas", id);
        deleteDoc(tarefaRef);
    }

    function editTarefa(item){
        setEdit(item)
        setTarefa(item.tarefa)
    }

    async function handleUpdatetarefa(){
        const tarefaRef = doc(db, "Tarefas", edit?.id);
        await updateDoc(tarefaRef,{
            tarefa: tarefa,
        })
        .then(()=>{
            setEdit({});
            setTarefa("");
        })
        .catch(()=>{
            console.log("ERRO AO ATUALIZAR TAREFA");
            setEdit({});
            setTarefa("");
        })

    }


    return (
        <div className="container-dashboard">
            <h1>Minhas tarefas</h1>
            <div className="tarefas">
                <textarea
                    placeholder="Digite uma tarefa..."
                    value={tarefa}
                    onChange={(e) => (setTarefa(e.target.value))}
                />
                {/* <button onClick={handleAddtarefa}>Criar tarefa</button> */}
                {Object.keys(edit).length > 0 ? (
                    <button onClick={handleAddtarefa} style={{backgroundColor : "green"}}>Editar tarefa</button>
                ):
                (
                    <button onClick={handleAddtarefa}>Criar tarefa</button>
                )} 
            </div>
            <div className="container-tarefas">
                {tarefas.map((task) => {
                    return (
                        <article key={task.id}>
                            <span>{task.tarefa}</span>
                            <div className="botoes">
                                <button onClick={()=> editTarefa(task)}>Editar</button>
                                <button className="concluir" onClick={()=>deleteTask(task.id)}>Concluir</button>
                            </div>
                        </article>
                    )
                })

                }
            </div>
            <button className="sair" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard;