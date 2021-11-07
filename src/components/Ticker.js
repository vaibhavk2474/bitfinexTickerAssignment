import React, { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Modifier from "./Modifier";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown,faCaretUp } from '@fortawesome/free-solid-svg-icons'
import styles from "./style";

// 02
// here Ticker fun() is rendering data from the state
// initially state will have initial data(initialState)
// and after calling useEffect ,WSconnection will call which  establish the connection via web socket to API
// and setState() sets the new State (data comming from API)
// here two buttons,one for close connection(disconnect) and othe for connect(recconct via Web socket)

let ws;
export default function Ticker() {
  const initialState = [0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
  const [state, setstate] = useState(initialState);
  const [status, setStatus] = useState("going to connect");

  const [
    CHANNEL_ID,
    [
      Bid,
      Bid_Size,
      Ask,
      ASK_Size,
      DAILY_CHANGE,
      DAILY_CHANGE_PERC,
      LAST_PRICE,
      VOLUME,
      HIGH,
      LOW,
    ],
  ] = state;

//   let myRef = React.createRef();

  function WSconnection() {

    ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    ws.addEventListener("open", open);
    ws.addEventListener("message", msgFun);
    ws.addEventListener("close", socketCloseListener);
  }

  function open() {
    console.log("WS open");
    setStatus("established");

    if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            event: "subscribe",
            channel: "ticker",
            symbol: "tBTCUSD",
          })
        );
    }
  }

  function msgFun(message_event) {
    var msg = message_event.data;
    msg = JSON.parse(msg);

    if (Array.isArray(msg[1])) {
      console.log(msg, "25");
      setstate(msg);
    }
  }

  function socketCloseListener() {
    console.log("i am closed");
    setStatus("closed");
    WSconnection();
  }

  function close() {
    console.log("close");
    ws.close();
  }

  function up() {
      return (
    <Image
    style={{ width: 10, height: 10 }}
    source={require('./png/green.png')}
    
  />
      )
  }
  function down() {
    return (
  <Image
  style={{ width: 10, height: 10 }}
  source={require('./png/red.png')}
  
/>
    )
}

  useEffect(() => {
    WSconnection();
  }, []);

  return (


    <View style={styles.main_View}>
  
      <View style={styles.mainContainer}>
        <View style={styles.text}>
      {/* <Text>icon</Text> */}
          <Image
            style={{ width: 40, height: 40 }}
            source={require('./png/BTC-alt.png')}
            
          />
        </View> 

        <View style={styles.firstBox}>
          <Text style={{color:"white",fontSize:22,textDecorationLine:"underline"}}>BTC/USD</Text>
          <Text  style={{color:"white"}}>
         <Text style={{color:"rgb(73,90,103)"}}>VOL</Text> {" "} 
     {Modifier((VOLUME* 61233.10).toFixed(0))}
         
          </Text>
    
          <Text  style={{color:"white"}}>
            <Text  style={{color:"rgb(73,90,103)"}}>LOW</Text>{" "}
          {Modifier(LOW)}</Text>
        </View>

        <View style={styles.secondBox}>
          <Text  style={{color:"white",fontSize:22}}>{Modifier((LAST_PRICE).toFixed(0))}</Text>

          <Text >
            <Text   style={DAILY_CHANGE_PERC<0?{color:"red"}:{color:"green"}}>{Math.abs(DAILY_CHANGE).toFixed(2)}</Text>{" "}
            {DAILY_CHANGE_PERC<0?down():up()}
          <Text   style={DAILY_CHANGE_PERC<0?{color:"red"}:{color:"green"}}>
               ({(Math.abs(DAILY_CHANGE_PERC)*100).toFixed(2)})%</Text>
          </Text >


          <Text  style={{color:"rgb(73,90,103)"}}>
              HIGH{" "}
          <Text style={{color:"white"}}>{Modifier((HIGH).toFixed(0))}</Text>
         </Text>


        </View>
      </View>


      <View style={styles.Box}>
    
      <Button title="connect" onPress={WSconnection} />
    </View>
    <View style={styles.Box}>
    
      <Button title="close"  onPress={close} />
      </View>
      <Text style={{textAlign:"center"}}>{status}</Text>
    </View>
  );
}


