// // src/server-hapi.js
// import Hapi from "@hapi/hapi";
// import dotenv from "dotenv";

// dotenv.config();

// const init = async () => {
//   const server = Hapi.server({
//     port: process.env.HAPI_PORT || 4000,
//     host: "localhost",
//   });

//   // Contoh route sederhana
//   server.route({
//     method: "GET",
//     path: "/",
//     handler: (request, h) => {
//       return { message: "Hello from Hapi server!" };
//     },
//   });

//   // Contoh route lain, misal auth
//   // Tambahkan routes dan plugins sesuai kebutuhan, mirip Express tapi syntaxnya Hapi

//   await server.start();
//   console.log(`Hapi server running on ${server.info.uri}`);
// };

// process.on("unhandledRejection", (err) => {
//   console.log(err);
//   process.exit(1);
// });

// init();
