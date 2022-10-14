import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import axios from "axios";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	// const handleClick = async () => {
	// 	try {
	// 		const resp = await axios.post('https://3001-4geeksacade-reactflaskh-0am4wn880hc.ws-us70.gitpod.io/api/signup', {
	// 			"email": email,
	// 			"password": password
	// 		})
	// 		if (resp.status !== 200) {
	// 			alert("There has been an error")
	// 			return false
	// 		}
	// 		sessionStorage.setItem("token", resp.data.access_token);
	// 		actions.setStore({token: resp.data.access_token});
	// 		actions.setStore({email: email})
	// 		if (store.token && store.token != "" && store.token != undefined) navigate('/private');
	// 		console.log(store.token)
	// 	}
	// 	catch (err) {
	// 		console.error(err);
		// }
	// const handleClick = () => {
	// 	axios
	// 	.post('https://3001-4geeksacade-reactflaskh-0am4wn880hc.ws-us70.gitpod.io/api/signup',{
	// 		"email": email,
	// 		"password": password
	// 	})
	// 	.then((resp) => {		
	// 		console.log(resp)
		
			
	// 	  })
	// 	.catch((error) => {
	// 		console.log(error);
	// 	  });
	// 	}
		
	const handleClick = () => {
		actions.signup(email, password);
	}

	if (store.token && store.token != "" && store.token != undefined) navigate('/private');

	return (
		<div className="text-center mt-5">
			<h1>Signup</h1>
			
			{(store.token && store.token != "" && store.token != undefined) ? "You are logged in with this token" + store.token :
				<div> 
					<input type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
					<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
					<button onClick={handleClick}>Signup</button>
				</div>}
		</div>
	);
	
};
