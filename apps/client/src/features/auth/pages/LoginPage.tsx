import Auth from "../components/Auth";

function LoginPage() {
  return (
    <div className=" mx-auto">
      <nav className="flex p-4 border-b-[0.5px] border-amber-500/20">
        <h2 className="text-amber-500 font-black text-2xl">Worksy</h2>
      </nav>
      <main className="flex flex-col md:flex-row p-8 items-center gap-8">
        <section className="flex-1 space-y-6">
          <p className="text-amber-500 font-semibold text-lg">
            The place to get digital work done.
          </p>
          <article className="font-bold">
            <h1>Find talent.</h1>
            <h1>Land Projects.</h1>
            <h1>Get it done.</h1>
          </article>
          <p className="text-gray-400 text-base mr-5">
            Connect with vetted digital talent and activate gigs in hours, not
            weeks. From design to development - find the right people or land
            your next gig.
          </p>
        </section>
        <section className="bg-gold/10 p-8 my-8 rounded-2xl w-full md:w-1/2">
          <div className="space-y-2 mb-8">
            <h2 className="text-white font-bold text-2xl">Join Worksy</h2>
            <p className="text-gray-400 text-base">
              Create your account to get started
            </p>
          </div>
          <Auth />
        </section>
      </main>
    </div>
  );
}

export default LoginPage;
