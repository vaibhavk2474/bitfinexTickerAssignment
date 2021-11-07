//02
// here WS() gets props in which we have a dispatch fun() 
//this dispatch fun() is using to make a fun() savet(saveTicker) which is used to set State

// 03
// next thing  doing ,is make connection with web socket API and get data
let ws;

export default function WS(props) {
    console.log(props.props.dispatch, "props");
    let dispatch = props.props.dispatch;
    
    let st = (dispatch) => {
        return {
            savet: (payload) => {
                dispatch({
                    type: "SAVE_TICKER",
                    payload,
                });
            },
        };
    };
    let savet =  st(dispatch);
    

  ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

  ws.addEventListener("open", open);
  ws.addEventListener("message", msgFun);
  ws.addEventListener("close", socketCloseListener);

  function open() {
    console.log("WS open");
    document.getElementById("h5").innerHTML="ws open"
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
      savet.savet(msg);
    }
  }
  function socketCloseListener() {
    console.log("WS close");
    document.getElementById("h5").innerHTML="ws closed"
   WS(props);
  }
 
}

// close fun() for closing the connection

export  function closeFun() {
console.log("close");
    ws.close();

}
