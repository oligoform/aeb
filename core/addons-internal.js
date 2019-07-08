;define(function(require){'use strict';var r=require('backbone'),f=require('root/config'),e=require('underscore'),h=require('core/app-utils');require('localstorage');var i={};e.each(f.addons,function(t){i[t.slug]=t});var c='bust='+new Date().getTime(),s=window.location.search.substring(1);if(s.length){c=s+'&'+c};var o=[],d=function(n){var a=[];e.each(i,function(t){e.each(t.html_files,function(e){a.push('text!addons/'+t.slug+'/'+e.file+'?'+c);o.push({file:e.file,type:e.type,position:e.position,data:e.data})})});require(a,function(){e.each(arguments,function(t,e){o[e].content=t});if(n!==undefined){n()}})},p=r.Model.extend({defaults:{id:'',data:'',}});var l=r.Collection.extend({localStorage:new r.LocalStorage('Addons-'+f.app_slug),model:p,saveAll:function(){this.map(function(t){t.save()})},resetAll:function(){var e=this.length;for(var t=e-1;t>=0;t--){this.at(t).destroy()};this.reset()}});var a=new l(),u=function(t){a.fetch({success:function(n){var o=[];n.each(function(t){if(!i.hasOwnProperty(t.get('id'))){o.push(t.get('id'))}});if(o.length>0){e.each(o,function(t){var e=a.get(t);if(e){e.destroy();a.remove(t)}})};t(a.toJSON())}})},n={};n.initialize=function(t){u(function(e){h.log('Addons dynamic data retrieved from local storage.',e);d(t)})};n.setDynamicDataFromWebService=function(t){a.resetAll();e.each(t,function(t,e){if(i.hasOwnProperty(e)){a.add({id:e,data:t})}});a.saveAll()};n.isActive=function(t){var n=!1;e.each(i,function(e){if(!n&&e.slug==t){n=!0}});return n};n.getJs=function(t,n){var a=[];e.each(i,function(i){e.each(i.js_files,function(e){if(e.type==t&&e.position==n){a.push('addons/'+i.slug+'/'+e.file)}})});return a};n.getCss=function(t){var n='';e.each(i,function(a){e.each(a.css_files,function(e){if(e.position==t){n=n+'<link rel="stylesheet" href="addons/'+a.slug+'/'+e.file+'?'+c+'">'}})});return n};n.getHtml=function(t,n){var a='';e.each(o,function(e){if(e.type==t&&e.position==n){a=a+e.content}});return a};n.getHtmlData=function(t){var n={};e.each(o,function(a){if(a.type==t){n=e.extend(n,a.data)}});return n};n.getAppStaticData=function(t,n){var a={};e.each(i,function(i){if(i.slug==t&&!e.isEmpty(i.app_data)){if(n!==undefined&&i.app_data.hasOwnProperty(n)){a=i.app_data[n]}else{a=i.app_data}}});return a};n.getAppDynamicData=function(t,n){var o={};var c=a.get(t);if(c){var i=c.get('data');if(!e.isEmpty(i)){if(n!==undefined&&i.hasOwnProperty(n)){o=i[n]}else{o=i}}};return o};return n});