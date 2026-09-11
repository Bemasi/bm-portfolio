import next from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: [".next/**", "out/**", "docs/design/bocetos/**"] },
  ...next,
];

export default config;
