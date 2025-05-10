import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BookUser, Briefcase, Github, ImageIcon, Linkedin, Mail, PhoneCall, Save, Text, User } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  title: z.string().min(1).max(50),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  // imageUrl: z.string().url("Invalid URL, ensure it includes http(s)://").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL, ensure it includes http(s)://").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL, ensure it includes http(s)://").optional().or(z.literal("")),
  bio: z.string().max(500, "Bio should not exceed 500 characters").optional(),
});
type Profile = z.infer<typeof profileSchema>;

const skillSchema = z.object({
  skillName: z.string().min(2, "Skill name cannot empty").max(50),
});
type Skill = z.infer<typeof skillSchema>;

const projectSchema = z.object({
  id: z.string().uuid(),
  projectTitle: z.string().min(1, "Project title is required"),
  projectDescription: z.string().min(1, "Project description is required"),
  projectImageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  technologiesUsed: z.string().min(1, "Technologies used are required"),
  liveUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  gitUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});
type Project = z.infer<typeof projectSchema>;

const experienceSchema = z.object({
  id: z.string().uuid(),
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});
type Experience = z.infer<typeof experienceSchema>;

const UserInput = () => {

  const profileForm = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      title: "",
      email: "",
      // imageUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      bio: "",
    },
  });

  const [skillList, setskillList] = useState<Skill[]>([]);
  const skillForm = useForm<Skill>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skillName: "",
    },
  });

  const [projectList, setProjectList] = useState<Project[]>([]);
  const projectForm = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      projectTitle: "",
      projectDescription: "",
      projectImageUrl: "",
      technologiesUsed: "",
      liveUrl: "",
      gitUrl: "",
    },
  });

  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const experienceForm = useForm<Experience>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  function onProfileSubmit(values: Profile) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <div className="space-y-8 -mt-4 p-10">
        {/* profile section input */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <BookUser className="mr-3 h-7 w-7 text-primary" /> Personal Profile
            </CardTitle>
            <CardDescription>Tell us about yourself.</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4" />Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Briefcase className="mr-2 h-4 w-4" />Title/Headline</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Software Engineer | Web Developer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4" />Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="e.g., jane.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <FormField
                    control={profileForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><ImageIcon className="mr-2 h-4 w-4" />Profile Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., https://example.com/your-image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={profileForm.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Linkedin className="mr-2 h-4 w-4" />LinkedIn URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., https://linkedin.com/in/janedoe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Github className="mr-2 h-4 w-4" />GitHub URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., https://github.com/janedoe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={profileForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center"><Text className="mr-2 h-4 w-4" />Short Bio (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A brief introduction about yourself..." className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormDescription>Max 500 characters.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full md:w-auto">
                  <Save className="mr-2 h-4 w-4" /> Save Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* skill section input */}
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        {/* project section input */}
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        {/* experience section input */}
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserInput;
