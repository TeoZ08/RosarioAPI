import React from "react";

function Controls({ onNext, onPrev }) {
  return (
    <div className="controls">
      <button onClick={onPrev} className="btn-nav">
        Anterior
      </button>
      <button onClick={onNext} className="btn-nav btn-primary">
        Próximo
      </button>
    </div>
  );
}

export default Controls;
