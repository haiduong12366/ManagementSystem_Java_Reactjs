import { Button } from "@/components/ui/button"
import { acceptInvitation } from "@/Redux/Project/Action"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AcceptInvitation = () => {
    const dispatch = useDispatch()
    const {project}  =useSelector(s=>s)
    const navigate = useNavigate()
    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search)
        const token  = queryParams.get("token")
        console.log("token",token)
        dispatch(acceptInvitation({token,navigate}))
    },[])
  return (
    <div className="h-[85vh] flex flex-col justify-center items-center">
        <h1 className="py-5 font-semibold text-xl">You are current in project {project.acceptInvitation?.projectName} by {project.acceptInvitation?.owner}</h1>
        <Button onClick={()=>{navigate(`/project/${project.acceptInvitation?.projectId}`)}}>Go to project {project.acceptInvitation?.projectName}</Button>
    </div>
  )
}

export default AcceptInvitation