import { useRef } from "react";

function ProductRow({ children }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 260;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="hp-row-wrapper">
      <div className="hp-scroll-row" ref={scrollRef}>
        {children}
      </div>

      <button
        className="hp-arrow hp-arrow-left"
        onClick={() => scroll("left")}
        aria-label="scroll left"
        type="button"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      <button
        className="hp-arrow hp-arrow-right"
        onClick={() => scroll("right")}
        aria-label="scroll right"
        type="button"
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
}

export default ProductRow;