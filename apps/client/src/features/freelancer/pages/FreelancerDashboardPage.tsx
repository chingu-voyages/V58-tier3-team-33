import { Link } from "react-router-dom";
import Profile from "../components/Profile";

export default function FreelancerDashboardPage() {
  // For an empty state, we won't have gigs or applications initially
  // const hasApplications = applications.length > 0 // This would be for a full implementation

  // Function to handle navigating to browse gigs, if implemented
  const handleBrowseGigsClick = () => {
    // void navigate('/freelancer/browse-gigs') // Placeholder if we had a dedicated browse gigs page
    console.info("Navigate to browse gigs");
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
              <Link to="/client">Browse Gigs</Link>{" "}
              {/* Link to client gigs for now */}
            </div>
            <div className="space-x-2">
              <span className="size-40 bg-accent-gold text-background font-bold p-1 text-lg rounded-full">
                FJ
              </span>
              <span className="hidden md:inline">John William</span>
            </div>
          </aside>
        </nav>
        <article className="bg-background-alt py-8 md:py-12 px-4 sm:px-8 md:px-16 flex flex-col">
          {/* Always show the empty state initially as requested */}
          <>
            <h2 className="text-gray-light md:text-3xl text-2xl font-bold">
              Welcome to Worksy, William
            </h2>
            <p className="text-gray-mid md:text-base text-sm">
              Complete your profile to start receiving opportunities
            </p>
            <section className="bg-background rounded-2xl px-8 py-12 mt-8 flex flex-col gap-4 items-center justify-center border border-dashed border-gray-mid">
              <div className="">
                <Profile className="size-24 stroke-gray-mid stroke-3 text-white" />
              </div>
              <h2 className="text-gray-light text-lg">
                Profile not set up yet
              </h2>
              <p className="text-gray-mid text-base text-center">
                Create your profile to let clients know about what you offer
              </p>
              <button
                className="bg-accent-gold text-background font-black mt-4"
                onClick={handleBrowseGigsClick}
              >
                Complete Profile
              </button>
            </section>
          </>
        </article>
      </main>
    </>
  );
}
