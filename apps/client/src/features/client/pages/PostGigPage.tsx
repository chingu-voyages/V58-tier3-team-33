import GigForm from "../components/GigForm";
import { Link } from "react-router-dom";

export const PostGigPage = () => {
  return (
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
      </nav>{" "}
      <article className="bg-background-alt py-8 md:py-12 px-4 sm:px-8 md:px-16 flex flex-col text-gray-light">
        <div className="mb-8 w-full md:w-4/5 mx-auto">
          <h2 className=" text-3xl font-bold">Post a new gig</h2>
          <p className=" text-base font-light mt-2">
            Tell freelancers what you need help with.
          </p>
        </div>
        <GigForm />
      </article>
    </main>
  );
};
