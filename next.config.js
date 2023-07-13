/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI:
      "mongodb+srv://blogution:lzeQhaFjsE1lr8a2@cluster1.ikt2bgd.mongodb.net/test?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
