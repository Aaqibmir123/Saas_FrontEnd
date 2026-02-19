"use client";

import { Typography } from "antd";

export default function CategoryHeader({ slug }: { slug?: string }) {
  if (!slug) return null;

  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: 40,
      }}
    >
      <Typography.Title
        level={2}
        style={{
          margin: 0,
          padding: 0,
          fontWeight: 500,
        }}
      >
        {formattedTitle}
      </Typography.Title>
    </div>
  );
}
