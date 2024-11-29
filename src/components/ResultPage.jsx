import { useSearchParams, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import Header from "./Header";

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const successRate = Number(searchParams.get('rate'));
  const cycles = Number(searchParams.get('cycles'));

  const data = {
    labels: ["Success", "Remaining"],
    datasets: [
      {
        data: [successRate, 100 - successRate],
        backgroundColor: ["#50C878", "#2A2A2A"],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-4 min-h-[calc(100vh-80px)] flex flex-col">
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>IVF Success Rate Calculator</span>
          <span className="mx-2">/</span>
          <span className="text-white">Result</span>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between flex-grow gap-8 lg:gap-0">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="w-4 h-4 rounded-full bg-coral-red mr-3"></div>
              <h1 className="text-2xl md:text-4xl text-white font-light">
                Your estimated IVF Success Rate is
              </h1>
            </div>

            <div className="mt-8">
              <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-4 md:space-y-0 md:space-x-16">
                <div className="relative w-48 md:w-56 h-48 md:h-56">
                  <Pie data={data} options={options} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-bold text-white">{successRate}%</span>
                  </div>
                </div>
                
                <div className="text-white">
                  <p className="text-lg">With {cycles} IVF Cycle{cycles > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-lg"></div>
            <img
              src="https://s3-alpha-sig.figma.com/img/3083/cfdf/a3342bdeb14d22fce3f84a7131648fe0?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m3rcPSzyYXFQ3av1UzjVwX~ywz9ut1Jmpzmx6Z~RWwUd~~r9UxNnyNl4R9JldCD4zDCW7Q2IeQvOvnDs6u4pyH3CTfoUnO5v492UL1iuyJt3I3zHG387QUApgjGytHwEVS51em2fW5HQXigaiOLgI6ldEf-XgFWD-AZPB6squ7fJ1sPU5SEgs04SJJgSlkJzl1Ka-Ed1OsDBqFXjBxAf7zZ~60XEh1fn~sDWw58OaB~z-10gRcakHkeVapNSDVELmye3t0JjF7zlsu5d9JV7LvBxi6ry6D-l1bYi0r8uWHVFccwd~tuvdXccvuZZNeoqnR6oiSRnQkxLHAzIzIkmVQ__"
              alt="Happy Couple"
              className="w-full h-auto rounded-lg object-cover relative z-10"
              style={{
                filter: 'grayscale(100%) brightness(90%) contrast(110%)',
                mixBlendMode: 'luminosity'
              }}
            />
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-2 bg-coral-red text-white rounded hover:bg-red-600 transition-colors self-center lg:self-start"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
