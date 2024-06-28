import React from 'react'
import { useState,useEffect } from 'react'

const Manager = ({state,account}) => {
    const {contract} = state;
    const [cbalance, setCbalance] = useState("0");
    const [lwinner, setLwinner] = useState("No winner yet")
    
        const contractBalance = async() =>{
            try{
            const balance = await contract.getBalance();
            setCbalance(balance)
            console.log(cbalance)
        }catch(e){
            setCbalance("You are not the manager")
            console.log(cbalance)
        }
        
        }
        const winner = async() => {
            try{
                await contract.pickWinner()
                const lotteryWinner = await contract.winner()
                console.log(lotteryWinner)
                setLwinner(lotteryWinner)
            }catch(e){
                if(e.message.includes("You are not the manager")){
                    setLwinner("You are not the manager")
                }else if(e.message.includes("Player are less")){
                    setLwinner("Player are less than 2")
                }else{
                    setLwinner("No winner yet")
                }
            }

            
        }


    




  return (
    <div>
        <h4>Connected Account : {account}</h4>
        <br />
        <h4>Winnner : {lwinner}</h4>
        <button onClick={winner}>Click for Winner</button>
        <br />
        <h4>Contract Balance : {cbalance} Ether</h4>
        <button onClick={contractBalance}>Get Balance</button>
       
        
      
    </div>
  )
}

export default Manager
