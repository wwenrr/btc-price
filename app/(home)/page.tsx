'use client'

import { useContext } from "react";
import { cryptoCoins } from "@/lib/sample";
import Coin from "@/component/Coin";
import { ThemeContext } from "@/component/ThemeContext";

export default function Home() {
  const cryptoList = cryptoCoins;

  return ( 
    <>
      <div style={{
        width: '100%',
        height: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div style={{
          width: "70%",
          height: "90%",
        }}> 
          <span style={{
            fontSize: 35
          }}>Coin list</span>
          <div style={{marginTop: 15, display: 'flex', flexWrap: "wrap", gap: "10px 20px"}}>
            {cryptoList.map((coin, index) => (
              <Coin key={index} coin={coin}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
