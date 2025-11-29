import { type Gig } from "../data/gigs";

interface GigCardProps {
  gig: Gig;
}

const GigCard = ({ gig }: GigCardProps) => {
  return (
    <>
      <div className="bg-background p-6 rounded-lg shadow-md flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-gray-light">{gig.title}</h3>
          <p className="text-gray-mid">{gig.description}</p>
          <div className="flex gap-4 items-center text-gray-mid">
            <span>Budget: ${gig.budget}</span>
            <span>&bull;</span>
            <span>Proposals: {gig.proposals}</span>
            <span>&bull;</span>
          </div>
        </div>
        <span
          className={`px-2 py-1 text-sm rounded-lg ${
            gig.status === "Open"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {gig.status}
        </span>
      </div>
    </>
  );
};

export default GigCard;
