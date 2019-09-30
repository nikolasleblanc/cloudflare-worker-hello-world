import Router from './router'
import qs from 'qs'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const routeFunction = name => async request => {
  const [, queryString] = request.url.split('?')
  return new Response(
    JSON.stringify({
      name,
      qs: qs.parse(queryString),
    }),
    { headers: { 'Content-type': 'application/json' } },
  )
}

const routedResponse = routeController => async request => {
  const r = routeController()
  return await r.route(request)
}

const routeController = r => () => {
  r.get('/abc', routeFunction('abc'))
  r.get('/def', routeFunction('def'))
  r.post('/ghi', routeFunction('ghi'))
  return r
}

/**
 * Fetch and log a request
 * @param {Request} request
 */
const handleRequest = routedResponse(routeController(new Router()))
