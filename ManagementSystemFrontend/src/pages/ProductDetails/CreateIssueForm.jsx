import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createIssue } from "@/Redux/Issue/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const CreateIssueForm = ({status}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const formDataProject = useForm({
    defaultValues: {
      issueName: "",
      description: "",
      
    },
  });

  const onSubmit = (data) => {
    data.projectId = id
    dispatch(
      createIssue({
        title: data.issueName,
        description: data.description,
        projectId: id,
        status
      })
    );
    console.log("create issue data", data);
  };
  return (
    <div>
      <Form {...formDataProject}>
        <form
          className="space-y-3"
          onSubmit={formDataProject.handleSubmit(onSubmit)}
        >
          <FormField
            control={formDataProject.control}
            name="issueName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Issue Name ..."
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formDataProject.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Description ..."
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full mt-5">
              Create Issue
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateIssueForm;
