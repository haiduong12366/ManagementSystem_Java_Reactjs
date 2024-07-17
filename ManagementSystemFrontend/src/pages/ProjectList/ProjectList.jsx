import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

import {  useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "@/Redux/Project/Action";
export const tags = ["react", "nextjs", "spring boot","Python","Java","C++",".net","fulter"];

export const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const { project } = useSelector((store) => store);
  const [tag,setTag] = useState("All");
  const [category,setCategory] = useState("All");
  const dispatch = useDispatch()



  const handleFilterCategory = ( value) => {
    setCategory(value)
    if(value=="All" && tag=="All")
      dispatch(fetchProjects({}))
    else if(value=="All" && tag!="All")
      dispatch(fetchProjects({tags:tag}))
    else if(value!="All" && tag=="All")
      dispatch(fetchProjects({category:value}))
    else
      dispatch(fetchProjects({tags:tag,category:value}))
    // console.log("value", value);
  };

  const handleFilterTag = ( value) => {
    setTag(value)
    if(value=="All" && category=="All")
      dispatch(fetchProjects({}))
    else if(value=="All" && category!="All")
      dispatch(fetchProjects({category:category}))
    else if(value!="All" && category=="All")
      dispatch(fetchProjects({tags:value}))
    else
      dispatch(fetchProjects({tags:value,category:category}))
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value))
  };
  return (
    <>
      <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
        <section className="filterSection">
          <Card className="p-5 sticky top-10">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl -tracking-wide">Filters</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>
            <CardContent className="mt-5">
              <ScrollArea className="space-y-7 h-[70vh]">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b text-left">
                    Category
                  </h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="All"
                      onValueChange={(value) =>
                        handleFilterCategory(value)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="All" id="r2-All" />
                        <Label htmlFor="r1">All</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="frontend" id="r2-frontent" />
                        <Label htmlFor="r2">Frontend</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="backend" id="r2-backend" />
                        <Label htmlFor="r2">Backend</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="fullstack" id="r2-fullstack" />
                        <Label htmlFor="r2">Fullstack</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 border-b ">Tag</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="All"
                      onValueChange={(value) =>
                        handleFilterTag(value)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="All" id="r1-All" />
                        <Label htmlFor="r1">All</Label>
                      </div>
                      {tags.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <RadioGroupItem value={item} id={`r1-${item}`} />
                          <Label htmlFor={`r1-${item}`}>{item}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className="projectListSection w-full lg:w-[48rem]">
          <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="relative p-0 w-full">
              <Input
                onChange={handleSearchChange}
                placeholder="search project"
                className="40% px-9"
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4" />
            </div>
          </div>
          <div>
            <div className="space-y-5 min-h-[74vh]">
              {keyword
                ? project.searchProjects?.map((item) => <ProjectCard item={item} key={item.id} />)
                : project.projects?.map((item) => <ProjectCard key={item.id} item={item}/>)}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
