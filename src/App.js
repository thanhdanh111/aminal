import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import Login from './components/Login'
import axios from 'axios'
import { json } from 'body-parser';
import firebase from './components/firebase'
import {auth , db} from './components/firebase'
import SingleData from './data/SingleData';
const key = "v3YvEB7MQAmosLDjPHKa3LWyfEikMU5GVzZqNLF77lFP2hsKuQ"
const secret = "91BEGtP8Iv5UcmGpEljgKTzYCmNwUAvCwMSyFi1H"
function App() {

  const [user , setUser] = useState(auth)
  const [initializing , setInitializing] = useState(true)


  const [token , setToken]  =useState('')
  const [result , setResult]  =useState('')
  const [picture , setPicture]  =useState('')
  const [loading , setLoading] = useState(false)
  async function getTheToken  (){
    const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      params.append("client_id", key);
      params.append("client_secret", secret);
      const getToken = await  fetch(
        "https://api.petfinder.com/v2/oauth2/token",
        {
          method: "POST",
          body: params,
        }
      );
      const data =  await getToken.json();
      setToken(data.access_token)
  }
  const getData  = async () => {
    const petResults = await fetch(
      "https://api.petfinder.com/v2/animals",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await petResults.json()
    const animals = data.animals;
      setResult(animals)
      setLoading(true)
  };
  useEffect(  () =>{
   getTheToken()
  },[])
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
            setUser(user);
            
        } else{

            setUser(null);
        }
        if(initializing){
            setInitializing(false)
        }
    })
    return unsubscribe;
},[]);
const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.log(error.message);
  }
  
};
  return (
    <div >
      {
        user ? 
        <>
        {
          loading ?
          <>
          <button onClick={signOut} className="btn-trangdau" ><span>Sign out</span></button>
          <SingleData result={result}/>
          </>
          :
          <div className="btn-layout">
          <button onClick={signOut} className="btn-trangdau" ><span>Sign out</span></button>
          <button onClick={getData()} className="btn-trangdau" ><span>Click to see animals</span></button>
          </div>
        }
        </>
        :
         <Login />
      }
        
      
      
    </div>
   
  );
}

export default App;
