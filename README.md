# uajs 多语言文档 zh-cn
#概述
uajs从UserAgent上获取关于如下的信息  
1.操作系统信息:可以获取操作系统和版本  
2.可以获取设备信息，仅在ios上，获取ipad/iphone/itouch  
3.应用信息：名称及版本  

#场景
1.判断用户是否使用手机，及使用的手机是否是android或者ios  
2.判断用户是否使用某些应用(微信 或者QQ)及版本

#支持的操作系统
1.anroid  
2.ios  
3.windows phone  
4.windows destop:windows的桌面版

#支持的应用
1.wechat:微信  
2.weibo:微博客户端  
3.alipay:支付宝客户端  
4.qq:QQ客户端  
5.LBBROWSER:猎豹浏览器  

#引用方式 && 版本说明
##调用
在head上引用:  
http://static.datatiny.com/uajsapi/[ver/]uajsapi.js   
其中：  
如果ver/可选，如果不输入，则默认使用最新版本

##使用
<pre>
var uainfo=new UaInfo();   
document.writeln("操作系统:" + uainfo.osinfo.osname);    
document.writeln("操作系统版本:" + uainfo.osinfo.osver);   
document.writeln("设备名称:" + uainfo.deviceinfo);  
document.writeln("应用名称" + uainfo.appinfo.appname);   
document.writeln("应用版本:" + uainfo.appinfo.appver);   
if(uainfo.hasApplePay){
    document.writeln("support apple pay");
}

</pre>

#文档对象




#收集cookie

#联系方式

