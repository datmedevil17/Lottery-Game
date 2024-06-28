import React, { useState,useEffect } from 'react'

const Players = ({state, account}) => {
    const {contract, contractAddress} = state;
    const [registeredPlayers, setRegisteredPlayers] = useState([])

    useEffect(() => {
        const getPlayers = async()=>{
            const players = await contract.allPlayers()
            setRegisteredPlayers(players)
            // console.log(registeredPlayers)

            const registeredPlayers = await Promise.all(
                players.map((player)=>{
                    return player
                })
            )
            console.log(registeredPlayers)
            setRegisteredPlayers(registeredPlayers)

        }
        {contract && getPlayers()}
    })
    
  return (
    <div>
        <h4>Connected Account : {account}</h4>
        <br />
       <h4> Players need to pay 0.007 eth to the following contract address : {contractAddress}</h4>
       <br />
       <br />
       <h4>Registered Players :</h4>
       {registeredPlayers.length !== 0 && 
       registeredPlayers.map((name) => <p key={name}>{name}</p>)}
      
    </div>
  )
}

export default Players
