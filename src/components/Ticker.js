import React, { useEffect } from "react";
import { connect } from "react-redux";
import WS, { closeFun } from "../components/WS";
import url_01 from "./up.png";
import url_02 from "./red.png";
import "./style.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

// 01
// creating a ticker fun() to render the jsx
// it has initial_ticker which is rendering initially
// then after  render useEffect runs
// it calls WS(props) with iniatial props(state and dispatch fuction) which are comming from store

function Ticker(props) {
  // console.log(props); //getting props(store and dispatch fun())
  const { ticker } = props;
  console.log(Array.isArray(ticker));
  const empty_ticker = [0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

  const [
    channel,
    [
      bid,
      bid_Size,
      ask,
      ask_Size,
      DAILY_CHANGE,
      DAILY_CHANGE_PERC,
      LAST_PRICE,
      VOLUME,
      HIGH,
      LOW,
    ],
  ] = Array.isArray(ticker) ? ticker : empty_ticker;

  useEffect(() => {
    console.log("i am in tickers");
    WS({
      props,
    });
  }, []);

  function up() {
    return <img src={url_01} style={{ height: 10, width: 10 }} />;
  }

  function down() {
    return <img src={url_02} style={{ height: 10, width: 10 }} />;
  }

  return (
    <div id="main_div">
      my ticker
      {console.log(typeof DAILY_CHANGE_PERC, "DAILY_CHANGE_PERC")}
      <div className="main_container">
        <div className="main_ticker_container">
          <div className="bitcoin_icon"></div>

          <div className="ticker_items">
            <div className="text_01">
             <span style={{ fontSize: 22, textDecoration: "underline" }}>BTC/USD</span>{"  "} 
              <span className="tooltip">
                <FontAwesomeIcon icon={faInfoCircle} /><span  style= {{width:"200px"}} className="tooltiptext">API Symbol: tBTCUSD</span>
              </span>
            </div>

            <div className="box_01">
              <div>
                {" "}
                <span style={{ color: "rgb(73,90,103)" }}>Vol</span>{" "}
                {VOLUME && BTS_to_USD(VOLUME)} USD
              </div>
              <div>
                <span style={{ color: "rgb(73,90,103)" }}>Low</span>{" "}
                {LOW && modify(LOW)}
              </div>
            </div>

            <div style={{ fontSize: 22 }} className="box_02">
              {modify(LAST_PRICE.toFixed(0))}
            </div>

            <div className="box_03">
              <div className="inner_box">
                <span>
                  {Math.abs(DAILY_CHANGE).toFixed(2)}
                  {"  "}
                  {DAILY_CHANGE_PERC < 0 ? down() : up()}(
                  {Math.abs(DAILY_CHANGE_PERC * 100).toFixed(2)}%)
                </span>
              </div>
              <div className="high">
                <span style={{ color: "rgb(73,90,103)" }}>High</span>{" "}
                {HIGH && modify(HIGH)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* reconnect button */}
      <button
        onClick={() => {
          WS({
            props,
          });
        }}
      >
        press to reconnect
      </button>
      {/* close the web socket using button */}
      <button
        onClick={() => {
          closeFun();
        }}
      >
        disconect
      </button>
      {/* showing status connection is open or close */}
      <h2 id="h5">connection status</h2>
    </div>
  );
}

// a fun() for adding commas to number
function modify(number) {
  const givenNumber = number;

  let internationalNumberFormat = new Intl.NumberFormat("en-US");

  return internationalNumberFormat.format(givenNumber);
}

// change  BTS to USD

function BTS_to_USD(number) {
  const givenNumberInBTS = number;

  return modify((givenNumberInBTS * 61233.1).toFixed(0));
}
// send the comming store(being sent by provider) to Ticker component
export default connect((store) => ({ ticker: store.ticker }))(Ticker);
