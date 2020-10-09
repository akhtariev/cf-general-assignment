addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const links = [ 
  { "name": "Website", "url": "https://akhtariev.ca/" },
  { "name": "LinkedIn", "url": "https://www.linkedin.com/in/roman-akhtariev/" },
  { "name": "GitHub", "url": "https://github.com/akhtariev" }
]

class LinksTransformer {
  async element(element) {
    links.forEach(link => {
      element.append(`<a href="${link.url}">${link.name}</a>`, { html: true });
    })
  }
}

class ProfileTransformer {
  async element(element) {
    element.removeAttribute('style');
    element.get
  }
}

class UsernameTransformer {
  async element(element) {
    element.setInnerContent("akhtariev");
  }
}

class AvatarTransformer {
  async element(element) {
    element.setAttribute("src", "https://akhtariev.ca/img/me3.jpg");
  }
}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  if (request.url.endsWith('/links')) {
    return new Response(JSON.stringify(links), {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  }

  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  }

  const response = await fetch('https://static-links-page.signalnerve.workers.dev/static/html', init)

  return new HTMLRewriter()
    .on("div#links", new LinksTransformer())
    .on("div#profile", new ProfileTransformer())
    .on("h1#name", new UsernameTransformer())
    .on("img#avatar", new AvatarTransformer())
    .transform(response);
}
