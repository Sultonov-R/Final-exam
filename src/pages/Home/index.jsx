import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import { Pagination, Stack } from "@mui/material";
import Card from "../../components/Card";
import "./index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useCurrency } from "../../context/CurrencyContext.jsx";
import { TailSpin } from "react-loader-spinner";

const Home = (props) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [text, setText] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [currence, setCurrence] = useState("USD");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const navigate = useNavigate();
  const { currency } = useCurrency();

  async function getData(currentPage, currency) {
    setLoading(true);
    try {
      const resp = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${currentPage}&sparkline=false&price_change_percentage=24h`
      );
      const data = await resp.json();
      setData(data);
      console.log(data);
      const totalCount = resp.headers.get("Total");
      const pages = Math.ceil(totalCount / 10);
      setTotalPages(pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let crn = JSON.parse(localStorage.getItem("currency"));
    if (crn) {
      setCurrence(crn);
    }
  }, []);
  console.log(41, currency);

  useEffect(() => {
    getData(currentPage, currency);
  }, [currentPage, currency]);

  function handleChange(newPage) {
    e.defaultValue()
    setCurrentPage(newPage);
  }

  function handleChangeInput(e) {
    const inputValue = e.target.value.toLowerCase();
    setText(inputValue);
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(inputValue);
    });
    setFilterData(filteredData);
  }

  function handleClick(el) {
    const storedData = JSON.parse(localStorage.getItem("locals")) || [];
    const isItemExists = storedData.some((item) => item.id === el.id);
    navigate(`/viewpage/${el.id}`);
    if (!isItemExists) {
      storedData.push(el);
      localStorage.setItem("locals", JSON.stringify(storedData));
    }
  }

  return (
    <div className="overlay home-wrapper">
      {loading ? (
        <div className="loader-wrapper">
          <TailSpin
            visible={true}
            height="150"
            width="150"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="2"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div>
          <div className="container">
            <Navbar />
          </div>
          <div className="img-carusel">
            <div className="container">
              <div className="carusel-text">
                <h1>CRYPTOFOLIO WATCH LIST</h1>
                <p>Get all the Info regarding your favorite Crypto Currency</p>
              </div>
              <div className="swiper-wrap">
                <Swiper
                  slidesPerView={4}
                  loop={true}
                  slideToClickedSlide={true}
                  spaceBetween={30}
                  // centeredSlides={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {data.map((el, index) => {
                    return (
                      <SwiperSlide key={index} className="swiperSlide">
                        <Card
                          name={el.name}
                          price={el.current_price}
                          image={el.image}
                          symbol={el.symbol}
                          amount={el.price_change_percentage_24h.toFixed(2)}
                          id={el.id}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="hero-section container">
            <div className="title">
              <h3>Cryptocurrency Prices by Market Cap</h3>
              <input
                type="text"
                value={text}
                ref={inputRef}
                onChange={(e) => handleChangeInput(e)}
                placeholder="Search For a Crypto Currency.."
              />
              {text && (
                <div className="table-group-divider container searched">
                  {filterData.map((crypto, index) => {
                    const storedData =
                      JSON.parse(localStorage.getItem("locals")) || [];
                    const local = storedData.some(
                      (item) => item.id === crypto.id
                    );
                    return (
                      <tr onClick={() => handleClick(crypto)} key={index}>
                        <th scope="row">
                          <img width={50} src={crypto.image} alt="crypto" />
                          <div>
                            <h4>{crypto.symbol}</h4>
                            <p>{crypto.name}</p>
                          </div>
                        </th>
                        <td>₹ {crypto.current_price}</td>
                        <td>
                          <FaEye style={{ color: local ? "white" : "green" }} />
                          <span>
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </td>
                        <td>₹ {crypto.market_cap}</td>
                      </tr>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="table-info">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Coin</th>
                    <th scope="col">Price</th>
                    <th scope="col">24th change</th>
                    <th scope="col">Market Cap</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {data &&
                    data.map((el, index) => {
                      const storedData =
                        JSON.parse(localStorage.getItem("locals")) || [];
                      const local = storedData.some(
                        (item) => item.id === el.id
                      );
                      return (
                        <tr onClick={() => handleClick(el)} key={index}>
                          <th scope="row">
                            <img width={50} src={el.image} alt="crypto" />
                            <div>
                              <h4>{el.symbol}</h4>
                              <p>{el.name}</p>
                            </div>
                          </th>
                          <td>₹ {el.current_price}</td>
                          <td>
                            <FaEye
                              style={{ color: local ? "white" : "green" }}
                            />
                            <span>
                              {el.price_change_percentage_24h.toFixed(2)}%
                            </span>
                          </td>
                          <td>₹ {el.market_cap}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <Stack spacing={2}>
                <Pagination
                  onChange={(event, page) => handleChange(page)}
                  className="pagination"
                  count={10}
                />
              </Stack>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
