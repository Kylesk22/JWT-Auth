import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello {store.email}</h1>
		</div>
	);
};
