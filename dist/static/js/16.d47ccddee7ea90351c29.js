webpackJsonp([16],{DVR7:function(t,o,n){"use strict";function a(t){n("pgFG")}Object.defineProperty(o,"__esModule",{value:!0});var e=n("Dd8w"),_=n.n(e),c=n("ABCa"),i=n("rHil"),s=n("1DHf"),l=n("2sLL"),d=n("NYxO"),m=(_()({},Object(d.c)({showWallet:function(t){return t.user.showWallet}})),i.a,c.a,s.a,l.a,{name:"User",data:function(){return{item:null}},created:function(){this.ready()},mounted:function(){this.showWallet&&this.ready()},methods:{ready:function(){this.item=this.showWallet}},watch:{showWallet:function(){this.ready()}},computed:_()({},Object(d.c)({showWallet:function(t){return t.user.showWallet}})),components:{Group:i.a,XHeader:c.a,Cell:s.a,XButton:l.a}}),h=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"m-accountshow"},[n("x-header",{attrs:{title:"我的资产","left-options":{backText:""}}}),t._v(" "),this.item?n("div",{staticClass:"m-accountshow__detail"},[n("div",{staticClass:"m-accountshow__detail__head"},[n("div",{staticClass:"m-accountshow__detail__head-icon"},[n("img",{attrs:{src:this.item.src}})]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__head-caption"},[n("span",{staticClass:"m-accountshow__detail__head-title"},[t._v(t._s(this.item.currency))]),t._v(" "),n("span",{staticClass:"m-accountshow__detail__head-desc"},[t._v(t._s(this.item.fullName))])])]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__body"},[n("div",{staticClass:"m-accountshow__detail__body-item"},[n("div",{staticClass:"m-accountshow__detail__body-item-l"},[t._v("\n                    总额\n                ")]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__body-item-r"},[t._v("\n                    "+t._s(this.item.balance)+"\n                ")])]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__body-item"},[n("div",{staticClass:"m-accountshow__detail__body-item-l"},[t._v("\n                    可用余额\n                ")]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__body-item-r"},[t._v("\n                    "+t._s(this.item.available)+"\n                ")])]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__body-item"},[n("div",{staticClass:"m-accountshow__detail__body-item-l"},[t._v("\n                    冻结资产\n                ")]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__body-item-r"},[t._v("\n                    "+t._s(this.item.frozen)+"\n                ")])])]),t._v(" "),t._m(0)]):t._e(),t._v(" "),n("div",{staticClass:"m-accountshow__action"},[n("div",{staticClass:"m-accountshow__action__r"},[n("x-button",{staticClass:"btn_base button-default-disabled-bg-color",attrs:{link:"/account/transfer"}},[t._v("划转\n            ")])],1)])],1)},A=[function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"m-accountshow__detail__footer"},[n("div",{staticClass:"m-accountshow__detail__footer-item"},[n("div",{staticClass:"m-accountshow__detail__footer-item-l"},[t._v("\n                    固值(BTC)\n                ")]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__footer-item-r"},[t._v("\n                    0\n                ")])]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__footer-item"},[n("div",{staticClass:"m-accountshow__detail__footer-item-l"},[t._v("\n                    固值(CNY)\n                ")]),t._v(" "),n("div",{staticClass:"m-accountshow__detail__footer-item-r"},[t._v("\n                    0\n                ")])])])}],u={render:h,staticRenderFns:A},w=u,r=n("VU/8"),C=a,B=r(m,w,!1,C,null,null);o.default=B.exports},fjYd:function(t,o,n){o=t.exports=n("FZ+f")(!0),o.push([t.i,"/*\nsm: 544px,\nmd: 768px,\nlg: 992px,\nxl: 1200px\n*/\n.m-accountshow .m-accountshow__detail {\n  background-color: #ffffff;\n  margin-bottom: 1.1rem;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head {\n    display: table;\n    width: 100%;\n    min-height: 80px;\n    table-layout: fixed;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head .m-accountshow__detail__head-icon {\n      display: table-cell;\n      vertical-align: middle;\n      text-align: right;\n      padding-right: 10px;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head .m-accountshow__detail__head-caption {\n      display: table-cell;\n      vertical-align: middle;\n      text-align: left;\n      line-height: 1.4rem !important;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head .m-accountshow__detail__head-title {\n      display: block;\n      font-size: 1.3rem;\n      font-weight: 500;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head .m-accountshow__detail__head-desc {\n      display: block;\n      font-size: 1rem;\n      color: #afb2c1;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__body {\n    padding-bottom: 1.1rem;\n    border-bottom: 1px solid #ebedf2;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__body .m-accountshow__detail__body-item {\n      padding: 0 1.1rem 10px 1.1rem;\n      display: table;\n      width: 100%;\n      font-size: 1.2rem;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__body .m-accountshow__detail__body-item .m-accountshow__detail__body-item-l {\n        display: table-cell;\n        width: 60%;\n        text-align: left;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__body .m-accountshow__detail__body-item .m-accountshow__detail__body-item-r {\n        font-weight: 500;\n        display: table-cell;\n        text-align: right;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__footer {\n    padding-top: 1.1rem;\n    padding-bottom: 1.1rem;\n    /*border-bottom: 1px solid get-color(light, panel);*/\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__footer .m-accountshow__detail__footer-item {\n      padding: 0 1.1rem 10px 1.1rem;\n      display: table;\n      width: 100%;\n      font-size: 1.2rem;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__footer .m-accountshow__detail__footer-item .m-accountshow__detail__footer-item-l {\n        display: table-cell;\n        width: 60%;\n        text-align: left;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__footer .m-accountshow__detail__footer-item .m-accountshow__detail__footer-item-r {\n        font-weight: 500;\n        display: table-cell;\n        text-align: right;\n}\n.m-accountshow .m-accountshow__action {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  padding: 0 1.1rem;\n}\n.m-accountshow .m-accountshow__action .m-accountshow__action__r {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n}\n.m-accountshow .m-accountshow__action .m-accountshow__action__l {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n}\n","",{version:3,sources:["/Users/loriswang/Documents/exchange/src/modules/exchange/views/account/show/show.vue"],names:[],mappings:"AAAA;;;;;EAKE;AACF;EACE,0BAA0B;EAC1B,sBAAsB;CACvB;AACD;IACI,eAAe;IACf,YAAY;IACZ,iBAAiB;IACjB,oBAAoB;CACvB;AACD;MACM,oBAAoB;MACpB,uBAAuB;MACvB,kBAAkB;MAClB,oBAAoB;CACzB;AACD;MACM,oBAAoB;MACpB,uBAAuB;MACvB,iBAAiB;MACjB,+BAA+B;CACpC;AACD;MACM,eAAe;MACf,kBAAkB;MAClB,iBAAiB;CACtB;AACD;MACM,eAAe;MACf,gBAAgB;MAChB,eAAe;CACpB;AACD;IACI,uBAAuB;IACvB,iCAAiC;CACpC;AACD;MACM,8BAA8B;MAC9B,eAAe;MACf,YAAY;MACZ,kBAAkB;CACvB;AACD;QACQ,oBAAoB;QACpB,WAAW;QACX,iBAAiB;CACxB;AACD;QACQ,iBAAiB;QACjB,oBAAoB;QACpB,kBAAkB;CACzB;AACD;IACI,oBAAoB;IACpB,uBAAuB;IACvB,qDAAqD;CACxD;AACD;MACM,8BAA8B;MAC9B,eAAe;MACf,YAAY;MACZ,kBAAkB;CACvB;AACD;QACQ,oBAAoB;QACpB,WAAW;QACX,iBAAiB;CACxB;AACD;QACQ,iBAAiB;QACjB,oBAAoB;QACpB,kBAAkB;CACzB;AACD;EACE,qBAAqB;EACrB,sBAAsB;EACtB,cAAc;EACd,kBAAkB;CACnB;AACD;IACI,oBAAoB;IACpB,gBAAgB;YACR,QAAQ;CACnB;AACD;IACI,oBAAoB;IACpB,gBAAgB;YACR,QAAQ;CACnB",file:"show.vue",sourcesContent:["/*\nsm: 544px,\nmd: 768px,\nlg: 992px,\nxl: 1200px\n*/\n.m-accountshow .m-accountshow__detail {\n  background-color: #ffffff;\n  margin-bottom: 1.1rem;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head {\n    display: table;\n    width: 100%;\n    min-height: 80px;\n    table-layout: fixed;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head .m-accountshow__detail__head-icon {\n      display: table-cell;\n      vertical-align: middle;\n      text-align: right;\n      padding-right: 10px;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head .m-accountshow__detail__head-caption {\n      display: table-cell;\n      vertical-align: middle;\n      text-align: left;\n      line-height: 1.4rem !important;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head .m-accountshow__detail__head-title {\n      display: block;\n      font-size: 1.3rem;\n      font-weight: 500;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__head .m-accountshow__detail__head-desc {\n      display: block;\n      font-size: 1rem;\n      color: #afb2c1;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__body {\n    padding-bottom: 1.1rem;\n    border-bottom: 1px solid #ebedf2;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__body .m-accountshow__detail__body-item {\n      padding: 0 1.1rem 10px 1.1rem;\n      display: table;\n      width: 100%;\n      font-size: 1.2rem;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__body .m-accountshow__detail__body-item .m-accountshow__detail__body-item-l {\n        display: table-cell;\n        width: 60%;\n        text-align: left;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__body .m-accountshow__detail__body-item .m-accountshow__detail__body-item-r {\n        font-weight: 500;\n        display: table-cell;\n        text-align: right;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__footer {\n    padding-top: 1.1rem;\n    padding-bottom: 1.1rem;\n    /*border-bottom: 1px solid get-color(light, panel);*/\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__footer .m-accountshow__detail__footer-item {\n      padding: 0 1.1rem 10px 1.1rem;\n      display: table;\n      width: 100%;\n      font-size: 1.2rem;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__footer .m-accountshow__detail__footer-item .m-accountshow__detail__footer-item-l {\n        display: table-cell;\n        width: 60%;\n        text-align: left;\n}\n.m-accountshow .m-accountshow__detail .m-accountshow__detail__footer .m-accountshow__detail__footer-item .m-accountshow__detail__footer-item-r {\n        font-weight: 500;\n        display: table-cell;\n        text-align: right;\n}\n.m-accountshow .m-accountshow__action {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  padding: 0 1.1rem;\n}\n.m-accountshow .m-accountshow__action .m-accountshow__action__r {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n}\n.m-accountshow .m-accountshow__action .m-accountshow__action__l {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n            flex: 1;\n}\n"],sourceRoot:""}])},pgFG:function(t,o,n){var a=n("fjYd");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("15936bbd",a,!0,{})}});
//# sourceMappingURL=16.d47ccddee7ea90351c29.js.map