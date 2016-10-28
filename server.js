function Article(t, c, w) {

	this.num = 0;
	this.title = t;
	this.content = c;
	this.writer = w;
	this.readCount = 0;

}

//article repository 객체
//function ArticleRepository() {
//	
//	var articleNum = 0; //자동 글번호 증가 및 적용에 사용
//	var articles = []; //글목록 저장에 사용
//	
//	this.getArticleNum = function() {
//		
//		return articleNum;
//		
//	};
//	
//	this.setArticleNum = function(n) {
//		
//		articleNum = n;
//		
//	};
//	
//	this.getArticles = function() {
//		
//		return articles;
//		
//	};
//	
//}

//article dao 객체
function ArticleDao() {
	
//	var repository = new ArticleRepository();
		
//	글저장 dao 메서드
	this.saveDao = function(article, callback) {
	
		var isSuccess;
		
		try {			
//			repository.setArticleNum(repository.getArticleNum() + 1);
//			article.num = repository.getArticleNum();			
//			repository.getArticles().push(article);
			
			var sql = 'insert into articles(title, content, writer) values(?, ?, ?)';
			var values = [article.title, article.content, article.writer];
			
			db.query(sql, values, function(error, result) {
				
				console.log('result = ' + result);
				
				if(error) {
					isSuccess = { message : false };
				} else {
					isSuccess = { message : true };					
				}
				
				callback(isSuccess);
			});			
		} catch(e) {
			console.log('ArticleDao 객체 : saveDao 메서드에서 예외 발생');
			console.log(e.message);
			isSuccess = { message : false };
			return isSuccess;
		}
		
	};	
	
//	글목록 dao 메서드
	this.selectAllDao = function(callback) {
		
		var send_articles;
		
		try {
//			send_articles = repository.getArticles();
			
			var sql = 'select * from articles';
			
			db.query(sql, function(error, result) {
				if(!error) {
					send_articles = result;
				}
				callback(send_articles);
			});	
		} catch(e) {
			console.log('ArticleDao 객체 : selectAllDao 메서드에서 예외 발생');
			console.log(e.message);
			send_articles = undefined;
			return send_articles;
		}		
		
	};
	
//	글조회 dao 메서드
	this.selectOneDao = function(num, callback) {
	
		var send_article;
		
		try {
//			var articles = repository.getArticles();
//			
//			for(var i = 0 ; i < articles.length ; i++) {								
//				if(articles[i].num === num) {
//					var new_readCount = articles[i].readCount + 1;
//					send_article = articles[i];
//					break;
//				}
//			}
			
			var sql = 'select * from articles where num = ?';
			var values = [num];
			
			db.query(sql, values, function(error, result) {
				if(!error) {
					send_articles = result;
				}
				callback(send_articles);
			});
		} catch(e) {
			console.log('ArticleDao 객체 : selectOneDao 메서드에서 예외 발생');
			console.log(e.message);
			send_article = undefined;
			return send_article;
		}		
		

	};
	
//	글삭제 dao 메서드
	this.deleteDao = function(num, callback) {
	
		var isSuccess;
		
		try {
//			var articles = repository.getArticles();
//			
//			console.log('삭제할 글 번호 : ' + num);
//			
//			for(var i = 0 ; i < articles.length ; i++) {								
//				if(articles[i].num === num) {
//					articles.splice(i, 1);
//					isSuccess = { message : true };
//					break;
//				}
//			}
			
			var sql = 'delete from articles where num = ?';
			var values = [num];
			
			db.query(sql, values, function(error, result) {
				
				console.log('result = ' + result);
				
				if(!error) {
					isSuccess = { message : true };
				}
				callback(isSuccess);
			});			
		} catch(e) {
			console.log('ArticleDao 객체 : selectOneDao 메서드에서 예외 발생');
			console.log(e.message);
			isSuccess = { message : false };
			return isSuccess;
		}		
		
//		return isSuccess;
		
	};
	
//update
	this.updateDao  = function(article, callback){
		
		var isSuccess = false;
		
		try{
						
			var sql = 'update articles set title = ?, content = ?, writer =? where num =?';
			var values = [article.title, article.content, article.writer, article.num];
				
			db.query(sql, values, function(error, result) {
				
				console.log('result = ' + result);
				
				if(!error) {
					isSuccess = { message : true };
				}
				callback(isSuccess);
			});			
			
		}catch(e){
			console.log('ArticleDao 객체 : updateDao 메서드에서 예외 발생');
			console.log(e.message);
			isSuccess = { message : false };
			return isSuccess;
		}
		
//		return isSuccess;
	};
	
}

//article controller 객체
var ArticleController = function() {

	var dao = new ArticleDao();

//	글저장 controller 메서드
	this.requestSave = function(article, callback) {
				
		var isSuccess = dao.saveDao(article, callback);
		return isSuccess;
		
	};
	
//	글목록 controller 메서드
	this.requestSelectAll = function(callback) {
				
		var send_articles = dao.selectAllDao(callback);
		return send_articles;		
	};
	
//	글조회 controller 메서드
	this.requestSelectOne = function(num, callback) {
				
		var send_article = dao.selectOneDao(num, callback);
		return send_article;
		
	};
	
//	글삭제 controller 메서드
	this.requestDelete = function(num, callback) {
				
		var isSuccess = dao.deleteDao(num, callback);
		return isSuccess;
		
	};
	
// 글 수정 controller
	this.requestUpdate = function(article, callback){
		
		var isSuccess = dao.updateDao(article, callback);
		return isSuccess;
	};
	
};

//Node 서버 및 라우터
var http = require('http');
var express = require('express');
var mysql = require('mysql');

var db = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : '1234',
	database : 'articledb'
});

var app = express();
app.use(express.static('public'));

app.use(app.router);

http.createServer(app).listen(3000, function() {
	
	console.log('웹서버 실행 중...http://127.0.0.1:3000');
	
});

var articleController = new ArticleController();

app.all('/save', function(req, res) {
	
	console.log('/save 를 요청 받음.');	
	var title = req.param('title');
	var content = req.param('content');
	var writer = req.param('writer');
	
	console.log('title = ' + title);
	console.log('content = ' + content);
	console.log('content = ' + content);	
	
	var article = new Article(title, content, writer);
	
	articleController.requestSave(article, function(isSuccess){
		
		 console.log('응답 데이터');
		    var output = '';
		    output += '<?xml version="1.0" encoding="UTF-8" ?>';  
		    output += '<message>';
		    output += isSuccess.message;
		    output += '</message>';
		    console.log(output);
		    res.type('text/xml'); //<- 반드시 기술해야 함. 
		    res.send(output);    
		
	});
	
//	1. json 방식
//	console.log('응답 데이터');
//	console.log(isSuccess);
//	res.send(isSuccess);
	
//	2. xml 방식
   
	
});

app.all('/selectAll', function(req, res) {
	
	console.log('/selectAll 를 요청 받음.');
	
	articleController.requestSelectAll(function(send_articles){
		console.log('응답 데이터');
		var output = '';
	    output += '<?xml version="1.0" encoding="UTF-8" ?>';
	    output += '<articles>';
	    send_articles.forEach(function (article) {
	        output += '<article>';
	        output += '<num>' + article.num + '</num>';
	        output += '<title>' + article.title + '</title>';
	        output += '<writer>' + article.writer + '</writer>';
	        output += '<readcount>' + article.readCount + '</readcount>';
	        output += '</article>';
	    });    
	    output += '</articles>';
		console.log(output);
		res.type('text/xml');    
	    res.send(output);
		
	});
	
//	1. json 방식
//	console.log('응답 데이터');
//	console.log(send_articles);	
//	res.send(send_articles);
	
//	2. xml 방식	
	/*console.log('응답 데이터');
	var output = '';
    output += '<?xml version="1.0" encoding="UTF-8" ?>';
    output += '<articles>';
    send_articles.forEach(function (article) {
        output += '<article>';
        output += '<num>' + article.num + '</num>';
        output += '<title>' + article.title + '</title>';
        output += '<writer>' + article.writer + '</writer>';
        output += '<readcount>' + article.readCount + '</readcount>';
        output += '</article>';
    });    
    output += '</articles>';
	console.log(output);
	res.type('text/xml');    
    res.send(output);*/
	
});

app.all('/selectOne', function(req, res) {
	
	console.log('/selectOne 를 요청 받음.');
	var num = parseInt(req.param('num'));
//	var send_article = articleController.requestSelectOne(num);
	articleController.requestSelectOne(num, function(send_article){
		
		console.log('응답 데이터');
		console.log(send_article);
		
		var output = '';
	    output += '<?xml version="1.0" encoding="UTF-8" ?>';
	    output += '<articles>';
	    send_article.forEach(function (article) {
	    output += '<article>';
	    output += '<num>' + article.num + '</num>';
	    output += '<title>' + article.title + '</title>';
	    output += '<content>' + article.content + '</content>';
	    output += '<writer>' + article.writer + '</writer>';
	    output += '<readcount>' + article.readCount + '</readcount>';
	    output += '</article>';
	    }); 
	    output += '</articles>';
		console.log(output);
		res.type('text/xml');    
	    res.send(output);
		
	});
	
//	1. json 방식
//	console.log('응답 데이터');
//	console.log(send_article);	
//	res.send(send_article);
	
//	2. xml 방식	
	/*console.log('응답 데이터');
	var output = '';
    output += '<?xml version="1.0" encoding="UTF-8" ?>';
    output += '<article>';
    output += '<num>' + send_article.num + '</num>';
    output += '<title>' + send_article.title + '</title>';
    output += '<content>' + send_article.content + '</content>';
    output += '<writer>' + send_article.writer + '</writer>';
    output += '<readcount>' + send_article.readCount + '</readcount>';
    output += '</article>';
	console.log(output);
	res.type('text/xml');    
    res.send(output);*/
	
});

app.all('/delete', function(req, res) {
	
	console.log('/delete 를 요청 받음.');	
	var num = parseInt(req.param('num'));
	
	articleController.requestDelete(num, function(isSuccess){
		
		   console.log('응답 데이터');
		    var output = '';
		    output += '<?xml version="1.0" encoding="UTF-8" ?>';  
		    output += '<message>';
		    output += isSuccess.message;
		    output += '</message>';
		    console.log(output);
		    res.type('text/xml'); //<- 반드시 기술해야 함. 
		    res.send(output);
		
	});

	
//	1. json 방식
//	console.log('응답 데이터');
//	console.log(isSuccess);
//	res.send(isSuccess);
	
//	2. xml 방식
 
	
});

app.all('/update', function(req, res) {
	
	console.log('/update 를 요청 받음.');	
	
	var num = parseInt(req.param('num'));
	var title = req.param('title');
	var content = req.param('content');
	var writer = req.param('writer');

	var article = new Article(title, content, writer);

	console.log(article);
	articleController.requestUpdate(article, function(isSuccess){
		
		console.log(isSuccess);
		var output = '';
		output += '<?xml version="1.0" encoding="UTF-8" ?>';
		output += '<message>';
		output += isSuccess.message;
		output += '</message>';
		
		console.log('응답 데이터');
		console.log(output);
		res.type('text/xml');
		res.send(output);
		
	});
	
	/*var output = '';
	output += '<?xml version="1.0" encoding="UTF-8" ?>';
	output += '<message>';
	output += isSuccess.message;
	output += '</message>';
	
	console.log('응답 데이터');
	console.log(output);
	res.type('text/xml');
	res.send(output);*/
	
});

app.all('/', function(req, res) {
	
	res.redirect('view/article/selectAllView.html');
	
});