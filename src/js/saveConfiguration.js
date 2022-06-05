import getData from './getData';
import configuration from './configuration';

const options = {
    key: 'api_key=306e564986f0782b8ec4bf227b0f3c28',
    configUrl: 'https://api.themoviedb.org/3/configuration?',
};

export default async function saveConfiguration() {
    try {
        const { data } = await getData(options.configUrl + options.key);
        configuration.base_url = data.images.secure_base_url;
        configuration.poster_size = data.images.poster_sizes[3];

    } catch (error) {
        console.error('error is: ', error);
    }
}