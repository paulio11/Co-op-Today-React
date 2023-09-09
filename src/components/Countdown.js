import React from "react";

const Countdown = () => {
  // Get days until opening
  const today = new Date();
  const opening = new Date(today.getFullYear(), 8, 14);
  const timeDiff = opening.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <section className="countdown">
      <p>The new store opens in:</p>
      <p>
        {daysDiff} day{daysDiff > 1 && "s"} 🤯
      </p>
    </section>
  );
};

export default Countdown;
