export async function loginRequest(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error("Invalid credentials"));
      } else {
        resolve({
          token: "mock-jwt-token-" + Math.random().toString(36).slice(2),
          user: {
            id: 1,
            email,
            name: "Demo User",
            role: email === "admin@example.com" ? "admin" : "user",
          },
        });
      }
    }, 600);
  });
}
