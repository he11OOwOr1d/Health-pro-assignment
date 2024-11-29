import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const HomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ageRange: '',
    cycles: 1,
    icsiProcedure: '',
    pgtTesting: '',
    conditions: []
  });

  const handleCalculate = () => {
    const baseRate = 45;
    const successRate = Math.round(baseRate * (1 + (formData.cycles * 0.1)));
    navigate(`/result?rate=${successRate}&cycles=${formData.cycles}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="flex items-center text-gray-400 text-sm mb-4 sm:mb-6 md:mb-8">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="text-white">IVF Success Rate Calculator</span>
        </div>

        <div className="w-full max-w-3xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">

          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl text-white text-center font-light px-2">
              Which age range applies to you?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {['Under 30', 'Between 30 - 34', 'Between 35 - 37', 
                'Between 38 - 40', 'Between 41 - 43', 'Above 43'].map((age) => (
                <button
                  key={age}
                  onClick={() => setFormData({...formData, ageRange: age})}
                  className={`px-4 sm:px-5 md:px-6 py-2.5 rounded-full border text-sm sm:text-base ${
                    formData.ageRange === age 
                    ? 'border-coral-red bg-coral-red/10 text-coral-red' 
                    : 'border-gray-600 text-gray-300 hover:border-coral-red hover:text-coral-red'
                  } transition-colors`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>


          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl text-white text-center font-light px-2">
              Number of IVF Cycles?
            </h2>
            <div className="flex justify-center items-center px-4 w-full">
              <input
                type="range"
                min="1"
                max="4"
                value={formData.cycles}
                onChange={(e) => setFormData({...formData, cycles: e.target.value})}
                className="w-full sm:w-[80%] md:w-96 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-4 text-coral-red text-lg sm:text-xl font-semibold min-w-[2ch]">
                {formData.cycles}
              </span>
            </div>
          </div>


          <div className="space-y-4">
            <h2 className="text-2xl text-white text-center font-light">Have you undergone these procedures before?</h2>
            <div className="flex justify-center gap-12">
              <div className="space-y-2">
                <p className="text-white">ICSI Procedure:</p>
                <div className="flex gap-4">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFormData({...formData, icsiProcedure: option})}
                      className={`px-6 py-2 rounded-full border ${
                        formData.icsiProcedure === option 
                        ? 'border-coral-red bg-coral-red/10 text-coral-red' 
                        : 'border-gray-600 text-gray-300 hover:border-coral-red hover:text-coral-red'
                      } transition-colors`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-white">PGT Testing:</p>
                <div className="flex gap-4">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFormData({...formData, pgtTesting: option})}
                      className={`px-6 py-2 rounded-full border ${
                        formData.pgtTesting === option 
                        ? 'border-coral-red bg-coral-red/10 text-coral-red' 
                        : 'border-gray-600 text-gray-300 hover:border-coral-red hover:text-coral-red'
                      } transition-colors`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>


          <div className="space-y-4">
            <h2 className="text-2xl text-white text-center font-light">Do you have any of these medical conditions?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['PCOS', 'Endometriosis', 'Low Ovarian Reserve', 'Male Factor Infertility'].map((condition) => (
                <button
                  key={condition}
                  onClick={() => {
                    const newConditions = formData.conditions.includes(condition)
                      ? formData.conditions.filter(c => c !== condition)
                      : [...formData.conditions, condition];
                    setFormData({...formData, conditions: newConditions});
                  }}
                  className={`px-6 py-3 rounded-full border ${
                    formData.conditions.includes(condition)
                    ? 'border-coral-red bg-coral-red/10 text-coral-red' 
                    : 'border-gray-600 text-gray-300 hover:border-coral-red hover:text-coral-red'
                  } transition-colors`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleCalculate}
              className="px-8 md:px-12 py-3 bg-coral-red text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 