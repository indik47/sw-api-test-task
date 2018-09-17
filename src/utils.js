const handleErrors = function (responce) {
    if (!responce.ok) {
        throw Error(responce.status);
    }
    return responce;
};

const getNumberOfPages = function (entitiesType) {
    return fetch(`https://swapi.co/api/${entitiesType}`)
        .then(responce => responce.json())
        .then(json => {
            return Math.ceil( json.count / 10 );
        })
};

const sendPromises = function (entitiesType, pages) {
    let promises = [];

    for (let i = 1; i <= pages; i++) {
        const promise = fetch(`https://swapi.co/api/${entitiesType}/?page=${i}`)
            .then(handleErrors)
            .then(responce => responce.json())
            .catch(error => console.log(`error in fetch loop = ${error}`));

        promises.push(promise);
    }

    return promises;
};

const resolvePromises = function (promises) {
    let entities = [];
    return Promise.all(promises)
        .then(responces => {
            responces.forEach(responce => {
                entities = [...entities, ...responce.results];
            });
            /*   console.log(entities);  */
            return entities;
        })
        .catch(error => {
            console.log(`error in Promise.All = ${error}`);
            return 'error in Promise.all'
        })
};

const fetchEntities = function(entitiesType){
    return getNumberOfPages(entitiesType)
        .then(pages => {
            return resolvePromises( sendPromises(entitiesType, pages) );
        });
};

export default fetchEntities