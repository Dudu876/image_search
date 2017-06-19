myApp.service('flickrService', ['$http', '$sce', '$q', function($http, $sce, $q) {
    const baseURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
    const api_key = '76a7839d52fa06c5b123036f871ecbd1';
    const per_page = 30;

    const createURL = (query) => {
        let url = baseURL + '&text=' + query +
            '&api_key=' + api_key +
            '&per_page=' + per_page +
            '&format=json' + '&nojsoncallback=1';
        return $sce.trustAsResourceUrl(url);
    }

    this.search = (query) => {
        // create and return a promise that will be resolved with the relevant data from the api
        let deferred = $q.defer();
        $http.get(createURL(query)).then((data) => {
            deferred.resolve({
                photos: data.data.photos.photo.map((photo) => {
                    return {
                        imageLink: `http://www.flickr.com/photos/${photo.owner}/${photo.id}`,
                        imageUrl: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`
                    }
                }),
                extras: { total: data.data.photos.total }
            });
        }).catch((err) => {
            console.error(err);
            deferred.reject(err);
        });
        return deferred.promise;
    }

}])