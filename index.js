addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const links = [
  {
    name: 'Option 1',
    url:
      'https://thumbs.dreamstime.com/b/hire-me-stamp-text-hire-me-inside-illustration-109042373.jpg',
  },
  {
    name: 'Option 2',
    url:
      'https://thumbs.dreamstime.com/b/businessman-standing-holding-black-board-hiere-me-please-wording-72895608.jpg',
  },
  {
    name: 'Option 3',
    url:
      'https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Erik%20Reis,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1455382764/axrn9xz5qggbhzibhotv.jpg',
  },
]

class LinksTransformer {
  async element(element) {
    links.forEach(link => {
      element.append(`<a href="${link.url}">${link.name}</a>`, { html: true })
    })
  }
}

class ProfileTransformer {
  async element(element) {
    element.removeAttribute('style')
    element.get
  }
}

class UsernameTransformer {
  async element(element) {
    element.setInnerContent('akhtariev')
  }
}

class AvatarTransformer {
  async element(element) {
    element.setAttribute('src', 'https://akhtariev.ca/img/me3.jpg')
  }
}

class SocialTransformer {
  async element(element) {
    element.removeAttribute('style')
    element.append(
      '<a href="https://www.linkedin.com/in/roman-akhtariev"><img src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg"></a>',
      { html: true },
    )
  }
}

class TitleTransformer {
  async element(element) {
    element.setInnerContent('Roman Akhtariev')
  }
}

class BackgroundTransformer {
  async element(element) {
    element.setAttribute('class', 'bg-blue-300')
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
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  }

  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }

  const response = await fetch(
    'https://static-links-page.signalnerve.workers.dev/static/html',
    init,
  )

  return new HTMLRewriter()
    .on('div#links', new LinksTransformer())
    .on('div#profile', new ProfileTransformer())
    .on('h1#name', new UsernameTransformer())
    .on('img#avatar', new AvatarTransformer())
    .on('div#social', new SocialTransformer())
    .on('title', new TitleTransformer())
    .on('body', new BackgroundTransformer())
    .transform(response)
}
