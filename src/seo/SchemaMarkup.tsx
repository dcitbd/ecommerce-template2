import React from "react";
export const SchemaMarkup: React.FC<{ schema: object }> = ({ schema }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
);
