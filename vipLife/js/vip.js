function checkVIPInfoForm(form){
	var ok1 = checkTrueName();
	var ok2 = checkIDCodeInfo();
	var ok3 = checkEmailInfo(true);
	var ok4 = checkTelephoneInfo();
	var ok5 = checkMobilephoneInfo();
	var ok10 = checkProvinceCity();
	var ok6 = checkAddressInfo();
	var ok7 = checkZipCodeInfo();
	var ok8 = checkBirthInfo();
	var ok9 = checkMainGameInfo();
	if(ok1 && ok2 && ok3 && ok4 && ok5 && ok6 && ok7 && ok8 && ok9 && ok10)
	{
		return true;
	}
	return false;
}

//检查游戏信息
function checkMainGameInfo(){
	var games = $("#maingame").val();
	$("#maingamestatus").removeClass("right");
	$("#maingamestatus").removeClass("wrong");
	if(games != null && games.length <=0)
	{
		$("#maingamestatus").addClass("wrong");
		$("#maingamestatus").html("请选择主要使用产品");
		return false;
	}
	$("#maingamestatus").addClass("right");
	$("#maingamestatus").html("");
	return true;
}

//检查城市信息
function checkProvinceCity(){
	var provc = $("#vip_province").val();
	var city = $("#vip_city").val();
	$("#addressstatus").removeClass("right");
	$("#addressstatus").removeClass("wrong");
	if(isNull(provc) ||  provc=="请选择")
	{
		$("#addressstatus").addClass("wrong");
		$("#addressstatus").html("请选择省份和城市信息");
		return false;
	}
	$("#addressstatus").addClass("right");
	$("#addressstatus").html("");
	return true;
}

//检查生日信息
function checkBirthInfo(){
	$("#birthstatus").removeClass("right");
	$("#birthstatus").removeClass("wrong");
	var year = $("#vip_birthyear").val();
	var month = $("#vip_birthmonth").val();
	var day = $("#vip_birthday").val();
	if(isNull(year)||isNull(month)||isNull(day) || month=="--" || day == "--"){
		$("#birthstatus").addClass("wrong");
		$("#birthstatus").html("出生日期不能为空！");
		return false;
	}
	var current = new Date();
	var toyear = current.getFullYear();
	var today = current.getDate();
	var tomonth = current.getMonth()+1;
	if(year>=toyear){
		if(month>tomonth || (month==tomonth && day>=today)){
			$("#birthstatus").addClass("wrong");
			$("#birthstatus").html("出生时间不能大于当前时间！");
			return false;
		}	
	}
	$("#birthstatus").addClass("right");
	$("#birthstatus").html("√ 生日当天可以获取一份惊喜");
	return true;
}

//检查真实姓名
function checkTrueName(){
	$("#truenamestatus").removeClass("right");
	$("#truenamestatus").removeClass("wrong");
	var fullname = $("#vip_truename").val();
	if(isNull(fullname)){
		$("#truenamestatus").addClass("wrong");
		$("#truenamestatus").html("真实姓名不能为空!");
		return false;
	}
	if(fullname.length>16){
		$("#truenamestatus").addClass("wrong");
		$("#truenamestatus").html("真实姓名不能超过16个字!");
		return false;
	}
	$("#truenamestatus").addClass("right");	
	$("#truenamestatus").html("√");
	return true;
}


//检查邮箱信息
function checkEmailInfo(checkYahoo){
	$("#emailstatus").removeClass("wrong");
	$("#emailstatus").removeClass("right");
	var email = $("#vip_email").val();	
	if(isNull(email)){
		$("#emailstatus").addClass("wrong");
		$("#emailstatus").html("电子邮件不能为空！");
		return false;
	}
	if(email.length>64){
		$("#emailstatus").addClass("wrong");
		$("#emailstatus").html("电子邮件不能超过64个字母!");
		return false;
	}
	if(!checkEmail(email)){
		$("#emailstatus").addClass("wrong");
		$("#emailstatus").html("电子邮件地址格式不对！");
		return false;
	}
	if(checkYahoo ||checkYahoo == "true"){
		if(isYahooEmail(email)){
			$("#emailstatus").addClass("wrong");
			$("#emailstatus").html("雅虎邮箱于2013年8月19日停止服务，请填写其他邮箱！");
			return false;
		}
	}
	$("#emailstatus").addClass("right");
	$("#emailstatus").html("√");
	return true;
}

//检查地址信息
function checkAddressInfo(){
	var result = checkProvinceCity();
	if(!result) return false;
	$("#addressstatus").html("√");
	return true;
}

//检查邮编信息
function checkZipCodeInfo(){
	$("#zipcodestatus").removeClass("wrong");
	$("#zipcodestatus").removeClass("right");
	var zipcode = $("#vip_zipcode").val();	
	if(isNull(zipcode)){
		$("#zipcodestatus").addClass("wrong");
		$("#zipcodestatus").html("邮编不能为空！");
		return false;
	}
	if(!checkZipcode(zipcode)){
		$("#zipcodestatus").addClass("wrong");
		$("#zipcodestatus").html("邮编不符合规则！");
		return false;
	}
	$("#zipcodestatus").addClass("right");
	$("#zipcodestatus").html("√");
	return true;
}

function checkInfoForm(form){
	var fullname = form.fullname.value;
	//alert("fullname: "+fullname);
	if(isNull(fullname)){
		alert("真实姓名不能为空！");
		return false;
	}
	if(fullname.length>16){
		alert("真实姓名不能超过16个字!");
		return false;
	}
	var idcard = form.idcard.value;
	//alert("idcard: "+idcard);
	if(isNull(idcard)){
		alert("身份证号不能为空！");
		return false;
	}
	if(checkIDcard(idcard)!=0){
		alert("身份证号无效！");
		return false;
	}
	var mobilephone = form.mobilephone.value;
	//alert("mobilephone: "+mobilephone);
	if(isNull(mobilephone)){
		alert("手机号码不能为空！");
		return false;
	}
	if(!checkMobilephone(mobilephone)){
		alert("手机号码格式不对！");
		return false;
	}
	var email = form.email.value;
	//alert("email: "+email);
	if(isNull(email)){
		alert("电子邮件不能为空！");
		return false;
	}
	if(email.length>32){
		alert("电子邮件不能超过32个字母!");
		return false;
	}
	if(!checkEmail(email)){
		alert("电子邮件地址格式不对！");
		return false;
	}
	var telephone = form.telephone.value
	//alert("telephone: "+telephone);
	if(!isNull(telephone)){
		//alert("联系电话不能为空！");
		//return true;
	
	if(!checkTelephone(telephone)){
		alert("电话号码格式不对！");
		return false;
	}
	}
	var address = form.address.value;
	var zipcode = form.zipcode.value;
	//alert("zipcode: "+form.zipcode.value);
	if(isNull(zipcode)){
		alert("邮编不能为空！");
		return false;
	}
	if(!checkZipcode(zipcode)){
		alert("邮编不符合规则！");
		return false;
	}
	form.submit();
	return true;
}

//检查字符串是否为空
function isNull(value){
	if(value==null||trim(value)==""){
		return true;
	}else{
		return false;
	}
}

function checkIDCode(idCode) {
	if(idCode!=null)
		idCode = trim(idCode);
	if(idCode.length<8 || idCode.length >18){
		return false;
	}
	var substr = idCode.substring(0,idCode.length-1);
	var last = idCode.substring(idCode.length-1);
	var re = /^\d+(\.\d+)?$/;
	if(!re.test(trim(substr))){
		return false;
	}
	if(isNaN(last) && last!= 'X' && last!= 'x'){
		return false;
	}
	return true;
}

//检查电子邮箱地址是否符合规则
function checkEmail(email){
	if(email!=null)
		email = trim(email);
	var str,re;
  	re=/([\w|-]+[\.?\w|-]*@[\w|-]+\.[\w|-]+)(\.?[\w|-]*)(\.?[\w|-]*)/i;

  	re.exec(trim(email));
  	if(RegExp.$3!=""&&RegExp.$3!="."&&RegExp.$2!=".")
    	str=RegExp.$1+RegExp.$2+RegExp.$3;
  	else if(RegExp.$2!=""&&RegExp.$2!=".")
   		str=RegExp.$1+RegExp.$2 ;
  	else
    	str=RegExp.$1 ;
  	if(str==trim(email)){
  		return true;
  	}
  	return false;
}
//检查邮箱是否以yahoo.com.cn结尾，从2013年8月19号开始雅虎邮箱停止服务
function isYahooEmail(email){
	var key = "@yahoo.com.cn";
	var key2 = "@yahoo.cn";
	var index = email.toLowerCase().indexOf(key);
	if(index>=0){
		return true;
	}else{
		var index2 = email.toLowerCase().indexOf(key2);
		if(index2>=0){
			return true;
		}
	}
	return false;
}

//检查固定电话号码是否符合规则："区号-固话号码"
function checkTelephone(telephone){
	if(telephone!=null)
		telephone = trim(telephone);
	var reg = /^(0[0-9]{2,3})-(\d{7,8})$/g;
	return reg.test(telephone);
}

//检查手机号码是否符合规则
function checkMobilephone(mobilephone){
	if(mobilephone!=null)
		mobilephone = trim(mobilephone);
	var reg = /^1[0-9]{10}$/;
	return reg.test(mobilephone);
}

//检查邮政编码是否符合规则
function checkZipcode(zipcode){
	if(zipcode!=null)
		zipcode = trim(zipcode);
	var reg = /^(\d){6}$/;
	return reg.test(zipcode);
}

//去掉字符串两端的空白字符
function trim(str){  
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function generateYears() {
	var date = new Date();
	var currentYear = date.getFullYear();
	var years = new Array(currentYear-1900+1);
	for(var i= currentYear,j=0;i>=1900;i--){
		years[j] = i;
		j++;
	}
	return years;
}

function generateMonths(){
	var months = new Array(13);
	months[0] = "--";
	for(var j=12,i=1;j>=1;j--)
	{
		months[i] = j;
		i++;
	}
	return months;
}

function generateDays(year,month){
	var date = new Date();
	if(year==null || year == undefined || month == null || month == undefined || month == "--"){
		date = new Date();
	}else{
		date = new Date(year,month);
	}
	var dayNum = new Date(date.getFullYear(),date.getMonth(),0).getDate();
	//console.log(dayNum);
	var days = new Array(dayNum+1);
	days[0] = "--";
	for(var i=dayNum, j=1; i>=1; i--){
		days[j] = i;
		j++;
	}
	return days;
}
