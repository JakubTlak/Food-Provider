import React, {useState} from "react";

function Registration({}){

    const[nick, setNick]= useState(null);
    const[email, setEmail]= useState(null);
    const[password, setPassword] = useState(null)

    return(
        <div className="registration">
            <input type="text" value={nick} onChange={e=>setNick(e.target.value)} required/>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}  required/>
        </div>

    )
}