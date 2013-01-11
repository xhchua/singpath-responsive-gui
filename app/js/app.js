'use strict';

//var testing = window.location.search.replace("?testing=", "");
var testing = 'true';

var myApp = angular.module('myApp', ['ngResource', 'analytics']);

//All of the overrides for testing the controllers.
//Can change this to load a seapparate file(s) when testing.
//Everything in this test setup should have an E2E or other test 
if (testing=='true') {
	var myAppDev = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ngResource', 'analytics','ngMockE2E']);
	
  myAppDev.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('', {templateUrl: 'partials/landing.html', controller: IndexController});
    $routeProvider.when('/quests', {templateUrl: 'partials/quests.html', controller: IndexController});
    $routeProvider.when('/practice', {templateUrl: 'partials/practice.html', controller: IndexController});
    $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: IndexController});
    $routeProvider.when('/teach', {templateUrl: 'partials/teach.html', controller: IndexController});
    $routeProvider.otherwise({redirectTo: ''});
  }]);

	myAppDev.run(function($httpBackend) {
      
      var stories = [];
      var count = 1;
      var testStory = {name: 'test story', id:count, url:'ae_DKNwK_ms'};
      stories.push(testStory);
      
      $httpBackend.whenPOST('/jsonapi/add_story').respond(function(method, url, data) {
        var newStory = JSON.parse(data);
        count = count + 1;
        newStory['id'] = count;
        stories.push(newStory);      
        return [200,newStory];
    
      });
      
      //Generic Response to catch anything sent to the SingPath rest API
      //Should intercept anything to /jsonapi/rest/. Using a regular expression to match url
      $httpBackend.whenGET(/^\/jsonapi\/rest\//).respond(function(method, url, data) {
        //alert('method '+method+' url '+url + ' data '+data);      
        return [200,{"message":"Still under development"}];
      });

      $httpBackend.whenGET('/jsonapi/stories').respond(stories); 
      $httpBackend.whenGET('test_data/python_game.json').passThrough();
      
      $httpBackend.whenPOST('/jsonapi/log_access').respond({"message":"tesing logging"});


  		var player = { countryFlagURL: "/static/flags/sg_on.png",
  					   gender: "male",
  					   isoYear: 2010,
  					   countryCode: "SG",
  					   tags: ["SMU","hackerspacesg"],
  					   country: "Singapore",
  					   yearOfBirth: 1985,
  					   about: "I love Scifi",
  					   isoDay: 5,
  					   isoWeek: 6,
  					   isAdmin: true,
  					   gravatar: "http://www.gravatar.com/avatar/6e64bb2cab5367fd6e201df2aa722512/?default=&amp;s=80",
  					   location: "Singapore",
  					   rankings: [ ],
  					   player_id: 57754,
  					   professional: "1",
  					   nickname: "Ruijun",
  					   badges: [ ]
  					 }

  		$httpBackend.whenGET('/jsonapi/player').respond(player); 

  		var interfaces = {"interfaces": [{"singpathSupported": true, "description": "Python 2.5", "codeHighlightKey": "python", "editor": {"player_id": 57754, "nickname": "Chris", "email": "scboesch@gmail.com"}, "urls": ["http://python-gae-verifier.appspot.com/verify", "http://ideone-verifier.appspot.com/verify"], "exampleSolution": "spam=2\r\ndef addOne(x): \r\n  return x+1", "exampleTests": ">>> spam \r\n 2\r\n>>> addOne(2)\r\n 3\r\n>>> spam\r\n 3\r\n>>> addOne(2)\r\n 2\r\n", "id": 11020, "name": "Python"}, {"singpathSupported": false, "description": "Experimental Python Interface", "codeHighlightKey": "python", "editor": {"player_id": 57754, "nickname": "Chris", "email": "scboesch@gmail.com"}, "urls": ["http://pivotalapp.appspot.com/verify"], "exampleSolution": "b=2", "exampleTests": ">>> b \r\n 2", "id": 2254148, "name": "Development Python"}, {"singpathSupported": true, "description": "Java Interface", "codeHighlightKey": "Java", "editor": {"player_id": 57754, "nickname": "Chris", "email": "scboesch@gmail.com"}, "urls": ["http://parserplayground-staging.appspot.com/java", "http://parserplayground.appspot.com/java", "http://java-gae-verifier.appspot.com/java"], "exampleSolution": "int add(int x)\r\n{\r\n    return x+1;\r\n}\r\nString foo = \"foo\"; \r\nint b=1;\r\nchar[] charArray ={ 'a', 'b'};", "exampleTests": "assertEquals(add(0), 1); \r\nassertEquals(add(b), 2);\r\nassertTrue(true);\r\nassertFalse(false);\r\nassertEquals(foo, \"foo\");\r\nchar[] newArray ={ 'a', 'b'};\r\nassertArrayEquals(charArray, newArray);\r\nassertTrue(false);\r\nassertFalse(true);\r\nassertEquals(3.4, 3.4, 0.001); //Need a delta for floats.\r\n\r\n", "id": 2276166, "name": "Java"}, {"singpathSupported": false, "description": "Experimental Closure", "codeHighlightKey": "python", "editor": {"player_id": 57733, "nickname": "Mark Zuckerberg", "email": "pivotalexpert@gmail.com"}, "urls": ["http://pivotalapp.appspot.com/verify"], "exampleSolution": "b=2", "exampleTests": ">>> b \r\n 2", "id": 2292151, "name": "Closure"}, {"singpathSupported": true, "description": "Javascript Verifier", "codeHighlightKey": "Java", "editor": {"player_id": 57754, "nickname": "Chris", "email": "scboesch@gmail.com"}, "urls": ["http://javascriptverifier.appspot.com/javascript?id=1", "http://javascriptverifier.appspot.com/javascript?id=2"], "exampleSolution": "bar = \"Foo\";\r\nb=2;", "exampleTests": "assert_equal('This is a test', 'This is not a test');\r\nassert_equal(\"Foo\", bar);\r\nassert_equal(2,3);\r\nassert_equal(3,3);\r\nassert_equal(2,b);\r\nassert_equal(3.0001, 3.0002);", "id": 2293311, "name": "Javascript"}, {"singpathSupported": true, "description": "Ruby Verifier", "codeHighlightKey": "ruby", "editor": {"player_id": 57754, "nickname": "Chris", "email": "scboesch@gmail.com"}, "urls": ["http://rubyverifier.appspot.com/ruby?id=1", "http://rubyverifier.appspot.com/ruby?id=2"], "exampleSolution": "bar = \"foo\"\r\nisCool = true\r\ndef say_hello(name)\r\n  var = \"Hello, \" + name\r\n  return var\r\nend\r\n\r\naddResult = 2+3\r\n\r\nclass Person\r\n  attr_accessor :fname, :lname\r\nend", "exampleTests": "assert_equal(5,3)\r\nassert_equal(\"foo\", bar)\r\nassert_equal(true, isCool)\r\nassert_equal(\"Hello, John\",say_hello(\"John\"))\r\nassert_equal(5, addResult)", "id": 2447229, "name": "Ruby"}, {"singpathSupported": false, "description": "This is a Javascript based on Java GAE", "codeHighlightKey": "javascript", "editor": {"player_id": 1456051, "nickname": "wgx731", "email": "wgx731@gmail.com"}, "urls": ["http://wgx731lotrepls.appspot.com/javascript"], "exampleSolution": "bar = \"Foo\";\r\nb=2;", "exampleTests": "assert_equal('This is a test', 'This is not a test');\r\nassert_equal(\"Foo\", bar);\r\nassert_equal(2,3);\r\nassert_equal(3,3);\r\nassert_equal(2,b);\r\nassert_equal(3.0001, 3.0002);", "id": 6023053, "name": "Experimental Javascript"}, {"singpathSupported": false, "description": "This is a Ruby interface based on Java GAE", "codeHighlightKey": "ruby", "editor": {"player_id": 1456051, "nickname": "wgx731", "email": "wgx731@gmail.com"}, "urls": ["http://wgx731lotrepls.appspot.com/ruby"], "exampleSolution": "bar = \"foo\"\r\nisCool = true\r\ndef say_hello(name)\r\n  var = \"Hello, \" + name\r\nend\r\naddResult = 8\r\n", "exampleTests": "assert_equal(5,3)\r\nassert_equal(\"foo\", bar)\r\nassert_equal(true, isCool)\r\nassert_equal(\"Hello, John\",say_hello(\"John\"))\r\nassert_equal(5, addResult)", "id": 6032049, "name": "Experimental Ruby"}, {"singpathSupported": true, "description": "Python with db support", "codeHighlightKey": "python", "editor": {"player_id": 57754, "nickname": "Chris", "email": "scboesch@gmail.com"}, "urls": ["http://python-gae-verifier.appspot.com/verify"], "exampleSolution": "b=2\r\nclass Story(db.Model):\r\n    title = db.StringProperty()\r\n    body = db.TextProperty()\r\n    created = db.DateTimeProperty(auto_now_add=True)\r\n\r\nStory(title='Peter Pan').put()", "exampleTests": ">>> b \r\n 2\r\n>>> Story.all().count()\r\n 1\r\n>>> Story.all().filter('title = ', 'Peter Pan').count()\r\n  1\r\n>>> Story.all().filter('title = ', 'Barbie').count()\r\n  1", "id": 6326415, "name": "App Engine"}, {"singpathSupported": true, "description": "Objective-C Interface", "codeHighlightKey": "C", "editor": {"player_id": 57754, "nickname": "Chris", "email": "scboesch@gmail.com"}, "urls": ["http://184.73.56.51/cgi-bin/webserver.py"], "exampleSolution": "int b=2;\r\nfloat f = 123.45;\r\ndouble inches = 69.0/12;\r\nNSString *string1 = @\"This string is immutable\";\r\n\r\n//test function\r\nint addOne(int x) {\r\n  return x + 1;\r\n}\r\n\r\n//test macro\r\n#define mul(a,b) ((a)*(b))\r\n\r\n//test class\r\n@interface Rectangle: NSObject {\r\n    int width;\r\n    int height;\r\n}\r\n-(int) area;\r\n-(void) setWidth: (int) w;\r\n-(void) setHeight: (int) h;\r\n-(int) width;\r\n-(int) height;\r\n@end\r\n\r\n@implementation Rectangle\r\n-(int) area {\r\n    return width * height;\r\n}\r\n-(void) setWidth: (int) w {\r\n    width = w;\r\n}\r\n-(void) setHeight: (int) h {\r\n    height = h;\r\n}\r\n-(int) width {\r\n    return width;\r\n}\r\n-(int) height {\r\n    return height;\r\n}\r\n@end\r\n", "exampleTests": "AssertEquals(2, b);\r\nint expected_b = 2;\r\nAssertEquals(expected_b, b);\r\nAssertEquals((float)123.45, f);\r\nAssertEquals(69.0/12.0, inches);\r\nAssertEquals([NSString stringWithString:@\"This string is immutable\"], string1);\r\n\r\nAssertEquals(4, addOne(3));\r\nAssertEquals(42, mul(6, 7));\r\n\r\nRectangle *r = [[Rectangle alloc] init];\r\n[r setWidth: 11];\r\n[r setHeight: 18];\r\nAssertEquals(198, [r area]);\r\n", "id": 6569721, "name": "Objective-C"}, {"singpathSupported": true, "description": "PHP verifier test", "codeHighlightKey": "PHP", "editor": {"player_id": 1456051, "nickname": "wgx731", "email": "wgx731@gmail.com"}, "urls": ["http://wgx731lotrepls.appspot.com/script.php"], "exampleSolution": "$b = 2;\r\n$s = \"Hello World\";\r\n$s = str_replace('o','1',$s);\r\nfunction addOne($m){\r\n   return $m + 1;\r\n}", "exampleTests": "assert_equal(1,true);\r\nassert_equal($b,'d');\r\nassert_equal($b,2);\r\nassert_equal($s,'Hello World');\r\nassert_equal($s,'Hell1 W1rld');\r\nassert_equal(addOne($b),3);\r\n", "id": 6842348, "name": "PHP"}, {"singpathSupported": true, "description": "JSP Verifier", "codeHighlightKey": "java", "editor": {"player_id": 930010, "nickname": "masotime", "email": "masotime@gmail.com"}, "urls": ["http://jsp-verifier.dyndns.org/cgi-bin/verifier.py"], "exampleSolution": "<%@ page import=\"java.util.*, java.text.*\" %>\r\n<HTML>\r\n<HEAD>\r\n<TITLE>Hello Pineapples</TITLE>\r\n</HEAD>\r\n<BODY>\r\n\t<H1>Hello World</H1>\r\n\t<TABLE>\r\n\t\t<TR>\r\n\t\t\t<TD>\r\n\t\t\t\t<P>\r\n\t\t\t\t\tThis is an <B>embedded</B> table\r\n\t\t\t\t</P>\r\n\t\t\t</TD>\r\n\t\t</TR>\r\n\t\t<TR>\r\n\t\t\t<TD>\r\n\t\t\t\tThe request parameter 'fruit' has a value of <%= request.getParameter(\"fruit\") %>\r\n\t\t\t</TD>\r\n\t\t</TR>\r\n\t</TABLE>\r\n\tToday is: <%= new SimpleDateFormat(\"dd/MM/yyyy\").format(new Date()) %>\r\n</BODY>\r\n</HTML>", "exampleTests": "page().shouldHaveTitle(\"Hello Pineapples\"); \r\nonRequest(\"fruit\", \"guava\").page().shouldContain(\"The request parameter 'fruit' has a value of guava\");\r\npage().shouldContainElement(\"//TABLE/TR/TD/P/B\");\r\n", "id": 8680122, "name": "Java Server Pages"}], "type": "interfaces"}

  		$httpBackend.whenGET('/jsonapi/interfaces').respond(player);
      //$httpBackend.whenGET('partials/quests.html').passThrough();
      //Pass through any request for partials
      $httpBackend.whenGET(/^partials/).passThrough();
      
	});
}
