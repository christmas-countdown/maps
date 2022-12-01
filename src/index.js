import { Router } from 'itty-router';
import locations from './locations.json';

const router = Router();

router.get('/map-tile/:index.png', async (req, env, ctx) => {
	const location = locations[req.params.index];
	if (!location) return new Response('400', { status: 400 });
	const { latitude, longitude } = location;
	const style = 'eartharoid/clb57t9dz001s14nv72iwn3n4';
	const url = `https://api.mapbox.com/styles/v1/${style}/static/pin-l+ffffff(${longitude},${latitude})/${longitude},${latitude},6,0/600x400?access_token=${env.MAPBOX_TOKEN}`;
	const res = await fetch(url, { cf: { cacheTtl: 86400 } });
	return new Response(res.body, res);
});

router.get('*', () => new Response('404', { status: 404 }));

export default { fetch: router.handle };
