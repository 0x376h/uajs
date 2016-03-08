/*
 *ver:1.1 doc:
 */
var UaInfo=function(){
    this.uastr=navigator.userAgent;
    this.uascreen=getscreeninfo();
    collectUaInfo(this);
    return this;
}
var UaInfo=function(uastr){
    this.uastr=uastr;

    this.uascreen=getscreeninfo();
     collectUaInfo(this);
    return this;
}
var UaInfo=function(uastr,uascreen){
    this.uastr=uastr;
    this.uascreen=uascreen;
     collectUaInfo(this);
    return this;
    
}
logit();

function collectUaInfo(uainfo){

    if(typeof uainfo.uastr === 'undefined') {
        uainfo.uastr=navigator.userAgent;
    }
    if(typeof uainfo.uascreen === 'undefined') {
        uainfo.uascreen=getscreeninfo();		
    }
    //default uainfo
    setDefaultUainfo(uainfo);
    var android=new OSRegxpRule("anroid",new Array("Android (.*?);"),new Array(";.*;( .*) Build\/"));
    var ios=new OSRegxpRule("ios",new Array("OS (.*) like Mac OS X"),new Array("\\((.*?);")); 
    var wp=new OSRegxpRule("windows phone",new Array("Windows Phone (.*?);"),new Array(".*; (.*)\\)"));
    var windows_destop=new OSRegxpRule("windows destop",new Array("Windows NT (.*); "),new Array(""));
    var osregxps=new Array(android,ios,wp,windows_destop);
   
    for(var i=0;i<osregxps.length;i++){
       var osregxp=osregxps[i];
     
        var osver=getRegXpValue(uainfo.uastr,osregxp.osverregxps,1);
     
        if(osver.length>0){
            var osinfo=new Object();
            osinfo.osname=osregxp.osname;
            osinfo.osver=osver;
            uainfo.osinfo=osinfo;
            uainfo.deviceinfo=getRegXpValue(uainfo.uastr,osregxp.deviceinforegxp,1);
            break;
        }
    }

    //if not found osinfo in UA then return ;
    if(uainfo.osinfo === '') return ;
    
    if(uainfo.osinfo.osname==="ios"){
        uainfo.osinfo.osver=uainfo.osinfo.osver.replace(/_/g,".");
    }
     
     
    //app regxp支持优先级,越高越优先
    var appregxps=new Array(new AppRegxp("wechat","微信",new Array("MicroMessenger/(.*?) "),1),
        new AppRegxp("weibo","微博手机端",new Array("weibo__(.*?)__"),1),
        new AppRegxp("alipay","支付宝手机端",new Array("AlipayClient/(.*?) "),1),
        new AppRegxp("qq","qq手机客户端",new Array("QQ/(.*?) "),1),
        new AppRegxp("LBBROWSER","猎豹浏览器",new Array(" (LBBROWSER)"),9),
        new AppRegxp("Firefox","火狐浏览器",new Array("Firefox/(.*)"),1),
        new AppRegxp("UCBrowser","UC浏览器",new Array("UCBrowser/(.*?) "),1),
        new AppRegxp("MQQBrowser","QQ浏览器(移动端)",new Array("MQQBrowser/(.*?) "),1),
        new AppRegxp("baidubrowser","百度浏览器",new Array("baidubrowser/(.*?) "),1),
        new AppRegxp("MxBrowser","遨游云浏览器",new Array("MxBrowser/(.*)"),1),
        new AppRegxp("LieBaoFast","猎豹浏览器(移动端)",new Array("LieBaoFast/(.*)"),1),
        new AppRegxp("Mb2345Browser","2345浏览器(移动端)",new Array("Mb2345Browser/(.*?)"),1),
        new AppRegxp("MiuiBrowser","小米手机浏览器",new Array("MiuiBrowser/(.*)"),1)
        );
     //sort by prio
     appregxps.sort(function(a,b){
         return b.prio-a.prio;
    });
    //get app info
    for(var i=0;i<appregxps.length;i++){
        var appregxp=appregxps[i];
        var appversion=getRegXpValue(uainfo.uastr,appregxp.appregxps,1);
        if(appversion.length >0){
            appinfo=new Object();
            appinfo.appname=appregxp.appname;
            appinfo.appver=appversion;
            uainfo.appinfo=appinfo;
            break;
        }
    }

    //if os is ios ,device is apple ,
    //wechat or weibo
    if(uainfo.osinfo.osname ==="ios"){
       
        if(uainfo.appinfo.appname==="wechat"){doitatwechat(uainfo);}
        if(uainfo.appinfo.appname==="weibo"){doitatweibo(uainfo);}
    }
    //has apple pay
    setApplePay(uainfo);
}
function setApplePay(uainfo){
    if(uainfo.osinfo.osname!=="ios") return ;
    var applepaydevicelist=new Array("iPhone 6S Plus","iphone 6S","iphone 6 plus","iphone 6");
    var ar=new Array();
    if(uainfo.possdevice instanceof Array)ar=uainfo.possdevice;
    ar.push(uainfo.deviceinfo);
    for(var i =0;i<ar.length;i++){
        if(in_array(applepaydevicelist,ar[i])){
            uainfo.hasApplePay=true;
            return ;
        }
    }
   
}

function setDefaultUainfo(uainfo){
var osinfo=new Object();
osinfo.osname="";
osinfo.osver="";
uainfo.osinfo="";
uainfo.deviceinfo="";
uainfo.osinfo=osinfo;
appinfo=new Object();
appinfo.appname="";
appinfo.appver="";
uainfo.appinfo=appinfo;
uainfo.hasApplePay=false;  
}
function in_array(arr,sub){
    for(var i =0;i<arr.length;i++){
        if(arr[i]===sub) return true ;
    }
    return false;
}

function doitatweibo(uainfo){
    var weibodevice=getRegXpValue(uainfo.uastr,"Weibo \\((.*)__weibo",1);

    if(weibodevice.length===0) return ;
    weidevicelist=new Array("iPhone8,2","iPhone 6S Plus","iPhone8,1","iphone 6S","iPhone7,1","iphone 6 plus",
    "iPhone7,2","iphone 6","iPhone6,1","iphone 5s","iPhone6,2","iphone 5s","iPhone5,3","iphone 5c",
    "iPhone5,4","iphone 5c","iPhone5,2","iphone 5","iPhone5,1","iphone 5","iPhone4,1","iphone 4s",
    "iPhone3,3","iphone 4","iPhone3,2","iphone 4","iPhone3,1","iphone 4",
    "iPad5,2","iPad mini 4", "iPad5,1","iPad mini 4","iPad4,9","iPad mini 3","iPad4,8","iPad mini 3",
    "iPad4,7","iPad mini 3", "iPad4,6","iPad mini 2","iPad4,5","iPad mini 2","iPad4,4","iPad mini 2",
    "iPad2,7","iPad mini", "iPad2,6","iPad mini", "iPad2,5","iPad mini","iPad5,4","iPad Air 2",
    "iPad5,3","iPad Air 2","iPad4,3","iPad Air","iPad4,2","iPad Air","iPad4,1","iPad Air",
    "iPad3,6","ipad 4","iPad3,5","ipad 4","iPad3,4","ipad 4","iPad3,3","the New iPad",
    "iPad3,2","the New iPad","iPad3,1","the New iPad","iPad2,4","ipad 2","iPad2,3","ipad 2",
    "iPad2,2","ipad 2","iPad2,1","ipad 2","iPad6,8","iPad Pro","iPad6,7","iPad Pro",
    "iPad1,1","ipad 1");
    for(var i=0;i<weidevicelist.length-1;i=i+2){
        if(weidevicelist[i]===weibodevice) {
            uainfo.deviceinfo= weidevicelist[i+1];
          }
        
    }
}

//wechat
function doitatwechat(uainfo){

    if(uainfo.deviceinfo.toLowerCase()==="iphone"){
        screeninfo=new Array("iphone 4","480,320","iphone 4s","480,320",
            "iphone 5","568,320","iphone 5c","568,320","iphone 5s","568,320",
            "iphone 6","667,375","iphone 6s","667,375",
            "iphone 6 plus","736,414","iphone 6 plus","736,414");
    }else if(uainfo.deviceinfo.toLowerCase()==="ipad"){
        screeninfo=new Array("ipad 1","1024,768","ipad 2","1024,768",
            "the New iPad","2048,1536","ipad 4","2048,1536",
            "iPad Air","2048,1536","iPad mini","1024,768",
            "iPad Air 2","2048,1536","iPad mini 2","2048,1536",
            "iPad mini 3","2048,1536","iPad mini 4","2048,1536",
            "iPad Pro","2732,2048");
    }else{
        return ;
    }

    var possdevice=new Array();
    basicscreen=uainfo.uascreen;
    tagscreen=basicscreen[0]+","+basicscreen[1];

    for(var i=1;i<screeninfo.length-1;i+=2){
        if(screeninfo[i]===tagscreen){
          
           possdevice.push(screeninfo[i-1]);
        }
    }
    if(possdevice.length>1){
        uainfo.possdevice=possdevice;
    }
     
}

function AppRegxp(appname,appdesc,appregxps,prio){
    this.appname=appname;
    this.appdesc=appdesc;
    this.appregxps=appregxps;
    this.prio=prio;
    return this;
    
}
function OSRegxpRule(osname,osverregxp,deviceinforegxp){
    this.osname=osname;
    this.osverregxps=osverregxp;
    this.deviceinforegxp=deviceinforegxp;
    return this;
}

function logit(){
    if(location.hostname==="localhost") return ;
    if(getCookie("uuid").length===0){
        setUid();
    }
    screeninfo=getscreeninfo();
    uid=getCookie("uid");
    picurl="http://col.datatiny.com/log/?screeninfo="+screeninfo+"&uid="+uid;
    crPic(picurl);
}

function setUid(){

    var url="http://cruid.datatiny.com/uid/";
    var ele=document.createElement("script");
    ele.type="text/javascript";
    ele.src=url;
    document.getElementsByTagName("head")[0].appendChild(ele);
}
function crPic(picurl){
   
    var ele=document.createElement("img");
    ele.src=picurl;
    ele.style.display="none";
}

function getscreeninfo(){
    var screeninfo=new Array();
    screeninfo.push(screen.height);
    screeninfo.push(screen.width);
    screeninfo.push(screen.availWidth);
    screeninfo.push(screen.availHeight);
    screeninfo.push(screen.colorDepth);
    screeninfo.push(screen.bufferDepth);
    screeninfo.push(screen.deviceXDPI);
    screeninfo.push(screen.deviceYDPI);
    screeninfo.push(screen.logicalXDPI);
    screeninfo.push(screen.logicalYDPI);
    screeninfo.push(screen.fontSmoothingEnabled);
    screeninfo.push(screen.pixelDepth);
    screeninfo.push(screen.updateInterval);

    return screeninfo;
}
function setcookieY(cookiename,cookvaile,expire,domain){
    var d=new Date();
    //defualt 50years ~
    d.setFullYear(d.getFullYear()+50);
    cookiestr=cookiename+"=" + cookvaile+";expires=" + d + ";domain=" +domain;
    document.cookie=cookiestr;
}
function getCookie(c_name){
  if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=");
    if (c_start!==-1){ 
        c_start=c_start + c_name.length+1;
        c_end=document.cookie.indexOf(";",c_start);
    if (c_end===-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
  } 
  }
  return "";
}

  function getRegXpValue(str,regxpvalue,index){
      
        var dataregxp=new Array();
          if(regxpvalue instanceof Array){
             dataregxp= regxpvalue;
          }else{
              dataregxp=new Array(regxpvalue);
          }
          if(dataregxp.length===0) return "";
          for(var i=0;i<dataregxp.length;i++){
              var patt = new RegExp(dataregxp[i],"gi");
              arr = patt.exec(str); 
              if(arr instanceof Array &&  arr.length>1){
                 
                  return (arr[1]);
              }
          }
         return "";
}