import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getUserSubscription, upgradeSubsciption } from '@/Redux/Subscription/Action'
import { CheckCircleIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpgradeSuccess = () => {
    const navigate = useNavigate()
    const {subscription}=useSelector(s=>s)
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search)

    //const paymentId = queryParams.get("id")
    const planType = queryParams.get("planType")

    useEffect(()=>{
        dispatch(upgradeSubsciption({planType}))
        dispatch(getUserSubscription())
    },[])


  return (
    <div className='flex justify-center'>
        <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
            <div className='flex items-center gap-4'>
                <CheckCircleIcon className='h-9 w-9 text-green-500'/>
                <p className='text-xl'>Plan Upgrade Successfully</p>
            </div>

            <div className='space-y-3'>
                <p className='text-green-500'>Start date: {subscription.userSubscription?.subscriptionStartDate}</p>
                <p className='text-red-500'>End date: {subscription.userSubscription?.getSubscriptionEndDate}</p>
                <p className='text-green-500'>Plan Type: {subscription.userSubscription?.planType}</p>

            </div>
            <Button onClick={()=>navigate("/")}>Go to home</Button>
        </Card>
        
    </div>
  )
}

export default UpgradeSuccess