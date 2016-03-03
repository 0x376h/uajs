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
测试链接：http://static.datatiny.com/demo.html  
QR：![demo url](/demo_url.png)

#文档对象
uainfo包含如下属性  
1.osinfo :操作系统信息,包含如下属性  
osname:操作系统名称，见 支持的操作系统  
osver:操作系统的版本

2.deviceinfo:可能的设备名称，仅供参考  

3.appinfo:应用信息,包含如下属性  
appname:应用名称，见 支持的应用  
appver:应用版本

4.hasApplePay:是否支持apple Pay

#收集cookie
应用会通过cookie方式收集如下信息：  
1.用户的useragent串  
2.refer/ip  
3.每个用户分配一个uid


#联系方式
欢迎大家就加入，以便在变化时及时通知  
QQ群：QR：![demo url](/qqqun.png)  
<a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=d8efb9587f10208a649123b858b2bc3455ca9211d455aaa73610afcb12d1edcd"><img border="0" src="http://pub.idqqimg.com/wpa/images/group.png" alt="数据微支持群" title="数据微支持群"></a>


#协议
BSD