import React from 'react'
import { useEffect, useState } from 'react';
import './App.css';
import {db} from './firebase-config';
import {collection,getDocs} from 'firebase/firestore';
function Result() {
    const userCollectionRef = collection(db,"user")
    const [users, setusers] = useState([])

    const getUsers = async()=>{
    const data = await getDocs(userCollectionRef)
    await setusers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }
    useEffect(()=>{
        getUsers()

    },[])
    const data=[
        {
            name:"arjun",
            ansTime:58666,
            clue:"abc"
        },
        {
            name:"sk",
            ansTime:5666,
            clue:"ac"
        },
        {
            name:"arjun",
            ansTime:5866,
            clue:"ac"
        },
        {
            name:"sk",
            ansTime:5866,
            clue:"abc"
        }
    ]
    function calculate(){
        ans = []
        data.forEach(element => {
            
        });
    }

    return (
        <div className="Home">
            {
                users?
                <div>
                    {users.map(e=>{
                        return(
                            <div>
                                <div>{e.name}</div>
                                <div>{e.clue}</div>
                                <div>{e.ansTime}</div>
                                <button onClick={calculate}>Calculate</button>
                            </div>
                        )
                    })}
                </div>
                :""
            }
        </div>
    )
}

export default Result
