"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Config = use("Config");
const Url = use("App/Models/Url");

const { validateUrl } = use("App/Helpers");

Route.get("/", ({ view }) => {
  return view.render("index");
});

Route.post("/", async ({ request, view }) => {
  const inputUrl = request.post().url;

  // Check if url is set
  if (!inputUrl || inputUrl === "") {
    // Send error to home view
    return view.render("index", {
      error: "URL is empty",
      urlInput: inputUrl
    });
  }
  // Validate url
  if (!validateUrl(inputUrl)) {
    // Send error to home view
    return view.render("index", {
      error: "URL is not valid",
      urlInput: inputUrl
    });
  }

  // Check if URL exists in database
  const result = await Url.query()
    .where("url", inputUrl)
    .first();

  if (result) {
    return view.render("index", {
      shortUrl: Config.get("app.url") + "/" + result.id
    });
  } else {
    const newUrl = new Url();
    newUrl.url = inputUrl;
    await newUrl.save();

    return view.render("index", {
      shortUrl: Config.get("app.url") + "/" + newUrl.id
    });
  }
});

Route.get("/all", async () => {
  return await Url.all();
});

Route.get("/:id", async ({ params, response }) => {
  const id = params.id;
  const result = await Url.find(id);

  // Throw error if not found
  if (!result) {
    return response.status(404).send("URL not found");
  } else {
    result.visits = result.visits + 1;
    await result.save();

    return response.redirect(result.url);
  }
});
