// src/components/HelmetComponent.jsx
import React from "react";
import pkg from "react-helmet-async";
const { Helmet } = pkg;

const HelmetComponent = ({
  title,
  description,
  url = "https://your-domain.com",
  robots = "index, follow",
  image, // New prop for social sharing images
  type = "website", // Default OG type
  siteName = "Your Site Name", // Replace with your site name
  twitterSite = "@yourtwitterhandle", // Replace with your Twitter handle
  twitterCardType = "summary_large_image", // Default Twitter card type
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default HelmetComponent;
