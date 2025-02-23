export const schema = {
  schema: {
    description: "Ping route",
    response: {
      200: {
        description: "Successful response",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      default: {
        description: "Default response",
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};
