import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Sessoes() {
	const { idFilme } = useParams();

	console.log(idFilme);

	return (
		<></>
	);
}