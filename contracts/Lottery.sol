// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Lottery{
    address payable[] public players;
    address manager;
    address payable public winner;

    constructor(){
        manager = msg.sender;
    }

    receive() external payable{
        require(msg.value==0.007 ether, "Please pay 0.007 ether only");
        players.push(payable(msg.sender));


    }
    function getBalance() public view returns(uint){
        require(manager==msg.sender, "You are not the manager.");
        return address(this).balance;
    }

    function random() internal view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }
    function pickWinner() public  {
        require(msg.sender==manager, "You are not the manager");
        require(players.length>=2, "Player are less");
        uint r = random();
        uint index = r%players.length;
        winner=players[index];
        winner.transfer(getBalance());
        players = new address payable[](0);

    }
    function allPlayers() public view returns(address payable[] memory){
        return players;
    }
}

//0x6F3Ebf42eD70F3ccFa48f7eBc365f90587332211