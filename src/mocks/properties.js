import { http, HttpResponse } from 'msw';
import allProperties from './data/properties.json';

const FAVORITES_LS_KEY = 'user-favorites-db';
const baseApiUrl = 'https://homelist.com/api';

const getstoreFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_LS_KEY) || '[]');
const saveFavorites = (favorites) => localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(favorites));

export const propertiesHandlers = [
    http.get(`${baseApiUrl}/properties`, ({ request }) => {
        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');
        const onlyFavorites = url.searchParams.get('favorite') === 'true';

        if (onlyFavorites && userId) {
            const favorites = getstoreFavorites();
            const userFavIds = favorites
                .filter(f => String(f.userId) === String(userId))
                .map(f => f.propertyId);

            const filtered = allProperties.filter(p => userFavIds.includes(p.id));
            return HttpResponse.json(filtered);
        }
        return HttpResponse.json(allProperties);
    }),

    http.get(`${baseApiUrl}/properties/:id`, ({ params }) => {
        const { id } = params;
        const property = allProperties.find((prop) => prop.id === +id);

        if (!property) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
        return HttpResponse.json(property);
    }),

    http.all(`${baseApiUrl}/properties/:id/favorite`, async ({ params, request }) => {
        const { id } = params;
        let userId;
        try {
            const body = await request.json();
            userId = body.userId;
        } catch (e) {
            return HttpResponse.json({ error: 'userId is required in the request body' }, { status: 400 });
        }
        let favorites = getstoreFavorites();
        const propertyId = +id;
        const index = favorites.findIndex(
            f => String(f.userId) === String(userId) && f.propertyId === propertyId
        );

        let isFavoriteNow = false;
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push({ userId, propertyId });
            isFavoriteNow = true;
        }

        saveFavorites(favorites);
        return HttpResponse.json({ success: true, isFavorite: isFavoriteNow });
    })

];
