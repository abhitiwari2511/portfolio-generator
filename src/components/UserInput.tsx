import {
  Card,
  CardContent,
  CardDescription,
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
import {
  User,
  BookUser,
  Save,
  Briefcase,
  Text,
  Cpu,
  PlusCircle,
  X,
  ImageIcon,
  FolderKanban,
  Layers,
  GitBranch,
  Globe,
  BriefcaseBusiness,
  Building,
  CalendarDays,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  role: z.string().min(1).max(50),
  // imageUrl: z.string().url("Invalid URL, ensure it includes http(s)://").optional().or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("Invalid URL, ensure it includes http(s)://")
    .or(z.literal("")),
  githubUrl: z
    .string()
    .url("Invalid URL, ensure it includes http(s)://")
    .or(z.literal("")),
  twitterUrl: z
    .string()
    .url("Invalid URL, ensure it includes http(s)://")
    .or(z.literal("")),
  bio: z.string().max(500, "Bio should not exceed 500 characters"),
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
  projectImageUrl: z.string().url("Invalid URL").or(z.literal("")),
  technologiesUsed: z.string().min(1, "Technologies used are required"),
  liveUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  gitUrl: z.string().url("Invalid URL").or(z.literal("")),
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
  const navigate = useNavigate();
  const { portfolioConfig, updatePortfolioConfig } = usePortfolio();

  const profileForm = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      role: "",
      twitterUrl: "",
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

  // saare data ko load krna initial reload pe
  useEffect(() => {
    try {
      // load data
      const savedProfile = localStorage.getItem("profile");
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        // set data in form
        Object.entries(profileData).forEach(([key, value]) => {
          if (value && profileForm.getValues(key as keyof Profile) === "") {
            profileForm.setValue(key as keyof Profile, value as string);
          }
        });
      }

      // ek ek krke sb data load krna
      const savedSkills = localStorage.getItem("portfolio_skills");
      if (savedSkills) {
        setskillList(JSON.parse(savedSkills));
      }

      const savedProjects = localStorage.getItem("portfolio_projects");
      if (savedProjects) {
        setProjectList(JSON.parse(savedProjects));
      }

      const savedExperience = localStorage.getItem("portfolio_experience");
      if (savedExperience) {
        setExperienceList(JSON.parse(savedExperience));
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  }, []);

  const onProfileSubmit = (values: Profile) => {
    const socials = [
      {
        platform: "LinkedIn",
        url: values.linkedinUrl || "",
      },
      {
        platform: "GitHub",
        url: values.githubUrl || "",
      },
      {
        platform: "Twitter",
        url: values.twitterUrl || "",
      },
    ].filter((social) => social.url !== "");

    // context update values se
    updatePortfolioConfig({
      personal: {
        ...portfolioConfig.personal,
        name: values.name,
        role: values.role,
        description: values.bio || "",
        socials: socials,
      },
    });
    localStorage.setItem("profile", JSON.stringify(values));

    // reset after save
    profileForm.reset();
  };

  const onAddSkill = (values: Skill) => {
    const updatedSkillList = [...skillList, values];
    setskillList(updatedSkillList);

    // local me save
    localStorage.setItem("portfolio_skills", JSON.stringify(updatedSkillList));
    skillForm.reset();
  };

  const onRemoveSkill = (values: Skill) => {
    // skill ko remove krna filter krke
    const updatedSkillList = skillList.filter((skill) => skill !== values);

    setskillList(updatedSkillList);

    localStorage.setItem("portfolio_skills", JSON.stringify(updatedSkillList));
  };

  const saveSkillsList = () => {
    if (skillList.length === 0) {
      console.warn("No skills to save.");
      return;
    }
    localStorage.setItem("portfolio_skills", JSON.stringify(skillList));
    updatePortfolioConfig({
      skills: skillList.map((skill: Skill) => ({ name: skill.skillName })),
    });
  };
  const generateId = () => Math.random().toString(36).substring(2, 9);
  const onAddProject = (values: Project) => {
    const newProject = { ...values, id: generateId() };
    const updatedProjectList = [...projectList, newProject];
    setProjectList(updatedProjectList);

    // save in localStorage
    localStorage.setItem(
      "portfolio_projects",
      JSON.stringify(updatedProjectList)
    );
    projectForm.reset();
  };

  const onRemoveProject = (id: string) => {
    const updatedProjectList = projectList.filter(
      (project) => project.id !== id
    );

    setProjectList(updatedProjectList);

    localStorage.setItem(
      "portfolio_projects",
      JSON.stringify(updatedProjectList)
    );
  };

  const saveProjectsList = () => {
    if (projectList.length === 0) {
      console.warn("No projects to save.");
      return;
    }

    // Save to localStorage
    localStorage.setItem("portfolio_projects", JSON.stringify(projectList));

    // Update context directly data leke
    updatePortfolioConfig({
      projects: projectList.map((project: Project) => ({
        title: project.projectTitle,
        description: project.projectDescription,
        image: project.projectImageUrl || "",
        tags: project.technologiesUsed
          .split(",")
          .map((tag: string) => tag.trim()),
        url: project.liveUrl || "",
        github: project.gitUrl,
      })),
    });
  };

  const onAddExperience = (values: Experience) => {
    // create unique id for each experience
    const newExperience = { ...values, id: generateId() };

    const updatedExperienceList = [...experienceList, newExperience];
    setExperienceList(updatedExperienceList);

    localStorage.setItem(
      "portfolio_experience",
      JSON.stringify(updatedExperienceList)
    );

    // reset form
    experienceForm.reset();
  };

  const onRemoveExperience = (id: string) => {
    // experience ko filter krke update krna state aur fir local me save
    const updatedExperienceList = experienceList.filter((exp) => exp.id !== id);

    setExperienceList(updatedExperienceList);

    localStorage.setItem(
      "portfolio_experience",
      JSON.stringify(updatedExperienceList)
    );
  };

  const saveExperienceList = () => {
    if (experienceList.length === 0) {
      console.warn("No experience to save.");
      return;
    }
    localStorage.setItem(
      "portfolio_experience",
      JSON.stringify(experienceList)
    );

    // context update
    updatePortfolioConfig({
      experience: experienceList.map((exp) => ({
        company: exp.company,
        role: exp.position,
        startDate: exp.startDate,
        endDate: exp.endDate || "Present",
        responsibilities: exp.description.split(",").map((item) => item.trim()),
      })),
    });
    
  };

  const handleSubmit = () => {
    try {
      // data ko get krna hai local storage se
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      const skills = JSON.parse(
        localStorage.getItem("portfolio_skills") || "[]"
      );
      const projects = JSON.parse(
        localStorage.getItem("portfolio_projects") || "[]"
      );
      const experience = JSON.parse(
        localStorage.getItem("portfolio_experience") || "[]"
      );

      const socials = [
        {
          platform: "GitHub",
          url: profile.githubUrl || "",
        },
        {
          platform: "LinkedIn",
          url: profile.linkedinUrl || "",
        },
        {
          platform: "Twitter",
          url: profile.twitterUrl || "",
        },
      ].filter((social) => social.url !== "");

      // connfig bnana
      const completeConfig = {
        personal: {
          name: profile.name || "",
          role: profile.role || "",
          description: profile.bio || "",
          socials: socials,
        },
        skills: skills.map((skill: Skill) => ({ name: skill.skillName })),
        projects: projects.map((project: Project) => ({
          title: project.projectTitle,
          description: project.projectDescription,
          image: project.projectImageUrl || "",
          tags: project.technologiesUsed
            ? project.technologiesUsed
                .split(",")
                .map((tag: string) => tag.trim())
            : [],
          url: project.liveUrl || "",
          github: project.gitUrl,
        })),
        experience: experience.map((exp: Experience) => ({
          company: exp.company,
          role: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate || "Present",
          responsibilities: exp.description
            ? exp.description.split(",").map((item) => item.trim())
            : [],
        })),
      };
      updatePortfolioConfig(completeConfig);

      // Navigate to the portfolio page after saving and getting data
      setTimeout(() => {
        navigate("/portfolio");
        window.scrollTo(0, 0);
      }, 500);
    } catch (error) {
      console.error("Error submitting portfolio data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-2 md:px-8 md:py-10 max-w-3xl mx-auto">
      <div className="space-y-8 -mt-4 p-10">
        {/* profile section input */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <BookUser className="mr-3 h-7 w-7 text-primary" /> Personal
              Profile
            </CardTitle>
            <CardDescription>Tell us about yourself.</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Briefcase className="mr-2 h-4 w-4" />
                          Title/Headline
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Software Engineer | Web Developer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={profileForm.control}
                    name="twitterUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <FaXTwitter className="mr-2 h-4 w-4" />
                          Twitter URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="e.g., https://twitter.com/janedoe"
                            {...field}
                          />
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
                        <FormLabel className="flex items-center"><ImageIcon className="mr-2 h-4 w-4" />Profile Image URL (Opnal)</FormLabel>
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
                        <FormLabel className="flex items-center">
                          <FaLinkedin className="mr-2 h-4 w-4" />
                          LinkedIn URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., https://linkedin.com/in/janedoe"
                            {...field}
                          />
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
                        <FormLabel className="flex items-center">
                          <FaGithub className="mr-2 h-4 w-4" />
                          GitHub URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., https://github.com/janedoe"
                            {...field}
                          />
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
                      <FormLabel className="flex items-center">
                        <Text className="mr-2 h-4 w-4" />
                        Short Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief introduction about yourself..."
                          className="min-h-[100px]"
                          {...field}
                        />
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
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Cpu className="mr-3 h-7 w-7 text-primary" /> Skills
            </CardTitle>
            <CardDescription>
              Add your technical and soft skills one by one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...skillForm}>
              <form
                onSubmit={skillForm.handleSubmit(onAddSkill)}
                className="flex items-start gap-4 mb-4"
              >
                <FormField
                  control={skillForm.control}
                  name="skillName"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel className="sr-only">Skill Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., JavaScript" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="outline">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                </Button>
              </form>
            </Form>
            {skillList.length > 0 && (
              <div className="mb-6 space-y-2">
                <h4 className="font-medium">Your Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {skillList.map(({ skillName }, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm py-1 px-3"
                    >
                      {skillName}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-4 w-4 p-0"
                        onClick={() => onRemoveSkill(skillList[index])}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <Button
              onClick={saveSkillsList}
              className="w-full md:w-auto"
              disabled={skillList.length === 0}
            >
              <Save className="mr-2 h-4 w-4" /> Save All Skills
            </Button>
          </CardContent>
        </Card>

        {/* project section input */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FolderKanban className="mr-3 h-7 w-7 text-primary" /> Projects
            </CardTitle>
            <CardDescription>Add your significant projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...projectForm}>
              <form
                onSubmit={projectForm.handleSubmit(onAddProject)}
                className="space-y-6 mb-6 border-b pb-6"
              >
                <FormField
                  control={projectForm.control}
                  name="projectTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Layers className="mr-2 h-4 w-4" />
                        Project Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Awesome Portfolio Website"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={projectForm.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Text className="mr-2 h-4 w-4" />
                        Project Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of your project, its features, and your role."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={projectForm.control}
                  name="projectImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Project Image URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., https://example.com/project-image.png"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={projectForm.control}
                  name="technologiesUsed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Cpu className="mr-2 h-4 w-4" />
                        Technologies Used
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Comma-separated: React, Node.js, TailwindCSS"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={projectForm.control}
                    name="liveUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          Live URL (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., https://yourproject.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="gitUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <GitBranch className="mr-2 h-4 w-4" />
                          Git URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., https://github.com/your/project"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full cursor-pointer md:w-auto"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </form>
            </Form>

            {projectList.length > 0 && (
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold">Your Projects:</h4>
                {projectList.map((project) => (
                  <Card key={project.id} className="p-4 bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-primary">
                          {project.projectTitle}
                        </h5>
                        <p className="text-sm text-muted-foreground mt-1 mb-2">
                          {project.projectDescription}
                        </p>
                        {project.projectImageUrl && (
                          <a
                            href={project.projectImageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline block mb-1"
                          >
                            View Image
                          </a>
                        )}
                        <p className="text-xs">
                          <strong>Tech:</strong> {project.technologiesUsed}
                        </p>
                        {project.liveUrl && (
                          <p className="text-xs">
                            <strong>Live:</strong>{" "}
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {project.liveUrl}
                            </a>
                          </p>
                        )}
                        {project.gitUrl && (
                          <p className="text-xs">
                            <strong>Git:</strong>{" "}
                            <a
                              href={project.gitUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {project.gitUrl}
                            </a>
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onRemoveProject(project.id)}
                        className="text-destructive bg-blue-300 hover:bg-blue-500 hover:text-destructive-foreground cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            <Button
              onClick={saveProjectsList}
              className="w-full md:w-auto"
              disabled={projectList.length === 0}
            >
              <Save className="mr-2 h-4 w-4" /> Save All Projects
            </Button>
          </CardContent>
        </Card>

        {/* experience section input */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <BriefcaseBusiness className="mr-3 h-7 w-7 text-primary" /> Work
              Experience
            </CardTitle>
            <CardDescription>
              Detail your professional journey by adding each role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...experienceForm}>
              <form
                onSubmit={experienceForm.handleSubmit(onAddExperience)}
                className="space-y-6 mb-6 border-b pb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={experienceForm.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Briefcase className="mr-2 h-4 w-4" />
                          Position/Job Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Senior Software Developer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={experienceForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Building className="mr-2 h-4 w-4" />
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Tech Solutions Inc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={experienceForm.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          Start Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Jan 2020 or 01/2020"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={experienceForm.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          End Date (or "Present")
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Dec 2022 or Present"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={experienceForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <Text className="mr-2 h-4 w-4" />
                        Description/Responsibilities
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your key responsibilities, achievements, and technologies used."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                </Button>
              </form>
            </Form>

            {experienceList.length > 0 && (
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold">Your Experience:</h4>
                {experienceList.map((exp) => (
                  <Card key={exp.id} className="p-4 bg-muted/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-primary">
                          {exp.position}
                        </h5>
                        <p className="text-sm font-medium">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {exp.startDate} - {exp.endDate || "Present"}
                        </p>
                        <p className="text-sm mt-2 whitespace-pre-line">
                          {exp.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveExperience(exp.id)}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">
                          Remove {exp.position} at {exp.company}
                        </span>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            <Button
              onClick={saveExperienceList}
              className="w-full md:w-auto"
              disabled={experienceList.length === 0}
            >
              <Save className="mr-2 h-4 w-4" /> Save All Experience
            </Button>
          </CardContent>
        </Card>
      </div>
      <Button
        onClick={handleSubmit}
        variant="outline"
        className="w-full cursor-pointer md:w-auto"
      >
        Generate Your Profile
      </Button>
    </div>
  );
};

export default UserInput;
