//article domain 객체
function Article(t, c, w) {

	this.num = 0;
	this.title = t; 
	this.content = c;
	this.writer = w;
	this.readCount = 0;
	
}

//article dao 객체
function ArticleDao() {
	
//	글저장 dao 메서드
	this.saveDao = function(article) {
				
		var isSuccess;
		
		try{	
			//요청 정보를 설정 및 서버 호출
//1. XHR 방식
/*			var requestString = '/save?title=' + article.getTitle() + '&content=' + article.getContent() + '&writer=' + article.getWriter();						
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();
			
//			1. json 방식
//			isSuccess = eval('(' + request.responseText + ')');	
			
//			2. xml 방식
			var xml = request.responseXML;
			var messageValue = xml.getElementsByTagName('message')[0].childNodes[0].nodeValue;
			isSuccess= eval('(' + messageValue + ')');
			
//			3. xml2json 방식(주의 : 변환된 JSON(자바스크립트 객체)의 속성 값은 모두 string으로 변환된다.)
//			var json = xml2json.parser(request.responseText);
//			console.log(json);
//			isSuccess = json.message;
*/
//2. jQuery Ajax 방식	
			$.ajax({
                url: '/save',
                async : false,
                type: 'get',               
//                data: {
//                    title: article.getTitle(),
//                    content: article.getContent(),
//                    writer: article.getWriter()
//                },
                data : article,
                dataType: 'xml', //서버에서 보내오는 데이터 타입
                success: function (data) {
                	console.log(data);
                	var messageValue =$(data).find('message').text();
                	console.log(messageValue + ", " + typeof(messageValue));
                	isSuccess = eval('(' + messageValue + ')');
                	console.log(isSuccess + ", " + typeof(isSuccess));
                }
            });
		} catch(e) {
			console.log('ArticleDao 객체 : saveDao 메서드에서 예외 발생');
			console.log(e.message);
			isSuccess = undefined;
		}
		
		return isSuccess;
		
	};
	
//	글목록 dao 메서드
	this.selectAllDao = function() {
				
		var articles = [];
		
		try{
			//요청 정보를 설정 및 서버 호출
			var requestString = '/selectAll';
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();			
			
//			요청 결과(동기식 결과 받음)를 응답받는 것을 출력
//			1. json 방식
//			articles = eval('(' + request.responseText + ')');
			
//			2.xml 방식
			var xml = request.responseXML;			
			var xml_articles = xml.getElementsByTagName('article');

            for (var i = 0; i < xml_articles.length; i++) {            	
            	var article = {
            		num : xml_articles[i].childNodes[0].childNodes[0].nodeValue,
            		title : xml_articles[i].childNodes[1].childNodes[0].nodeValue,
            		writer : xml_articles[i].childNodes[2].childNodes[0].nodeValue,
            		readCount : xml_articles[i].childNodes[3].childNodes[0].nodeValue
            	};
            	
            	articles.push(article);
            }
			
		} catch(e) {
			console.log('ArticleDao 객체 : selectAllDao 메서드에서 예외 발생');
			console.log(e.message);
			articles = undefined;
		}	
		
		return articles;
		
	};
	
//	글조회 dao 메서드
	this.selectOneDao = function(num) {
				
		var article;
		
		try{
			//요청 정보를 설정 및 서버 호출
			var requestString = '/selectOne?num=' + num;
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();	
			
			//요청 결과(동기식 결과 받음)를 응답받는 것을 출력
//			1. json 방식
//			article = eval('(' + request.responseText + ')');
			
//			2.xml 방식
			var xml = request.responseXML;			
			var xml_articles = xml.getElementsByTagName('article');
                    	
            article = {
        		num : xml_articles[0].childNodes[0].childNodes[0].nodeValue,
        		title : xml_articles[0].childNodes[1].childNodes[0].nodeValue,
        		content : xml_articles[0].childNodes[2].childNodes[0].nodeValue,
        		writer : xml_articles[0].childNodes[3].childNodes[0].nodeValue,
        		readCount : xml_articles[0].childNodes[4].childNodes[0].nodeValue
        	};		
		} catch(e) {
			console.log('ArticleDao 객체 : selectOneDao 메서드에서 예외 발생');
			console.log(e.message);
			article = undefined;
		}	
		
		return article;
		
	};
	
//	글수정 dao 메서드
	this.updateDao = function(article) {
		var isSuccess = false;

		try{
			//xml -> jquery
			/*$.ajax({
				url: '/update',
				async : false,
				type: 'get',
				data: {
					num :  article.num(), 
					title : article.title(),
					content : article.content(),
					writer : article.writer(),
					readCount : article.readCount()
				},

				dataType: 'xml', //서버에서 보내오는 데이터 타입
				success: function (data) {
					console.log(data);
					var messageValue =$(data).find('message').text();
					console.log(messageValue + ", " + typeof(messageValue));
					isSuccess = eval('(' + messageValue + ')');
					console.log(isSuccess + ", " + typeof(isSuccess));
				}
			});*/


			
			//요청 정보를 설정 및 서버 호출
			var requestString = '/update';
			requestString = requestString+ '?num=' + article.num();
			requestString = requestString+ '&title=' + article.title();
			requestString = requestString+ '&content=' + article.content();
			requestString = requestString+ '&writer=' + article.writer();

			alert(requestString);

			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();

			var xml = request.responseXML;

			 // 데이터를 가공합니다.
			var messages = xml.getElementsByTagName('message');
			var isSuccessString = messages[0].childNodes[0].nodeValue;
			var isSuccess = eval('(' + isSuccessString + ')');

			console.log(isSuccess);
			
			
//			isSuccess = eval('(' + request.responseText + ')');			
		} catch(e) {
			console.log('ArticleDao 객체 : updateDao 메서드에서 예외 발생');
			console.log(e.message);
		}

		return isSuccess;
		
	};
	
//	글삭제 dao 메서드
	this.deleteDao = function(num) {
				
		var isSuccess;
		
		try{	
			//요청 정보를 설정 및 서버 호출
			var requestString = '/delete?num=' + num;						
			var request = new XMLHttpRequest();
			request.open('GET', requestString, false);
			request.send();
			
//			1. json 방식
//			isSuccess = eval('(' + request.responseText + ')');	
			
//			2. xml 방식
			var xml = request.responseXML;
			var messageValue = xml.getElementsByTagName('message')[0].childNodes[0].nodeValue;
			isSuccess= eval('(' + messageValue + ')');
		} catch(e) {
			console.log('ArticleDao 객체 : deleteDao 메서드에서 예외 발생');
			console.log(e.message);
			isSuccess = false;
		}
		
		return isSuccess;
		
	};
	
}

//article controller 객체
function ArticleController() {

	var dao = new ArticleDao();	
	
//	글쓰기뷰 controller 메서드
	this.requestWriteView = function() {
		
		document.location = "writeView.html";
		
	};
	
//	글저장 controller 메서드
	this.requestSave = function(article) {
		
		var isSuccess = dao.saveDao(article);
		
		if(isSuccess === true) {
			alert('글 저장 성공');
		} else {
			alert('글 저장 실패');
		}
		
	document.location = 'selectAllView.html';
		
	};
	
//	글목록 controller 메서드
	this.requestSelectAll = function() {
		
		var articles = dao.selectAllDao();
		return articles;
		
	};
	
//	글조회 controller 메서드
	this.requestSelectOne = function(num) {
		
		var article = dao.selectOneDao(num);
		
		var requestUrl = 'selectOneView.html';
		requestUrl = requestUrl + '?num=' + article.num;
		requestUrl = requestUrl + '&title=' + article.title;
		requestUrl = requestUrl + '&content=' + article.content;
		requestUrl = requestUrl + '&writer=' + article.writer;
		requestUrl = requestUrl + '&readCount=' + article.readCount;		
		
		document.location = requestUrl;
		
	};
	
//	글목록뷰 controller 메서드
	this.requestSelectAllView = function() {
		
		document.location = 'selectAllView.html';
		
	};
	
//	글수정 controller 메서드
	this.requestUpdate = function(article) {

		var isSuccess = dao.updateDao(article);

		if(isSuccess = true) {
			alert('글  수정 성공');
		} else {
			alert('글 수정 실패');
		}

		document.location = 'selectAllView.html';

		
	};
	
//	글삭제 controller 메서드
	this.requestDelete = function(num) {
		
		var isSuccess = dao.deleteDao(num);
		
		if(isSuccess === true) {
			alert('글 삭제 성공');
		} else {
			alert('글 삭제 실패');
		}
		
		document.location = 'selectAllView.html';
		
	};
	
}

//controller 객체(static)
var Controllers = function() {
		
};

Controllers.articleController = new ArticleController();

Controllers.getArticleController = function() {

	return Controllers.articleController;

};