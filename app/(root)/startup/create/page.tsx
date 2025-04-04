import { auth } from "@/auth"
import StartupForm from "@/components/StartupForm"
import { redirect } from "next/navigation";

const page = async () => {

    //Not allowing UnAuthenticated users to access this page
    const session = await auth();
    if (!session) redirect("/");

    return <>
        <section className="pink_container !min-h-[200px]">
            <h1 className="heading">Submit your Startup Pitch ! </h1>
        </section>

        <StartupForm />
    </>
}

export default page