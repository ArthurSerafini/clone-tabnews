test("GET api status", async () => {
    const response = await fetch ("http://localhost:3000/api/v1/status")
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody)
})