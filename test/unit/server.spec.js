const { test, trait } = use("Test/Suite")("Url");
const Url = use("App/Models/Url");

trait("Test/ApiClient");

test("get list of urls", async ({ client }) => {
  await Url.findOrCreate(
    { url: "https://website.url" }
  );

  const response = await client.get("/all").end();

  response.assertStatus(200);
  response.assertJSONSubset([
    {
      url: "https://website.url"
    }
  ]);
});

test("invalid route should return 404", async ({ client }) => {
  const response = await client.get("/asdf").end();

  response.assertStatus(404);
});
