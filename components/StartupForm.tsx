'use-client';

import { useState } from "react";
import { Input } from "./ui/input";

const StartupForm = () => {

  const [errors, setErrors] = useState<Record<string,string>>({});

  return <form className="startup-form">
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
  </form>
}

export default StartupForm