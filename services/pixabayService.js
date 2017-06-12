myApp.service('pixabayService', ['$http', '$sce', '$q', function($http, $sce, $q) {
    const baseURL = 'https://pixabay.com/api/?';
    const api_key = '5560718-80d2f2f334cdbfa2cc5f2332f';
    const per_page = 30;

    const createURL = (query) => {
        let url = baseURL + 'key=' + api_key +
            '&q=' + query +
            '&per_page=' + per_page;
        return $sce.trustAsResourceUrl(url);
    }

    this.search = (query) => {
        // create and return a promise that will be resolved with the relevant data from the api
        let deferred = $q.defer();
        $http.get(createURL(query)).then((data) => {
            console.log(data);
            deferred.resolve({
                photos: data.data.hits.map((photo) => {
                    return {
                        imageLink: photo.pageURL,
                        imageUrl: photo.webformatURL
                    };
                }),
                extras: { total: data.data.total }
            });
        }).catch((err) => {
            console.error(err);
            deferred.reject(err);
        });
        return deferred.promise;
    }

}])