;define(function(require){'use strict';var i=require('underscore'),$=require('jquery'),r=require('backbone'),a=require('root/config'),o=require('core/theme-tpl-tags'),u=require('core/app-utils'),s=require('core/lib/hooks'),t=null,n=!1;return r.View.extend({initialize:function(l){var r=this;require(['text!theme/header.html'],function(e){t=e;n=t.match(/<%=\s*menu\s*%>/)!==null;r.template=i.template(t);l.do_if_template_exists(r)},function(e){u.log('Info : no theme/header.html found in theme');l.do_if_no_template()})},render:function(){if(t!==null){var e={title:a.app_title,menu:'<div id="app-menu"></div>',TemplateTags:o};e=s.applyFilters('template-args',e,['header','header',this]);var n=this.template(e);$(this.el).html(n)};return this},templateExists:function(){return t!==null},containsMenu:function(){return n}})});