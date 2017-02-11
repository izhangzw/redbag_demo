//Fastclick
function FastClick(e){"use strict";var t,n=this;this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=10;this.layer=e;if(!e||!e.nodeType){throw new TypeError("Layer must be a document node")}this.onClick=function(){return FastClick.prototype.onClick.apply(n,arguments)};this.onMouse=function(){return FastClick.prototype.onMouse.apply(n,arguments)};this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(n,arguments)};this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(n,arguments)};this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(n,arguments)};if(FastClick.notNeeded(e)){return}if(this.deviceIsAndroid){e.addEventListener("mouseover",this.onMouse,true);e.addEventListener("mousedown",this.onMouse,true);e.addEventListener("mouseup",this.onMouse,true)}e.addEventListener("click",this.onClick,true);e.addEventListener("touchstart",this.onTouchStart,false);e.addEventListener("touchend",this.onTouchEnd,false);e.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){e.removeEventListener=function(t,n,r){var i=Node.prototype.removeEventListener;if(t==="click"){i.call(e,t,n.hijacked||n,r)}else{i.call(e,t,n,r)}};e.addEventListener=function(t,n,r){var i=Node.prototype.addEventListener;if(t==="click"){i.call(e,t,n.hijacked||(n.hijacked=function(e){if(!e.propagationStopped){n(e)}}),r)}else{i.call(e,t,n,r)}}}if(typeof e.onclick==="function"){t=e.onclick;e.addEventListener("click",function(e){t(e)},false);e.onclick=null}}FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent);FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);FastClick.prototype.needsClick=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled){return true}break;case"input":if(this.deviceIsIOS&&e.type==="file"||e.disabled){return true}break;case"label":case"video":return true}return/\bneedsclick\b/.test(e.className)};FastClick.prototype.needsFocus=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"textarea":case"select":return true;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}};FastClick.prototype.sendClick=function(e,t){"use strict";var n,r;if(document.activeElement&&document.activeElement!==e){document.activeElement.blur()}r=t.changedTouches[0];n=document.createEvent("MouseEvents");n.initMouseEvent("click",true,true,window,1,r.screenX,r.screenY,r.clientX,r.clientY,false,false,false,false,0,null);n.forwardedTouchEvent=true;e.dispatchEvent(n)};FastClick.prototype.focus=function(e){"use strict";var t;if(this.deviceIsIOS&&e.setSelectionRange){t=e.value.length;e.setSelectionRange(t,t)}else{e.focus()}};FastClick.prototype.updateScrollParent=function(e){"use strict";var t,n;t=e.fastClickScrollParent;if(!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n;e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}if(t){t.fastClickLastScrollTop=t.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(e){"use strict";if(e.nodeType===Node.TEXT_NODE){return e.parentNode}return e};FastClick.prototype.onTouchStart=function(e){"use strict";var t,n,r;if(e.targetTouches.length>1){return true}t=this.getTargetElementFromEventTarget(e.target);n=e.targetTouches[0];if(this.deviceIsIOS){r=window.getSelection();if(r.rangeCount&&!r.isCollapsed){return true}if(!this.deviceIsIOS4){if(n.identifier===this.lastTouchIdentifier){e.preventDefault();return false}this.lastTouchIdentifier=n.identifier;this.updateScrollParent(t)}}this.trackingClick=true;this.trackingClickStart=e.timeStamp;this.targetElement=t;this.touchStartX=n.pageX;this.touchStartY=n.pageY;if(e.timeStamp-this.lastClickTime<200){e.preventDefault()}return true};FastClick.prototype.touchHasMoved=function(e){"use strict";var t=e.changedTouches[0],n=this.touchBoundary;if(Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n){return true}return false};FastClick.prototype.findControl=function(e){"use strict";if(e.control!==undefined){return e.control}if(e.htmlFor){return document.getElementById(e.htmlFor)}return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};FastClick.prototype.onTouchEnd=function(e){"use strict";var t,n,r,i,s,o=this.targetElement;if(this.touchHasMoved(e)){this.trackingClick=false;this.targetElement=null}if(!this.trackingClick){return true}if(e.timeStamp-this.lastClickTime<200){this.cancelNextClick=true;return true}this.lastClickTime=e.timeStamp;n=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(this.deviceIsIOSWithBadTarget){s=e.changedTouches[0];o=document.elementFromPoint(s.pageX-window.pageXOffset,s.pageY-window.pageYOffset)}r=o.tagName.toLowerCase();if(r==="label"){t=this.findControl(o);if(t){this.focus(o);if(this.deviceIsAndroid){return false}o=t}}else if(this.needsFocus(o)){if(e.timeStamp-n>100||this.deviceIsIOS&&window.top!==window&&r==="input"){this.targetElement=null;return false}this.focus(o);if(!this.deviceIsIOS4||r!=="select"){this.targetElement=null;e.preventDefault()}return false}if(this.deviceIsIOS&&!this.deviceIsIOS4){i=o.fastClickScrollParent;if(i&&i.fastClickLastScrollTop!==i.scrollTop){return true}}if(!this.needsClick(o)){e.preventDefault();this.sendClick(o,e)}return false};FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=false;this.targetElement=null};FastClick.prototype.onMouse=function(e){"use strict";if(!this.targetElement){return true}if(e.forwardedTouchEvent){return true}if(!e.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(e.stopImmediatePropagation){e.stopImmediatePropagation()}else{e.propagationStopped=true}e.stopPropagation();e.preventDefault();return false}return true};FastClick.prototype.onClick=function(e){"use strict";var t;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(e.target.type==="submit"&&e.detail===0){return true}t=this.onMouse(e);if(!t){this.targetElement=null}return t};FastClick.prototype.destroy=function(){"use strict";var e=this.layer;if(this.deviceIsAndroid){e.removeEventListener("mouseover",this.onMouse,true);e.removeEventListener("mousedown",this.onMouse,true);e.removeEventListener("mouseup",this.onMouse,true)}e.removeEventListener("click",this.onClick,true);e.removeEventListener("touchstart",this.onTouchStart,false);e.removeEventListener("touchend",this.onTouchEnd,false);e.removeEventListener("touchcancel",this.onTouchCancel,false)};FastClick.notNeeded=function(e){"use strict";var t;if(typeof window.ontouchstart==="undefined"){return true}if(/Chrome\/[0-9]+/.test(navigator.userAgent)){if(FastClick.prototype.deviceIsAndroid){t=document.querySelector("meta[name=viewport]");if(t&&t.content.indexOf("user-scalable=no")!==-1){return true}}else{return true}}if(e.style.msTouchAction==="none"){return true}return false};FastClick.attach=function(e){"use strict";return new FastClick(e)};if(typeof define!=="undefined"&&define.amd){define(function(){"use strict";return FastClick})}else if(typeof module!=="undefined"&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else{window.FastClick=FastClick}
//Timeago
(function($){$.timeago=function(timestamp){if(timestamp instanceof Date){return inWords(timestamp)}else{if(typeof timestamp==="string"){return inWords($.timeago.parse(timestamp))}else{if(typeof timestamp==="number"){return inWords(new Date(timestamp))}else{return inWords($.timeago.datetime(timestamp))}}}};var $t=$.timeago;$.extend($.timeago,{settings:{refreshMillis:60000,allowFuture:false,strings:{prefixAgo:null,prefixFromNow:"从现在开始",suffixAgo:"前",suffixFromNow:null,seconds:"不到 1 分钟",minute:"约 1 分钟",minutes:"%d 分钟",hour:"约 1 小时",hours:"约 %d 小时",day:"1 天",days:"%d 天",month:"约 1 个月",months:"%d 个月",year:"约 1 年",years:"%d 年",numbers:[],wordSeparator:""}},inWords:function(distanceMillis){var $l=this.settings.strings;var prefix=$l.prefixAgo;var suffix=$l.suffixAgo;if(this.settings.allowFuture){if(distanceMillis<0){prefix=$l.prefixFromNow;suffix=$l.suffixFromNow}}var seconds=Math.abs(distanceMillis)/1000;var minutes=seconds/60;var hours=minutes/60;var days=hours/24;var years=days/365;function substitute(stringOrFunction,number){var string=$.isFunction(stringOrFunction)?stringOrFunction(number,distanceMillis):stringOrFunction;var value=($l.numbers&&$l.numbers[number])||number;return string.replace(/%d/i,value)}var words=seconds<45&&substitute($l.seconds,Math.round(seconds))||seconds<90&&substitute($l.minute,1)||minutes<45&&substitute($l.minutes,Math.round(minutes))||minutes<90&&substitute($l.hour,1)||hours<24&&substitute($l.hours,Math.round(hours))||hours<42&&substitute($l.day,1)||days<30&&substitute($l.days,Math.round(days))||days<45&&substitute($l.month,1)||days<365&&substitute($l.months,Math.round(days/30))||years<1.5&&substitute($l.year,1)||substitute($l.years,Math.round(years));var separator=$l.wordSeparator===undefined?" ":$l.wordSeparator;return $.trim([prefix,words,suffix].join(separator))},parse:function(iso8601){var s=$.trim(iso8601);s=s.replace(/\.\d+/,"");s=s.replace(/-/,"/").replace(/-/,"/");s=s.replace(/T/," ").replace(/Z/," UTC");s=s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");return new Date(s)},datetime:function(elem){var iso8601=$t.isTime(elem)?$(elem).attr("datetime"):$(elem).attr("title");return $t.parse(iso8601)},isTime:function(elem){return $(elem).get(0).tagName.toLowerCase()==="time"}});$.fn.timeago=function(){var self=this;self.each(refresh);var $s=$t.settings;if($s.refreshMillis>0){setInterval(function(){self.each(refresh)},$s.refreshMillis)}return self};function refresh(){var data=prepareData(this);if(!isNaN(data.datetime)){$(this).text(inWords(data.datetime)=="不到 1 分钟前"?"刚刚":inWords(data.datetime))}return this}function prepareData(element){element=$(element);if(!element.data("timeago")){element.data("timeago",{datetime:$t.datetime(element)});var text=$.trim(element.text());if(text.length>0&&!($t.isTime(element)&&element.attr("title"))){element.attr("title",text)}}return element.data("timeago")}function inWords(date){return $t.inWords(distance(date))}function distance(date){return(new Date().getTime()-date.getTime())}document.createElement("abbr");document.createElement("time")}(jQuery));function zeropad(num){return((num<10)?"0":"")+num}function iso8601(date){return date.getUTCFullYear()+"-"+zeropad(date.getUTCMonth()+1)+"-"+zeropad(date.getUTCDate())+"T"+zeropad(date.getUTCHours())+":"+zeropad(date.getUTCMinutes())+":"+zeropad(date.getUTCSeconds())+"Z"};
function fuck(u){ alert(JSON.stringify(u)) }

/**提示*/
var toastr = {
	message: '',
	st: 3000,
	html: function(type){
		return '<div class="toast '+type+'" onclick="toastr._close();"><span>'+this.message+'</span></div>';
	},
	_close: function(){
		$(".toast").remove();
		this.message = '';
		this.st = 3000;
	},
	_show: function(type){
		$(".toast").remove();
		$("body").prepend(toastr.html(type));
		$(".toast span").fadeOut(0).fadeIn(200, function(){
			$(".toast span").delay(toastr.st).fadeOut(200, function(){
				toastr._close();
			});
		});
	},
	warning: function(message,st){
		this.message = message;
		if(st) this.st = st;
		this._show('warning')
	},
	success: function(message,st){
		this.message = message;
		if(st) this.st = st;
		this._show('success')
	},
	info: function(message,st){
		this.message = message;
		if(st) this.st = st;
		this._show('info')
	},
	error: function(message,st){
		this.message = message;
		if(st) this.st = st;
		this._show('error')
	}
};

Tools = {};;
Tools.Array = {
	//数组去重
	unique:	function(a) {
		 var hash = {},
		     len = a.length,
		     result = [];

		 for (var i = 0; i < len; i++){
		     if (!hash[a[i]]){
		         hash[a[i]] = true;
		         result.push(a[i]);
		     } 
		 }
		 return result;
	}
};;

Tools.Dater = {
	fomart: {},
	padZero: function(v){
		return v >= 10 ? v : '0'+v;
	},
	//返回本周日的日期
	getThisSunday: function(){
		var date = new Date();
		date.setDate(date.getDate()+7 - date.getDay());
		return date;
	},
	//weekOfYear(2014, 07, 02)
	weekOfYear: function(a, b, c){
		/* 
		date1是当前日期 
		date2是当年第一天 
		d是当前日期是今年第多少天 
		用d + 当前年的第一天的周差距的和在除以7就是本年第几周 
		*/ 
		var 
		date1 = new Date(a, parseInt(b) - 1, c), 
		date2 = new Date(a, 0, 1), 
		d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000); 
		return Math.ceil( (d + ((date2.getDay() + 1) - 1)) / 7 );
	}
}

Tools.zz = {
	email: function(str){
		var zz = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return zz.test(str);
	}
}


Util = {};;
Util.subString = function(str, len){
	if(!str) return false;
	return str.length > len ? str.substring(0, len)+"..." : str;
};
Util.ajax = {
	METHOD: {
		GET : 'get',
		POST: 'post'
	},

	ajax: function(data, callback, complete){
		var params = '';
		if( typeof(data.params)=='object' ){
			params = JSON.stringify(data.params);
		}else if( typeof(data.params)=='string' ){
			params = data.params;
		}else{
			params = '';
		}
		var async = data.async == undefined ? true : false;
		$.ajax({
			url: data.url,
			data: params,
			type: data.method || Util.ajax.METHOD.GET,
			dataType: 'json',
			async: async,
			cache: false,
			//global: true,
			headers: {
				"Content-type": "application/json"
			},
			success: function(ret){
				if(ret.status == 'success'){
					if(callback) callback(ret.data)
				}else{
					toastr.error(ret.errorMsg)
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
			},
            complete:function(){
            	if(complete) complete()
            }
		})
	}
};

Util.location = {
	getURLParam: function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");//构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);//匹配目标参数
		if (r!=null) return unescape(r[2]); return null;//返回参数值
	},
	/**
	   * 将页面地址的url后面所带的参数列表获取到，并且转换为json格式
	   * @name    unEscapeToJson
	   * @param   {String} url地址
	   * @return  {json}  
	  */
	unEscapeToJson: function(url) {
	    var postData = url.substring(url.indexOf("?") + 1, url.length).split("&");
	    var temp_json = {};
	    for (var i = 0; i < postData.length; i++) {
	        var temp_text = postData[i];
	        var key = temp_text.substring(0, temp_text.indexOf("="));
	        var val = temp_text.substring(temp_text.indexOf("=") + 1, temp_text.length);
	        temp_json[key] = val;
	    }
	    return temp_json;
	}
}
Util.navigator = {
	OS: {ios: 'ios',android: 'android',other: 'other'},
	ua: navigator.userAgent.toLowerCase(),
	isWX: function(){
		if(this.ua.match(/MicroMessenger/i)=='micromessenger')
			return true
		else
			return false
	},
	isDD: function(){
		if(this.ua.match(/dingtalk/i)=='dingtalk')
			return true
		else
			return false
	},
	isMinXing: function(){
		if(this.ua.match(/minxingmessenger/i)=='minxingmessenger')
			return true
		else
			return false
	},
	detectOS: function(){
		var os = this.OS;
		var us = this.ua;
		if ( /android/i.test(us) ){
			return os.android;
		}else if ( /ipad|iphone/i.test(us) ){
			return os.ios;
		}else{
			return os.other;
		}
	}
};

$(document).on('click','.scrolltohash',function(e){
	e.preventDefault();
	var target = '#'+$(this).attr('href');
	if ($(target).length) {
		var scrollpos = $(target).offset().top;
		$("html,body").stop().animate({scrollTop: scrollpos-80}, 800);
	}
});
$(function(){ 
	FastClick.attach(document.body);
	//if(!Util.navigator.isMinXing()) document.write('<div style="text-align:center;color:yellowgreen;padding-top:20%;font-size: 24px;">请在摩卡企信中打开该链接</div>')
})