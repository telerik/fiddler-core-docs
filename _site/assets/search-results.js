function attachToEvents(){window.isAttachToEventsFired||($('form input[name="q"]').keydown(function(e){if(13==e.keyCode){var t=$(this);return searchInternal(t),$("#results").data("kendoListView").dataSource.read(),!1}}),$("div#results").on("click","a",function(){trackSearchResult($(this).attr("href"))}),window.isAttachToEventsFired=!0)}function search(e){searchTerms=e.val(),trackSearchQuery(searchTerms)}function trackSearchQuery(e){trackItem(getSearchCategory(),prd,e)}function searchInternal(e){closePopup(),search(e)}function closePopup(){var e=$("#refine-search-popup").data("kendoPopup");e&&e.close()}function getSearchCategory(){return"docs-search-terms"}function trackSearchResult(e){trackItem("docs-search-results",searchTerms,e)}function toKV(e){return e=e.split("="),this[e[0]]=e[1],this}function getSearchQuery(){var e=location.search.replace(/(^\?)/,"").split("&").map(toKV.bind({}))[0];return searchTerms=decodeURIComponent(e.q?e.q.replace(/\+/g," "):""),$('input[name="q"]').val()||searchTerms}function getDataSource(){var e=location.search.replace(/(^\?)/,"").split("&").map(toKV.bind({}))[0];return searchTerms=decodeURIComponent(e.q?e.q.replace(/\+/g," "):""),$("[name=q]").val(searchTerms),new kendo.data.DataSource({transport:{parameterMap:function(e){return{start:1+e.skip,num:e.pageSize,cx:gcsInstance,key:gcsKey,q:getSearchQuery()+searchViewModel.getFilterExpression()}},read:{url:GCSE_API_URL}},change:function(){var e=this.data().length>0;$("#search-container").toggle(e),$("#no-results").toggle(!e),setSideNavPosition()},serverPaging:!0,pageSize:10,schema:{type:"json",data:function(e){return 0===parseInt(e.searchInformation.totalResults)?[]:e.items.map(function(e){return{title:e.htmlTitle,url:e.link,excerpt:e.htmlSnippet}})},total:function(e){return e.searchInformation.totalResults}}})}!function(e,t){t("kendo.pager.min",["kendo.data.min"],e)}(function(){return function(e,t){function n(e,t,n,a,r){return e({idx:t,text:n,ns:d.ns,numeric:a,title:r||""})}function a(e,t,n,a){return e({idx:t,text:n||t,selected:a||!1})}function r(e,t,n){return C({className:e.substring(1),text:t,wrapClassName:n||""})}function i(e,t,n,a){e.find(t).parent().attr(d.attr("page"),n).attr("tabindex",-1).toggleClass("k-state-disabled",a)}function s(e,t){i(e,g,1,t<=1)}function o(e,t){i(e,h,Math.max(1,t-1),t<=1)}function l(e,t,n){i(e,v,Math.min(n,t+1),t>=n)}function c(e,t,n){i(e,f,n,t>=n)}var d=window.kendo,u=d.ui,p=u.Widget,m=e.proxy,g=".k-i-arrow-end-left",f=".k-i-arrow-end-right",h=".k-i-arrow-60-left",v=".k-i-arrow-60-right",k="k-pager-md k-pager-sm",_="change",S=".kendoPager",b="click",w="keydown",y="disabled",x="down",T=Number.MAX_VALUE,C=d.template('<a href="\\#" aria-label="#=text#" title="#=text#" class="k-link k-pager-nav #= wrapClassName #"><span class="k-icon #= className #"></span></a>'),P=p.extend({init:function(t,n){var a,i,u,k,y=this,T=null;p.fn.init.call(y,t,n),n=y.options,y._createDataSource(n),y.linkTemplate=d.template(y.options.linkTemplate),y.selectTemplate=d.template(y.options.selectTemplate),y.currentPageTemplate=d.template(y.options.currentPageTemplate),y.numericSelectItemTemplate=d.template(y.options.numericSelectItemTemplate),a=y.page(),i=y.totalPages(),y._refreshHandler=m(y.refresh,y),y.dataSource.bind(_,y._refreshHandler),y.downEvent=d.applyEventMap(x,d.guid()),n.previousNext&&(y.element.find(g).length||(y.element.append(r(g,n.messages.first,"k-pager-first")),s(y.element,a,i)),y.element.find(h).length||(y.element.append(r(h,n.messages.previous)),o(y.element,a,i))),n.numeric&&(y._numericWrap||(y._numericWrap=y.element.find(".k-pager-numbers-wrap"),0===y._numericWrap.length&&(y._numericWrap=e("<div class='k-pager-numbers-wrap' />").appendTo(y.element))),y._numericSelect||(y._numericSelect=y._numericWrap.find(".k-dropdown"),0===y._numericSelect.length&&(y._numericSelect=e("<select class='k-dropdown' />").appendTo(y._numericWrap))),y.list||(y.list=y._numericWrap.find(".k-pager-numbers"),0===y.list.length&&(y.list=e('<ul class="k-pager-numbers" />').appendTo(y._numericWrap))),n.dataSource&&!n.dataSource.total()&&(y._numericSelect.empty().append("<option value='0' />"),y.list.empty().append(y.selectTemplate({text:0})))),n.input&&(y.element.find(".k-pager-input").length||y.element.append('<span class="k-pager-input k-label">'+n.messages.page+'<input class="k-textbox">'+d.format(n.messages.of,i)+"</span>"),y.element.on(w+S,".k-pager-input input",m(y._keydown,y))),n.previousNext&&(y.element.find(v).length||(y.element.append(r(v,n.messages.next)),l(y.element,a,i)),y.element.find(f).length||(y.element.append(r(f,n.messages.last,"k-pager-last")),c(y.element,a,i))),n.pageSizes&&(y.element.find(".k-pager-sizes").length||(u=n.pageSizes.length?n.pageSizes:["all",5,10,20],k=e.map(u,function(e){return e.toLowerCase&&"all"===e.toLowerCase()?"<option value='all'>"+n.messages.allPages+"</option>":"<option>"+e+"</option>"}),e('<span class="k-pager-sizes k-label"><select></select>'+n.messages.itemsPerPage+"</span>").appendTo(y.element).find("select").html(k.join("")).end().appendTo(y.element)),y.element.find(".k-pager-sizes select").val(y.pageSize()),d.ui.DropDownList&&y.element.find(".k-pager-sizes select").show().kendoDropDownList(),y.element.on(_+S,".k-pager-sizes select",m(y._change,y))),n.refresh&&(y.element.find(".k-pager-refresh").length||y.element.append('<a href="#" class="k-pager-refresh k-link" title="'+n.messages.refresh+'" aria-label="'+n.messages.refresh+'"><span class="k-icon k-i-reload"></span></a>'),y.element.on(b+S,".k-pager-refresh",m(y._refreshClick,y))),n.info&&(y.element.find(".k-pager-info").length||y.element.append('<span class="k-pager-info k-label" />')),y.element.on(b+S,"a",m(y._click,y)).on(_+S,"select.k-dropdown",m(y._numericSelectChange,y)).addClass("k-pager-wrap k-widget k-floatwrap"),n.autoBind&&y.refresh(),y._resizeHandler=m(y.resize,y,!0),e(window).on("resize"+S,y._resizeHandler),T=y._getWidthSizeClass(y.element.width()),T&&y.element.addClass(T),d.notify(y)},destroy:function(){var t=this;p.fn.destroy.call(t),t.element.off(S),t.dataSource.unbind(_,t._refreshHandler),t._refreshHandler=null,e(window).off("resize"+S,this._resizeHandler),d.destroy(t.element),t.element=t.list=null},events:[_],options:{name:"Pager",selectTemplate:'<li><span class="k-link k-state-selected">#=text#</span></li>',currentPageTemplate:'<li class="k-current-page"><span class="k-link k-pager-nav">#=text#</span></li>',linkTemplate:'<li><a tabindex="-1" href="\\#" class="k-link" data-#=ns#page="#=idx#" #if (title !== "") {# title="#=title#" #}#>#=text#</a></li>',numericItemTemplate:'<li><a tabindex="-1" href="\\#" class="k-link" data-#=ns#page="#=idx#" #if (title !== "") {# title="#=title#" #}#>#=text#</a></li>',numericSelectItemTemplate:'<option value="#= idx #" #if (selected) {# selected="selected" #}#>#= text #</option>',buttonCount:10,autoBind:!0,numeric:!0,info:!0,input:!1,previousNext:!0,pageSizes:!1,refresh:!1,responsive:!0,messages:{allPages:"All",display:"{0} - {1} of {2} items",empty:"No items to display",page:"Page",of:"of {0}",itemsPerPage:"items per page",first:"Go to the first page",previous:"Go to the previous page",next:"Go to the next page",last:"Go to the last page",refresh:"Refresh",morePages:"More pages"}},setDataSource:function(e){var t=this;t.dataSource.unbind(_,t._refreshHandler),t.dataSource=t.options.dataSource=e,e.bind(_,t._refreshHandler),t.options.autoBind&&e.fetch()},_resize:function(e){var t,n;e.width&&(t=this._getWidthSizeClass(e.width),n=this.element,t?n.hasClass(t)||(n.removeClass(k),n.addClass(t)):n.removeClass(k))},_createDataSource:function(e){this.dataSource=d.data.DataSource.create(e.dataSource)},refresh:function(t){var r,i,u,p,m,g,f=this,h=1,v=f.page(),k="",_="",S=f.options,b=f.pageSize(),w=f._collapsedTotal(),x=f.dataSource._isGroupPaged()?f.dataSource.groupsTotal():f.dataSource.total(),C=f.totalPages(),P=f.linkTemplate,E=f.numericSelectItemTemplate,z=S.buttonCount;if(!t||"itemchange"!=t.action){if(S.numeric){for(v>z&&(u=v%z,h=0===u?v-z+1:v-u+1),i=Math.min(h+z-1,C),h>1&&(k+=n(P,h-1,"...",!1,S.messages.morePages),_+=a(E,h-1,S.messages.morePages)),r=h;r<=i;r++)k+=n(r==v?f.selectTemplate:P,r,r,!0),_+=a(E,r,r,r==v);i<C&&(k+=n(P,r,"...",!1,S.messages.morePages),_+=a(E,r,S.messages.morePages)),""===k&&(k=f.selectTemplate({text:0}),_=e("<option value='0' />")),f.list.html(k),f._numericSelect.html(_)}S.info&&(k=x>0?d.format(S.messages.display,f.dataSource.options.endless?1:Math.min((v-1)*(f.dataSource.pageSize()||0)+1,w),Math.min(v*b,w),x):S.messages.empty,f.element.find(".k-pager-info").html(k)),S.input&&f.element.find(".k-pager-input").html(f.options.messages.page+'<input class="k-textbox" aria-label="'+v+'">'+d.format(S.messages.of,C)).find("input").val(v).attr(y,x<1).toggleClass("k-state-disabled",x<1),S.previousNext&&(s(f.element,v,C),o(f.element,v,C),l(f.element,v,C),c(f.element,v,C)),S.pageSizes&&(p=f.element.find(".k-pager-sizes option[value='all']").length>0,m=p&&(b===this.dataSource.total()||b==T),g=b,m&&(b="all",g=S.messages.allPages),f.element.find(".k-pager-sizes select").val(b).attr("aria-label",b).filter("["+d.attr("role")+"=dropdownlist]").kendoDropDownList("value",b).kendoDropDownList("text",g))}},_collapsedTotal:function(){return this.dataSource.total()},_keydown:function(e){if(e.keyCode===d.keys.ENTER){var t=this.element.find(".k-pager-input").find("input"),n=parseInt(t.val(),10);(isNaN(n)||n<1||n>this.totalPages())&&(n=this.page()),t.val(n),this.page(n)}},_refreshClick:function(e){e.preventDefault(),this.dataSource.read()},_change:function(e){var n=e.currentTarget.value,a=parseInt(n,10),r=this.dataSource;isNaN(a)?"all"==(n+"").toLowerCase()&&(r._pageSize=t,r._take=t,r._skip=0,r.fetch()):r.pageSize(a)},_numericSelectChange:function(e){var t=e.currentTarget,n=t.value,a=parseInt(n,10);t.blur(),this.page(a)},_click:function(t){var n=e(t.currentTarget);t.preventDefault(),n.is(".k-state-disabled")||this.page(parseInt(n.attr(d.attr("page")),10))},totalPages:function(){return Math.ceil((this.dataSource.total()||0)/(this.pageSize()||1))},pageSize:function(){return this.dataSource.pageSize()||this.dataSource.total()},page:function(e){return e?(this.trigger("pageChange",{index:e})||(this.dataSource.page(e),this.trigger(_,{index:e})),t):this.dataSource.total()>0?this.dataSource.page():0},_getWidthSizeClass:function(e){var t=this,n=k.split(" ");return t.options.responsive?e<=480?n[1]:e<=600?n[0]:null:null}});u.plugin(P)}(window.kendo.jQuery),window.kendo},"function"==typeof define&&define.amd?define:function(e,t,n){(n||t)()}),!function(e,t){t("kendo.listview.min",["kendo.data.min","kendo.editable.min","kendo.selectable.min"],e)}(function(){return function(e,t){var n=window.kendo,a="change",r="kendoKeydown",i="cancel",s="dataBound",o="dataBinding",l=n.ui.Widget,c=n.keys,d="",u=".k-listview-content > *:not(.k-loading-mask)",p="progress",m="error",g="k-state-focused",f="k-state-selected",h="k-edit-item",v="edit",k="remove",_="save",S="mousedown",b="click",w="touchstart",y=".kendoListView",x=e.proxy,T=n._activeElement,C=n.ui.progress,P=n.data.DataSource,E=n.ui.DataBoundWidget.extend({init:function(t,a){var r=this;a=e.isArray(a)?{dataSource:a}:a,l.fn.init.call(r,t,a),a=r.options,r.wrapper=t=r.element,t[0].id&&(r._itemId=t[0].id+"_lv_active"),r._element(),r._layout(),r._dataSource(),r._templates(),r._navigatable(),r._selectable(),r._pageable(),r._crudHandlers(),r._scrollable(),r.options.autoBind&&r.dataSource.fetch(),n.notify(r)},events:[a,i,o,s,v,k,_,r],options:{name:"ListView",autoBind:!0,selectable:!1,navigatable:!1,height:null,template:d,altTemplate:d,editTemplate:d,contentTemplate:"<div data-content='true' />",bordered:!0,borders:"",layout:"",flex:{direction:"row",wrap:"nowrap"},grid:{}},setOptions:function(e){l.fn.setOptions.call(this,e),this._layout(),this._templates(),this.selectable&&(this.selectable.destroy(),this.selectable=null),this._selectable()},_templates:function(){var e=this.options;this.template=n.template(e.template||d),this.altTemplate=n.template(e.altTemplate||e.template),this.editTemplate=n.template(e.editTemplate||d)},_item:function(e){return this.content.children()[e]()},items:function(){return this.content.children()},dataItem:function(t){var a=n.attr("uid"),r=e(t).closest("["+a+"]").attr(a);return this.dataSource.getByUid(r)},setDataSource:function(e){this.options.dataSource=e,this._dataSource(),this.options.autoBind&&e.fetch()},_unbindDataSource:function(){var e=this;e.dataSource.unbind(a,e._refreshHandler).unbind(p,e._progressHandler).unbind(m,e._errorHandler)},_dataSource:function(){var e=this;e.dataSource&&e._refreshHandler?e._unbindDataSource():(e._refreshHandler=x(e.refresh,e),e._progressHandler=x(e._progress,e),e._errorHandler=x(e._error,e)),e.dataSource=P.create(e.options.dataSource).bind(a,e._refreshHandler).bind(p,e._progressHandler).bind(m,e._errorHandler)},_progress:function(e){var t=this.content;C(t,e,{opacity:!0})},_error:function(){C(this.content,!1)},_element:function(){var t=this.options,n=t.height;this.element.addClass("k-widget k-listview").attr("role","listbox"),this.content=e("<div />").appendTo(this.element),n&&this.element.css("height",n)},_layout:function(){var e=this,n=e.options,a=n.flex,r=n.grid,i=e.element,s=["k-widget","k-listview"],o=e.content,l=["k-listview-content"];i.add(o).removeClass(function(e,t){if(t.indexOf("k-")>=0)return!0}),n.bordered===!0&&s.push("k-listview-bordered"),"string"==typeof n.borders&&n.borders!==d&&s.push("k-listview-borders-"+n.borders),"string"==typeof n.contentPadding&&n.contentPadding!==d&&l.push("k-listview-content-padding-"+n.contentPadding),"string"==typeof n.layout&&n.layout!==d&&l.push("k-d-"+n.layout),"flex"===n.layout&&"object"==typeof a&&("string"==typeof a.direction&&""!==a.direction&&l.push("k-flex-"+a.direction),"string"==typeof a.wrap&&""!==a.wrap&&l.push("k-flex-"+a.wrap)),"grid"===n.layout&&"object"==typeof r&&("number"==typeof r.cols?o.css("grid-template-columns","repeat("+r.cols+", 1fr)"):"string"==typeof r.cols&&o.css("grid-template-columns",r.cols),"number"==typeof r.rows?o.css("grid-template-rows","repeat("+r.rows+", "+(r.rowHeight!==t?r.rowHeight:"1fr")+")"):"string"==typeof r.rows&&o.css("grid-template-rows",r.rows),"number"==typeof r.gutter?o.css("grid-gap",r.gutter):"string"==typeof r.gutter&&o.css("grid-gap",r.gutter)),e.element.addClass(s.join(" ")),e.content.addClass(l.join(" "))},refresh:function(e){var a,r,i,l,c,d=this,u=d.dataSource.view(),p="",m=d.template,g=d.altTemplate,f=T(),h=d._endlessFetchInProgress,v=h?d._skipRerenderItemsCount:0,k=d.options.scrollable;if(e=e||{},"itemchange"===e.action)return d._hasBindingTarget()||d.editable||(a=e.items[0],i=d.items().filter("["+n.attr("uid")+"="+a.uid+"]"),i.length>0&&(l=i.index(),d.angular("cleanup",function(){return{elements:[i]}}),i.replaceWith(m(a)),i=d.items().eq(l),i.attr(n.attr("uid"),a.uid),d.angular("compile",function(){return{elements:[i],data:[{dataItem:a}]}}),d.trigger("itemChange",{item:i,data:a}))),t;if(!d.trigger(o,{action:e.action||"rebind",items:e.items,index:e.index})){for(d._angularItems("cleanup"),h||d._destroyEditable(),l=v,c=u.length;l<c;l++)p+=l%2?g(u[l]):m(u[l]);for(h?d.content.append(p):d.content.html(p),r=d.items().not(".k-loading-mask"),l=v,c=u.length;l<c;l++)r.eq(l).attr(n.attr("uid"),u[l].uid).attr("role","option").attr("aria-selected","false");d.content[0]===f&&d.options.navigatable&&(d._focusNext?d.current(d.current().next()):k||d.current(r.eq(0))),d._angularItems("compile"),d._progress(!1),d._endlessFetchInProgress=null,d.trigger(s,{action:e.action||"rebind",items:e.items,index:e.index})}},_pageable:function(){var t,a,r=this,i=r.options.pageable;e.isPlainObject(i)&&(a=i.pagerId,t=e.extend({},i,{dataSource:r.dataSource,pagerId:null}),r.pager=new n.ui.Pager(e("#"+a),t))},_selectable:function(){var e,r,i=this,s=i.options.selectable,o=i.options.navigatable;s&&(e=n.ui.Selectable.parseOptions(s).multiple,i.selectable=new n.ui.Selectable(i.element,{aria:!0,multiple:e,filter:u,change:function(){i.trigger(a)}}),o&&i.element.on("keydown"+y,function(n){if(n.keyCode===c.SPACEBAR){if(r=i.current(),n.target==n.currentTarget&&n.preventDefault(),e)if(n.ctrlKey){if(r&&r.hasClass(f))return r.removeClass(f),t}else i.selectable.clear();else i.selectable.clear();i.selectable.value(r)}}))},_scrollable:function(){var e,t=this,n=t.options.scrollable;n&&(t.content.css({"overflow-y":"scroll",position:"relative","-webkit-overflow-scrolling":"touch"}),"endless"===n&&(e=t._endlessPageSize=t.dataSource.options.pageSize,t.content.off("scroll"+y).on("scroll"+y,function(){this.scrollTop+this.clientHeight-this.scrollHeight>=-15&&!t._endlessFetchInProgress&&t._endlessPageSize<t.dataSource.total()&&(t._skipRerenderItemsCount=t._endlessPageSize,t._endlessPageSize=t._skipRerenderItemsCount+e,t.dataSource.options.endless=!0,t._endlessFetchInProgress=!0,t.dataSource.pageSize(t._endlessPageSize))})))},current:function(e){var n=this,a=n.element,r=n._current,i=n._itemId;return e===t?r:(r&&r[0]&&(r[0].id===i&&r.removeAttr("id"),r.removeClass(g),a.removeAttr("aria-activedescendant")),e&&e[0]&&(i=e[0].id||i,n._scrollTo(e[0]),a.attr("aria-activedescendant",i),e.addClass(g).attr("id",i)),n._current=e,t)},_scrollTo:function(t){var n,a,r=this,i=r.content,s=!1,o="scroll";"auto"===i.css("overflow")||i.css("overflow")===o||i.css("overflow-y")===o?n=i[0]:(n=window,s=!0),a=function(a,r){var i=s?e(t).offset()[a.toLowerCase()]:t["offset"+a],l=t["client"+r],c=e(n)[o+a](),d=e(n)[r.toLowerCase()]();i+l>c+d?e(n)[o+a](i+l-d):i<c&&e(n)[o+a](i)},a("Top","Height"),a("Left","Width")},_navigatable:function(){var t=this,a=t.options.navigatable,r=t.element,i=t.content,s=function(a){t.current(e(a.currentTarget)),e(a.target).is(":button, a, :input, a > .k-icon, textarea")||n.focusElement(r)};a&&(t._tabindex(),r.on("focus"+y,function(){var e=t._current;e&&e.is(":visible")||(e=t._item("first")),t.current(e)}).on("focusout"+y,function(){t._current&&t._current.removeClass(g)}).on("keydown"+y,t,function(a){var r,s,o=a.keyCode,l=t.current(),d=e(a.target),u=!d.is(":button, textarea, a, a > .t-icon, input"),p=d.is(":text, :password"),m=n.preventDefault,g=i.find("."+h),f=T(),v=t.options.scrollable;if(!(!u&&!p&&o!==c.ESC||p&&o!==c.ESC&&o!==c.ENTER)&&(o!==c.UP&&o!==c.LEFT||(l&&l[0]&&(l=l.prev()),l&&l[0]?t.current(l):v||t.current(t._item("last")),m(a)),o!==c.DOWN&&o!==c.RIGHT||(v?"endless"!==t.options.scrollable||l.next().length?(l=l.next(),l&&l[0]&&t.current(l)):(t.content[0].scrollTop=t.content[0].scrollHeight,t._focusNext=!0):(l=l.next(),t.current(l&&l[0]?l:t._item("first"))),m(a)),o===c.PAGEUP&&(t.current(null),t.dataSource.page(t.dataSource.page()-1),m(a)),o===c.PAGEDOWN&&(t.current(null),t.dataSource.page(t.dataSource.page()+1),m(a)),o===c.HOME&&(t.current(t._item("first")),m(a)),o===c.END&&(t.current(t._item("last")),m(a)),o===c.ENTER&&(0!==g.length&&(u||p)?(r=t.items().index(g),f&&f.blur(),t.save(),s=function(){t.element.trigger("focus"),t.current(t.items().eq(r))},t.one("dataBound",s)):""!==t.options.editTemplate&&t.edit(l)),o===c.ESC)){if(g=i.find("."+h),0===g.length)return;r=t.items().index(g),t.cancel(),t.element.trigger("focus"),t.current(t.items().eq(r))}}),r.on(S+y+" "+w+y,u,x(s,t)))},clearSelection:function(){var e=this;e.selectable.clear(),e.trigger(a)},select:function(n){var a=this,r=a.selectable;return n=e(n),n.length?(r.options.multiple||(r.clear(),n=n.first()),r.value(n),t):r.value()},_destroyEditable:function(){var e=this;e.editable&&(e.editable.destroy(),delete e.editable)},_modelFromElement:function(e){var t=e.attr(n.attr("uid"));return this.dataSource.getByUid(t)},_closeEditable:function(){var e,t,a,r=this,i=r.editable,s=r.template;return i&&(i.element.index()%2&&(s=r.altTemplate),r.angular("cleanup",function(){return{elements:[i.element]}}),e=r._modelFromElement(i.element),r._destroyEditable(),a=i.element.index(),i.element.replaceWith(s(e)),t=r.items().eq(a),t.attr(n.attr("uid"),e.uid),t.attr("role","option"),r._hasBindingTarget()&&n.bind(t,e),r.angular("compile",function(){return{elements:[t],data:[{dataItem:e}]}})),!0},edit:function(e){var t,a,r=this,i=r._modelFromElement(e),s=i.uid;r.cancel(),e=r.items().filter("["+n.attr("uid")+"="+s+"]"),a=e.index(),e.replaceWith(r.editTemplate(i)),t=r.items().eq(a).addClass(h).attr(n.attr("uid"),i.uid),r.editable=t.kendoEditable({model:i,clearContainer:!1,errorTemplate:!1,target:r}).data("kendoEditable"),r.trigger(v,{model:i,item:t})},save:function(){var e,t,n=this,a=n.editable;a&&(t=a.element,e=n._modelFromElement(t),a.end()&&!n.trigger(_,{model:e,item:t})&&(n._closeEditable(),n.dataSource.sync()))},remove:function(e){var t=this,n=t.dataSource,a=t._modelFromElement(e);t.editable&&(n.cancelChanges(t._modelFromElement(t.editable.element)),t._closeEditable()),t.trigger(k,{model:a,item:e})||(e.hide(),n.remove(a),n.sync())},add:function(){var e,t=this,n=t.dataSource,a=n.indexOf((n.view()||[])[0]);a<0&&(a=0),t.cancel(),e=n.insert(a,{}),t.edit(t.element.find("[data-uid='"+e.uid+"']"))},cancel:function(){var e,t,n=this,a=n.dataSource;n.editable&&(e=n.editable.element,t=n._modelFromElement(e),n.trigger(i,{model:t,container:e})||(a.cancelChanges(t),n._closeEditable()))},_crudHandlers:function(){var t=this,a=S+y,r=w+y,i=b+y;t.content.on(a+" "+r,".k-edit-button",function(a){a.preventDefault();var r=e(this).closest("["+n.attr("uid")+"]");setTimeout(function(){t.edit(r)})}),t.content.on(a+" "+r,".k-delete-button",function(a){a.preventDefault();var r=e(this).closest("["+n.attr("uid")+"]");setTimeout(function(){t.remove(r)})}),t.content.on(i,".k-update-button",function(e){t.save(),e.preventDefault()}),t.content.on(i,".k-cancel-button",function(e){t.cancel(),e.preventDefault()})},destroy:function(){var e=this;l.fn.destroy.call(e),e._unbindDataSource(),e._destroyEditable(),e.element.off(y),e.content.off(y),e._endlessFetchInProgress=e._endlessPageSize=e._skipRerenderItemsCount=e._focusNext=null,e.pager&&e.pager.destroy(),n.destroy(e.element)}});n.ui.plugin(E)}(window.kendo.jQuery),window.kendo},"function"==typeof define&&define.amd?define:function(e,t,n){(n||t)()}),$(function(){var e=getDataSource();$("#results").kendoListView({dataSource:e,template:$("#results-template").html(),dataBound:function(){window.scrollTo(0,0),setSideNavPosition()}}),$(".site-pager").kendoPager({dataSource:e,buttonCount:5,responsive:!1,messages:{previous:"Previous",next:"Next",display:"",empty:""}}),$(".results-message").kendoPager({dataSource:e,numeric:!1,previousNext:!1,responsive:!1,messages:{display:"{0}-{1} of {2} results",empty:"Sorry, there were no results found. Maybe try a broader search."}}),setSideNavPosition(),attachToEvents()});