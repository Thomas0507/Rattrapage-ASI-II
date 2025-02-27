
export const generateCard = async (userId: string, prompt: string) => {
    const response = await fetch('http://localhost:8081/card', {
      method: "POST",
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Origin': 'http://localhost:5173',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, prompt }),
    });
  
    const data = await response.json();
    return data;
  };