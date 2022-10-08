import { useParams } from 'react-router-dom';
/* import { useEffect, useState } from 'react'; */  

export default function Assentos() {
/*     const [items, setItems] = useState(null); */
	const { idSessao } = useParams();

	console.log(idSessao);

	return (
		<></>
	);
}