// conf/db.js
// MySQL数据库联接配置
module.exports = {
	mysql: {
		//数据库
		host: '127.0.0.1', 
		user: 'root',
		password: '',
		database:'nwafu', // 前面建的user表位于这个数据库中
		port: 3306,
		charset:'UTF8_GENERAL_CI'
	}
};