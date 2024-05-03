import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./index.css";
import { useParams } from "react-router-dom";
import Chart from "../../components/Chart";

function ViewPage() {
  const [detailedInfo, setDetailedInfo] = useState(null);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetailedInfo(data);
        console.log(19, data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="view-wrap">
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="detailed-info-section">
        {detailedInfo && (
          <div className="detailed-info">
            <div className="card-wrap">
              <img
                width={160}
                src={detailedInfo.image?.large}
                alt="crypto-img"
              />
              <h2>{detailedInfo.name}</h2>
              <div
                className="info"
                dangerouslySetInnerHTML={{
                  __html: detailedInfo.description.en.slice(
                    0,
                    detailedInfo.description.en.indexOf(".") + 1
                  ),
                }}
              ></div>
            </div>
            <div className="currency-rate">
              <div>
                <span className="rank">Rank: </span>
                <span className="amount">{detailedInfo.market_cap_rank}</span>
              </div>
              <div>
                <span className="rank">Currency price: </span>
                <span className="amount">
                  ₹ {detailedInfo.market_data?.current_price.inr}
                </span>
              </div>
              <div>
                <span className="rank">Market Cap: </span>
                <span className="amount">
                  ₹ {detailedInfo.market_data?.market_cap.inr}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="chart-wrap">
          <Chart Id={{ id: id }} />
        </div>
      </div>
    </div>
  );
}

export default ViewPage;
