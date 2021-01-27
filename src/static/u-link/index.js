! function(n, o) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = o() : "function" == typeof define &&
		define.amd ? define(o) : (n = "undefined" != typeof globalThis ? globalThis : n || self).ULink = o()
}(this, (function() {
	"use strict";

	function n(n, o) {
		o = o || !1;
		for (var e = {}, t = (n = n || window.location.search.slice(1)).split("&"), i = 0; i < t.length; i++) {
			var d = t[i].split("="),
				r = d[0];
			if (r) {
				var a = "";
				d.length > 1 && (a = o ? decodeURIComponent(d[1]) : d[1]), e[r] = a
			}
		}
		return e
	}
	const o = navigator.userAgent,
		e = o.indexOf("Android") > -1 || o.indexOf("Linux") > -1,
		t = o.indexOf("iPad") > -1,
		i = o.indexOf("iPhone") > -1 || o.indexOf("Mac") > -1;
	var d = {
		userAgent: o,
		isAndroid: e,
		isIOS: i || t
	};
	const r = {
		getUriParams: n,
		getUriDecodeParams: function(o) {
			return n(o, !0)
		}
	};
	for (var a in d) r[a] = d[a];

	function l(n) {
		(n = n || {}).method = (n.method || "POST").toUpperCase(), n.url = n.url || "", n.data = n.data || null, n.success =
			n.success || function() {}, n.error = n.error || function() {};
		var o = new XMLHttpRequest,
			e = [];
		for (var t in n.data) e.push(t + "=" + n.data[t]);
		var i = e.join("&"),
			d = JSON.stringify(n.data || {});
		"POST" === n.method ? (o.open(n.method, n.url, !0), o.setRequestHeader("Content-Type", "application/json")) : "GET" ===
			n.method && o.open(n.method, n.url + "?" + i, !0), o.withCredentials = !0, o.onreadystatechange = function() {
				if (4 == o.readyState && 200 == o.status) {
					var e = {};
					try {
						e = JSON.parse(o.responseText)
					} catch (n) {}
					n.success(e)
				} else 4 == o.readyState && n.error(o.staus)
			}, "POST" === n.method ? o.send(d) : o.send()
	}

	function s(n) {
		window.location = n
	}
	var u = function(n) {
		this.opts = n
	};
	for (var c in u.version = "1.0.0", u.prototype = {
			ready: function(o) {
				var e = this;
				"function" == typeof o && function(o, e, t) {
					if (e = e || function() {}, t = t || function() {}, !(o = o || {}).id) return void t({});
					const i = n(),
						r = o.data || {};
					i.um_from_appkey && (r.um_from_appkey = i.um_from_appkey);
					let a = "";
					d.isIOS ? a = "ios" : d.isAndroid && (a = "android"), l({
						url: o.initApi || "https://deeplink.umeng.com/deeplink/init",
						data: {
							linkId: o.id,
							platform: a,
							data: r
						},
						success: function(n) {
							200 === n.code ? e(n.data || {}) : t(n)
						},
						error: function() {
							t({
								code: 999999,
								msg: "服务出错了"
							})
						}
					})
				}(this.opts || {}, (function(n) {
					console.log("U-Link loadSolution success: ", n), e.solution = n, o(e)
				}), (function(n) {
					console.error("U-Link loadSolution error: ", n), o(e)
				}))
			},
			wakeup: function() {
				var n, o, e = this.opts || {},
					t = this.solution || {};
				! function(n, o) {
					let e = "";
					d.isIOS ? e = "ios" : d.isAndroid && (e = "android"), l({
						url: n.wakeApi || "https://deeplink.umeng.com/deeplink/wakeup",
						data: {
							biztype: "dl-wakeup",
							linkId: n.id || "",
							wakeupUrl: o.wakeupUrl || "",
							downloadUrl: o.downloadUrl || "",
							appkey: o.appkey,
							platform: e
						},
						success: function(n) {},
						error: function() {}
					})
				}(e, t), t.wakeupUrl && function(n, o) {
					if (n) {
						o = o || {};
						var e = {
							delay: 0
						};
						for (var t in o) e[t] = o[t];
						e.delay ? setTimeout((function() {
							s(n)
						}), e.delay) : s(n)
					}
				}(t.wakeupUrl), t.downloadUrl && (n = t.downloadUrl, (o = document.createElement("div")).style =
					"position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,0.2);font-size:14px;z-index:99999999999;",
					o.innerHTML =
					'<div style="border-radius:10px;box-sizing:border-box;text-align:left;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:80%;max-width:500px;height:130px;padding:0 10px;background:#fff;color:#666;">    <div onclick="window.ulinkCloseDownloadTip()" style="font-size:20px;text-align:right;color:#999;">×</div>   <div style="padding: 5px 10px;">如未正常唤起，请点击下面按钮下载APP，或在浏览器中打开重试。</div>   <div onclick="window.ulinkOpenDownload()" style="width:30%;height:30px;line-height:30px;margin:10px auto 10px;text-align:center;font-size: 10px;color:#fff;background:#f76d45;">点击下载</div>  </div>',
					document.body.appendChild(o), window.ulinkOpenDownload = function() {
						window.location = n;
						try {
							delete window.ulinkOpenDownload
						} catch (n) {}
					}, window.ulinkCloseDownloadTip = function() {
						document.body.removeChild(o);
						try {
							delete window.ulinkOpenDownload, delete window.ulinkCloseDownloadTip
						} catch (n) {}
					})
			}
		}, r) u[c] = r[c];
	return u.start = function(n) {
		return new u(n)
	}, u
}));
//# sourceMappingURL=index.min.js.map
