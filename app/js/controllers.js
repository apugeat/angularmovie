

angular.module('angularMovieApp').controller("homeController" ,function ($scope) {
    "use strict";
    $scope.user = 'Thierry LAU';
});

angular.module('angularMovieApp').controller("moviesController" ,function ($scope, Movie) {
    "use strict";

    Movie.fetch().success(function(resp){
        $scope.movies = resp;
    });

    $scope.deleteMovie = function(index){
        Movie.remove($scope.movies[index].id)
            .success(function(resp){
                $scope.movies.splice(index, 1);
            }
        );
    };

});

angular.module('angularMovieApp').controller('editMovieController', function($scope, Movie, $routeParams, $location){
    "use strict";

    var movieId = $routeParams.id;

    Movie.fetchOne(movieId).success(function(movie){
        $scope.movie = movie;
    });

    $scope.updateMovie = function(movie){
        Movie.update(movie)
            .success(function(){
                $location.path('/movies');
            })
            .error(function(resp){
                console.log(resp);
            });
    };
});

angular.module('angularMovieApp').controller("movieFormController" ,function ($scope, Movie) {
    "use strict";

    $scope.showAlert = false;

    $scope.addMovie = function(movie){
        Movie.create(movie)
            .success(function(){
                var newMovie = {};
                angular.copy(movie, newMovie);
                $scope.movies.push(newMovie);
                $scope.movie = {};
                $scope.showAlert = false;
                $scope.dismiss();
            })
            .error(function(resp, statusCode){
                // Affichage d'un message d'erreur
                $scope.errorTitle = 'Erreur ' + statusCode ;
                $scope.errorMessage = resp.error;
                $scope.showAlert = true;
            });
    };
});