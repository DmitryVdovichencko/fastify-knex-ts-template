export const schema = {
  schema: {
    description: "User list route",
    response: {
      200: {
        description: "Successful user list response",
        type: "object",
        properties: {
          list: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                // name: {
                //   type: "string",
                // },
                email: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};


export const registerUserSchema = {
  schema: {
    description: "User register route",
		method: "POST",
		body: {
			type: "object",
			properties: {
				username: {
					type: 'string'
				},
				password:  {
					type: 'string'
				},
			},
		},
    response: {
      201: {
        description: "Successful user register response",
        type: "object",
        properties: {
					id: {
						type: 'string'
					},
					email: {
						type: 'string'
					}
        },
      },
    },
  },
};