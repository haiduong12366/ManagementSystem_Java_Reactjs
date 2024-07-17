import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { createComment } from "@/Redux/Comment/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const CreateCommentForm = ({ issueId }) => {
  const dispatch = useDispatch();

  const formDataProject = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(createComment({ content: data.content, issueId }));
    formDataProject.setValue('content','')
    console.log("create project data", data);
  };
  return (
    <div>
      <Form {...formDataProject}>
        <form
          className="flex gap-2"
          onSubmit={formDataProject.handleSubmit(onSubmit)}
        >
          <FormField
            control={formDataProject.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <div>
                    <Avatar>
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                  </div>
                  <FormControl>
                    <Input
                      className="w-[20rem]"
                      placeholder="add comment here ......."
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCommentForm;
