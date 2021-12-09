import React from 'react'
import { useEffect, useState } from 'react';
import './App.css';
import {db} from './firebase-config';
import {collection,getDocs,addDoc} from 'firebase/firestore';


function Home() {

    const [clues, setclues] = useState([])
    const cluesCollectionRef = collection(db,"clues")
    const userCollectionRef = collection(db,"user")
    const [clue,setclue] = useState([])
    const [user,setUser] = useState("")
    const [dis,setDis] = useState(false)
    const [eClue, seteClue] = useState([])
    const [change,setChange] = useState(0)
    const [chClu,setChClu] = useState(0)
    const [guess, setGuess] = useState("")

    const [time, setTime] = useState(0)
    const [answerTime,setAnswerTime] = useState(0)

    useEffect(()=>{
        const getClues = async()=>{
        const data = await getDocs(cluesCollectionRef)
        await setclues(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
        }
        getClues()

    },[])
    async function loadQu(){
        setChClu(0)
        setclue([])
        console.log(change);
        if(change < clues.length){
            await seteClue(clues[change]);
            console.log(clues[0].clues);
            console.log(eClue);
        }
        setChange(change+1)
        // move this to a function and call it with loadQu when button pressed
        setTime(0)
        setAnswerTime(0)
    }
    
    function loadClue(){
    if(chClu < eClue.clues.length){
        let cls=[...clue,eClue.clues[chClu]]
        setclue(cls);
        // setclue(eClue.clues[chClu])
        console.log(eClue.clues[chClu]);
    }
    setChClu(chClu+1)
    }
    async function check(){
        console.log(window.intervel);
        if(eClue.ans == guess.toLowerCase()){
            console.log(time,answerTime);
            console.log('correct');
            setAnswerTime(answerTime+time)
            addAnswer()
            loadQu()
            setTime(0)
            setAnswerTime(0)
            alert("Correct")
        }
        setGuess('')
    }
    let clear 
    function startTimer(stop){
    // setInter(setInterval(()=>{
    //   setTime(prevTime => prevTime+10)
    // },10))
        const intervel = setInterval(()=>{
            setTime(prevTime => prevTime+10)
        },10)
    }
    
    if(time >= 60000){
        if(chClu<5){
            setAnswerTime(answerTime+time)
            console.log(time);
            setTime(1)
            loadClue()
        }
        else{
            loadQu()
        }
    }
    const addAnswer = async () =>{
        console.log(time+answerTime);
        await addDoc(userCollectionRef,{name:user,clue:eClue.id,ansTime:time+answerTime})
    }
    function startcall(){
        loadQu()
        startTimer(false)
    }

return (
    <div className="Home">
        <div>
            <h2>Excellencia 21'</h2>
        </div>
        <div>
            <input className="inp" disabled={dis} type="text" value={user} onChange={e=>setUser(e.target.value)} />
            <button className="btn bggrn" disabled={dis} onClick={()=>setDis(true)}>save</button>
            {user?
            <div>
                <div className="clues">
                    {clue.map(e=>{
                        return(
                        // <div className="clue" key={e}>{e}</div>
                        <div className="clue" key={e}><img className="img" src={e} /></div>
                        )
                    })}
                    {/* <div className="clue" key={1}><img className="img" src={clue} /></div> */}
                </div>
                <div>
                    {
                        change == 0?
                        <button className="btn bggrn mt" onClick={startcall}>Load Treasure</button>:""
                    }
                </div>
                {
                    change <= clues.length?
                    <div>
                        <div>
                            {chClu == 0 && change!=0?
                            <button className="btn bggrn mt" onClick={loadClue}>Load Clue</button>
                            :""
                            }
                        </div>
                        <input className="inp mt" type="text" value={guess} onChange={e=>setGuess(e.target.value)} />
                        <button className="btn bggrn" onClick={check}>ChecK</button>
                        <div className="time mt">
                            {Math.floor((time/1000)%60)}
                        </div>
                        <div className="treasure mt">Treasure : {change}</div>
                    </div>
                    :'Over'
                }
            </div>:""}
        </div>
    </div>
)
}

export default Home
