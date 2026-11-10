import { useState, useEffect } from 'react';

const COW_THUMBNAIL = "https://sl.bing.net/g8SIrLU84oC";

const Card = ({ id, name, size, weight, milk, type, origin, wiki, starred, onStar }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchWikiImage = async () => {
      if (!wiki) {
        setImageSrc(COW_THUMBNAIL);
        return;
      }

      try {
        const url = new URL(wiki);
        const pathParts = url.pathname.split('/');
        const title = pathParts[pathParts.length - 1];

        const response = await fetch(
          `https://${url.host}/api/rest_v1/page/summary/${title}`
        );
        const data = await response.json();

        if (data.thumbnail?.source) {
          setImageSrc(data.thumbnail.source);
        } else {
          setImageSrc(COW_THUMBNAIL);
        }
      } catch {
        setImageSrc(COW_THUMBNAIL);
      }
    };

    fetchWikiImage();
  }, [wiki, id]);

  if (!imageSrc) {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size * 1.9,
        padding: 5,
        borderRadius: "8px",
        backgroundColor: "white",
        borderColor: "lightgray",
        borderWidth: "2px",
        borderStyle: "solid",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "steelblue",
        fontWeight: "bold",
        gap: "6px",
      }}
    >
      <span
        onClick={onStar}
        style={{
          position: "absolute",
          top: 6,
          right: 8,
          fontSize: "14px",
          cursor: "pointer",
          color: starred ? "#FFD700" : "#ddd",
          lineHeight: 1,
        }}
      >
        ★
      </span>

      <img
        src={imageSrc}
        alt={name}
        style={{ width: 70, height: 70, objectFit: 'contain' }}
      />

      <div style={{ fontSize: "14px", textAlign: "center" }}>{name}</div>

      <span
        style={{
          backgroundColor:  "#aaa",
          color: "white",
          fontSize: "11px",
          fontWeight: "bold",
          padding: "1px 6px",
          borderRadius: "999px",
        }}
      >
        {type}
      </span>

      <span style={{ color: "lightgray", fontSize: "11px", fontWeight: "bold", padding: "1px 6px", borderRadius: "999px" }}>
        weight: {weight} kg
      </span>

      <span style={{ color: "lightgray", fontSize: "11px", fontWeight: "bold", padding: "1px 6px", borderRadius: "999px" }}>
        milk: {milk} L
      </span>

    </div>
  );
};

export default Card;
