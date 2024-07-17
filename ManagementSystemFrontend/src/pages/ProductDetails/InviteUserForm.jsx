import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { inviteToProject } from "@/Redux/Project/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const InviteUserForm = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const formDataProject = useForm({
        defaultValues: {
            email: "",
        }
    })


    const onSubmit = (data) => {
        dispatch(inviteToProject({email:data.email,projectId:id}))
        console.log("create project data", data)
    }
    return (
        <div>
            <Form {...formDataProject}>
                <form className="space-y-3" onSubmit={formDataProject.handleSubmit(onSubmit)}>
                    <FormField control={formDataProject.control}
                        name="email" render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input className="border w-full border-gray-700 py-5 px-5" placeholder="User email ..." {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    />


                    <DialogClose>
                        <Button type="submit" className="w-full mt-5">Invite User</Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}

export default InviteUserForm