import { useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [cost, setCost] = useState(1);
    const [dollar, setDollar] = useState(0);
    const [coinName, setCoinName] = useState("");

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => setCoins(json));
        setLoading(false);
    }, []);

    const onChange = (event) => {
        setDollar(event.target.value);
    };

    const optionChange = (e) => {
        let coin = e.target.value;
        setCost(coin.split(",")[0]);
        setCoinName(coin.split(",")[1]);
    };

    return (
        <div>
            <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <select onChange={optionChange}>
                    <option key="-1">select coin</option>
                    {coins.map((coin) => (
                        <option
                            key={coin.id}
                            value={[coin.quotes.USD.price, coin.id]}
                        >
                            {coin.name} ({coin.symbol} : $
                            {coin.quotes.USD.price})
                        </option>
                    ))}
                </select>
            )}
            <br />
            <hr />
            <label htmlFor="dollar">How much do you have? : $ </label>
            <input
                id="dollar"
                type="number"
                value={dollar}
                onChange={onChange}
                placeholder="how much do you have?"
            ></input>
            <br />
            <hr />
            <h3>
                {cost > 0 && dollar !== 0
                    ? "You can buy " + (dollar / cost + " EA of " + coinName)
                    : null}
            </h3>
        </div>
    );
}

export default App;
