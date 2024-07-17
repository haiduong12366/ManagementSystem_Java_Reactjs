import { useDispatch, useSelector } from "react-redux";
import SubscriptionCard from "./SubscriptionCard";
import { getUserSubscription } from "@/Redux/Subscription/Action";
import { useEffect } from "react";

const Subscription = () => {
  const {subscription}=useSelector(s=>s)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUserSubscription())
  },[])

  const paidPlan = [
    "Add unlimited projects",
    "Access to live chat",
    "Add unlimited team members",
    "Advanced Reporting",
    "Priority Support",
    "Customization Options",
    "Integration Support",
    "Advanced Security",
    "Training and Resources",
    "Access Control",
    "Custom Workflows",
  ];
  const annualPlan = [
    "Add unlimited projects",
    "Access to live chat",
    "Add unlimited team members",
    "Advanced Reporting",
    "Priority Support",
    "Everything which monthly plan has",
  ];

  const freePlan = [
    "Add only 3 projects",
    "Basic Task Management",
    "Project Collaboration",
    "Basic Reporting",
    "Email Notifications",
    "Basic Access Control",
  ];

  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard
          data={{
            planName: "Free",
            features: freePlan,
            planType: "FREE",
            price: "0$" ,
            buttonName: subscription.userSubscription?.planType =="FREE" ? "Current Plan" : "Get started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Monthly Paid Plan",
            features: paidPlan,
            planType: "MONTHLY",
            price: "99$",
            buttonName: subscription.userSubscription?.planType =="MONTHLY" ? "Current Plan" : "Get started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Annual Paid Plan",
            features: annualPlan,
            planType: "ANNUALLY",
            price: "831$",
            buttonName: subscription.userSubscription?.planType =="ANNUALLY" ? "Current Plan" : "Get started",
          }}
        />
      </div>
    </div>
  );
};

export default Subscription;
