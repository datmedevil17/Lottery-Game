import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import abi from "./contract/Lottery.json";
import Manager from "./components/Manager";
import Players from "./components/Players";
import {Route,Link, Routes} from "react-router-dom"
import { BrowserRouter } from 'react-router-dom'
import Home from "./components/Home";


function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    address: null,
    contractAddress: null
  });
  const [account, setAccount] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      const contractAddress = "0x6F3Ebf42eD70F3ccFa48f7eBc365f90587332211";

      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.log("Metamask is not installed");
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length === 0) {
          console.log("No account found");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(signer);

        setState({ provider, signer, contract, address, contractAddress });
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    };

    connectWallet();
  }, []);

  console.log(state);
  console.log(account)

  return <>
  <BrowserRouter>
  
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/manager" element={<Manager state={state} account={account} />} />
    <Route path="/players" element={<Players state={state} account={account} />} />
    </Routes></BrowserRouter>

  </>;
}

export default App;
