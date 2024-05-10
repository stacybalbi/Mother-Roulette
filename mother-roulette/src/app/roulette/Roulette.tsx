'use client'
import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { InputList } from "./page";
import { WheelData } from "react-custom-roulette/dist/components/Wheel/types";


interface RouletteData {
    completeOption: string;
    option: string;
}

interface RouletteProps {
    data: InputList[];
}

const Roulette = ({ data }: RouletteProps) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [rouletteData, setRouletteData] = useState<InputList[] | RouletteData[] | WheelData[]>(data);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data?.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    useEffect(() => {
        const addShortString = data?.map((item) => {
            return {
                completeOption: item.text,
                option:
                    item.text.length >= 30
                        ? item.text.substring(0, 30).trimEnd() + "..."
                        : item.text
            };
        });
        setRouletteData(addShortString);
    }, [data]);

    return (
        <>
            <div className="roulette-container">
                <Wheel
                    mustStartSpinning={mustSpin}
                    spinDuration={0.2}
                    prizeNumber={prizeNumber}
                    //@ts-ignore
                    data={rouletteData}
                    outerBorderColor={"#ccc"}
                    outerBorderWidth={9}
                    innerBorderColor={"#f2f2f2"}
                    radiusLineColor={"tranparent"}
                    radiusLineWidth={1}
                    textColors={["#f5f5f5"]}
                    textDistance={55}
                    fontSize={10}
                    backgroundColors={[
                        "#3f297e",
                        "#175fa9",
                        "#169ed8",
                        "#239b63",
                        "#64b031",
                        "#efe61f",
                        "#f7a416",
                        "#e6471d",
                        "#dc0936",
                        "#e5177b",
                        "#be1180",
                        "#871f7f"
                    ]}
                    onStopSpinning={() => {
                        setMustSpin(false);
                    }}
                />
                <button className="button roulette-button" onClick={handleSpinClick}>
                    Twist
                </button>
            </div>
            <br />
            <button
                className="prize-message"
                onClick={handleSpinClick}
                disabled={mustSpin}
            >
                {!mustSpin ? rouletteData[prizeNumber].completeOption : "Spinning..."}
            </button>
        </>
    );
};

export default Roulette;
