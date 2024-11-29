import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Calculator = () => {
  const navigate = useNavigate();
  const [ageRange, setAgeRange] = useState("");
  const [cycles, setCycles] = useState(1);
  const [icsiProcedure, setIcsiProcedure] = useState(null);
  const [pgtTesting, setPgtTesting] = useState(null);
  const [medicalConditions, setMedicalConditions] = useState({
    PCOS: false,
    Endometriosis: true,
    LowOvarianReserve: false,
    MaleFactorInfertility: false,
  });

  const handleConditionChange = (condition) => {
    setMedicalConditions((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));
  };

  const calculateSuccessRate = () => {
    let rate = 50;
    if (ageRange === "Under 30") rate += 20;
    if (ageRange === "30 - 34") rate += 10;
    if (ageRange === "35 - 37") rate += 5;
    if (ageRange === "38 - 40") rate -= 10;
    if (ageRange === "41 - 43") rate -= 20;
    if (ageRange === "Above 43") rate -= 30;
    if (icsiProcedure) rate += 5;
    if (pgtTesting) rate += 10;
    if (medicalConditions.PCOS) rate -= 5;
    if (medicalConditions.Endometriosis) rate -= 10;
    if (medicalConditions.LowOvarianReserve) rate -= 15;
    if (medicalConditions.MaleFactorInfertility) rate -= 10;
    rate = Math.max(0, Math.min(100, rate));
    
    navigate(`/result?rate=${rate}&cycles=${cycles}`);
  };

  return (
    <div>
      <Header />
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          IVF Success Rate Calculator
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Which age range applies to you?
          </label>
          <div className="flex flex-col space-y-2">
            {["Under 30", "30 - 34", "35 - 37", "38 - 40", "41 - 43", "Above 43"].map((range) => (
              <label key={range} className="flex items-center">
                <input
                  type="radio"
                  value={range}
                  checked={ageRange === range}
                  onChange={() => setAgeRange(range)}
                  className="mr-2 text-red-500 focus:ring-red-500"
                />
                {range}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Number of IVF Cycles?
          </label>
          <input
            type="range"
            min="1"
            max="4"
            value={cycles}
            onChange={(e) => setCycles(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-600 mt-1">Selected: {cycles}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Have you undergone these procedures before?
          </label>
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-600">ICSI Procedure:</label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={icsiProcedure === true}
                  onChange={() => setIcsiProcedure(true)}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={icsiProcedure === false}
                  onChange={() => setIcsiProcedure(false)}
                  className="mr-2"
                />
                No
              </label>
            </div>
            <div>
              <label className="block text-gray-600">PGT Testing:</label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={pgtTesting === true}
                  onChange={() => setPgtTesting(true)}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={pgtTesting === false}
                  onChange={() => setPgtTesting(false)}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Do you have any of these medical conditions?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(medicalConditions).map((condition) => (
              <label key={condition} className="flex items-center">
                <input
                  type="checkbox"
                  checked={medicalConditions[condition]}
                  onChange={() => handleConditionChange(condition)}
                  className="mr-2"
                />
                {condition}
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={calculateSuccessRate}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Calculator; 