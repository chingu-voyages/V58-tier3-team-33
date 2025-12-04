import React from "react";

interface SegmentedControlProps {
  selected: string;
  setSelected: (selected: string) => void;
  options: { label: string; value: string }[];
}

const SegmentedControl = ({
  selected,
  setSelected,
  options,
}: SegmentedControlProps) => {
  const selectedIndex = options.findIndex(
    (option) => option.value === selected,
  );

  return (
    <div className="relative flex w-full bg-background rounded-xl p-1">
      <div
        className="absolute top-1 left-1 h-[calc(100%-0.5rem)] bg-accent-gold rounded-md text-background transition-transform duration-300 ease-in-out"
        style={{
          width: `calc(100% / ${options.length})`,
          transform: `translateX(calc(100% * ${selectedIndex}))`,
        }}
      ></div>
      {options.map((option) => (
        <React.Fragment key={option.value}>
          <input
            type="radio"
            id={option.value}
            name="userType"
            value={option.value}
            checked={selected === option.value}
            onChange={() => setSelected(option.value)}
            className="hidden"
          />
          <label
            htmlFor={option.value}
            className={`relative z-10 flex-1 p-2 text-center rounded-md cursor-pointer font-semibold transition-colors duration-300 text-sm md:text-base ${selected === option.value ? "text-black" : "text-accent-gold"}`}
          >
            {option.label}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SegmentedControl;
