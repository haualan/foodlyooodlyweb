'use strict';

// Resumatchas controller
angular.module('resumatchas').filter('to_trusted', ['$sce', 
  function($sce){
        return function(text) {
            // used to show search results and escape html correctly
            text = text.replace("<em>", "<strong>");
            text = text.replace("</em>", "</strong>");

            // console.log(text);
            return $sce.trustAsHtml(text);
        };
    }]);