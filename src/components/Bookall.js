import React from "react";
import { useQuery } from "react-query";
function Pokemon() {
const [name, setName] = useState("");
const [mutateCreate, { error, reset }] = useMutation(text => axios.post('/api/data', { text }),
{ onSuccess: () => { setName('')
}, });
return ( <div>
<form onSubmit={e=>{ e.preventDefault() mutateCreate(name)
}}>
{error && <h5 onClick={() => reset()}>{error}</h5>} <input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<br />
<button type="submit">Create Pokemon</button> </form>
</div> );
}
