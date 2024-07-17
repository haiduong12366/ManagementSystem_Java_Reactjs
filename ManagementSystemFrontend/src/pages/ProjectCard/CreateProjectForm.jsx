/* eslint-disable no-constant-condition */
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { tags } from "../ProjectList/ProjectList"
import { Cross1Icon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"
import { createProject } from "@/Redux/Project/Action"

const CreateProjectForm = () => {
    const dispatch=useDispatch()
    const formDataProject = useForm({
        defaultValues: {
            name: "",
            description: "",
            category: "fullstack",
            tags: ["nextjs", "react"]
        }
    })

    const handleTagsChange = (newValue) => {
        const currentTags = formDataProject.getValues("tags");
        const updatedTags = currentTags.includes(newValue)?
        currentTags.filter(tag=>tag!==newValue):[...currentTags,newValue];
        formDataProject.setValue("tags",updatedTags)
    }

    const onSubmit = (data) => {
        dispatch(createProject(data))
        console.log("create project data", data)
    }
    return (
        <div>
            <Form {...formDataProject}>
                <form className="space-y-3" onSubmit={formDataProject.handleSubmit(onSubmit)}>
                    <FormField control={formDataProject.control}
                        name="name" render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input className="border w-full border-gray-700 py-5 px-5" placeholder="project name ..." {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    />
                    <FormField control={formDataProject.control}
                        name="description" render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Input className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="project description ..." {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        }
                    />
                    <FormField control={formDataProject.control}
                        name="category" render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Select
                                        defaultValue="fullstack"
                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Category"></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fullstack">Fullstack</SelectItem>
                                            <SelectItem value="frontend">Frontend</SelectItem>
                                            <SelectItem value="backend">Backend</SelectItem>

                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        }
                    />
                    <FormField control={formDataProject.control}
                        name="tags" render={({ field }) =>
                            <FormItem>
                                <FormControl>
                                    <Select
    
                                        onValueChange={(value) => {
                                            handleTagsChange(value)
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Tags"></SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tags.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <div className="flex gap-1 flex-wrap">
                                    {field.value.map((item)=> <div key={item} onClick={()=>handleTagsChange(item)}
                                    className="cursor-pointer items-center border gap-2 
                                    py-1 px-4 rounded-full flex">
                                        <span className="text-sm">{item}</span>
                                        <Cross1Icon className="h-3 w-3"/>
                                    </div>)}
                                    
                                </div>
                                <FormMessage />

                            </FormItem>
                        }
                    />
                    <DialogClose>
                        {false ? <div><p>you can create only 3 project with free plan, please update your plan</p></div> :
                            <Button type="submit" className="w-full mt-5">Create Project</Button>}
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}

export default CreateProjectForm