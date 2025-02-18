const checkEmailExists = async (email) => {
  const response = await fetch("http://localhost:5001/check-email-exists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

export { checkEmailExists };
