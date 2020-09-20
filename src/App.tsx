import React, { useState } from 'react'; 
import './App.css';
import MyGoogleMapComponent from './components/map';
import SliderInput from './components/sliderInput';

import { useAsync } from "react-async-hook";
import useConstant from "use-constant";
import AwesomeDebouncePromise from "awesome-debounce-promise";
 
export type DriversType = {
  driver_id: string,
  location: {
    latitude: number,
    longitude: number,
    bearing: number
  }
}

export interface TaxiData {
  pickup_eta: number;
  drivers: DriversType[];
}


const API = "https://qa-interview-test.qa.splytech.io/api/drivers?latitude=51.5049375&longitude=-0.0964509&count="

const App = () => {

  const [taxiData, setTaxiData] = useState<TaxiData | any>([]);
  
  //API Call
  const fetchTaxies = async(taxiAmount: number) => { 
    const data = await fetch(API+taxiAmount).then(res => res.json()) 
    return setTaxiData(data)
  }

  const useDebouncedSearch = (amount: any) => {
    const [taxiAmount, setTaxiAmount] = useState(0);
 
	  // 2000 milliseconds, 2 secs
		const debouncedSearchFunction = useConstant(() =>
			AwesomeDebouncePromise(fetchTaxies, 2000)
		);

		// The async callback is run each time the slider changes,
		// but as the search function is debounced, it does not fire a new request on each slide
		const taxisResults = useAsync(async () => {
			if (taxiAmount === 0) {
				return [];
			} else {
				return debouncedSearchFunction(taxiAmount);
			}
		}, [debouncedSearchFunction, taxiAmount]);

 		return {
			taxiAmount,
			setTaxiAmount,
			taxisResults,
		};
	};
 
  const handleChange = (event: HTMLElement, newValue: number) => {
    setTaxiAmount(newValue);
  };
  
  const useSearchThroughArr = () => useDebouncedSearch((amount: number) => setTaxiAmount(amount));

	const { taxiAmount, setTaxiAmount } = useSearchThroughArr();


  return (
    <div className="App">
      
        <div className="slider">   
          <p>Use the slider to display the amount of taxis</p>
            <SliderInput taxiAmount={taxiAmount > 1 ? taxiAmount : 1} handleChange={handleChange} />
          <p>{taxiData.pickup_eta ? `🚖 Estimated pickup ${taxiData.pickup_eta} min`: null}</p>
        </div>
        
        <MyGoogleMapComponent taxis={taxiData} />
       
    </div>
  );
};

export default App;
