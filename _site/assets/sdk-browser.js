function strEndsWith(e,t){return e.match(t+"$")==t}function strStartsWith(e,t){return 0===e.indexOf(t)}function prepareCode(e,t){var r=getFileExtension(e),n="";"xml"==r?(n="XML",strEndsWith(e,"xaml")&&(n="XAML")):"cs"==r&&(n="C#"),document.getElementById("heading").innerHTML="<strong>"+n+"</strong>",t=escapeXamlCode(t);var a=prettyPrintOne(t,r);return a}function escapeXamlCode(e){var t=e.replace(/</g,"&lt;"),r=t.replace(/>/g,"&gt;");return r}function getFileExtension(e){var t=e.split(".").pop();return"xaml"!=t&&"config"!=t&&"csproj"!=t||(t="xml"),t}function msieversion(){var e=window.navigator.userAgent,t=e.indexOf("MSIE ");return t>0?parseInt(e.substring(t+5,e.indexOf(".",t))):0}function getCodeInJsonP(e){$.ajax({url:e,dataType:"jsonp",success:function(t){t.data.message&&strStartsWith(t.data.message,"API rate")&&(document.getElementById("codeBlock").innerHTML="GitHub API Rate limit hit. Please use other browsers like Chrome or Firefox.");var r={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t,n,a,o,i,d,c,s="",l=0;for(e=r._utf8_encode(e);l<e.length;)t=e.charCodeAt(l++),n=e.charCodeAt(l++),a=e.charCodeAt(l++),o=t>>2,i=(3&t)<<4|n>>4,d=(15&n)<<2|a>>6,c=63&a,isNaN(n)?d=c=64:isNaN(a)&&(c=64),s=s+this._keyStr.charAt(o)+this._keyStr.charAt(i)+this._keyStr.charAt(d)+this._keyStr.charAt(c);return s},decode:function(e){var t,n,a,o,i,d,c,s="",l=0;for(e=e.replace(/[^A-Za-z0-9+\/=]/g,"");l<e.length;)o=this._keyStr.indexOf(e.charAt(l++)),i=this._keyStr.indexOf(e.charAt(l++)),d=this._keyStr.indexOf(e.charAt(l++)),c=this._keyStr.indexOf(e.charAt(l++)),t=o<<2|i>>4,n=(15&i)<<4|d>>2,a=(3&d)<<6|c,s+=String.fromCharCode(t),64!=d&&(s+=String.fromCharCode(n)),64!=c&&(s+=String.fromCharCode(a));return s=r._utf8_decode(s)},_utf8_encode:function(e){e=e.replace(/rn/g,"n");for(var t="",r=0;r<e.length;r++){var n=e.charCodeAt(r);n<128?t+=String.fromCharCode(n):n>127&&n<2048?(t+=String.fromCharCode(n>>6|192),t+=String.fromCharCode(63&n|128)):(t+=String.fromCharCode(n>>12|224),t+=String.fromCharCode(n>>6&63|128),t+=String.fromCharCode(63&n|128))}return t},_utf8_decode:function(e){for(var t="",r=0,n=c1=c2=0;r<e.length;)n=e.charCodeAt(r),n<128?(t+=String.fromCharCode(n),r++):n>191&&n<224?(c2=e.charCodeAt(r+1),t+=String.fromCharCode((31&n)<<6|63&c2),r+=2):(c2=e.charCodeAt(r+1),c3=e.charCodeAt(r+2),t+=String.fromCharCode((15&n)<<12|(63&c2)<<6|63&c3),r+=3);return t}},n=t.data.content;n=r.decode(n),document.getElementById("codeBlock").innerHTML=prepareCode(e,n)}})}function convertApiLinkToCDNLink(e,t){var r=e.indexOf("contents"),n=e.substring(r+9);return sdkCdnRepoPath+n+t}function getCodeInPlainText(e,t){var r=convertApiLinkToCDNLink(e,t);$.ajax({url:r,dataType:"text",success:function(e){document.getElementById("codeBlock").innerHTML=prepareCode(r,e)}})}function setDescription(e,t){var r="<html><head></head><body><b><u>Description:</u></b><p>",n="</p></body></html>";e.html(r+t+n)}function getReadMeFileName(e){return e.split("\\").pop()}function getFileName(e){var t=e.split("\\");return t?t[t.length-1]:e}function detailInit(e){var t=e.detailRow;t.find(".detailsDIV").kendoGrid({dataSource:e.data.ExampleInfo.ExampleFileNames,columns:[{title:"Files",template:function(e){return getFileName(e)}}],selectable:"row",change:function(){var t=this.select().index(),r=this.dataSource.view()[t];msieversion()>0?getCodeInJsonP(e.data.GitHubPath+r):getCodeInPlainText(e.data.GitHubPath,r)}}),setDescription(e.detailRow.find(".readmeDiv"),e.data.Description);var r=$(".detailsDIV").data("kendoGrid");r&&r.select($(".detailsDIV tbody>tr:first"))}function getGitHubFolderUrl(e){var t=e.GitHubPath.indexOf("contents"),r=e.GitHubPath.substring(t+9),n=e.ExampleInfo.DirectoryName,a="<a href='"+sdkRepoPath+r+"/' target='_blank'>"+n+"</a>";return a}function createKendoGrid(e,t){var r=$(e);if(0!=r.length){r.kendoGrid({toolbar:kendo.template($("#toolBarTemplate").html()),height:450,columns:[{field:"Name",width:300,template:function(e){return getGitHubFolderUrl(e)}},{field:"Description"}],dataSource:{transport:{read:{url:t,dataType:"json"}}},detailTemplate:kendo.template($("#template").html()),detailInit:detailInit,selectable:"row",change:function(e){var t=this.select();null!=t&&(t.next(".k-detail-row").is(":visible")?e.sender.collapseRow(t):e.sender.expandRow(t))}});var n=r.data("kendoGrid");if(n){var a=e+" tbody>tr:first";n.one("dataBound",function(e){e.sender.expandRow($(a))})}}}function onUserInput(){var e=document.getElementById("searchBox").value,t=$("#kendoDiv").data("kendoGrid");t.dataSource.filter({value:e,field:"KeyWords",operator:function(e,t){if(""==t)return!0;if(e){for(var r=!0,n=t.toLowerCase().split(/[ ,]+/),a=0,o=n.length;a<o;a++)if(e.toLowerCase().indexOf(n[a])<0){r=!1;break}return r}return!1}})}function onUserInputSL(){var e=document.getElementById("searchBox").value,t=$("#kendoDivSL").data("kendoGrid");t.dataSource.filter({value:e,field:"KeyWords",operator:function(e,t){if(""==t)return!0;if(e){for(var r=!0,n=t.toLowerCase().split(/[ ,]+/),a=0,o=n.length;a<o;a++)if(e.toLowerCase().indexOf(n[a])<0){r=!1;break}return r}return!1}})}$(document).ready(function(){createKendoGrid("#kendoDiv",mainSdkExamples),createKendoGrid("#kendoDivSL","sdk_sl.json")});