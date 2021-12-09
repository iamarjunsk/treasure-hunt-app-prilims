import React, { useEffect, useState } from 'react'
import './admin.css'

import {db} from './firebase-config';


import {collection,getDocs,addDoc,deleteDoc,doc} from 'firebase/firestore';

function Admin() {
    const [pin, setpin]= useState('')
    const [showPin, setshowPin] = useState(true)
    const [clues, setclues] = useState([])
    const [treasure,setTreasure] = useState('')
    const [c1,setc1] = useState('')
    const [c2,setc2] = useState('')
    const [c3,setc3] = useState('')
    const [c4,setc4] = useState('')
    const [c5,setc5] = useState('')

    const cluesCollectionRef = collection(db,"clues")
    
    useEffect(()=>{
        getClues()
        
    },[])
    const getClues = async()=>{
    const data = await getDocs(cluesCollectionRef)
    await setclues(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    function login(){
        console.log('reacehd');
        if(pin === 'arj'){
            setshowPin(false)
        }
    }
    async function addTreasure(){
        await addDoc(cluesCollectionRef,{ans:treasure.toLowerCase(),clues:[c1,c2,c3,c4,c5]})
        setTreasure('')
        setc1('')
        setc2('')
        setc3('')
        setc4('')
        setc5('')
        getClues()
    }
    async function deleteTreasure(id){
        const treasureDoc = doc(db,"clues",id)
        await deleteDoc(treasureDoc)
        getClues()
    }
    return (
        <div className='Admin'>
            
           { showPin?
                <div className="mt">
                    <input type="password" value={pin} onChange={e=>setpin(e.target.value)}/>
                    <button onClick={login}>Login</button>
                </div>
                :
                <div>
                    <div>
                        <div>
                            <input type="text" value={treasure} onChange={e=>setTreasure(e.target.value)} placeholder="Treasure" id="" />
                        </div>
                         <div>
                            <input type="text" value={c1} onChange={e=>setc1(e.target.value)} placeholder="Clue1" id="" />
                        </div>   
                        <div>
                            <input type="text" value={c2} onChange={e=>setc2(e.target.value)} placeholder="CLue2" id="" />
                        </div>
                        <div>
                           <input type="text" value={c3} onChange={e=>setc3(e.target.value)} placeholder="Clue3" id="" />
                        </div>
                        <div>
                            <input type="text" value={c4} onChange={e=>setc4(e.target.value)} placeholder="Clue4" id="" />
                        </div>
                        <div>
                            <input type="text" value={c5} onChange={e=>setc5(e.target.value)} placeholder="Clue5" id="" />
                        </div>
                        <div>

                            {treasure&&c1&&c2&&c3&&c4&&c5?
                                <button onClick={addTreasure} className="mt bggren">Save</button>
                                :
                                ""
                            }
                        </div>
                    </div>
                    <div className="cardholder">
                        {
                            clues.map(c=>{
                                return(
                                <div key={c.id} className="card">
                                    {console.log(c.ans)}
                                    <div className='tres'>{c.ans}</div>
                                    <div className='clues'>{c.clues.map(cl=>{
                                        return(
                                        <div>{cl}</div>
                                        )
                                    })}</div>
                                    <button className="bgred" onClick={()=>{deleteTreasure(c.id)}}>Delete</button>
                                </div>)
                            })
                        }
                    </div>
                </div>
           } 
        </div>
    )
}

export default Admin
