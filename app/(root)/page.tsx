import SearchForm from "../components/SearchForm";

export default function Home() {
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

        <SearchForm />
      </section>
    </>
  );
}
