import {useEffect, useState} from "react";
// import {content} from "../tailwind.config";


function App(){

    const [todos, setTodos] = useState([]);
    const [form, setForm] = useState({
        title :"",
        description:"",
        due_date:"",
    })

    useEffect(() => {
        setTodos([
            {
        id:"1",
        title:"Hoc react js",
        description:"Lam giao dien todoapp",
        due_date:"2015-04-17",
                created_at:"2025-04-16 08:00:00",
                status:"PENDING",
        },
            {
                id:"2",
                title:"haha",
                description:"giao dien khong kho",
                due_date:"2015-04-18",
                created_at:"2025-04-17 08:00:00",
                status:"DONE",
            }
        ])
    },[])

    const toggleStatus = (id) => {
        const updated = todos.map((todo)=>
            todo.id === id
            ? {...todo, status : todo.status === "PENDING" ? "DONE" : "PENDING"}
                : todo
        );
        setTodos(updated);
    }

    const handleAddTodo = () => {
        if(!form.title.trim()){
            alert("Vui lòng nhập tiêu đề!")
            return;
        }

        const newTodo = {
            id: Date.now().toString(),
            title: form.title,
            description: form.description,
            due_date: form.due_date,
            created_at: new Date().toISOString().slice(0,19).replace("T", " "),
            status: "PENDING",
        }

        setTodos([...todos,newTodo]);

        setForm({
            title: "",
            description: "",
            due_date: ""
        })
    }


    return (
        <div className="bg-amber-100 mx-auto max-w-4xl mt-10 p-5">
            <h1 className={"text-3xl font-bold text-center text-blue-600 mb-6"}>Todo App</h1>
            <div className="grid grid-cols-1 gap-4">
                <input className={"p-2 border rounded"}
                       type={"text"}
                       placeholder={"title"}
                       name="title"
                       value={form.title}
                       onChange={(e)=>setForm({...form,[e.target.name] : e.target.value})}
                />
                <textarea className={"p-2 border rounded"}
                          placeholder={"description"}
                          name={"description"}
                          value={form.description}
                          onChange={(e)=>setForm({...form, [e.target.name]: e.target.value})}
                />
                <input className={"p-2 border rounded"}
                       type={"date"}
                       name={"due_date"}
                       value={form.due_date}
                       onChange={(e)=>setForm({...form, [e.target.name]: e.target.value})}
                />
                <div className={"flex justify-between"}>
                    <button className={"bg-emerald-500 w-20 h-11"}
                    onClick={handleAddTodo}>
                        Thêm
                    </button>
                    <button className={"bg-rose-600 w-20 h-11"}>
                        Xóa
                    </button>
                    <button className={"bg-amber-400 w-20 h-11"}>
                        Sửa
                    </button>
                </div>
            </div>
           {/*hiển thị todo*/}
            <div className={"space-y-4 mt-3"}>
                {todos.map((todo) =>(
                    <div
                        key={todo.id}
                        className={""}
                    >
                        <div className={"relative text-2xl font-bold"}>{todo.title}
                            <span
                                className={`absolute bg-amber-300 rounded top-0, right-0 p-1 ${todo.status === "PENDING" ? "bg-rose-600" : "bg-emerald-500"}`}>{todo.status}</span>
                        </div>
                        <div>{todo.description}</div>
                        <div>due: {todo.due_date} | creat_at: {todo.created_at}</div>
                        <button className={`p-3 w-40 mt-3 ${todo.status === "DONE" ? "bg-green-400" : "bg-yellow-300"}`}
                        onClick={() =>toggleStatus(todo.id)}>
                            {todo.status === "DONE" ? "Tiếp tục" : "Hoàn thành"}
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;