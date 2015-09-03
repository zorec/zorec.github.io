!function(){"use strict";angular.module("ooJS",["ngMaterial","hljs"])}(),function(){"use strict";function t(){function t(){return e}var e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"}];this.getTec=t}angular.module("ooJS").service("webDevTec",t)}(),function(){"use strict";function t(){return{templateUrl:"app/components/objects/objects.html",controller:e,controllerAs:"o"}}function e(t,e,n){this.jsonObjects=t.randomObjects(),t.chainObjects(this.jsonObjects),this.inheritFromIndexes=this.jsonObjects.map(function(t,e){return e-1}),this.languages=[new n,new e],this.currentLanguageIndex=0,this.addObject=function(){this.jsonObjects.push({})},this.accessibleProperties=function(e){return t.deepCopy(this.jsonObjects[e])},this.isValidPrototype=function(t,e){var n=Object.getPrototypeOf(t),o=!0;try{Object.setPrototypeOf(t,this.jsonObjects[e])}catch(i){o=!1}return Object.setPrototypeOf(t,n),o},this.changePrototype=function(t){var e=Number(this.inheritFromIndexes[t]),n=Object;-1!==e&&(n=this.jsonObjects[e]),Object.setPrototypeOf(this.jsonObjects[t],n)},this.updateSnippet=function(t,e){"undefined"!=typeof t&&(angular.extend(this.jsonObjects[t],e),this.changePrototype(t)),this.currentLanguage=this.languages[this.currentLanguageIndex],this.snippet=this.currentLanguage.snippet(this.jsonObjects)}}angular.module("ooJS").directive("objects",t),e.$inject=["objectHelper","Ruby","JavaScript"]}(),function(){"use strict";function t(){function t(t){var e=this;e.relativeDate=t(e.creationDate).fromNow()}var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],e}angular.module("ooJS").directive("acmeNavbar",t)}(),function(){"use strict";function t(){return{restrict:"A",require:"ngModel",link:function(t,e,n,o){function i(t){try{return t=JSON.parse(t),o.$setValidity("json",!0),t}catch(e){return o.$setValidity("json",!1),o.$modelValue}}function r(t){return angular.toJson(t)}o.$parsers.push(i),o.$formatters.push(r)}}}angular.module("ooJS").directive("jsonText",t)}(),function(){"use strict";function t(t,e){function n(){o(),t(function(){i.classAnimation="rubberBand"},4e3)}function o(){i.awesomeThings=e.getTec(),angular.forEach(i.awesomeThings,function(t){t.rank=Math.random()})}var i=this;i.awesomeThings=[],i.classAnimation="",i.creationDate=1441212884648,n()}angular.module("ooJS").controller("MainController",t),t.$inject=["$timeout","webDevTec"]}(),function(){"use strict";function t(t){t.debug("runBlock end")}angular.module("ooJS").run(t),t.$inject=["$log"]}(),function(){"use strict";angular.module("ooJS").constant("objectHelper",objectHelper).constant("Ruby",Ruby).constant("JavaScript",JavaScript).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t,e){t.debugEnabled(!0),e.options.timeOut=3e3,e.options.positionClass="toast-top-right",e.options.preventDuplicates=!0,e.options.progressBar=!0}angular.module("ooJS").config(t),t.$inject=["$logProvider","toastr"]}(),angular.module("ooJS").run(["$templateCache",function(t){t.put("app/components/navbar/navbar.html",'<md-toolbar flex="" layout="row" layout-align="center center"><section flex="" layout="row" layout-align="left center"><md-button href="#">Object-oriented playground</md-button></section></md-toolbar>'),t.put("app/components/objects/objects.html",'<h2>Inheritance</h2><p>Define JSON objects and how they inherit from each other. By default, each object inherits from all preceeding objects.</p><div layout="row" ng-repeat="jsonObject in o.jsonObjects track by $index"><md-input-container flex="35"><label>Object {{$index + 1}}</label> <textarea json-text="" ng-change="o.updateSnippet($index, jsonObject)" ng-model="jsonObject"></textarea></md-input-container><md-input-container flex="20"><md-select ng-model="o.inheritFromIndexes[$index]" ng-change="o.changePrototype($index); o.updateSnippet()" aria-label="prototype"><md-option value="-1">None (Object)</md-option><md-option ng-if="o.isValidPrototype(jsonObject, $index)" ng-repeat="option in o.jsonObjects track by $index" ng-value="$index">Object {{$index + 1}}</md-option></md-select></md-input-container><div layout="column" flex="45" class="accessible-properties"><p><md-tooltip md-direction="bottom">All accessible properties on object {{$index + 1}}</md-tooltip>{{o.accessibleProperties($index)}}</p></div><md-divider ng-if="!$last"></md-divider></div><md-button class="md-raised md-primary" ng-click="o.addObject()">Add Object</md-button><h2>Polymorphism</h2><p><b>Example:</b> Let us assume that that the above objects represent language blocks and its properties represent variable definitions. Then here is how the code snippet would look like in language:<md-input-container><md-select aria-label="language" name="language" ng-model="o.currentLanguageIndex" ng-change="o.updateSnippet()"><md-option ng-repeat="language in o.languages track by $index" value="{{$index}}">{{language.getName()}}</md-option></md-select></md-input-container><div hljs="" source="o.snippet"></div></p>')}]);