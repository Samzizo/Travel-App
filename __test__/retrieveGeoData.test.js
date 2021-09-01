import { retrieveGeoData } from '../src/client/js/app';

test('postRetrieve returns data', () => {
    expect(retrieveGeoData).toBeDefined();
})