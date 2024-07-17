import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon } from "@radix-ui/react-icons"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import InviteUserForm from "./InviteUserForm"
import ChatBox from "./ChatBox"
import IssueList from "./IssueList"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { fetchProjectById } from "@/Redux/Project/Action"
import UpdateProjectForm from "./UpdateProjectForm"

const ProductDetails = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {project,auth} = useSelector(store=>store)
    const handleProjectInvitation = () => {

    }
    useEffect(()=>{
        dispatch(fetchProjectById(id))
    },[id])
    return (
        <>
            <div className="mt-5 lg:px-10 h-auto">
                <div className="gap-5 lg:flex justify-between pb-4">
                    <ScrollArea className="text-gray-400 pb-10 w-full">
                        <div className="flex justify-between">
                            <h1 className="text-lg font-semibold pb-5">{project.projectDetails?.name}</h1>
                            {project.projectDetails?.owner.id ==auth.user.id &&
                                <Dialog>
                                        <DialogTrigger>
                                            <DialogClose>
                                                <Button size="sm" variant="outline" className="ml-2 bg-white" onClick={handleProjectInvitation}>
                                                    <span className="text-black font-semibold">Update</span>
                                                </Button>
                                            </DialogClose>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>Update project</DialogHeader>
                                            <UpdateProjectForm />
                                        </DialogContent>
                                    </Dialog>
                            }
                        </div>
                        
                        <div className="space-y-5 pb-10 text-sm">
                            <p className="w-full md:max-w-lg lg:max-w-xl ">{project.projectDetails?.description}</p>
                            <div className="flex">
                                <p className="w-36">Project lead: </p>
                                <p>{project.projectDetails?.owner.fullName}</p>
                            </div>
                            <div className="flex">
                                <p className="w-36">Members: </p>
                                <div className="flex items-center gap-2">
                                    {project.projectDetails?.team.map((item) => <Avatar className="cursor-pointer" key={item.id}>
                                        <AvatarImage src="https://github.com/shadcn.png" />

                                        <AvatarFallback>D</AvatarFallback>
                                    </Avatar>)}
                                </div>
                                <Dialog>
                                    <DialogTrigger>
                                        <DialogClose>
                                            <Button size="sm" variant="outline" className="ml-2" onClick={handleProjectInvitation}>
                                                <span>Invite</span>
                                                <PlusIcon className="w-3 h-3" />
                                            </Button>
                                        </DialogClose>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>Invite User</DialogHeader>
                                        <InviteUserForm />
                                    </DialogContent>
                                </Dialog>

                            </div>
                            <div className="flex">
                                <p className="w-36">Category: </p>
                                <p>{project.projectDetails?.category}</p>
                            </div>
                            <div className="flex">
                                <p className="w-36">Tags: </p>
                                {project.projectDetails?.tags.map((m)=><Badge className={"mr-2 bg-red-300"} key={m}>{m}</Badge>)}
                            </div>
                            <section>
                                <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
                                <div className="lg:flex md:flex gap-3 justify-between py-5">
                                    <IssueList status={"pending"} title={"Todo list"}/>
                                    <IssueList status={"in_progress"} title={"In progress"}/>
                                    <IssueList status={"done"} title={"Done"}/>
                                </div>
                            </section>
                        </div>
                    </ScrollArea>
                    <div className="lg:w-[40%] rounded-md sticky right-5 top-10">
                        <ChatBox/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails