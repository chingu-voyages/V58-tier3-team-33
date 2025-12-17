import GigCard from "../components/GigCard";
import PlusSquare from "../components/PlusSquare";
import { gigs } from "../data/gigs";
import { useNavigate, Link } from "react-router-dom";

export const HomePage = () => {
  const hasGigs = gigs.length > 0;
  const navigate = useNavigate();

  const handlePostGigClick = () => {
    void navigate("/client/post-gig");
  };

  return (
    <>
      <main className="flex flex-col min-h-dvh w-screen bg-background-alt">
        <nav className="flex justify-between bg-background items-center py-4 px-4 sm:px-8 md:px-16 ">
          <div className="">
            <h2 className="text-2xl md:text-3xl text-accent-gold font-bold">
              Worksy
            </h2>
            <p className="text-xs md:text-sm text-gray-mid">
              Digital talent meets opportunity
            </p>
          </div>
          <aside className="flex gap-4 md:gap-8 items-center text-gray-light">
            <div className="hidden md:block">
              <Link to="/freelancers">Browse Freelancers</Link>
            </div>
            <div className="space-x-2">
              <span className="size-40 bg-accent-gold text-background font-bold p-1 text-lg rounded-full">
                JD
              </span>
              <span className="hidden md:inline">Jane Doe</span>
            </div>
          </aside>
        </nav>
        <article className="bg-background-alt py-8 md:py-12 px-4 sm:px-8 md:px-16 flex flex-col">
          {hasGigs ? (
            <>
              <h2 className="text-gray-light text-3xl font-bold">Your Gigs</h2>
              <p className="text-gray-mid text-base">
                Manage you job postings and connect with Freelancers
              </p>
              <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-4 md:gap-8">
                <div className="bg-background p-3 sm:p-6 md:p-8 rounded-xl space-y-2 md:space-y-4">
                  <h2 className="text-sm text-gray-mid font-bold">
                    ACTIVE GIGS
                  </h2>
                  <h3 className="text-2xl sm:text-4xl text-accent-gold font-black">
                    1
                  </h3>
                </div>
                <div className="bg-background p-3 sm:p-6 md:p-8 rounded-xl space-y-2 md:space-y-4">
                  <h2 className="text-sm text-gray-mid font-bold">
                    PENDING REVIEW
                  </h2>
                  <h3 className="text-2xl sm:text-4xl text-accent-gold font-black">
                    1
                  </h3>
                </div>
                <div className="bg-background p-3 sm:p-6 md:p-8 rounded-xl space-y-2 md:space-y-4">
                  <h2 className="text-sm text-gray-mid font-bold">
                    TOTAL APPLICATIONS
                  </h2>
                  <h3 className="text-2xl sm:text-4xl text-accent-gold font-black">
                    12
                  </h3>
                </div>
              </section>
              <section className="mt-8 flex flex-col gap-4">
                <h2 className="text-gray-light text-xl font-bold">
                  Recent Gigs
                </h2>
                {gigs.map((gig) => (
                  <GigCard key={gig.id} gig={gig} />
                ))}

                <div className="flex mt-4">
                  <button
                    className="bg-accent-gold text-background font-black"
                    onClick={handlePostGigClick}
                  >
                    Post another gig
                  </button>
                </div>
              </section>
            </>
          ) : (
            <>
              <h2 className="text-gray-light md:text-3xl text-2xl font-bold">
                Welcome to Worksy, Jane
              </h2>
              <p className="text-gray-mid md:text-base text-sm">
                Complete your profile to start receiving opportunities
              </p>
              <section className="bg-background rounded-2xl px-8 py-12 mt-8 flex flex-col gap-4 items-center justify-center border border-dashed border-gray-mid">
                <div className="">
                  <PlusSquare className="size-24 stroke-gray-mid stroke-3 text-white" />
                </div>
                <h2 className="text-gray-light text-lg">No gigs posted yet</h2>
                <p className="text-gray-mid text-base text-center">
                  Create your profile to connect with talented Freelancers
                </p>
                <button
                  className="bg-accent-gold text-background font-black mt-4"
                  onClick={handlePostGigClick}
                >
                  Post a Gig
                </button>
              </section>
            </>
          )}
        </article>
      </main>
    </>
  );
};
