import React from "react";

function Card({
  title,
  subtitle = "",
  content,
  imageUrl,
  actions = [],
  theme = "light",
  onCardClick,
}) {
  return (
    <div className={`card-${theme}`} onClick={onCardClick}>
      <img src={imageUrl} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        {subtitle && <p className="subtitle">{subtitle}</p>}
        <p>{content}</p>
        <div className="actions">
          {actions.map((action, index) => (
            <button key={index} onClick={action.handler}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
