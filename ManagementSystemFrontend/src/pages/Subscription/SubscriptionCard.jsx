/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import Api from "@/config/api";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const SubscriptionCard = ({ data }) => {

  const handleUpgrade = async () => {
    const { api } = Api(localStorage.getItem("jwt"));
    const planType = data.planType;
    const price = data.price.substring(0,data.price.length-1)
    try {
      const { data } = await api.post(
        `/api/payments/createVnpayPayment/${planType}`,price);
      window.location.href = data;
    } catch (error) {
      console.log(error);
      // toast.error(error)
    }
  };
  return (
    <div
      className="rounded-xl bg-[#1b1b1b] bg-opacity-20 
    shadow-[#14137b] shadow-2xl card p-5 space-y-5 w-[18rem]"
    >
      <p>{data.planName}</p>
      <p>
        <span className="text-xl font-semibold">{data.price}/</span>
        <span>{data.planType}</span>
      </p>
      {data.planType == "ANNUALLY" && <p className="text-green-500">30% off</p>}
      <Button type="button" onClick={handleUpgrade} className="w-full" disabled={data.planType=="FREE" || data.buttonName=="Current Plan"}>
        {data.buttonName}
      </Button>
      <div>
        {data.features.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircledIcon />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;
