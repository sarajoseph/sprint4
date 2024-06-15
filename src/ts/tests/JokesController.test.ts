import JokesController from '../JokesController';

const jokesController = new JokesController();

test('Should return an Object with defined properties', async () => {
	const actualJokeData = await jokesController.getJokeData();
	expect(typeof actualJokeData).toBe('object');
	expect(actualJokeData.id).toBeDefined();
	expect(actualJokeData.joke).toBeDefined();
});