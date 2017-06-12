myApp.controller('mainCtrl', ['$scope', 'flickrService', 'pixabayService', '$q', function($scope, flickrService, pixabayService, $q) {

    // manage history using local storage
    const saveHistory = (history) => {
        localStorage.setItem('history', angular.toJson(history));
    }
    const getHistory = () => {
        return angular.fromJson(localStorage.getItem('history'));
    }

    $scope.history = {
        items: getHistory() || [],
        clear: () => {
            $scope.history.items = [];
            saveHistory($scope.history.items);
        }
    }

    $scope.search = {
        query: '',
        go: (query) => {
            // update the query in case lunched as rerun
            $scope.search.query = query;
            // combine promises from both apis 
            $q.all([
                flickrService.search(query),
                pixabayService.search(query)
            ]).then((data) => {
                // combine photos from both apis to one array
                $scope.photos = data[0].photos.concat(data[1].photos);

                // add results to history
                $scope.history.items.push({
                    query,
                    time: new Date(),
                    service: 'flickr',
                    count: data[0].extras.total
                });
                $scope.history.items.push({
                    query,
                    time: new Date(),
                    service: 'pixabay',
                    count: data[1].extras.total
                });

                saveHistory($scope.history.items);

            }).catch((err) => {
                console.error(err);
            });

        }
    }

}]);