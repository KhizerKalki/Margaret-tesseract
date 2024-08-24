import ChatBot from "../components/ChatBot";
import IncomeTaxCalculator from "../components/IncomeTaxCalculator";

const Chart = () => {
  return (
    <div className="w-full">
      <div className="bg-secondary h-full rounded-3xl w-[97%]">
        <div className="flex gap-5 w-full">
          <div className="bg-secondary h-full rounded-3xl w-[100%]">
            <div className="py-8 px-8 ">
              <div>
                <div className="flex justify-between">
                  <p className="font-semibold text-2xl text-cta">
                    Income Tax Filling
                  </p>
                  <p className="font-semibold text-xl text-cta">May, 22</p>
                </div>
                <span className="flex items-center">
                  <span className="h-[1px] mt-4 flex-1 bg-gray-200"></span>
                  <span className="h-[1px] mt-4 flex-1 bg-gray-200"></span>
                </span>
                <div>
                  <IncomeTaxCalculator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chart;
