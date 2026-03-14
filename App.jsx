import { useEffect, useState } from "react";

const API =
"https://ibrahemsaad--deeef9c01f9211f1930242dde27851f2.web.val.run/";

export default function App() {

  const [orders,setOrders] = useState({});
  const [name,setName] = useState("");
  const [food,setFood] = useState("");
  const [loading,setLoading] = useState(true);

  async function loadOrders(){

    const res = await fetch(API);
    const data = await res.json();

    setOrders(data);
    setLoading(false);

  }

  async function saveOrders(newOrders){

    await fetch(API,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newOrders)
    });

  }

  useEffect(()=>{
    loadOrders();
  },[]);

  const addOrder = async ()=>{

    if(!name || !food) return;

    const newOrders = {
      ...orders,
      [name]:food
    };

    setOrders(newOrders);

    await saveOrders(newOrders);

    setName("");
    setFood("");

  };

  const clearOrders = async ()=>{

    const empty = {};

    setOrders(empty);

    await saveOrders(empty);

  };

  if(loading) return <h2 style={{textAlign:"center"}}>Loading...</h2>;

  return(

    <div style={{
      maxWidth:420,
      margin:"40px auto",
      fontFamily:"sans-serif"
    }}>

      <h2>🍽️ طلبات الغداء</h2>

      <input
      placeholder="اسمك"
      value={name}
      onChange={e=>setName(e.target.value)}
      style={{width:"100%",padding:10,marginBottom:10}}
      />

      <input
      placeholder="طلبك"
      value={food}
      onChange={e=>setFood(e.target.value)}
      style={{width:"100%",padding:10,marginBottom:10}}
      />

      <button onClick={addOrder}>
        إضافة الطلب
      </button>

      <button
      onClick={clearOrders}
      style={{marginLeft:10}}>
        مسح الكل
      </button>

      <hr/>

      {Object.entries(orders).map(([n,o])=>
        <div key={n} style={{padding:6}}>
          👤 {n} — {o}
        </div>
      )}

    </div>

  );

}