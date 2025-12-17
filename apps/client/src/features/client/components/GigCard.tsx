import type { Gig } from "../data/gigs";
import { formatTimeAgo } from "../../../utils/date";

interface GigCardProps {
  gig: Gig;
}

const GigCard = ({ gig }: GigCardProps) => {
  return (
    <>
      <div className="bg-background p-4 sm:p-6 rounded-lg shadow-md flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <h3 className="text-lg font-bold text-gray-light">{gig.title}</h3>
            <div className="flex flex-wrap gap-x-2 text-gray-mid text-sm">
              <span>Posted {formatTimeAgo(gig.createdAt)}</span>
              <span>&bull;</span>
              <span>{gig.category}</span>
              <span>&bull;</span>
              <span>{gig.budgetRange}</span>
            </div>
            <p className="text-gray-light font-light line-clamp-2 sm:max-w-[75%] sm:line-clamp-1">
              {gig.description}
            </p>
          </div>
          <div className="shrink-0">
            <span
              className={`px-3 py-1 text-sm rounded-md font-semibold ${
                gig.status === "Approved"
                  ? "bg-green-500/20 text-green-400"
                  : gig.status === "Pending Review"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {gig.status}
            </span>
          </div>
        </div>
        <div className="flex gap-4 sm:w-fit sm:flex-row mt-auto">
          <button className="outline-2 outline-background-alt text-gray-light px-3 py-1 rounded-lg text-sm sm:w-auto">
            View Applications ({gig.proposals})
          </button>
          <button className="outline-2 outline-background-alt text-gray-light px-3 py-1 rounded-lg text-sm sm:w-auto">
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default GigCard;
