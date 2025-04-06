"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Button } from "./ui/button";
import { formSchema } from "@/lib/validation";
import { z } from 'zod';
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";


const StartupForm = () => {

  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [pitch, setPitch] = useState("**Bring your ideas infront of the world with, HustleHive**");

  const handleFormSubmit = async (prevState : any , formData : FormData)=>{
    try {
      const formValues = {
        title : formData.get("title") as string,
        description : formData.get("description") as string,
        category : formData.get("category") as string,
        link : formData.get("link") as string,
        pitch
      }

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState , formData , pitch);

      if (result.status == "SUCCESS") {
        router.push(`/startup/${result._id}`);
      }

      return result;

    } catch (error) {
      if(error instanceof z.ZodError){
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string , string>);

        return { ...prevState , error: "Validation Failed" , status: "ERROR"}
      }

      return { ...prevState , error: "Unexpected error occured", status: "ERROR"}
    }
  };

  const [state , formAction, isPending] = useActionState(handleFormSubmit , {error: "" , status: "INITIAL"});


  return <form action={formAction} className="startup-form">
    {/* Title Input */}
    <div>
      <label htmlFor="title" className="startup-form_label"> Title </label>
      <Input
        id="title"
        name="title"
        className="startup-form_input"
        required placeholder="Enter your Startup's name"
      />

      {errors.title && <p className="startup-form_label">{errors.title}</p>}
    </div>

    {/* Description Input */}
    <div>
      <label htmlFor="description" className="startup-form_label"> description </label>
      <Textarea
        id="description"
        name="description"
        className="startup-form_textarea"
        required placeholder="Describe your Startup in/around 100 words"
      />

      {errors.description && <p className="startup-form_label">{errors.description}</p>}
    </div>

    {/* Category Input */}
    <div>
      <label htmlFor="category" className="startup-form_label"> Category </label>
      <Input
        id="category"
        name="category"
        className="startup-form_input"
        required placeholder="Select the category that represents your startup the best"
      />

      {errors.category && <p className="startup-form_label">{errors.category}</p>}
    </div>

    {/* Image URL Input */}
    <div>
      <label htmlFor="link" className="startup-form_label"> Image URL </label>
      <Input
        id="link"
        name="link"
        className="startup-form_input"
        required placeholder="Any relevant images you wanna showcase in your pitch"
      />

      {errors.link && <p className="startup-form_label">{errors.link}</p>}
    </div>

    {/* Markdown Editor */}
    <div data-color-mode="light">
      <label htmlFor="Pitch" className="startup-form_label"> Pitch </label>
      <MDEditor
        value={pitch}
        onChange={(value) => setPitch(value as string)}
        height={350}
        style={{ borderRadius: 30, overflow: "hidden" }}
      />
      {errors.pitch && <p className="startup-form_label">{errors.pitch}</p>}
    </div>

    {/* Submit Button */}
    <Button type="submit" className="startup-form_btn text-white font-bold" disabled={isPending} >
      {isPending ? `Submittinng...` : `Submit your Pitch`} 
    </Button>
  </form>
}

export default StartupForm