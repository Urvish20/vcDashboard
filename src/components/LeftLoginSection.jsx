import mobile from "../assets/mobileGirl.svg";
import girl from "../assets/girl.svg";

const LeftLoginSection = () => {
  return (
    <div className="max-w-[837px] w-full bg-[#96DAC5] h-full  rounded-[40px] relative">
      <div className="bg-[#6B599C] w-full max-w-[423px] z-10 h-full rounded-[40px] ">
        <img src={mobile} alt="mobile" className="w-[342px] h-[300px]  pt-5" />
        <div className=" flex justify-center items-center">
          <div className="w-[330px] flex flex-col gap-4  text-center text-white">
            <span className="font-bold text-[27px] mt-10 italic">
              Mets enfin Allah au centre de ta famille
            </span>
            <p>
              Apprends à ton enfant les indispensables de sa religion facilement
              et rapidement, même s'il débute
            </p>
          </div>
        </div>
      </div>
      <img src={girl} alt="girl" className="absolute top-0 right-[15%]" />
    </div>
  );
};

export default LeftLoginSection;
