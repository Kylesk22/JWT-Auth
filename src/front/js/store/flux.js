const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			email: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			setStore: () => setStore(),
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined) setStore({token: token})
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({token: null})
				setStore({email: null})
			},
			
			signup: async (email, password) => {
				const ops = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})

				}

				try {
				const resp = await fetch('https://3001-4geeksacade-reactflaskh-0am4wn880hc.ws-us70.gitpod.io/api/signup', {ops})
				if (resp.status !== 200) {
				alert("There has been an error")
				return false
				}
				const data = await resp.json();		
				sessionStorage.setItem("token", data.access_token)
				setStore({token: data.access_token})
				actions.setStore({email: email})
					
				}
				catch (err) {
					console.error(err);
				}
			},

			login: async(email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
					}

					try{
					const resp = await fetch('https://3001-4geeksacade-reactflaskh-0am4wn880hc.ws-us70.gitpod.io/api/token', opts)
					if (resp.status !== 200) {
						alert("There has been an error")
						return false
					}
					
					const data = await resp.json();		
					sessionStorage.setItem("token", data.access_token)
					setStore({token: data.access_token})
					actions.setStore({email: email})
					return true
					}
					catch(error) {
						console.error("There has been an error")
					}
				},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
