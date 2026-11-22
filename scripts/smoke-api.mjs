import assert from 'node:assert/strict';

const baseUrl = new URL(
  process.argv[2] ?? 'https://burma-project-ideas.vercel.app',
);
const word = 'ကကြီး';

const samples = {
  '/bagan-map/{id}': '/bagan-map/7C1DDEED-1B9E-4B54-8AE9-986BB44C42C1',
  '/bagan-map/detail/{id}':
    '/bagan-map/detail/1ba87a6f-0dd4-431b-ac71-82a235bf794b',
  '/burmese-agriculture/{id}':
    '/burmese-agriculture/01HN0T7GS10PPH4P3T834FS5SQ',
  '/burmese-recipes/{id}':
    '/burmese-recipes/b5e11d17-252c-4318-bcad-2de82d66762b',
  '/quotlets/{id}': '/quotlets/adcf23fa-b579-4215-85c2-2c0f3f4beee2',
  '/burma-calendar/check-date': '/burma-calendar/check-date?date=2027-01-04',
  '/burma-calendar/holidays': '/burma-calendar/holidays?year=2026&month=April',
  '/burma-calendar/month': '/burma-calendar/month?year=2026&month=4',
  '/myanmar-nameology/calculate':
    '/myanmar-nameology/calculate?name=' + encodeURIComponent(word),
  '/myanmar-word-list/words':
    '/myanmar-word-list/words?limit=5&prefix=' + encodeURIComponent(word),
  '/ybs/bus-stops': '/ybs/bus-stops?page=1&page_size=2',
  '/ybs/bus-stops/search':
    '/ybs/bus-stops/search?name=' + encodeURIComponent('ဇဝန'),
  '/ybs/bus-stops/nearest':
    '/ybs/bus-stops/nearest?user_lat=16.82796&user_lon=96.18832&findStop=true',
  '/ybs/bus-stops/{id}/buses': '/ybs/bus-stops/1978/buses',
  '/ybs/path-finder/stop-lvl-path':
    '/ybs/path-finder/stop-lvl-path?start_id=1978&end_id=2550',
  '/ybs/path-finder/store-lvl-path':
    '/ybs/path-finder/store-lvl-path?storeId=1&startBusStopId=1978',
  '/ybs/stores/search': '/ybs/stores/search?name=Sule&size=5',
};

const parameters = { symbolId: 'pisces', number: 3, year: 2026 };
const hasItems = (value) => Array.isArray(value) && value.length > 0;
const completeRoute = (bus, reversed) =>
  bus?.num === 1 &&
  bus.isReversed === reversed &&
  hasItems(bus.destinations) &&
  bus.destinations.length === bus.totalStops;

const checks = {
  '/myanmar-word-list/check': (body) => body.results?.[0]?.isCorrect === true,
  '/myanmar-word-list/words': (body) => body.words?.includes(word),
  '/ybs/buses': hasItems,
  '/ybs/buses/{num}': (body) =>
    body.result?.some((bus) => bus.num === 1 && bus.isReversed === true) &&
    body.result.some((bus) => bus.num === 1 && bus.isReversed === false),
  '/ybs/buses/{num}/direction': (body) => completeRoute(body.bus, false),
  '/ybs/bus-stops': (body) =>
    body.totalPages > 1 && body.related_bus?.length === 2,
  '/ybs/bus-stops/search': (body) =>
    body.content?.some((stop) => stop.name.includes('ဇဝန')),
  '/ybs/bus-stops/nearest': (body) => hasItems(body.near_by_locations),
  '/ybs/bus-stops/{id}/buses': (body) => body.some((bus) => bus.num === 1),
  '/ybs/path-finder/stop-lvl-path': (body) => hasItems(body.path),
  '/ybs/path-finder/store-lvl-path': hasItems,
  '/ybs/stores/{id}/nearest-stops': (body) =>
    hasItems(body.store_nearest_locations),
  '/ybs/total-counts': (body) => body.total_bus > 0 && body.total_bus_stop > 0,
};

async function request(path, method = 'GET') {
  const url = new URL(path, baseUrl);
  assert.equal(url.origin, baseUrl.origin, 'Endpoint must use the API origin');
  const response = await fetch(url, {
    method,
    redirect: 'error',
    signal: AbortSignal.timeout(20_000),
    ...(method === 'POST' && {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ words: [word] }),
    }),
  });
  assert.equal(response.status, 200, 'Unexpected HTTP status');

  const contentType = response.headers.get('content-type') ?? '';
  if (path === '/myanmar-word-list/words.list') {
    assert.match(contentType, /^text\/plain\b/);
    return response.text();
  }
  assert.match(contentType, /^application\/json\b/);
  return response.json();
}

async function run() {
  console.log('Smoke testing ' + baseUrl.origin);
  const spec = await request('/swagger-json');
  for (const path of Object.keys(checks)) {
    const method = path === '/myanmar-word-list/check' ? 'post' : 'get';
    assert.ok(
      spec.paths?.[path]?.[method],
      'Missing OpenAPI operation ' + method + ' ' + path,
    );
  }

  // Only the read-only spelling check is safe to include as a POST.
  const cases = Object.entries(spec.paths).flatMap(([template, operations]) => {
    const path =
      samples[template] ??
      template.replace(/\{(\w+)\}/g, (_, name) => parameters[name] ?? 1);
    const check =
      checks[template] ?? ((body) => body && Object.keys(body).length > 0);
    if (template === '/myanmar-word-list/check')
      return [{ path, method: 'POST', check }];
    return operations.get ? [{ path, method: 'GET', check }] : [];
  });
  cases.push({
    path: '/ybs/buses/1/direction?isReversed=true',
    method: 'GET',
    check: (body) => completeRoute(body.bus, true),
  });

  let failures = 0;
  for (let index = 0; index < cases.length; index += 4) {
    await Promise.all(
      cases.slice(index, index + 4).map(async ({ path, method, check }) => {
        try {
          assert.ok(
            check(await request(path, method)),
            'Unexpected response body',
          );
          console.log('PASS ' + method + ' ' + path);
        } catch (error) {
          failures++;
          console.error('FAIL ' + method + ' ' + path + ' - ' + error.message);
        }
      }),
    );
  }
  console.log(
    cases.length - failures + '/' + cases.length + ' requests passed',
  );
  if (failures) process.exitCode = 1;
}

run().catch((error) => {
  console.error('Smoke test setup failed - ' + error.message);
  process.exitCode = 1;
});
