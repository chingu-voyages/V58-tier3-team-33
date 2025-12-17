import AuthForm from "../components/AuthForm";

function LandingPage() {
  return (
    <div className="">
      <nav className="flex p-4 border-b-[0.5px] border-amber-500/20">
        <h2 className="text-accent-gold font-black text-xl md:text-2xl">
          Worksy
        </h2>
      </nav>
      <main className="flex flex-col md:flex-row p-4 md:p-10 items-center gap-4 md:gap-8">
        <section className="flex-1 space-y-4 md:space-y-6 text-center md:text-left p-4">
          <p className="text-accent-gold font-semibold text-base md:text-base">
            The place to get digital work done.
          </p>
          <article className="font-bold text-4xl md:text-5xl lg:text-[3.2em]">
            <h2>Find talent.</h2>
            <h2>Land Projects.</h2>
            <h2>Get it done.</h2>
          </article>
          <p className="text-gray-400 text-sm md:text-base">
            Connect with vetted digital talent and activate gigs in hours, not
            weeks. From design to development - find the right people or land
            your next gig.
          </p>
        </section>
        <section className="bg-background-alt p-4 md:p-8 rounded-2xl flex-1 md:mr-6">
          <AuthForm />
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
