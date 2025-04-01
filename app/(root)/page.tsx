import { title } from "process";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams, }: { searchParams: Promise<{ query?: string }>; }) {

  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      _id: 1,
      views: 55,
      author: { _id: 1 , name: 'Chintu Rai'},
      description: "Perro is an Special Dating Platform for Pet-Lovers !",
      image:"https://plus.unsplash.com/premium_photo-1681882376151-01c22985026a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Dating",
      title:"Perro",
    },
    {
      _createdAt: new Date(),
      _id: 2,
      views: 19,
      author: { _id: 2 , name: 'Team ByteForge'},
      description: "Transparency between Hospitals and Patients",
      image:"https://media.istockphoto.com/id/1418999473/photo/doctors-comforting-disabled-elderly-patient.webp?a=1&b=1&s=612x612&w=0&k=20&c=YwTJIt9-LX4Acp_3ng6BD3_pke2MHOqNMqMgR2adg_g=",
      category: "HealthCare",
      title:"Arogya",
    }
  ]

  return (
    <>
      <section className="pink_container">

        <h1 className="heading">
          <p className="text-8xl">
            HustleHive
          </p>
          Pitch your startups
          <br />
          to potential Investors
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit your ideas, Vote on pitches, and take part in virtual competitions !
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
