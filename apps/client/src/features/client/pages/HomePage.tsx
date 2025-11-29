import PlusSquare from "../components/PlusSquare";

export const HomePage = () => {
  return (
    <>
      <main className="flex flex-col min-h-screen w-screen bg-background-alt">
        <nav className="flex justify-between bg-background items-center py-4 px-16 w-screen  ">
          <div className="">
            <h2 className="md:text-3xl text-accent-gold font-bold">Worksy</h2>
            <p className="text-gray-mid">Digital talent meets oppurtunity</p>
          </div>
          <aside className="flex gap-8 items-center text-gray-light">
            <div className="">Browse Freelancers</div>
            <div className="space-x-2">
              <span className="size-40 bg-accent-gold text-background font-bold p-1 text-lg rounded-full">
                JD
              </span>
              <span className="">Jane Doe</span>
            </div>
          </aside>
        </nav>
        <article className="bg-background-alt py-16 px-16 flex flex-col">
          <h2 className="text-gray-light text-3xl font-bold">
            Welcome to Worksy, Jane
          </h2>
          <p className="text-gray-mid text-base">
            Complete your profile to start receiving opportunities
          </p>
          <section className="bg-background rounded-2xl p-8 mt-8 flex flex-col gap-4 items-center justify-center border border-dashed border-gray-mid">
            <div className="">
              <PlusSquare className="size-24 stroke-gray-mid stroke-3 text-white" />
            </div>
            <h2 className="text-gray-light text-lg">No gigs posted yet</h2>
            <p className="text-gray-mid text-sm">
              Create your profile to connect with talented Freelancers
            </p>
            <button className="bg-accent-gold text-background font-black mt-4">
              Post a Gig
            </button>
          </section>
        </article>
      </main>
    </>
  );
};
