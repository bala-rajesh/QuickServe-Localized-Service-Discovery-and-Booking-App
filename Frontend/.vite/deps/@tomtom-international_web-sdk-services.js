import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// node_modules/@tomtom-international/web-sdk-services/dist/services.min.js
var require_services_min = __commonJS({
  "node_modules/@tomtom-international/web-sdk-services/dist/services.min.js"(exports, module) {
    !(function(e, t) {
      if ("object" == typeof exports && "object" == typeof module) module.exports = t();
      else if ("function" == typeof define && define.amd) define([], t);
      else {
        var n = t();
        for (var r in n) ("object" == typeof exports ? exports : e)[r] = n[r];
      }
    })(self, (function() {
      return (function() {
        var e = [, function(e2) {
          const t2 = "api.tomtom.com";
          e2.exports = { "sdk.name": "MapsWebSDK", "sdk.version": "6.25.0", "sdk.examples.version": "SDK-${version}", "analytics.header.name": "TomTom-User-Agent", "analytics.header.sdkName": "MapsWebSDK", "endpoints.copyrightsV2": "".concat(t2, "/map/2/copyrights"), "endpoints.captionV2": "".concat(t2, "/map/2/copyrights/caption.{contentType}"), "endpoints.geocode": "".concat(t2, "/search/2/geocode/{query}.{contentType}"), "endpoints.structuredGeocode": "".concat(t2, "/search/2/structuredGeocode.{contentType}"), "endpoints.search": "".concat(t2, "/search/2/{type}/{query}.{contentType}"), "endpoints.nearbySearch": "".concat(t2, "/search/2/nearbySearch/.{contentType}"), "endpoints.batchNearbySearchQuery": "/{type}/.{contentType}", "endpoints.batchSearch": "".concat(t2, "/search/2/batch.{contentType}"), "endpoints.batchSyncSearch": "".concat(t2, "/search/2/batch/sync.{contentType}"), "endpoints.batchSearchQuery": "/{type}/{query}.{contentType}", "endpoints.batchStructuredGeocodeQuery": "/structuredGeocode.{contentType}", "endpoints.adp": "".concat(t2, "/search/2/additionalData.{contentType}"), "endpoints.batchAdpQuery": "/additionalData.{contentType}", "endpoints.reverseGeocode": "".concat(t2, "/search/2/{type}/{position}.{contentType}"), "endpoints.batchReverseGeocodeQuery": "/{type}/{position}.{contentType}", "endpoints.autocomplete": "".concat(t2, "/search/2/autocomplete/{query}.{contentType}"), "endpoints.poiCategories": "".concat(t2, "/search/2/poiCategories.{contentType}"), "endpoints.chargingAvailability": "".concat(t2, "/search/2/chargingAvailability.{contentType}"), "endpoints.batchChargingAvailabilityQuery": "/chargingAvailability.{contentType}", "endpoints.placeById": "".concat(t2, "/search/2/place.{contentType}"), "endpoints.incidentDetailsV5": "".concat(t2, "/traffic/services/5/incidentDetails"), "endpoints.incidentViewport": "".concat(t2, "/traffic/services/4/incidentViewport/0,0,.1,.1/0/0,0,.1,.1/0/false/{contentType}"), "endpoints.flowSegmentData": "".concat(t2, "/traffic/services/4/flowSegmentData/{style}/{zoom}/{contentType}"), "endpoints.incidentRegions": "".concat(t2, "/traffic/services/4/incidentRegions/{contentType}"), "endpoints.rasterTrafficIncidentTilesLayer": "{s}.".concat(t2, "/traffic/map/4/tile/incidents/{style}/{z}/{x}/{y}.png?tileSize={tileSize}"), "endpoints.vectorTrafficIncidentTilesLayer": "{s}.".concat(t2, "/traffic/map/4/tile/incidents/{z}/{x}/{y}.pbf"), "endpoints.rasterTrafficFlowTilesLayer": "{s}.".concat(t2, "/traffic/map/4/tile/flow/{style}/{z}/{x}/{y}.png"), "endpoints.vectorTrafficFlowTilesLayer": "{s}.".concat(t2, "/traffic/map/4/tile/flow/{style}/{z}/{x}/{y}.pbf"), "endpoints.tileLayer": "{s}.".concat(t2, "/map/1/tile/{layer}/{style}/{z}/{x}/{y}.png?tileSize={tileSize}"), "endpoints.wmsLayer": "{s}.".concat(t2, "/map/1/wms/?service=WMS&version=1.1.1&request=GetMap&bbox={bbox-epsg-3857}&srs=EPSG:3857&width=512&height=512&layers=basic&styles=&format={format}"), "endpoints.vectorTileLayer": "{s}.".concat(t2, "/map/1/tile/{layer}/{style}/{z}/{x}/{y}.pbf"), "endpoints.vectorTileLayerV2": "{s}.".concat(t2, "/map/2/tile/{layer}/{z}/{x}/{y}.pbf"), "endpoints.routing": "".concat(t2, "/routing/1/calculateRoute/{locations}/{contentType}"), "endpoints.calculateReachableRange": "".concat(t2, "/routing/1/calculateReachableRange/{origin}/{contentType}"), "endpoints.batchRouting": "".concat(t2, "/routing/1/batch/{contentType}"), "endpoints.batchSyncRouting": "".concat(t2, "/routing/1/batch/sync/{contentType}"), "endpoints.batchRoutingQuery": "/calculateRoute/{locations}/{contentType}", "endpoints.batchReachableRangeQuery": "/calculateReachableRange/{origin}/{contentType}", "endpoints.matrixRouting": "".concat(t2, "/routing/1/matrix/{contentType}"), "endpoints.matrixSyncRouting": "".concat(t2, "/routing/1/matrix/sync/{contentType}"), "endpoints.longDistanceEVRouting": "".concat(t2, "/routing/1/calculateLongDistanceEVRoute/{locations}/{contentType}"), "endpoints.staticImage": "https://".concat(t2, "/map/1/staticimage"), "vector.glyphs": "https://" + t2 + "/maps-sdk-js/6.25.0/glyphs/{fontstack}/{range}.pbf", "vector.sprites": "https://" + t2 + "/maps-sdk-js/6.25.0/sprites/sprite", "endpoints.styles": "https://".concat(t2, "/style/1/style/{version}?map=2/basic_street-light&traffic_incidents=2/incidents_light&traffic_flow=2/flow_relative-light&poi=2/poi_light"), origin: t2, hostedStylesVersion: "22.2.1-*" };
        }, function(e2, t2, n2) {
          var r2 = n2(3), o = n2(9);
          e2.exports = function(e3) {
            if (!o(e3)) return false;
            var t3 = r2(e3);
            return "[object Function]" == t3 || "[object GeneratorFunction]" == t3 || "[object AsyncFunction]" == t3 || "[object Proxy]" == t3;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(4), o = n2(7), i = n2(8), a = r2 ? r2.toStringTag : void 0;
          e2.exports = function(e3) {
            return null == e3 ? void 0 === e3 ? "[object Undefined]" : "[object Null]" : a && a in Object(e3) ? o(e3) : i(e3);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(5).Symbol;
          e2.exports = r2;
        }, function(e2, t2, n2) {
          var r2 = n2(6), o = "object" == typeof self && self && self.Object === Object && self, i = r2 || o || Function("return this")();
          e2.exports = i;
        }, function(e2, t2, n2) {
          var r2 = "object" == typeof n2.g && n2.g && n2.g.Object === Object && n2.g;
          e2.exports = r2;
        }, function(e2, t2, n2) {
          var r2 = n2(4), o = Object.prototype, i = o.hasOwnProperty, a = o.toString, s = r2 ? r2.toStringTag : void 0;
          e2.exports = function(e3) {
            var t3 = i.call(e3, s), n3 = e3[s];
            try {
              e3[s] = void 0;
              var r3 = true;
            } catch (e4) {
            }
            var o2 = a.call(e3);
            return r3 && (t3 ? e3[s] = n3 : delete e3[s]), o2;
          };
        }, function(e2) {
          var t2 = Object.prototype.toString;
          e2.exports = function(e3) {
            return t2.call(e3);
          };
        }, function(e2) {
          e2.exports = function(e3) {
            var t2 = typeof e3;
            return null != e3 && ("object" == t2 || "function" == t2);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(3), o = n2(11), i = n2(12);
          e2.exports = function(e3) {
            return "string" == typeof e3 || !o(e3) && i(e3) && "[object String]" == r2(e3);
          };
        }, function(e2) {
          var t2 = Array.isArray;
          e2.exports = t2;
        }, function(e2) {
          e2.exports = function(e3) {
            return null != e3 && "object" == typeof e3;
          };
        }, function(e2) {
          e2.exports = function(e3) {
            return null == e3;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(15);
          e2.exports = function(e3) {
            return "number" == typeof e3 && e3 == r2(e3);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(16);
          e2.exports = function(e3) {
            var t3 = r2(e3), n3 = t3 % 1;
            return t3 == t3 ? n3 ? t3 - n3 : t3 : 0;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(17), o = 1 / 0;
          e2.exports = function(e3) {
            return e3 ? (e3 = r2(e3)) === o || e3 === -1 / 0 ? 17976931348623157e292 * (e3 < 0 ? -1 : 1) : e3 == e3 ? e3 : 0 : 0 === e3 ? e3 : 0;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(9), o = n2(18), i = /^\s+|\s+$/g, a = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt;
          e2.exports = function(e3) {
            if ("number" == typeof e3) return e3;
            if (o(e3)) return NaN;
            if (r2(e3)) {
              var t3 = "function" == typeof e3.valueOf ? e3.valueOf() : e3;
              e3 = r2(t3) ? t3 + "" : t3;
            }
            if ("string" != typeof e3) return 0 === e3 ? e3 : +e3;
            e3 = e3.replace(i, "");
            var n3 = s.test(e3);
            return n3 || c.test(e3) ? l(e3.slice(2), n3 ? 2 : 8) : a.test(e3) ? NaN : +e3;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(3), o = n2(12);
          e2.exports = function(e3) {
            return "symbol" == typeof e3 || o(e3) && "[object Symbol]" == r2(e3);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(20), o = n2(21);
          e2.exports = function(e3, t3) {
            return null != e3 && o(e3, t3, r2);
          };
        }, function(e2) {
          var t2 = Object.prototype.hasOwnProperty;
          e2.exports = function(e3, n2) {
            return null != e3 && t2.call(e3, n2);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(22), o = n2(60), i = n2(11), a = n2(62), s = n2(63), c = n2(64);
          e2.exports = function(e3, t3, n3) {
            for (var l = -1, u = (t3 = r2(t3, e3)).length, p = false; ++l < u; ) {
              var d = c(t3[l]);
              if (!(p = null != e3 && n3(e3, d))) break;
              e3 = e3[d];
            }
            return p || ++l != u ? p : !!(u = null == e3 ? 0 : e3.length) && s(u) && a(d, u) && (i(e3) || o(e3));
          };
        }, function(e2, t2, n2) {
          var r2 = n2(11), o = n2(23), i = n2(24), a = n2(57);
          e2.exports = function(e3, t3) {
            return r2(e3) ? e3 : o(e3, t3) ? [e3] : i(a(e3));
          };
        }, function(e2, t2, n2) {
          var r2 = n2(11), o = n2(18), i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, a = /^\w*$/;
          e2.exports = function(e3, t3) {
            if (r2(e3)) return false;
            var n3 = typeof e3;
            return !("number" != n3 && "symbol" != n3 && "boolean" != n3 && null != e3 && !o(e3)) || (a.test(e3) || !i.test(e3) || null != t3 && e3 in Object(t3));
          };
        }, function(e2, t2, n2) {
          var r2 = n2(25), o = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, i = /\\(\\)?/g, a = r2((function(e3) {
            var t3 = [];
            return 46 === e3.charCodeAt(0) && t3.push(""), e3.replace(o, (function(e4, n3, r3, o2) {
              t3.push(r3 ? o2.replace(i, "$1") : n3 || e4);
            })), t3;
          }));
          e2.exports = a;
        }, function(e2, t2, n2) {
          var r2 = n2(26);
          e2.exports = function(e3) {
            var t3 = r2(e3, (function(e4) {
              return 500 === n3.size && n3.clear(), e4;
            })), n3 = t3.cache;
            return t3;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(27);
          function o(e3, t3) {
            if ("function" != typeof e3 || null != t3 && "function" != typeof t3) throw new TypeError("Expected a function");
            var n3 = function() {
              var r3 = arguments, o2 = t3 ? t3.apply(this, r3) : r3[0], i = n3.cache;
              if (i.has(o2)) return i.get(o2);
              var a = e3.apply(this, r3);
              return n3.cache = i.set(o2, a) || i, a;
            };
            return n3.cache = new (o.Cache || r2)(), n3;
          }
          o.Cache = r2, e2.exports = o;
        }, function(e2, t2, n2) {
          var r2 = n2(28), o = n2(51), i = n2(54), a = n2(55), s = n2(56);
          function c(e3) {
            var t3 = -1, n3 = null == e3 ? 0 : e3.length;
            for (this.clear(); ++t3 < n3; ) {
              var r3 = e3[t3];
              this.set(r3[0], r3[1]);
            }
          }
          c.prototype.clear = r2, c.prototype.delete = o, c.prototype.get = i, c.prototype.has = a, c.prototype.set = s, e2.exports = c;
        }, function(e2, t2, n2) {
          var r2 = n2(29), o = n2(42), i = n2(50);
          e2.exports = function() {
            this.size = 0, this.__data__ = { hash: new r2(), map: new (i || o)(), string: new r2() };
          };
        }, function(e2, t2, n2) {
          var r2 = n2(30), o = n2(38), i = n2(39), a = n2(40), s = n2(41);
          function c(e3) {
            var t3 = -1, n3 = null == e3 ? 0 : e3.length;
            for (this.clear(); ++t3 < n3; ) {
              var r3 = e3[t3];
              this.set(r3[0], r3[1]);
            }
          }
          c.prototype.clear = r2, c.prototype.delete = o, c.prototype.get = i, c.prototype.has = a, c.prototype.set = s, e2.exports = c;
        }, function(e2, t2, n2) {
          var r2 = n2(31);
          e2.exports = function() {
            this.__data__ = r2 ? r2(null) : {}, this.size = 0;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(32)(Object, "create");
          e2.exports = r2;
        }, function(e2, t2, n2) {
          var r2 = n2(33), o = n2(37);
          e2.exports = function(e3, t3) {
            var n3 = o(e3, t3);
            return r2(n3) ? n3 : void 0;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(2), o = n2(34), i = n2(9), a = n2(36), s = /^\[object .+?Constructor\]$/, c = Function.prototype, l = Object.prototype, u = c.toString, p = l.hasOwnProperty, d = RegExp("^" + u.call(p).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
          e2.exports = function(e3) {
            return !(!i(e3) || o(e3)) && (r2(e3) ? d : s).test(a(e3));
          };
        }, function(e2, t2, n2) {
          var r2, o = n2(35), i = (r2 = /[^.]+$/.exec(o && o.keys && o.keys.IE_PROTO || "")) ? "Symbol(src)_1." + r2 : "";
          e2.exports = function(e3) {
            return !!i && i in e3;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(5)["__core-js_shared__"];
          e2.exports = r2;
        }, function(e2) {
          var t2 = Function.prototype.toString;
          e2.exports = function(e3) {
            if (null != e3) {
              try {
                return t2.call(e3);
              } catch (e4) {
              }
              try {
                return e3 + "";
              } catch (e4) {
              }
            }
            return "";
          };
        }, function(e2) {
          e2.exports = function(e3, t2) {
            return null == e3 ? void 0 : e3[t2];
          };
        }, function(e2) {
          e2.exports = function(e3) {
            var t2 = this.has(e3) && delete this.__data__[e3];
            return this.size -= t2 ? 1 : 0, t2;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(31), o = Object.prototype.hasOwnProperty;
          e2.exports = function(e3) {
            var t3 = this.__data__;
            if (r2) {
              var n3 = t3[e3];
              return "__lodash_hash_undefined__" === n3 ? void 0 : n3;
            }
            return o.call(t3, e3) ? t3[e3] : void 0;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(31), o = Object.prototype.hasOwnProperty;
          e2.exports = function(e3) {
            var t3 = this.__data__;
            return r2 ? void 0 !== t3[e3] : o.call(t3, e3);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(31);
          e2.exports = function(e3, t3) {
            var n3 = this.__data__;
            return this.size += this.has(e3) ? 0 : 1, n3[e3] = r2 && void 0 === t3 ? "__lodash_hash_undefined__" : t3, this;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(43), o = n2(44), i = n2(47), a = n2(48), s = n2(49);
          function c(e3) {
            var t3 = -1, n3 = null == e3 ? 0 : e3.length;
            for (this.clear(); ++t3 < n3; ) {
              var r3 = e3[t3];
              this.set(r3[0], r3[1]);
            }
          }
          c.prototype.clear = r2, c.prototype.delete = o, c.prototype.get = i, c.prototype.has = a, c.prototype.set = s, e2.exports = c;
        }, function(e2) {
          e2.exports = function() {
            this.__data__ = [], this.size = 0;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(45), o = Array.prototype.splice;
          e2.exports = function(e3) {
            var t3 = this.__data__, n3 = r2(t3, e3);
            return !(n3 < 0) && (n3 == t3.length - 1 ? t3.pop() : o.call(t3, n3, 1), --this.size, true);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(46);
          e2.exports = function(e3, t3) {
            for (var n3 = e3.length; n3--; ) if (r2(e3[n3][0], t3)) return n3;
            return -1;
          };
        }, function(e2) {
          e2.exports = function(e3, t2) {
            return e3 === t2 || e3 != e3 && t2 != t2;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(45);
          e2.exports = function(e3) {
            var t3 = this.__data__, n3 = r2(t3, e3);
            return n3 < 0 ? void 0 : t3[n3][1];
          };
        }, function(e2, t2, n2) {
          var r2 = n2(45);
          e2.exports = function(e3) {
            return r2(this.__data__, e3) > -1;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(45);
          e2.exports = function(e3, t3) {
            var n3 = this.__data__, o = r2(n3, e3);
            return o < 0 ? (++this.size, n3.push([e3, t3])) : n3[o][1] = t3, this;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(32)(n2(5), "Map");
          e2.exports = r2;
        }, function(e2, t2, n2) {
          var r2 = n2(52);
          e2.exports = function(e3) {
            var t3 = r2(this, e3).delete(e3);
            return this.size -= t3 ? 1 : 0, t3;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(53);
          e2.exports = function(e3, t3) {
            var n3 = e3.__data__;
            return r2(t3) ? n3["string" == typeof t3 ? "string" : "hash"] : n3.map;
          };
        }, function(e2) {
          e2.exports = function(e3) {
            var t2 = typeof e3;
            return "string" == t2 || "number" == t2 || "symbol" == t2 || "boolean" == t2 ? "__proto__" !== e3 : null === e3;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(52);
          e2.exports = function(e3) {
            return r2(this, e3).get(e3);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(52);
          e2.exports = function(e3) {
            return r2(this, e3).has(e3);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(52);
          e2.exports = function(e3, t3) {
            var n3 = r2(this, e3), o = n3.size;
            return n3.set(e3, t3), this.size += n3.size == o ? 0 : 1, this;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(58);
          e2.exports = function(e3) {
            return null == e3 ? "" : r2(e3);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(4), o = n2(59), i = n2(11), a = n2(18), s = r2 ? r2.prototype : void 0, c = s ? s.toString : void 0;
          e2.exports = function e3(t3) {
            if ("string" == typeof t3) return t3;
            if (i(t3)) return o(t3, e3) + "";
            if (a(t3)) return c ? c.call(t3) : "";
            var n3 = t3 + "";
            return "0" == n3 && 1 / t3 == -Infinity ? "-0" : n3;
          };
        }, function(e2) {
          e2.exports = function(e3, t2) {
            for (var n2 = -1, r2 = null == e3 ? 0 : e3.length, o = Array(r2); ++n2 < r2; ) o[n2] = t2(e3[n2], n2, e3);
            return o;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(61), o = n2(12), i = Object.prototype, a = i.hasOwnProperty, s = i.propertyIsEnumerable, c = r2(/* @__PURE__ */ (function() {
            return arguments;
          })()) ? r2 : function(e3) {
            return o(e3) && a.call(e3, "callee") && !s.call(e3, "callee");
          };
          e2.exports = c;
        }, function(e2, t2, n2) {
          var r2 = n2(3), o = n2(12);
          e2.exports = function(e3) {
            return o(e3) && "[object Arguments]" == r2(e3);
          };
        }, function(e2) {
          var t2 = /^(?:0|[1-9]\d*)$/;
          e2.exports = function(e3, n2) {
            var r2 = typeof e3;
            return !!(n2 = null == n2 ? 9007199254740991 : n2) && ("number" == r2 || "symbol" != r2 && t2.test(e3)) && e3 > -1 && e3 % 1 == 0 && e3 < n2;
          };
        }, function(e2) {
          e2.exports = function(e3) {
            return "number" == typeof e3 && e3 > -1 && e3 % 1 == 0 && e3 <= 9007199254740991;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(18);
          e2.exports = function(e3) {
            if ("string" == typeof e3 || r2(e3)) return e3;
            var t3 = e3 + "";
            return "0" == t3 && 1 / e3 == -Infinity ? "-0" : t3;
          };
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), Object.defineProperty(t2, "v1", { enumerable: true, get: function() {
            return r2.default;
          } }), Object.defineProperty(t2, "v3", { enumerable: true, get: function() {
            return o.default;
          } }), Object.defineProperty(t2, "v4", { enumerable: true, get: function() {
            return i.default;
          } }), Object.defineProperty(t2, "v5", { enumerable: true, get: function() {
            return a.default;
          } }), Object.defineProperty(t2, "NIL", { enumerable: true, get: function() {
            return s.default;
          } }), Object.defineProperty(t2, "version", { enumerable: true, get: function() {
            return c.default;
          } }), Object.defineProperty(t2, "validate", { enumerable: true, get: function() {
            return l.default;
          } }), Object.defineProperty(t2, "stringify", { enumerable: true, get: function() {
            return u.default;
          } }), Object.defineProperty(t2, "parse", { enumerable: true, get: function() {
            return p.default;
          } });
          var r2 = d(n2(66)), o = d(n2(71)), i = d(n2(75)), a = d(n2(76)), s = d(n2(78)), c = d(n2(79)), l = d(n2(69)), u = d(n2(68)), p = d(n2(73));
          function d(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          }
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var r2 = i(n2(67)), o = i(n2(68));
          function i(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          }
          let a, s, c = 0, l = 0;
          var u = function(e3, t3, n3) {
            let i2 = t3 && n3 || 0;
            const u2 = t3 || new Array(16);
            let p = (e3 = e3 || {}).node || a, d = void 0 !== e3.clockseq ? e3.clockseq : s;
            if (null == p || null == d) {
              const t4 = e3.random || (e3.rng || r2.default)();
              null == p && (p = a = [1 | t4[0], t4[1], t4[2], t4[3], t4[4], t4[5]]), null == d && (d = s = 16383 & (t4[6] << 8 | t4[7]));
            }
            let f = void 0 !== e3.msecs ? e3.msecs : Date.now(), h = void 0 !== e3.nsecs ? e3.nsecs : l + 1;
            const y = f - c + (h - l) / 1e4;
            if (y < 0 && void 0 === e3.clockseq && (d = d + 1 & 16383), (y < 0 || f > c) && void 0 === e3.nsecs && (h = 0), h >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            c = f, l = h, s = d, f += 122192928e5;
            const v = (1e4 * (268435455 & f) + h) % 4294967296;
            u2[i2++] = v >>> 24 & 255, u2[i2++] = v >>> 16 & 255, u2[i2++] = v >>> 8 & 255, u2[i2++] = 255 & v;
            const g = f / 4294967296 * 1e4 & 268435455;
            u2[i2++] = g >>> 8 & 255, u2[i2++] = 255 & g, u2[i2++] = g >>> 24 & 15 | 16, u2[i2++] = g >>> 16 & 255, u2[i2++] = d >>> 8 | 128, u2[i2++] = 255 & d;
            for (let e4 = 0; e4 < 6; ++e4) u2[i2 + e4] = p[e4];
            return t3 || (0, o.default)(u2);
          };
          t2.default = u;
        }, function(e2, t2) {
          "use strict";
          let n2;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function() {
            if (!n2 && (n2 = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto), !n2)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return n2(r2);
          };
          const r2 = new Uint8Array(16);
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var r2, o = (r2 = n2(69)) && r2.__esModule ? r2 : { default: r2 };
          const i = [];
          for (let e3 = 0; e3 < 256; ++e3) i.push((e3 + 256).toString(16).substr(1));
          var a = function(e3, t3 = 0) {
            const n3 = (i[e3[t3 + 0]] + i[e3[t3 + 1]] + i[e3[t3 + 2]] + i[e3[t3 + 3]] + "-" + i[e3[t3 + 4]] + i[e3[t3 + 5]] + "-" + i[e3[t3 + 6]] + i[e3[t3 + 7]] + "-" + i[e3[t3 + 8]] + i[e3[t3 + 9]] + "-" + i[e3[t3 + 10]] + i[e3[t3 + 11]] + i[e3[t3 + 12]] + i[e3[t3 + 13]] + i[e3[t3 + 14]] + i[e3[t3 + 15]]).toLowerCase();
            if (!(0, o.default)(n3)) throw TypeError("Stringified UUID is invalid");
            return n3;
          };
          t2.default = a;
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var r2, o = (r2 = n2(70)) && r2.__esModule ? r2 : { default: r2 };
          var i = function(e3) {
            return "string" == typeof e3 && o.default.test(e3);
          };
          t2.default = i;
        }, function(e2, t2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          t2.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var r2 = i(n2(72)), o = i(n2(74));
          function i(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          }
          var a = (0, r2.default)("v3", 48, o.default);
          t2.default = a;
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3, t3, n3) {
            function i2(e4, i3, a2, s2) {
              if ("string" == typeof e4 && (e4 = (function(e5) {
                e5 = unescape(encodeURIComponent(e5));
                const t4 = [];
                for (let n4 = 0; n4 < e5.length; ++n4) t4.push(e5.charCodeAt(n4));
                return t4;
              })(e4)), "string" == typeof i3 && (i3 = (0, o.default)(i3)), 16 !== i3.length) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
              let c = new Uint8Array(16 + e4.length);
              if (c.set(i3), c.set(e4, i3.length), c = n3(c), c[6] = 15 & c[6] | t3, c[8] = 63 & c[8] | 128, a2) {
                s2 = s2 || 0;
                for (let e5 = 0; e5 < 16; ++e5) a2[s2 + e5] = c[e5];
                return a2;
              }
              return (0, r2.default)(c);
            }
            try {
              i2.name = e3;
            } catch (e4) {
            }
            return i2.DNS = a, i2.URL = s, i2;
          }, t2.URL = t2.DNS = void 0;
          var r2 = i(n2(68)), o = i(n2(73));
          function i(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          }
          const a = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
          t2.DNS = a;
          const s = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
          t2.URL = s;
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var r2, o = (r2 = n2(69)) && r2.__esModule ? r2 : { default: r2 };
          var i = function(e3) {
            if (!(0, o.default)(e3)) throw TypeError("Invalid UUID");
            let t3;
            const n3 = new Uint8Array(16);
            return n3[0] = (t3 = parseInt(e3.slice(0, 8), 16)) >>> 24, n3[1] = t3 >>> 16 & 255, n3[2] = t3 >>> 8 & 255, n3[3] = 255 & t3, n3[4] = (t3 = parseInt(e3.slice(9, 13), 16)) >>> 8, n3[5] = 255 & t3, n3[6] = (t3 = parseInt(e3.slice(14, 18), 16)) >>> 8, n3[7] = 255 & t3, n3[8] = (t3 = parseInt(e3.slice(19, 23), 16)) >>> 8, n3[9] = 255 & t3, n3[10] = (t3 = parseInt(e3.slice(24, 36), 16)) / 1099511627776 & 255, n3[11] = t3 / 4294967296 & 255, n3[12] = t3 >>> 24 & 255, n3[13] = t3 >>> 16 & 255, n3[14] = t3 >>> 8 & 255, n3[15] = 255 & t3, n3;
          };
          t2.default = i;
        }, function(e2, t2) {
          "use strict";
          function n2(e3) {
            return 14 + (e3 + 64 >>> 9 << 4) + 1;
          }
          function r2(e3, t3) {
            const n3 = (65535 & e3) + (65535 & t3);
            return (e3 >> 16) + (t3 >> 16) + (n3 >> 16) << 16 | 65535 & n3;
          }
          function o(e3, t3, n3, o2, i2, a2) {
            return r2((s2 = r2(r2(t3, e3), r2(o2, a2))) << (c2 = i2) | s2 >>> 32 - c2, n3);
            var s2, c2;
          }
          function i(e3, t3, n3, r3, i2, a2, s2) {
            return o(t3 & n3 | ~t3 & r3, e3, t3, i2, a2, s2);
          }
          function a(e3, t3, n3, r3, i2, a2, s2) {
            return o(t3 & r3 | n3 & ~r3, e3, t3, i2, a2, s2);
          }
          function s(e3, t3, n3, r3, i2, a2, s2) {
            return o(t3 ^ n3 ^ r3, e3, t3, i2, a2, s2);
          }
          function c(e3, t3, n3, r3, i2, a2, s2) {
            return o(n3 ^ (t3 | ~r3), e3, t3, i2, a2, s2);
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var l = function(e3) {
            if ("string" == typeof e3) {
              const t3 = unescape(encodeURIComponent(e3));
              e3 = new Uint8Array(t3.length);
              for (let n3 = 0; n3 < t3.length; ++n3) e3[n3] = t3.charCodeAt(n3);
            }
            return (function(e4) {
              const t3 = [], n3 = 32 * e4.length, r3 = "0123456789abcdef";
              for (let o2 = 0; o2 < n3; o2 += 8) {
                const n4 = e4[o2 >> 5] >>> o2 % 32 & 255, i2 = parseInt(r3.charAt(n4 >>> 4 & 15) + r3.charAt(15 & n4), 16);
                t3.push(i2);
              }
              return t3;
            })((function(e4, t3) {
              e4[t3 >> 5] |= 128 << t3 % 32, e4[n2(t3) - 1] = t3;
              let o2 = 1732584193, l2 = -271733879, u = -1732584194, p = 271733878;
              for (let t4 = 0; t4 < e4.length; t4 += 16) {
                const n3 = o2, d = l2, f = u, h = p;
                o2 = i(o2, l2, u, p, e4[t4], 7, -680876936), p = i(p, o2, l2, u, e4[t4 + 1], 12, -389564586), u = i(u, p, o2, l2, e4[t4 + 2], 17, 606105819), l2 = i(l2, u, p, o2, e4[t4 + 3], 22, -1044525330), o2 = i(o2, l2, u, p, e4[t4 + 4], 7, -176418897), p = i(p, o2, l2, u, e4[t4 + 5], 12, 1200080426), u = i(u, p, o2, l2, e4[t4 + 6], 17, -1473231341), l2 = i(l2, u, p, o2, e4[t4 + 7], 22, -45705983), o2 = i(o2, l2, u, p, e4[t4 + 8], 7, 1770035416), p = i(p, o2, l2, u, e4[t4 + 9], 12, -1958414417), u = i(u, p, o2, l2, e4[t4 + 10], 17, -42063), l2 = i(l2, u, p, o2, e4[t4 + 11], 22, -1990404162), o2 = i(o2, l2, u, p, e4[t4 + 12], 7, 1804603682), p = i(p, o2, l2, u, e4[t4 + 13], 12, -40341101), u = i(u, p, o2, l2, e4[t4 + 14], 17, -1502002290), l2 = i(l2, u, p, o2, e4[t4 + 15], 22, 1236535329), o2 = a(o2, l2, u, p, e4[t4 + 1], 5, -165796510), p = a(p, o2, l2, u, e4[t4 + 6], 9, -1069501632), u = a(u, p, o2, l2, e4[t4 + 11], 14, 643717713), l2 = a(l2, u, p, o2, e4[t4], 20, -373897302), o2 = a(o2, l2, u, p, e4[t4 + 5], 5, -701558691), p = a(p, o2, l2, u, e4[t4 + 10], 9, 38016083), u = a(u, p, o2, l2, e4[t4 + 15], 14, -660478335), l2 = a(l2, u, p, o2, e4[t4 + 4], 20, -405537848), o2 = a(o2, l2, u, p, e4[t4 + 9], 5, 568446438), p = a(p, o2, l2, u, e4[t4 + 14], 9, -1019803690), u = a(u, p, o2, l2, e4[t4 + 3], 14, -187363961), l2 = a(l2, u, p, o2, e4[t4 + 8], 20, 1163531501), o2 = a(o2, l2, u, p, e4[t4 + 13], 5, -1444681467), p = a(p, o2, l2, u, e4[t4 + 2], 9, -51403784), u = a(u, p, o2, l2, e4[t4 + 7], 14, 1735328473), l2 = a(l2, u, p, o2, e4[t4 + 12], 20, -1926607734), o2 = s(o2, l2, u, p, e4[t4 + 5], 4, -378558), p = s(p, o2, l2, u, e4[t4 + 8], 11, -2022574463), u = s(u, p, o2, l2, e4[t4 + 11], 16, 1839030562), l2 = s(l2, u, p, o2, e4[t4 + 14], 23, -35309556), o2 = s(o2, l2, u, p, e4[t4 + 1], 4, -1530992060), p = s(p, o2, l2, u, e4[t4 + 4], 11, 1272893353), u = s(u, p, o2, l2, e4[t4 + 7], 16, -155497632), l2 = s(l2, u, p, o2, e4[t4 + 10], 23, -1094730640), o2 = s(o2, l2, u, p, e4[t4 + 13], 4, 681279174), p = s(p, o2, l2, u, e4[t4], 11, -358537222), u = s(u, p, o2, l2, e4[t4 + 3], 16, -722521979), l2 = s(l2, u, p, o2, e4[t4 + 6], 23, 76029189), o2 = s(o2, l2, u, p, e4[t4 + 9], 4, -640364487), p = s(p, o2, l2, u, e4[t4 + 12], 11, -421815835), u = s(u, p, o2, l2, e4[t4 + 15], 16, 530742520), l2 = s(l2, u, p, o2, e4[t4 + 2], 23, -995338651), o2 = c(o2, l2, u, p, e4[t4], 6, -198630844), p = c(p, o2, l2, u, e4[t4 + 7], 10, 1126891415), u = c(u, p, o2, l2, e4[t4 + 14], 15, -1416354905), l2 = c(l2, u, p, o2, e4[t4 + 5], 21, -57434055), o2 = c(o2, l2, u, p, e4[t4 + 12], 6, 1700485571), p = c(p, o2, l2, u, e4[t4 + 3], 10, -1894986606), u = c(u, p, o2, l2, e4[t4 + 10], 15, -1051523), l2 = c(l2, u, p, o2, e4[t4 + 1], 21, -2054922799), o2 = c(o2, l2, u, p, e4[t4 + 8], 6, 1873313359), p = c(p, o2, l2, u, e4[t4 + 15], 10, -30611744), u = c(u, p, o2, l2, e4[t4 + 6], 15, -1560198380), l2 = c(l2, u, p, o2, e4[t4 + 13], 21, 1309151649), o2 = c(o2, l2, u, p, e4[t4 + 4], 6, -145523070), p = c(p, o2, l2, u, e4[t4 + 11], 10, -1120210379), u = c(u, p, o2, l2, e4[t4 + 2], 15, 718787259), l2 = c(l2, u, p, o2, e4[t4 + 9], 21, -343485551), o2 = r2(o2, n3), l2 = r2(l2, d), u = r2(u, f), p = r2(p, h);
              }
              return [o2, l2, u, p];
            })((function(e4) {
              if (0 === e4.length) return [];
              const t3 = 8 * e4.length, r3 = new Uint32Array(n2(t3));
              for (let n3 = 0; n3 < t3; n3 += 8) r3[n3 >> 5] |= (255 & e4[n3 / 8]) << n3 % 32;
              return r3;
            })(e3), 8 * e3.length));
          };
          t2.default = l;
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var r2 = i(n2(67)), o = i(n2(68));
          function i(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          }
          var a = function(e3, t3, n3) {
            const i2 = (e3 = e3 || {}).random || (e3.rng || r2.default)();
            if (i2[6] = 15 & i2[6] | 64, i2[8] = 63 & i2[8] | 128, t3) {
              n3 = n3 || 0;
              for (let e4 = 0; e4 < 16; ++e4) t3[n3 + e4] = i2[e4];
              return t3;
            }
            return (0, o.default)(i2);
          };
          t2.default = a;
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var r2 = i(n2(72)), o = i(n2(77));
          function i(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          }
          var a = (0, r2.default)("v5", 80, o.default);
          t2.default = a;
        }, function(e2, t2) {
          "use strict";
          function n2(e3, t3, n3, r3) {
            switch (e3) {
              case 0:
                return t3 & n3 ^ ~t3 & r3;
              case 1:
              case 3:
                return t3 ^ n3 ^ r3;
              case 2:
                return t3 & n3 ^ t3 & r3 ^ n3 & r3;
            }
          }
          function r2(e3, t3) {
            return e3 << t3 | e3 >>> 32 - t3;
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var o = function(e3) {
            const t3 = [1518500249, 1859775393, 2400959708, 3395469782], o2 = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            if ("string" == typeof e3) {
              const t4 = unescape(encodeURIComponent(e3));
              e3 = [];
              for (let n3 = 0; n3 < t4.length; ++n3) e3.push(t4.charCodeAt(n3));
            } else Array.isArray(e3) || (e3 = Array.prototype.slice.call(e3));
            e3.push(128);
            const i = e3.length / 4 + 2, a = Math.ceil(i / 16), s = new Array(a);
            for (let t4 = 0; t4 < a; ++t4) {
              const n3 = new Uint32Array(16);
              for (let r3 = 0; r3 < 16; ++r3) n3[r3] = e3[64 * t4 + 4 * r3] << 24 | e3[64 * t4 + 4 * r3 + 1] << 16 | e3[64 * t4 + 4 * r3 + 2] << 8 | e3[64 * t4 + 4 * r3 + 3];
              s[t4] = n3;
            }
            s[a - 1][14] = 8 * (e3.length - 1) / Math.pow(2, 32), s[a - 1][14] = Math.floor(s[a - 1][14]), s[a - 1][15] = 8 * (e3.length - 1) & 4294967295;
            for (let e4 = 0; e4 < a; ++e4) {
              const i2 = new Uint32Array(80);
              for (let t4 = 0; t4 < 16; ++t4) i2[t4] = s[e4][t4];
              for (let e5 = 16; e5 < 80; ++e5) i2[e5] = r2(i2[e5 - 3] ^ i2[e5 - 8] ^ i2[e5 - 14] ^ i2[e5 - 16], 1);
              let a2 = o2[0], c = o2[1], l = o2[2], u = o2[3], p = o2[4];
              for (let e5 = 0; e5 < 80; ++e5) {
                const o3 = Math.floor(e5 / 20), s2 = r2(a2, 5) + n2(o3, c, l, u) + p + t3[o3] + i2[e5] >>> 0;
                p = u, u = l, l = r2(c, 30) >>> 0, c = a2, a2 = s2;
              }
              o2[0] = o2[0] + a2 >>> 0, o2[1] = o2[1] + c >>> 0, o2[2] = o2[2] + l >>> 0, o2[3] = o2[3] + u >>> 0, o2[4] = o2[4] + p >>> 0;
            }
            return [o2[0] >> 24 & 255, o2[0] >> 16 & 255, o2[0] >> 8 & 255, 255 & o2[0], o2[1] >> 24 & 255, o2[1] >> 16 & 255, o2[1] >> 8 & 255, 255 & o2[1], o2[2] >> 24 & 255, o2[2] >> 16 & 255, o2[2] >> 8 & 255, 255 & o2[2], o2[3] >> 24 & 255, o2[3] >> 16 & 255, o2[3] >> 8 & 255, 255 & o2[3], o2[4] >> 24 & 255, o2[4] >> 16 & 255, o2[4] >> 8 & 255, 255 & o2[4]];
          };
          t2.default = o;
        }, function(e2, t2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          t2.default = "00000000-0000-0000-0000-000000000000";
        }, function(e2, t2, n2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = void 0;
          var r2, o = (r2 = n2(69)) && r2.__esModule ? r2 : { default: r2 };
          var i = function(e3) {
            if (!(0, o.default)(e3)) throw TypeError("Invalid UUID");
            return parseInt(e3.substr(14, 1), 16);
          };
          t2.default = i;
        }, function(e2) {
          e2.exports = function(e3) {
            return void 0 === e3;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(82), o = n2(86), i = n2(60), a = n2(11), s = n2(91), c = n2(92), l = n2(83), u = n2(94), p = Object.prototype.hasOwnProperty;
          e2.exports = function(e3) {
            if (null == e3) return true;
            if (s(e3) && (a(e3) || "string" == typeof e3 || "function" == typeof e3.splice || c(e3) || u(e3) || i(e3))) return !e3.length;
            var t3 = o(e3);
            if ("[object Map]" == t3 || "[object Set]" == t3) return !e3.size;
            if (l(e3)) return !r2(e3).length;
            for (var n3 in e3) if (p.call(e3, n3)) return false;
            return true;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(83), o = n2(84), i = Object.prototype.hasOwnProperty;
          e2.exports = function(e3) {
            if (!r2(e3)) return o(e3);
            var t3 = [];
            for (var n3 in Object(e3)) i.call(e3, n3) && "constructor" != n3 && t3.push(n3);
            return t3;
          };
        }, function(e2) {
          var t2 = Object.prototype;
          e2.exports = function(e3) {
            var n2 = e3 && e3.constructor;
            return e3 === ("function" == typeof n2 && n2.prototype || t2);
          };
        }, function(e2, t2, n2) {
          var r2 = n2(85)(Object.keys, Object);
          e2.exports = r2;
        }, function(e2) {
          e2.exports = function(e3, t2) {
            return function(n2) {
              return e3(t2(n2));
            };
          };
        }, function(e2, t2, n2) {
          var r2 = n2(87), o = n2(50), i = n2(88), a = n2(89), s = n2(90), c = n2(3), l = n2(36), u = "[object Map]", p = "[object Promise]", d = "[object Set]", f = "[object WeakMap]", h = "[object DataView]", y = l(r2), v = l(o), g = l(i), b = l(a), m = l(s), w = c;
          (r2 && w(new r2(new ArrayBuffer(1))) != h || o && w(new o()) != u || i && w(i.resolve()) != p || a && w(new a()) != d || s && w(new s()) != f) && (w = function(e3) {
            var t3 = c(e3), n3 = "[object Object]" == t3 ? e3.constructor : void 0, r3 = n3 ? l(n3) : "";
            if (r3) switch (r3) {
              case y:
                return h;
              case v:
                return u;
              case g:
                return p;
              case b:
                return d;
              case m:
                return f;
            }
            return t3;
          }), e2.exports = w;
        }, function(e2, t2, n2) {
          var r2 = n2(32)(n2(5), "DataView");
          e2.exports = r2;
        }, function(e2, t2, n2) {
          var r2 = n2(32)(n2(5), "Promise");
          e2.exports = r2;
        }, function(e2, t2, n2) {
          var r2 = n2(32)(n2(5), "Set");
          e2.exports = r2;
        }, function(e2, t2, n2) {
          var r2 = n2(32)(n2(5), "WeakMap");
          e2.exports = r2;
        }, function(e2, t2, n2) {
          var r2 = n2(2), o = n2(63);
          e2.exports = function(e3) {
            return null != e3 && o(e3.length) && !r2(e3);
          };
        }, function(e2, t2, n2) {
          e2 = n2.nmd(e2);
          var r2 = n2(5), o = n2(93), i = t2 && !t2.nodeType && t2, a = i && e2 && !e2.nodeType && e2, s = a && a.exports === i ? r2.Buffer : void 0, c = (s ? s.isBuffer : void 0) || o;
          e2.exports = c;
        }, function(e2) {
          e2.exports = function() {
            return false;
          };
        }, function(e2, t2, n2) {
          var r2 = n2(95), o = n2(96), i = n2(97), a = i && i.isTypedArray, s = a ? o(a) : r2;
          e2.exports = s;
        }, function(e2, t2, n2) {
          var r2 = n2(3), o = n2(63), i = n2(12), a = {};
          a["[object Float32Array]"] = a["[object Float64Array]"] = a["[object Int8Array]"] = a["[object Int16Array]"] = a["[object Int32Array]"] = a["[object Uint8Array]"] = a["[object Uint8ClampedArray]"] = a["[object Uint16Array]"] = a["[object Uint32Array]"] = true, a["[object Arguments]"] = a["[object Array]"] = a["[object ArrayBuffer]"] = a["[object Boolean]"] = a["[object DataView]"] = a["[object Date]"] = a["[object Error]"] = a["[object Function]"] = a["[object Map]"] = a["[object Number]"] = a["[object Object]"] = a["[object RegExp]"] = a["[object Set]"] = a["[object String]"] = a["[object WeakMap]"] = false, e2.exports = function(e3) {
            return i(e3) && o(e3.length) && !!a[r2(e3)];
          };
        }, function(e2) {
          e2.exports = function(e3) {
            return function(t2) {
              return e3(t2);
            };
          };
        }, function(e2, t2, n2) {
          e2 = n2.nmd(e2);
          var r2 = n2(6), o = t2 && !t2.nodeType && t2, i = o && e2 && !e2.nodeType && e2, a = i && i.exports === o && r2.process, s = (function() {
            try {
              var e3 = i && i.require && i.require("util").types;
              return e3 || a && a.binding && a.binding("util");
            } catch (e4) {
            }
          })();
          e2.exports = s;
        }, function(e2, t2, n2) {
          var r2 = n2(11);
          e2.exports = function() {
            if (!arguments.length) return [];
            var e3 = arguments[0];
            return r2(e3) ? e3 : [e3];
          };
        }], t = {};
        function n(r2) {
          var o = t[r2];
          if (void 0 !== o) return o.exports;
          var i = t[r2] = { id: r2, loaded: false, exports: {} };
          return e[r2](i, i.exports, n), i.loaded = true, i.exports;
        }
        n.n = function(e2) {
          var t2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return n.d(t2, { a: t2 }), t2;
        }, n.d = function(e2, t2) {
          for (var r2 in t2) n.o(t2, r2) && !n.o(e2, r2) && Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
        }, n.g = (function() {
          if ("object" == typeof globalThis) return globalThis;
          try {
            return this || new Function("return this")();
          } catch (e2) {
            if ("object" == typeof window) return window;
          }
        })(), n.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, n.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        }, n.nmd = function(e2) {
          return e2.paths = [], e2.children || (e2.children = []), e2;
        };
        var r = {};
        return (function() {
          "use strict";
          n.r(r), n.d(r, { default: function() {
            return Ki;
          } });
          var e2 = {};
          n.r(e2), n.d(e2, { adpEndpoint: function() {
            return xt;
          }, autocompleteEndpoint: function() {
            return kt;
          }, batchAdpQueryEndpoint: function() {
            return It;
          }, batchChargingAvailabilityQueryEndpoint: function() {
            return Lt;
          }, batchNearbySearchQueryEndpoint: function() {
            return At;
          }, batchReachableRangeQueryEndpoint: function() {
            return Gt;
          }, batchReverseGeocodeQueryEndpoint: function() {
            return St;
          }, batchRoutingEndpoint: function() {
            return Ft;
          }, batchRoutingQueryEndpoint: function() {
            return Ut;
          }, batchSearchEndpoint: function() {
            return bt;
          }, batchSearchQueryEndpoint: function() {
            return wt;
          }, batchStructuredGeocodeQueryEndpoint: function() {
            return Tt;
          }, batchSyncRoutingEndpoint: function() {
            return Nt;
          }, batchSyncSearchEndpoint: function() {
            return mt;
          }, calculateReachableRangeEndpoint: function() {
            return Mt;
          }, captionV2Endpoint: function() {
            return gt;
          }, chargingAvailabilityEndpoint: function() {
            return Ct;
          }, copyrightsV2Endpoint: function() {
            return vt;
          }, flowSegmentDataEndpoint: function() {
            return Kt;
          }, geocodeEndpoint: function() {
            return _t;
          }, incidentDetailsV5Endpoint: function() {
            return zt;
          }, incidentRegionsEndpoint: function() {
            return Qt;
          }, incidentViewportEndpoint: function() {
            return Ht;
          }, longDistanceEVRoutingEndpoint: function() {
            return qt;
          }, matrixRoutingEndpoint: function() {
            return Bt;
          }, matrixSyncRoutingEndpoint: function() {
            return Wt;
          }, nearbySearchEndpoint: function() {
            return jt;
          }, origin: function() {
            return en;
          }, placeByIdEndpoint: function() {
            return Dt;
          }, poiCategoriesEndpoint: function() {
            return Rt;
          }, rasterTrafficFlowTilesLayerEndpoint: function() {
            return $t;
          }, reverseGeocodeEndpoint: function() {
            return Et;
          }, routingEndpoint: function() {
            return Vt;
          }, searchEndpoint: function() {
            return Pt;
          }, staticMapImageEndpoint: function() {
            return Yt;
          }, structuredGeocodeEndpoint: function() {
            return Ot;
          }, tileLayerEndpoint: function() {
            return Jt;
          }, trafficLayerEndpoint: function() {
            return Zt;
          }, vectorTrafficFlowTilesLayerEndpoint: function() {
            return Xt;
          } });
          var t2 = {};
          n.r(t2), n.d(t2, { additionalData: function() {
            return Sr;
          }, alongRouteSearch: function() {
            return Hr;
          }, autocomplete: function() {
            return Co;
          }, categorySearch: function() {
            return go;
          }, crossStreetLookup: function() {
            return Jo;
          }, evChargingStationsAvailability: function() {
            return mo;
          }, fuzzySearch: function() {
            return _o;
          }, geocode: function() {
            return Xo;
          }, geometrySearch: function() {
            return So;
          }, nearbySearch: function() {
            return Po;
          }, placeById: function() {
            return xo;
          }, poiCategories: function() {
            return jo;
          }, poiSearch: function() {
            return ko;
          }, reverseGeocode: function() {
            return Ho;
          }, structuredGeocode: function() {
            return ti;
          } });
          var o = {};
          n.r(o), n.d(o, { calculateReachableRange: function() {
            return ci;
          }, calculateRoute: function() {
            return gi;
          }, longDistanceEVRouting: function() {
            return wi;
          }, matrixRouting: function() {
            return Pi;
          } });
          var i = {};
          n.r(i), n.d(i, { incidentDetailsV5: function() {
            return Di;
          }, incidentViewport: function() {
            return xi;
          }, trafficFlowSegmentData: function() {
            return Ci;
          } });
          var a = {};
          n.r(a), n.d(a, { copyrightsCaptionV2: function() {
            return Gi;
          }, copyrightsV2: function() {
            return Bi;
          }, staticImage: function() {
            return Fi;
          } });
          var s = n(1), c = n.n(s);
          const l = c()["analytics.header.sdkName"] + "/" + c()["sdk.version"], u = c()["analytics.header.name"], p = () => (n.g.__tomtomAnalyticsInfo_ = n.g.__tomtomAnalyticsInfo_ ? n.g.__tomtomAnalyticsInfo_ : {}, n.g.__tomtomAnalyticsInfo_), d = () => {
            const e3 = void 0 !== p().productInfo ? " " + p().productInfo : "";
            return l + e3;
          }, f = () => {
            const e3 = {};
            return e3[u] = d(), e3;
          }, h = "EXTENDED_SEARCH", y = "MAP", v = "ROUTING", g = "SEARCH", b = "TRAFFIC_FLOW", m = "TRAFFIC_INCIDENTS";
          function w(e3, t3) {
            var n2 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var r2 = Object.getOwnPropertySymbols(e3);
              t3 && (r2 = r2.filter((function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              }))), n2.push.apply(n2, r2);
            }
            return n2;
          }
          function _(e3) {
            for (var t3 = 1; t3 < arguments.length; t3++) {
              var n2 = null != arguments[t3] ? arguments[t3] : {};
              t3 % 2 ? w(Object(n2), true).forEach((function(t4) {
                E(e3, t4, n2[t4]);
              })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : w(Object(n2)).forEach((function(t4) {
                Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n2, t4));
              }));
            }
            return e3;
          }
          function E(e3, t3, n2) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
          }
          function S(e3) {
            return "number" == typeof e3 && isFinite(e3);
          }
          function O(e3) {
            return null != e3 && !(function(e4) {
              return e4 != e4;
            })(e3);
          }
          function P(e3, t3) {
            for (const n2 in e3) Object.prototype.hasOwnProperty.call(e3, n2) && (Array.isArray(e3[n2]) ? t3[n2] = e3[n2].slice(0) : "object" == typeof e3[n2] ? (t3[n2] = {}, P(e3[n2], t3[n2])) : t3[n2] = e3[n2]);
          }
          function T(e3, t3, n2) {
            var r2;
            e3[t3] = void 0 === (r2 = e3[t3]) ? {} : r2;
            for (const r3 in n2[t3]) Object.prototype.hasOwnProperty.call(n2[t3], r3) && (e3[t3][r3] = n2[t3][r3]);
          }
          function x(e3, t3) {
            for (const n2 in t3) Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
            return e3;
          }
          function I(e3, t3, n2) {
            if (-1 === t3.indexOf(e3)) throw new TypeError(n2);
            return e3;
          }
          function j(e3) {
            if ("string" != typeof e3) return {};
            let t3 = -1;
            const n2 = new RegExp("[a-zA-Z]");
            return (function r2(o2) {
              let i2 = {}, a2 = "";
              for (; ++t3 < e3.length; ) {
                const s2 = e3.charAt(t3);
                switch (s2) {
                  case "}":
                    return "" !== a2 && (i2[a2] = true), i2;
                  case "{":
                    "" === a2 ? o2 ? i2 = r2() : r2() : (i2[a2] = r2(), a2 = "");
                    break;
                  case ",":
                    "" !== a2 && (i2[a2] = true), a2 = "";
                    break;
                  default:
                    n2.test(s2) && (a2 += s2);
                }
              }
              return "" !== a2 && (i2[a2] = true), i2;
            })(true);
          }
          function A(e3) {
            const t3 = {};
            return P(e3, t3), t3;
          }
          const k = /(-?\d+(?:\.\d+)?)(?:\s+|\s*,\s*)(-?\d+(?:\.\d+)?)/, R = /circle\((-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(\d+)\)/;
          function C(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const n2 = _({}, t3);
            for (const t4 in e3) Object.prototype.hasOwnProperty.call(e3, t4) && T(n2, t4, e3);
            return n2;
          }
          var L = n(2), D = n.n(L), V = n(10), M = n.n(V), U = n(13), F = n.n(U), N = n(14), B = n.n(N);
          const W = { "af-ZA": { synonyms: { af: null, afr: null, "af-za": null, af_za: null, afrikaans: null }, label: "Afrikaans" }, ar: { synonyms: { ar: null, ara: null, "ar-ar": null, ar_ar: null, arabic: null }, label: "Arabic" }, "bg-BG": { synonyms: { bg: null, bul: null, "bg-bg": null, bg_bg: null, bulgarian: null }, label: "Bulgarian" }, "ca-ES": { synonyms: { ca: null, cat: null, "ca-fr": null, ca_fr: null, "ca-es": null, ca_es: null, catalan: null }, label: "Catalan" }, "zh-CN": { synonyms: { "zh-cn": null, zh_cn: null }, label: "Chinese (PRC)" }, "zh-TW": { synonyms: { zh: null, chi: null, "zh-tw": null, zh_tw: null, chinese: null }, label: "Chinese (Taiwan)" }, "cs-CZ": { synonyms: { cs: null, cz: null, cze: null, "cs-cz": null, cs_cz: null, czech: null }, label: "Czech" }, "da-DK": { synonyms: { da: null, dan: null, "da-dk": null, da_dk: null, danish: null }, label: "Danish" }, "nl-BE": { synonyms: { "nl-be": null, nl_be: null, "dutch belgium": null }, label: "Dutch (Belgium)" }, "nl-NL": { synonyms: { nl: null, dut: null, "nl-nl": null, nl_nl: null, dutch: null }, label: "Dutch" }, "en-AU": { synonyms: { aue: null, aus: null, "en-au": null, en_au: null, "english au": null }, label: "English (Australia)" }, "en-GB": { synonyms: { en: null, eng: null, "en-gb": null, en_gb: null, english: null, default: null }, label: "English (Great Britain)" }, "en-NZ": { synonyms: { "en-nz": null, en_nz: null, "english new zealand": null }, label: "English (New Zealand)" }, "en-US": { synonyms: { us: null, ame: null, "en-us": null, en_us: null, "english us": null }, label: "English (US)" }, "et-EE": { synonyms: { "et-ee": null, et_ee: null, estonian: null }, label: "Estonian" }, "eu-ES": { synonyms: { "eu-es": null, eu_es: null, basque: null }, label: "Basque (Spain)" }, "fi-FI": { synonyms: { fi: null, fin: null, "fi-fi": null, fi_fi: null, finnish: null }, label: "Finnish" }, "fr-CA": { synonyms: { "fr-ca": null, fr_ca: null, "french canadian": null }, label: "French (Canadian)" }, "fr-FR": { synonyms: { fr: null, fre: null, "fr-fr": null, fr_fr: null, french: null }, label: "French" }, "de-DE": { synonyms: { de: null, ger: null, "de-de": null, de_de: null, german: null }, label: "German" }, "el-GR": { synonyms: { el: null, gre: null, "el-gr": null, el_gr: null, greek: null }, label: "Greek" }, "gl-ES": { synonyms: { "gl-es": null, gl_es: null, galician: null }, label: "Galician (Spain)" }, "he-IL": { synonyms: { "he-il": null, he_il: null, hebrew: null }, label: "Hebrew (Israel)" }, "hr-HR": { synonyms: { hr: null, "hr-hr": null, hr_hr: null, croatian: null }, label: "Croatian" }, "hu-HU": { synonyms: { hu: null, hun: null, "hu-hu": null, hu_hu: null, hungarian: null }, label: "Hungarian" }, "id-ID": { synonyms: { id: null, ind: null, "id-id": null, id_id: null, indonesian: null }, label: "Indonesian" }, "it-IT": { synonyms: { it: null, ita: null, "it-it": null, it_it: null, italian: null }, label: "Italian" }, "ja-JP": { synonyms: { ja: null, jap: null, "ja-jp": null, ja_jp: null, japanese: null }, label: "Japanese" }, "kk-KZ": { synonyms: { "kk-kz": null, kk_kz: null, kazakh: null }, label: "Kazakh (Kazakhstan)" }, "lv-LV": { synonyms: { lt: null, "lv-lv": null, lv_lv: null, latvian: null }, label: "Latvian" }, "lt-LT": { synonyms: { lt: null, lit: null, "lt-lt": null, lt_lt: null, lithuanian: null }, label: "Lithuanian" }, "ms-MY": { synonyms: { ms: null, mal: null, "ms-my": null, ms_my: null, malay: null }, label: "Malay" }, "no-NO": { synonyms: { no: null, nb: null, nor: null, "nb-no": null, nb_no: null, "no-no": null, no_no: null, norwegian: null }, label: "Norwegian" }, "pl-PL": { synonyms: { pl: null, pol: null, "pl-pl": null, pl_pl: null, polish: null }, label: "Polish" }, "ro-RO": { synonyms: { "ro-ro": null, ro_ro: null, romanian: null }, label: "Romanian" }, "ru-RU": { synonyms: { ru: null, rus: null, "ru-ru": null, ru_ru: null, russian: null }, label: "Russian" }, "sr-RS": { synonyms: { "sr-rs": null, sr_rs: null, serbian: null }, label: "Serbian" }, "sk-SK": { synonyms: { sk: null, slo: null, "sk-sk": null, sk_sk: null, slovak: null }, label: "Slovak" }, "sl-SI": { synonyms: { sl: null, slv: null, "sl-si": null, sl_si: null, slovenian: null }, label: "Slovenian" }, "es-ES": { synonyms: { es: null, spa: null, "es-es": null, es_es: null, spanish: null }, label: "Spanish" }, "es-419": { synonyms: { "es-419": null, es_419: null, "latin america spanish": null }, label: "Latin American Spanish" }, "sv-SE": { synonyms: { sv: null, swe: null, "sv-se": null, sv_se: null, swedish: null }, label: "Swedish" }, "th-TH": { synonyms: { th: null, tha: null, "th-th": null, th_th: null, thai: null }, label: "Thai" }, "tr-TR": { synonyms: { tr: null, tur: null, "tr-tr": null, tr_tr: null, turkish: null }, label: "Turkish" }, "uk-UA": { synonyms: { "uk-ua": null, uk_ua: null, ukrainian: null }, label: "Ukrainian" }, "vi-VN": { synonyms: { "vi-vn": null, vi_vn: null, vietnamese: null }, label: "Vietnamese (Viet Nam)" }, NGT: { synonyms: { ngt: null }, label: "Neutral Ground Truth" }, "NGT-Latn": { synonyms: { "ngt-latn": null }, label: "Neutral Ground Truth - Latin exonyms" }, "en-CA": { synonyms: { "en-ca": null, en_ca: null, "english canadian": null }, label: "English (Canada)" }, "ko-KR": { synonyms: { ko: null, kor: null, "ko-kr": null, ko_kr: null, korean: null }, label: "Korean" }, "nb-NO": { synonyms: { nb: null, nor: null, "nb-no": null, nb_no: null, norwegian: null }, label: "Norwegian" }, "pt-BR": { synonyms: { br: null, pob: null, "pt-br": null, pt_br: null, "portuguese br": null }, label: "Portuguese (BR)" }, "pt-PT": { synonyms: { pt: null, por: null, "pt-pt": null, pt_pt: null, portuguese: null }, label: "Portuguese" }, "ru-Latn-RU": { synonyms: { "ru-latn-ru": null, ru_latn_ru: null }, label: "Russian (Latin)" }, "ru-Cyrl-RU": { synonyms: { "ru-cyrl-ru": null, ru_cyrl_ru: null }, label: "Russian (Cyrlic)" }, "es-MX": { synonyms: { mx: null, spm: null, "es-mx": null, es_mx: null, "spanish mx": null }, label: "Spanish (Mexico)" }, defaultValue: { value: "en-GB", label: "English (Great Britain)" } }, G = { ar: W.ar, "af-ZA": W["af-ZA"], "bg-BG": W["bg-BG"], "zh-TW": W["zh-TW"], "cs-CZ": W["cs-CZ"], "da-DK": W["da-DK"], "nl-NL": W["nl-NL"], "en-GB": W["en-GB"], "en-US": W["en-US"], "fi-FI": W["fi-FI"], "fr-FR": W["fr-FR"], "de-DE": W["de-DE"], "el-GR": W["el-GR"], "hu-HU": W["hu-HU"], "id-ID": W["id-ID"], "it-IT": W["it-IT"], "ko-KR": W["ko-KR"], "lt-LT": W["lt-LT"], "ms-MY": W["ms-MY"], "nb-NO": W["nb-NO"], "pl-PL": W["pl-PL"], "pt-BR": W["pt-BR"], "pt-PT": W["pt-PT"], "ru-RU": W["ru-RU"], "sk-SK": W["sk-SK"], "sl-SI": W["sl-SI"], "es-ES": W["es-ES"], "es-MX": W["es-MX"], "sv-SE": W["sv-SE"], "th-TH": W["th-TH"], "tr-TR": W["tr-TR"], defaultValue: W.defaultValue }, q = { NGT: W.NGT, "NGT-Latn": W["NGT-Latn"], "af-ZA": W["af-ZA"], ar: W.ar, "eu-ES": W["eu-ES"], "bg-BG": W["bg-BG"], "ca-ES": W["ca-ES"], "zh-CN": W["zh-CN"], "zh-TW": W["zh-TW"], "cs-CZ": W["cs-CZ"], "da-DK": W["da-DK"], "nl-BE": W["nl-BE"], "nl-NL": W["nl-NL"], "en-AU": W["en-AU"], "en-NZ": W["en-NZ"], "en-GB": W["en-GB"], "en-US": W["en-US"], "et-EE": W["et-EE"], "fi-FI": W["fi-FI"], "fr-CA": W["fr-CA"], "fr-FR": W["fr-FR"], "gl-ES": W["gl-ES"], "de-DE": W["de-DE"], "el-GR": W["el-GR"], "hr-HR": W["hr-HR"], "he-IL": W["he-IL"], "hu-HU": W["hu-HU"], "id-ID": W["id-ID"], "it-IT": W["it-IT"], "kk-KZ": W["kk-KZ"], "lv-LV": W["lv-LV"], "lt-LT": W["lt-LT"], "ms-MY": W["ms-MY"], "no-NO": W["no-NO"], "nb-NO": W["nb-NO"], "pl-PL": W["pl-PL"], "pt-BR": W["pt-BR"], "pt-PT": W["pt-PT"], "ro-RO": W["ro-RO"], "ru-RU": W["ru-RU"], "ru-Latn-RU": W["ru-Latn-RU"], "ru-Cyrl-RU": W["ru-Cyrl-RU"], "sr-RS": W["sr-RS"], "sk-SK": W["sk-SK"], "sl-SI": W["sl-SI"], "es-ES": W["es-ES"], "es-419": W["es-419"], "sv-SE": W["sv-SE"], "th-TH": W["th-TH"], "tr-TR": W["tr-TR"], "uk-UA": W["uk-UA"], "vi-VN": W["vi-VN"], defaultValue: W.defaultValue }, z = { ar: W.ar, "ca-ES": W["ca-ES"], "cs-CZ": W["cs-CZ"], "da-DK": W["da-DK"], "de-DE": W["de-DE"], "el-GR": W["el-GR"], "en-GB": W["en-GB"], "en-US": W["en-US"], "es-ES": W["es-ES"], "et-EE": W["et-EE"], "fi-FI": W["fi-FI"], "fr-FR": W["fr-FR"], "he-IL": W["he-IL"], "hu-HU": W["hu-HU"], "id-ID": W["id-ID"], "it-IT": W["it-IT"], "lt-LT": W["lt-LT"], "lv-LV": W["lv-LV"], "nb-NO": W["nb-NO"], "nl-NL": W["nl-NL"], "pl-PL": W["pl-PL"], "pt-PT": W["pt-PT"], "ro-RO": W["ro-RO"], "ru-RU": W["ru-RU"], "sk-SK": W["sk-SK"], "sv-SE": W["sv-SE"], "th-TH": W["th-TH"], "tr-TR": W["tr-TR"], "zh-TW": W["zh-TW"], defaultValue: W.defaultValue };
          function H(e3) {
            if (!M()(e3) && !D()(e3)) throw new TypeError("Unsupported key type", e3);
            return e3;
          }
          function K(e3) {
            const t3 = parseFloat(e3);
            if (!isFinite(t3)) throw new TypeError("a number is expected, but " + e3 + " [" + typeof e3 + "] given");
            return t3;
          }
          function Q(e3, t3) {
            return (n2) => I(n2, e3, "Supported " + t3 + " is expected (one of: " + e3 + "), but " + n2 + " [" + typeof n2 + "] was given.");
          }
          const Z = ["StandardHouseholdCountrySpecific", "IEC62196Type2CableAttached", "IEC60309AC1PhaseBlue", "IEC60309AC3PhaseRed", "IEC62196Type2Outlet", "IEC62196Type1CCS", "IEC62196Type2CCS", "IEC60309DCWhite", "IEC62196Type1", "IEC62196Type3", "GBT20234Part2", "GBT20234Part3", "Chademo", "Tesla"], $ = ["Small_Paddle_Inductive", "Large_Paddle_Inductive", "IEC_60309_1_Phase", "IEC_60309_3_Phase", "IEC_62196_Type_1_Outlet", "IEC_62196_Type_2_Outlet", "IEC_62196_Type_3_Outlet", "IEC_62196_Type_1_Connector_Cable_Attached", "IEC_62196_Type_2_Connector_Cable_Attached", "IEC_62196_Type_3_Connector_Cable_Attached", "Combo_to_IEC_62196_Type_1_Base", "Combo_to_IEC_62196_Type_2_Base", "Type_E_French_Standard_CEE_7_5", "Type_F_Schuko_CEE_7_4", "Type_G_British_Standard_BS_1363", "Type_J_Swiss_Standard_SEV_1011", "China_GB_Part_2", "China_GB_Part_3", "IEC_309_DC_Plug", "AVCON_Connector", "Tesla_Connector", "NEMA_5_20", "CHAdeMO", "SAE_J1772", "TEPCO", "Better_Place_Socket", "Marechal_Socket", "Standard_Household_Country_Specific"], X = ["Battery_Exchange", "Charge_100_to_120V_1_Phase_at_8A", "Charge_100_to_120V_1_Phase_at_10A", "Charge_100_to_120V_1_Phase_at_12A", "Charge_100_to_120V_1_Phase_at_13A", "Charge_100_to_120V_1_Phase_at_16A", "Charge_100_to_120V_1_Phase_at_32A", "Charge_200_to_240V_1_Phase_at_8A", "Charge_200_to_240V_1_Phase_at_10A", "Charge_200_to_240V_1_Phase_at_12A", "Charge_200_to_240V_1_Phase_at_16A", "Charge_200_to_240V_1_Phase_at_20A", "Charge_200_to_240V_1_Phase_at_32A", "Charge_200_to_240V_1_Phase_above_32A", "Charge_200_to_240V_3_Phase_at_16A", "Charge_200_to_240V_3_Phase_at_32A", "Charge_380_to_480V_3_Phase_at_16A", "Charge_380_to_480V_3_Phase_at_32A", "Charge_380_to_480V_3_Phase_at_63A", "Charge_50_to_500V_Direct_Current_at_62A_25kW", "Charge_50_to_500V_Direct_Current_at_125A_50kW", "Charge_200_to_450V_Direct_Current_at_200A_90kW", "Charge_200_to_480V_Direct_Current_at_255A_120kW", "Charge_Direct_Current_at_20kW", "Charge_Direct_Current_at_50kW", "Charge_Direct_Current_above_50kW"], J = ["NGT", "NGT-Latn", "ar", "bg-BG", "zh-TW", "cs-CZ", "da-DK", "nl-NL", "en-AU", "en-CA", "en-GB", "en-NZ", "en-US", "fi-FI", "fr-FR", "de-DE", "el-GR", "hu-HU", "id-ID", "it-IT", "ko-KR", "lt-LT", "ms-MY", "nb-NO", "pl-PL", "pt-BR", "pt-PT", "ru-RU", "ru-Latn-RU", "ru-Cyrl-RU", "sk-SK", "sl-SI", "es-ES", "es-MX", "sv-SE", "th-TH", "tr-TR"], Y = ["Petrol", "LPG", "Diesel", "Biodiesel", "DieselForCommercialVehicles", "E85", "LNG", "CNG", "Hydrogen", "AdBlue"], ee = "\n    {\n        incidents {\n            type,\n            geometry {\n                type,\n                coordinates\n            },\n            properties {\n                id,\n                iconCategory,\n                magnitudeOfDelay,\n                events {\n                    description,\n                    code,\n                    iconCategory\n                },\n                startTime,\n                endTime,\n                from,\n                to,\n                length,\n                delay,\n                roadNumbers,\n                aci {\n                    probabilityOfOccurrence,\n                    numberOfReports,\n                    lastReportTime\n                }\n            }\n        }\n    }";
          function te(e3) {
            return e3.toString().match(/(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/);
          }
          function ne(e3, t3, n2) {
            return isFinite(e3) && e3 >= t3 && e3 <= n2;
          }
          function re(e3) {
            return e3.constructor.toString().indexOf("Array") < 0;
          }
          function oe(e3, t3) {
            if (e3) throw new TypeError(t3);
          }
          function ie(e3) {
            const t3 = parseFloat(e3);
            if (!ne(t3, -180, 180)) throw new TypeError("an longitude <-180,180> is expected, but " + e3 + " [" + typeof e3 + "] given");
            return t3;
          }
          function ae(e3) {
            var t3;
            return oe((t3 = e3, !(Object.prototype.hasOwnProperty.call(t3, "chargingConnections") && Object.prototype.hasOwnProperty.call(t3, "chargingCurve"))), "a chargingMode is expected, but " + e3 + " [" + typeof e3 + "] given"), se(e3.chargingCurve), de(e3.chargingConnections), e3;
          }
          function se(e3) {
            if (e3.length > 10) throw new Error("Given chargingCurve array contains more than 10 elements.");
            return e3.forEach(((e4) => {
              ce(e4);
            })), e3;
          }
          function ce(e3) {
            var t3;
            return oe((t3 = e3, !(Object.prototype.hasOwnProperty.call(t3, "chargeInkWh") && Object.prototype.hasOwnProperty.call(t3, "timeToChargeInSeconds"))), "a chargingCurveSupportPoint is expected, but " + e3 + " [" + typeof e3 + "] given"), oe(!ne(e3.chargeInkWh, 0, Number.MAX_VALUE), "a chargeInkWh is expected, but " + e3.chargeInkWh + " [" + typeof e3.chargeInkWh + "] given"), oe(!ne(e3.timeToChargeInSeconds, 0, Number.MAX_VALUE), "a timeToChargeInSeconds is expected, but " + e3.timeToChargeInSeconds + " [" + typeof e3.timeToChargeInSeconds + "] given"), e3;
          }
          function le(e3) {
            var t3;
            return oe((t3 = e3, !(Object.prototype.hasOwnProperty.call(t3, "facilityType") && Object.prototype.hasOwnProperty.call(t3, "plugType"))), "a chargingConnection is expected, but " + e3 + " [" + typeof e3 + "] given"), ue(e3.plugType), pe(e3.facilityType), e3;
          }
          function ue(e3) {
            return I(e3, $, "Plug type is expected to be one of supported values, but " + e3 + " [" + typeof e3 + "] given");
          }
          function pe(e3) {
            return I(e3, X, "Facility type is expected to be one of supported values, but " + e3 + " [" + typeof e3 + "] given");
          }
          function de(e3) {
            if (e3.length > 20) throw new Error("Given chargingConnections array contains more than 20 elements.");
            return e3.forEach(((e4) => {
              le(e4);
            })), e3;
          }
          function fe(e3) {
            const t3 = parseFloat(e3);
            if (!ne(t3, -90, 90)) throw new TypeError("an latitude <-90,90> is expected, but " + e3 + " [" + typeof e3 + "] given");
            return t3;
          }
          function he(e3) {
            let t3, n2;
            if (Array.isArray(e3)) {
              if (2 !== e3.length || 2 !== e3.filter(isFinite).length) throw new TypeError("Invalid point array in route points");
              t3 = e3[1], n2 = e3[0];
            } else {
              if (!isFinite(e3.lat) || !isFinite(e3.lon) && !isFinite(e3.lng)) throw new TypeError("Invalid point object in route points");
              t3 = e3.lat, n2 = void 0 !== e3.lon ? e3.lon : e3.lng;
            }
            if (!("number" == typeof t3 || t3 instanceof Number) || !("number" == typeof n2 || n2 instanceof Number)) throw new TypeError("Lat and lon components of point should be finite numbers");
            ie(n2), fe(t3);
          }
          function ye(e3, t3) {
            for (const n2 in e3) if (Object.prototype.hasOwnProperty.call(e3, n2)) {
              if (Object.prototype.hasOwnProperty.call(t3, n2) && Array.isArray(e3[n2].validators)) for (const r2 of e3[n2].validators) D()(r2) && (t3[n2] = r2(t3[n2]));
              if (true === e3[n2].required && !Object.prototype.hasOwnProperty.call(t3, n2)) throw new Error("Missing required " + n2);
            }
          }
          function ve(e3, t3, n2, r2) {
            if (F()(e3) || F()(t3)) throw new TypeError("Number in interval validator requires min and max value parameters");
            return function(o2) {
              const i2 = parseFloat(o2);
              if (!ne(i2, e3, t3) || r2 && !B()(i2)) throw new TypeError(n2 + ", but " + o2 + " [" + typeof o2 + "] given");
              return i2;
            };
          }
          function ge(e3, t3, n2) {
            return ve(e3, t3, n2, true);
          }
          function be(e3, t3, n2) {
            if (M()(e3) && (e3 = e3.split(",")), Array.isArray(e3) && e3.length > 0) {
              for (let r2 = 0; r2 < e3.length; r2 += 1) I(e3[r2], n2, t3);
              return e3.join(",");
            }
            throw new TypeError(t3);
          }
          function me(e3, t3) {
            if (!te(e3)) throw new TypeError('Invalid "'.concat(t3, '" parameter value.\n        Valid format: YYYY-MM-DDThh:mm:ss.SSSTZD'));
            return e3;
          }
          function we(e3) {
            if (M()(e3) && /^[a-zA-Z0-9-]{1,100}$/.test(e3)) return e3;
            throw new TypeError("a string matching regular expression ^[a-zA-Z0-9-]{1,100}$ is expected, but " + e3 + " [" + typeof e3 + "] given");
          }
          function _e(e3) {
            return "false" !== e3 && Boolean(e3);
          }
          function Ee(e3) {
            const t3 = parseFloat(e3);
            if (!B()(t3) || t3 < 0) throw new TypeError("a natural integer (greater than or equal 0) is expected, but " + e3 + " [" + typeof e3 + "] given");
            return t3;
          }
          function Se(e3) {
            const t3 = parseFloat(e3);
            if (!B()(t3) || t3 <= 0) throw new TypeError("a positive integer (greater than 0) is expected, but " + e3 + " [" + typeof e3 + "] given");
            return t3;
          }
          function Oe(e3) {
            return oe(!(function(e4) {
              return Object.prototype.hasOwnProperty.call(e4, "minLon") && Object.prototype.hasOwnProperty.call(e4, "maxLon") && Object.prototype.hasOwnProperty.call(e4, "minLat") && Object.prototype.hasOwnProperty.call(e4, "maxLat");
            })(e3), "a bounding box is expected, but " + e3 + " [" + typeof e3 + "] given"), oe(!ne(e3.minLat, -90, 90), "a bounding box minimal latitude is expected " + e3.minLat + " [" + typeof e3.minLat + "] given"), oe(!ne(e3.maxLat, -90, 90), "a bounding box maximal latitude is expected " + e3.maxLat + " [" + typeof e3.maxLat + "] given"), oe(!ne(e3.minLon, -270, 180), "a bounding box minimal longitude is expected " + e3.minLon + " [" + typeof e3.minLon + "] given"), oe(!ne(e3.maxLon, -180, 270), "a bounding box maximal longitude is expected " + e3.maxLon + " [" + typeof e3.maxLon + "] given"), oe((function(e4) {
              return parseFloat(e4.maxLat) <= parseFloat(e4.minLat) || parseFloat(e4.maxLon) <= parseFloat(e4.minLon);
            })(e3), "a bounding box expected but max <= min"), e3;
          }
          function Pe(e3, t3) {
            return ve(e3, t3, "a number in interval <" + e3 + ", " + t3 + "> is expected");
          }
          function Te(e3, t3) {
            return ge(e3, t3, "an integer in interval <" + e3 + ", " + t3 + "> is expected");
          }
          function xe(e3) {
            if (!M()(e3)) throw new TypeError("a string is expected, but " + e3 + " [" + typeof e3 + "] given");
            return e3;
          }
          function Ie(e3) {
            if (!M()(e3) || 3 !== e3.length && 2 !== e3.length) throw new TypeError("a 2 or 3-characters long country name is expected, but " + e3 + " [" + typeof e3 + "] given");
            return e3;
          }
          function je(e3) {
            const t3 = Object.keys(q);
            if (!M()(e3) || t3.indexOf(e3) < 0) throw new TypeError("One of pre-defined language codes was expected: " + t3 + ", but " + e3 + " [" + typeof e3 + "] given");
            return e3;
          }
          function Ae(e3) {
            oe(!M()(e3) && re(e3), "An array of string country names or string (divided with commas) of country names (two or three-characters long) is expected, but " + e3 + " [" + typeof e3 + "] given");
            const t3 = M()(e3) ? e3 : e3.join();
            return oe(!t3.match(/^([a-zA-z]{2,3},)*[a-zA-z]{2,3}$/), "An array of string country names or string (divided with commas) of country names (two or three-characters long) is expected, but " + e3 + " [" + typeof e3 + "] given"), t3;
          }
          function ke(e3) {
            return be(e3, "List of pre-defined EV connector names was expected,but " + e3 + " [" + typeof e3 + "] given", Z);
          }
          function Re(e3) {
            return be(e3, "List of pre-defined Fuel types names was expected,but " + e3 + " [" + typeof e3 + "] given", Y);
          }
          function Ce(e3) {
            const t3 = ["Local", "International", "Alternative"], n2 = "List of pre-defined mapcode types names was expected,but " + e3 + " [" + typeof e3 + "] given";
            if (M()(e3) && (e3 = e3.split(",")), Array.isArray(e3) && e3.length > 0) {
              for (let r2 = 0; r2 < e3.length; r2 += 1) I(e3[r2], t3, n2);
              return e3.join(",");
            }
            throw new TypeError(n2);
          }
          function Le(e3, t3) {
            oe(!M()(t3) && re(t3), "An array of string country names or string (divided with commas) of country names (three-characters long) is expected, but " + t3 + " [" + typeof t3 + "] given");
            const n2 = M()(t3) ? t3 : t3.join();
            return e3 && "" === n2 || oe(!n2.match(/^([a-zA-z]{3},)*[a-zA-z]{3}$/), "An array of string country names or string (divided with commas) of country names (three-characters long) is expected, but " + t3 + " [" + typeof t3 + "] given"), t3;
          }
          function De(e3) {
            return (function(e4) {
              if (!M()(e4) || !k.test(e4)) throw new TypeError("A point is expected, but " + e4 + " [" + typeof e4 + "] given");
            })(e3), e3;
          }
          function Ve(e3) {
            return ge(1, 4, "Fuzziness level value (a positive integer lower than 5) is expected")(e3);
          }
          function Me(e3) {
            return ge(1, 100, "Limit value (a positive integer lower than 100) is expected")(e3);
          }
          function Ue(e3) {
            return ge(0, 1900, "Offset an integer value <0, 1900> is expected")(e3);
          }
          function Fe(e3) {
            const t3 = ["Country", "CountrySubdivision", "CountrySecondarySubdivision", "CountryTertiarySubdivision", "Municipality", "MunicipalitySubdivision", "Neighbourhood", "PostalCodeArea"];
            for (const n2 of e3.split(",")) if (-1 === t3.indexOf(n2)) throw new TypeError("Entity type (".concat(t3, ") is expected, but ").concat(e3, " [").concat(typeof e3, "] given"));
            return e3;
          }
          function Ne(e3, t3) {
            return (n2) => {
              const r2 = "Supported " + t3 + " type is expected (array with one of: " + e3 + "), but " + n2 + " [" + typeof n2 + "] given";
              if (re(n2)) throw new TypeError("an array is expected, but " + n2 + "  [" + typeof n2 + "] given");
              for (let t4 = 0; t4 < n2.length; t4 += 1) I(n2[t4], e3, r2);
              return n2;
            };
          }
          function Be(e3) {
            if (oe(re(e3), "An array of geometry objects is expected, but " + e3 + " [" + typeof e3 + "] given"), !(e3.length > 0)) throw new TypeError("An array of geometry objects is expected, but " + e3 + " [" + typeof e3 + "] given");
            for (let t3 = 0; t3 < e3.length; t3 += 1) {
              const n2 = e3[t3];
              oe(!(Object.prototype.hasOwnProperty.call(n2, "type") && (Object.prototype.hasOwnProperty.call(n2, "vertices") || Object.prototype.hasOwnProperty.call(n2, "position") && Object.prototype.hasOwnProperty.call(n2, "radius"))), "An array of geometry objects is expected, but " + e3 + " [" + typeof e3 + "] given");
            }
            return e3;
          }
          function We(e3) {
            if (isNaN(e3) || !B()(e3) || !(120 === e3 || e3 >= 5 && e3 <= 60)) throw new TypeError("Invalid `waitTimeSeconds` parameter value. Must be 120 or an integer between 5 and 60.");
            return e3;
          }
          function Ge(e3) {
            return me(e3, "clientTime");
          }
          const qe = ["adpEndpoint", "autocompleteEndpoint", "batchRoutingEndpoint", "batchSearchEndpoint", "batchSyncRoutingEndpoint", "batchSyncSearchEndpoint", "calculateReachableRangeEndpoint", "captionV2Endpoint", "chargingAvailabilityEndpoint", "copyrightsV2Endpoint", "flowSegmentDataEndpoint", "geocodeEndpoint", "incidentDetailsV5Endpoint", "incidentRegionsEndpoint", "incidentViewportEndpoint", "longDistanceEVRoutingEndpoint", "matrixRoutingEndpoint", "matrixSyncRoutingEndpoint", "nearbySearchEndpoint", "placeByIdEndpoint", "poiCategoriesEndpoint", "reverseGeocodeEndpoint", "routingEndpoint", "searchEndpoint", "staticMapImageEndpoint", "structuredGeocodeEndpoint"], ze = ["batchAdpQueryEndpoint", "batchChargingAvailabilityQueryEndpoint", "batchNearbySearchQueryEndpoint", "batchReachableRangeQueryEndpoint", "batchReverseGeocodeQueryEndpoint", "batchRoutingQueryEndpoint", "batchSearchQueryEndpoint", "batchStructuredGeocodeQueryEndpoint"];
          function He(e3) {
            try {
              !(function(e4) {
                if ("object" != typeof e4 || e4.constructor !== Object) throw new TypeError("an object is expected, but " + e4 + "  [" + typeof e4 + "] given");
              })(e3);
              for (const t3 in e3) if (qe.includes(t3)) Ke(e3[t3]);
              else {
                if (!ze.includes(t3)) throw new TypeError("Endpoint name is expected to be one of supported values, but " + e3 + "given");
                Qe(e3[t3]);
              }
            } catch (e4) {
              throw new TypeError("Invalid custom endpoints object. ".concat(e4.message));
            }
            return e3;
          }
          function Ke(e3) {
            if (!M()(e3)) throw new TypeError("Invalid custom URL. A string URL is expected, ".concat(e3, " [").concat(typeof e3, "] given"));
            if (new RegExp(/(https:\/\/|http:\/\/).*/).test(e3)) throw new TypeError("Invalid custom URL. URL without protocol (http/https) is expected, ".concat(e3, " given"));
            if (!new RegExp(/^[0-9a-zA-Z-.]+(\.tomtom\.com)(\/.*)?$/).test(e3)) throw new TypeError("Invalid custom URL. URL in TomTom domain (*.tomtom.com) is expected, ".concat(e3, " given"));
            return e3;
          }
          function Qe(e3) {
            if (!M()(e3)) throw new TypeError("Invalid custom query. A string URL is expected, ".concat(e3, " [").concat(typeof e3, "] given"));
            if (!new RegExp(/^\//).test(e3)) throw new TypeError("Invalid custom query. A string starting with / is expected, ".concat(e3, " given"));
            return e3;
          }
          var Ze = n(19), $e = n.n(Ze);
          class Xe {
            constructor() {
              let e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this.options = e3;
            }
            convert(e3) {
              return this._isSinglePoint(e3) ? this._convertPoint(e3) : this._convertToArrayOfPoints(e3);
            }
            _isSinglePoint(e3) {
              if (Array.isArray(e3)) return 2 === e3.length && "object" != typeof e3[0];
              if (M()(e3)) {
                if (e3.split(":").length >= 2) return false;
              }
              return true;
            }
            _convertToArrayOfPoints(e3) {
              return M()(e3) ? e3.split(":").map(this._convertPoint.bind(this)) : e3.map(this._convertPoint.bind(this));
            }
            _convertPoint(e3) {
              return $e()(e3, "lat") && $e()(e3, "lon") ? this._covertToDefaultFormat(e3.lon, e3.lat) : $e()(e3, "latitude") && $e()(e3, "longitude") ? this._covertToDefaultFormat(e3.longitude, e3.latitude) : $e()(e3, "x") && $e()(e3, "y") ? this._covertToDefaultFormat(e3.x, e3.y) : Array.isArray(e3) && 2 === e3.length ? this.options.isLatLon ? this._covertToDefaultFormat(e3[1], e3[0]) : this._covertToDefaultFormat(e3[0], e3[1]) : M()(e3) ? this._convertStringPoint(e3) : e3;
            }
            _convertStringPoint(e3) {
              const t3 = e3.split(",");
              if (!/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(e3) || 2 !== t3.length) throw new Error("The point is not valid: " + e3);
              return this.options.isLatLon ? this._covertToDefaultFormat(t3[1], t3[0]) : this._covertToDefaultFormat(t3[0], t3[1]);
            }
            _covertToDefaultFormat(e3, t3) {
              if (!e3 && 0 !== e3 || !t3 && 0 !== t3) throw new Error("Longitude and latitude must be provided.");
              return D()(this.options.customPointConverter) ? this.options.customPointConverter(e3, t3) : { lng: parseFloat(e3), lat: parseFloat(t3) };
            }
          }
          var Je = n(9), Ye = n.n(Je);
          const et = new Xe(), tt = (e3) => {
            e3 && (e3.boundingBox && (e3.boundingBox.btmRightPoint = et.convert(e3.boundingBox.btmRightPoint), e3.boundingBox.topLeftPoint = et.convert(e3.boundingBox.topLeftPoint)), e3.viewport && (e3.viewport.btmRightPoint = et.convert(e3.viewport.btmRightPoint), e3.viewport.topLeftPoint = et.convert(e3.viewport.topLeftPoint)), e3.position && (e3.position = et.convert(e3.position)), e3.summary && e3.summary.geoBias && (e3.summary.geoBias = et.convert(e3.summary.geoBias)));
          }, nt = (e3) => {
            const t3 = {};
            t3.id = e3.id, Ye()(e3) && Object.keys(e3).forEach(((n3) => {
              ((e4, t4, n4) => {
                F()(n4) || (e4[t4] = n4);
              })(t3, n3, e3[n3]);
            }));
            const n2 = /* @__PURE__ */ ((e4, t4) => ({ type: "Feature", geometry: { type: t4, coordinates: [] }, properties: e4 }))(t3, "Point");
            return n2.geometry.coordinates = [e3.position.lng, e3.position.lat], n2;
          }, rt = (e3) => {
            const t3 = { type: "FeatureCollection", features: [] };
            for (let n2 = 0; n2 < e3.results.length; n2++) {
              const r2 = nt(e3.results[n2]);
              t3.features.push(r2);
            }
            return t3;
          };
          function ot(e3) {
            e3 && e3.entryPoints && Array.isArray(e3.entryPoints) && e3.entryPoints.forEach(((e4) => {
              tt(e4);
            }));
          }
          function it(e3) {
            return e3 ? (Array.isArray(e3.results) ? e3.results.forEach(((e4) => {
              Array.isArray(e4) ? e4.forEach(((e5) => {
                tt(e5), ot(e5);
              })) : (tt(e4), ot(e4));
            })) : (tt(e3), ot(e3)), Object.assign(e3, { toGeoJson: () => rt(e3) })) : e3;
          }
          function at(e3) {
            return Array.isArray(e3.batchItems) ? (e3.batchItems = e3.batchItems.map(((e4) => e4.response.error ? { error: e4.response.error } : it(e4.response))), e3) : null;
          }
          var st = "POST", ct = "PATH", lt = "QUERY", ut = "OTHER", pt = "HEADER";
          function dt(e3, t3) {
            var n2 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var r2 = Object.getOwnPropertySymbols(e3);
              t3 && (r2 = r2.filter((function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              }))), n2.push.apply(n2, r2);
            }
            return n2;
          }
          function ft(e3, t3, n2) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
          }
          function ht(e3, t3) {
            let { data: n2, trackingId: r2 } = e3;
            const o2 = "string" == typeof n2 ? { data: n2 } : (function(e4) {
              for (var t4 = 1; t4 < arguments.length; t4++) {
                var n3 = null != arguments[t4] ? arguments[t4] : {};
                t4 % 2 ? dt(Object(n3), true).forEach((function(t5) {
                  ft(e4, t5, n3[t5]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(n3)) : dt(Object(n3)).forEach((function(t5) {
                  Object.defineProperty(e4, t5, Object.getOwnPropertyDescriptor(n3, t5));
                }));
              }
              return e4;
            })({}, n2), i2 = t3 ? t3(n2) : o2;
            return i2.getTrackingId = () => r2 || null, i2;
          }
          var yt = n(65);
          const vt = c()["endpoints.copyrightsV2"], gt = c()["endpoints.captionV2"], bt = c()["endpoints.batchSearch"], mt = c()["endpoints.batchSyncSearch"], wt = c()["endpoints.batchSearchQuery"], _t = c()["endpoints.geocode"], Et = c()["endpoints.reverseGeocode"], St = c()["endpoints.batchReverseGeocodeQuery"], Ot = c()["endpoints.structuredGeocode"], Pt = c()["endpoints.search"], Tt = c()["endpoints.batchStructuredGeocodeQuery"], xt = c()["endpoints.adp"], It = c()["endpoints.batchAdpQuery"], jt = c()["endpoints.nearbySearch"], At = c()["endpoints.batchNearbySearchQuery"], kt = c()["endpoints.autocomplete"], Rt = c()["endpoints.poiCategories"], Ct = c()["endpoints.chargingAvailability"], Lt = c()["endpoints.batchChargingAvailabilityQuery"], Dt = c()["endpoints.placeById"], Vt = c()["endpoints.routing"], Mt = c()["endpoints.calculateReachableRange"], Ut = c()["endpoints.batchRoutingQuery"], Ft = c()["endpoints.batchRouting"], Nt = c()["endpoints.batchSyncRouting"], Bt = c()["endpoints.matrixRouting"], Wt = c()["endpoints.matrixSyncRouting"], Gt = c()["endpoints.batchReachableRangeQuery"], qt = c()["endpoints.longDistanceEVRouting"], zt = c()["endpoints.incidentDetailsV5"], Ht = c()["endpoints.incidentViewport"], Kt = c()["endpoints.flowSegmentData"], Qt = c()["endpoints.incidentRegions"], Zt = c()["endpoints.trafficLayer"], $t = c()["endpoints.rasterTrafficFlowTilesLayer"], Xt = c()["endpoints.vectorTrafficFlowTilesLayer"], Jt = c()["endpoints.tileLayer"], Yt = c()["endpoints.staticImage"], en = c().origin;
          class tn {
            constructor(e3) {
              void 0 !== (null == e3 ? void 0 : e3.customEndpoints) && (this._customEndpoints = He(e3.customEndpoints)), void 0 !== (null == e3 ? void 0 : e3.customDomain) && (this._customDomain = Ke(e3.customDomain), this._customDomain = this._customDomain.replace(new RegExp(/\/$/), ""));
            }
            resolve(t3) {
              var n2;
              if (void 0 !== (null === (n2 = this._customEndpoints) || void 0 === n2 ? void 0 : n2[t3])) return this._customEndpoints[t3];
              const r2 = e2[t3];
              return void 0 !== this._customDomain ? this._changeDomain(r2, this._customDomain) : r2;
            }
            _changeDomain(e3, t3) {
              return e3.replace(en, t3);
            }
          }
          class nn extends Error {
            constructor(e3) {
              for (var t3 = arguments.length, n2 = new Array(t3 > 1 ? t3 - 1 : 0), r2 = 1; r2 < t3; r2++) n2[r2 - 1] = arguments[r2];
              super(...n2), Error.captureStackTrace && Error.captureStackTrace(this, nn);
              let o2 = "\n";
              e3.forEach(((e4) => {
                o2 += e4.message + "\n";
              })), this.errors = e3, this.message = "Validation errors occured: " + o2;
            }
          }
          const rn = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/;
          class on {
            constructor(e3) {
              let { validators: t3, converters: n2, required: r2, defaultValue: o2, deprecationDate: i2 } = e3;
              Object.assign(this, { validators: t3, converters: n2, required: r2, defaultValue: o2, deprecationDate: i2 }), this._validateFields();
            }
            _isArrayOfFunctions(e3) {
              if (!Array.isArray(e3)) return false;
              for (let t3 = 0; t3 < e3.length; t3++) if (!D()(e3[t3])) return false;
              return true;
            }
            _validateFields() {
              if (null === this.validators || this.validators && !this._isArrayOfFunctions(this.validators)) throw new Error("Validators are not an array of functions.");
              if (null === this.converters || this.converters && !this._isArrayOfFunctions(this.converters)) throw new Error("Converters are not an array of functions.");
              if (void 0 !== this.required && "boolean" != typeof this.required) throw new Error("Required must be a Boolean.");
              if (this.deprecationDate && (Number.isNaN(Date.parse(this.deprecationDate)) || !rn.test(this.deprecationDate))) throw new Error("deprecationDate must contain a valid date");
            }
            getDefaultValue() {
              return D()(this.defaultValue) ? this.defaultValue() : this.defaultValue;
            }
            getConverters() {
              return this.converters ? this.converters : [];
            }
            getValidators() {
              return this.validators ? this.validators : [];
            }
            getDeprecationDate() {
              return this.deprecationDate;
            }
            isRequired() {
              return true === this.required;
            }
          }
          var an = new class {
            constructor() {
              this.log = {};
            }
            _isLogPrinted(e3, t3) {
              const n2 = this.log[e3];
              return !!n2 && n2[t3];
            }
            _setLog(e3, t3) {
              this.log[e3] = this.log[e3] || {}, this.log[e3][t3] = true;
            }
            _displayWarning(e3, t3, n2) {
              const r2 = Date.now() > Date.parse(t3), o2 = "default" !== n2 ? "(used in ".concat(n2, ") ") : "";
              r2 ? console.error("[DEPRECATION WARNING] The parameter '".concat(e3, "' ").concat(o2, " deprecation period ") + "has ended. It is recommended to stop using it as it may stop working. Please refer to https://developer.tomtom.com/maps-sdk-web-js/documentation for more information") : console.warn("[DEPRECATION NOTICE] The parameter '".concat(e3, "' ").concat(o2, "is deprecated. ") + "By ".concat(t3, " we can not guarantee that it will continue to work. ") + "Please refer to https://developer.tomtom.com/maps-sdk-web-js/documentation for more information");
            }
            checkDeprecation(e3, t3) {
              let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "default";
              F()(e3) || F()(t3) || this._isLogPrinted(n2, e3) || (this._displayWarning(e3, t3, n2), this._setLog(n2, e3));
            }
          }();
          function sn(e3, t3) {
            var n2 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var r2 = Object.getOwnPropertySymbols(e3);
              t3 && (r2 = r2.filter((function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              }))), n2.push.apply(n2, r2);
            }
            return n2;
          }
          function cn(e3) {
            for (var t3 = 1; t3 < arguments.length; t3++) {
              var n2 = null != arguments[t3] ? arguments[t3] : {};
              t3 % 2 ? sn(Object(n2), true).forEach((function(t4) {
                ln(e3, t4, n2[t4]);
              })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : sn(Object(n2)).forEach((function(t4) {
                Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n2, t4));
              }));
            }
            return e3;
          }
          function ln(e3, t3, n2) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
          }
          function un(e3, t3, n2, r2, o2, i2, a2) {
            try {
              var s2 = e3[i2](a2), c2 = s2.value;
            } catch (e4) {
              return void n2(e4);
            }
            s2.done ? t3(c2) : Promise.resolve(c2).then(r2, o2);
          }
          function pn(e3) {
            return function() {
              var t3 = this, n2 = arguments;
              return new Promise((function(r2, o2) {
                var i2 = e3.apply(t3, n2);
                function a2(e4) {
                  un(i2, r2, o2, a2, s2, "next", e4);
                }
                function s2(e4) {
                  un(i2, r2, o2, a2, s2, "throw", e4);
                }
                a2(void 0);
              }));
            };
          }
          const dn = (e3, t3, n2, r2) => {
            const o2 = [];
            for (const i2 of t3) try {
              i2(e3, n2, r2);
            } catch (e4) {
              o2.push(e4);
            }
            return o2;
          }, fn = (e3) => {
            const t3 = {};
            for (const [n2, r2] of Object.entries(e3)) t3[n2] = new on(r2);
            return t3;
          }, hn = function(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = arguments.length > 2 ? arguments[2] : void 0;
            const r2 = fn(e3);
            let o2 = [];
            for (const [e4, i2] of Object.entries(r2)) {
              const r3 = t3[e4], a2 = "__all" === e4;
              if (F()(r3) && i2.isRequired()) o2.push(new Error("".concat(e4, " is a required field.")));
              else if (!F()(r3) || a2) {
                an.checkDeprecation(e4, i2.getDeprecationDate(), n2);
                const a3 = dn(r3, i2.getValidators(), t3, e4);
                o2 = [...o2, ...a3];
              }
            }
            return o2;
          }, yn = function(e3) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = arguments.length > 2 ? arguments[2] : void 0;
            const r2 = fn(e3), o2 = {};
            for (const [e4, i2] of Object.entries(r2)) {
              const r3 = i2.getDefaultValue();
              let a2 = t3[e4];
              if (F()(a2) || "" === a2) {
                if (F()(r3)) continue;
                a2 = r3;
              }
              const s2 = i2.getConverters();
              o2[e4] = s2.reduce(((e5, t4) => t4(e5, n2)), a2);
            }
            return o2;
          };
          function vn(e3, t3, n2, r2) {
            const o2 = {};
            let i2 = [];
            if (e3.batchItems && t3.batchItems && (o2.batchItems = t3.batchItems.map(((t4) => {
              const o3 = yn(e3.batchItems, t4, n2);
              return i2 = i2.concat(hn(e3.batchItems, o3, r2)), o3;
            })), t3.batchMode && (o2.batchMode = Q(["sync", "async", "redirect"], "batchMode")(t3.batchMode)), t3.key && (o2.key = H(t3.key)), o2.trackingId = t3.trackingId ? we(t3.trackingId) : (0, yt.v4)(), t3.waitTimeSeconds)) {
              if (K(t3.waitTimeSeconds), !(120 === t3.waitTimeSeconds || t3.waitTimeSeconds >= 5 && t3.waitTimeSeconds <= 60)) throw new Error("Invalid `waitTimeSeconds` parameter value. Must be 120 or an integer between 5 and 60.");
              o2.waitTimeSeconds = t3.waitTimeSeconds;
            }
            return { batchProperties: o2, batchErrors: i2 };
          }
          function gn(e3) {
            return bn.apply(this, arguments);
          }
          function bn() {
            return bn = pn((function* (e3) {
              let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n2 = arguments.length > 2 ? arguments[2] : void 0, r2 = arguments.length > 3 ? arguments[3] : void 0, o2 = arguments.length > 4 ? arguments[4] : void 0, i2 = arguments.length > 5 ? arguments[5] : void 0, a2 = yn(e3, t3, n2), s2 = hn(e3, a2, r2);
              if (e3.batchItems && t3.batchItems) {
                const { batchProperties: o3, batchErrors: i3 } = vn(e3, t3, n2, r2);
                a2 = cn(cn({}, a2), o3), s2 = s2.concat(i3);
              }
              if (s2.length) throw new nn(s2);
              return o2(a2, i2);
            })), bn.apply(this, arguments);
          }
          function mn(e3, t3, n2, r2, o2) {
            const i2 = { batchItems: e3 };
            return function() {
              let a2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, c2 = r2, l2 = a2, u2 = e3;
              return a2.batchItems && D()(o2) && (l2 = { trackingId: a2.trackingId, batchMode: a2.batchMode, waitTimeSeconds: a2.waitTimeSeconds, batchItems: a2.batchItems, key: a2.key }, c2 = o2, u2 = i2), gn(u2, l2, t3, n2, c2, s2.abortSignal);
            };
          }
          var wn = n(80), _n = n.n(wn);
          function En(e3, t3) {
            return e3.replace(/\{ *([\w_]+) *\}/g, ((e4, n2) => {
              let r2 = t3[n2];
              return _n()(r2) ? "{" + n2 + "}" : (D()(r2) && (r2 = r2(n2)), "query" === n2 ? encodeURIComponent(r2) : r2);
            }));
          }
          var Sn = window.fetch;
          function On(e3, t3, n2, r2, o2, i2, a2) {
            try {
              var s2 = e3[i2](a2), c2 = s2.value;
            } catch (e4) {
              return void n2(e4);
            }
            s2.done ? t3(c2) : Promise.resolve(c2).then(r2, o2);
          }
          function Pn(e3) {
            return function() {
              var t3 = this, n2 = arguments;
              return new Promise((function(r2, o2) {
                var i2 = e3.apply(t3, n2);
                function a2(e4) {
                  On(i2, r2, o2, a2, s2, "next", e4);
                }
                function s2(e4) {
                  On(i2, r2, o2, a2, s2, "throw", e4);
                }
                a2(void 0);
              }));
            };
          }
          function Tn(e3, t3) {
            var n2 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var r2 = Object.getOwnPropertySymbols(e3);
              t3 && (r2 = r2.filter((function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              }))), n2.push.apply(n2, r2);
            }
            return n2;
          }
          function xn(e3) {
            for (var t3 = 1; t3 < arguments.length; t3++) {
              var n2 = null != arguments[t3] ? arguments[t3] : {};
              t3 % 2 ? Tn(Object(n2), true).forEach((function(t4) {
                In(e3, t4, n2[t4]);
              })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Tn(Object(n2)).forEach((function(t4) {
                Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n2, t4));
              }));
            }
            return e3;
          }
          function In(e3, t3, n2) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
          }
          function jn(e3, t3, n2) {
            e3.pathParameters = e3.pathParameters || {}, e3.pathParameters.contentType = n2, e3.pathParameters.protocol = e3.pathParameters.protocol || "https";
            const r2 = En(e3.url, e3.pathParameters), o2 = f();
            o2.Accept = "application/json", e3.headers && e3.headers.trackingId && (o2["Tracking-ID"] = e3.headers.trackingId);
            let i2 = xn({ method: "GET", headers: o2, mode: "cors" }, e3.abortSignal && { signal: e3.abortSignal });
            return t3 && (i2 = xn(xn({}, i2), {}, { transformResponse: t3 })), { options: e3, url: r2, requestOptions: i2 };
          }
          function An(e3, t3) {
            let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r2 = arguments.length > 3 ? arguments[3] : void 0;
            return Sn(Ln(e3, t3), n2).then((function() {
              var t4 = Pn((function* (t5) {
                const n3 = yield r2(t5);
                if (!t5.ok) return Promise.reject({ response: t5, data: n3 });
                if (e3._getOriginalResponse) return t5;
                if ("batch" === e3.requestType && 202 === t5.status) return t5.headers.location;
                const o2 = t5.headers && (t5.headers.get("tracking-id") || t5.headers.get("Tracking-ID"));
                return xn({ data: n3 }, o2 && { trackingId: o2 });
              }));
              return function(e4) {
                return t4.apply(this, arguments);
              };
            })()).catch((function() {
              let t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (n2.signal && true === n2.signal.aborted) return Promise.reject(t4);
              const { response: r3, data: o2 } = t4, i2 = e3._getOriginalResponse ? r3 || t4 : Cn(o2, r3 && r3.status) || t4;
              return Promise.reject(i2);
            }));
          }
          function kn(e3) {
            return e3.text();
          }
          function Rn(e3) {
            return e3.json();
          }
          const Cn = (e3, t3) => {
            if (!e3) return;
            const { error: n2, detailedError: r2 } = e3;
            return n2 && r2 ? { message: n2.description, data: r2, status: t3 } : e3;
          };
          function Ln(e3, t3) {
            if (!e3.queryParameters) return t3;
            return t3 + "?" + Object.keys(e3.queryParameters).map((function(t4) {
              return (function(e4, t5) {
                const n2 = e4.queryParameters[t5];
                let r2 = "";
                r2 = Array.isArray(n2) ? n2.map((function(e5) {
                  return Dn(t5, e5);
                })).join("&") : Dn(t5, e4.queryParameters[t5]);
                return r2;
              })(e3, t4);
            })).join("&");
          }
          function Dn(e3, t3) {
            return encodeURIComponent(e3) + "=" + encodeURIComponent(t3);
          }
          function Vn(e3, t3) {
            var n2 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var r2 = Object.getOwnPropertySymbols(e3);
              t3 && (r2 = r2.filter((function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              }))), n2.push.apply(n2, r2);
            }
            return n2;
          }
          function Mn(e3, t3, n2) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
          }
          function Un(e3, t3) {
            const n2 = (function(e4) {
              try {
                return JSON.stringify(e4);
              } catch (e5) {
                return null;
              }
            })(e3);
            if (!n2) throw new Error("Unsupported request body type: " + e3);
            return (function(e4, t4, n3) {
              e4.headers || (e4.headers = {}), e4.headers[t4] || e4.headers[t4.toLowerCase()] || (e4.headers[t4] = n3);
            })(t3, "Content-Type", "application/json"), n2;
          }
          const Fn = function(e3, t3) {
            const n2 = jn(e3, t3, "json");
            return An(n2.options, n2.url, n2.requestOptions, Rn);
          }, Nn = function(e3) {
            e3.pathParameters = e3.pathParameters || {}, e3.pathParameters.contentType = "json", e3.pathParameters.protocol = e3.pathParameters.protocol || "https";
            const t3 = En(e3.url, e3.pathParameters), n2 = f();
            n2.Accept = "application/json", e3.headers && e3.headers.trackingId && (n2["Tracking-ID"] = e3.headers.trackingId);
            const r2 = (function(e4) {
              for (var t4 = 1; t4 < arguments.length; t4++) {
                var n3 = null != arguments[t4] ? arguments[t4] : {};
                t4 % 2 ? Vn(Object(n3), true).forEach((function(t5) {
                  Mn(e4, t5, n3[t5]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(n3)) : Vn(Object(n3)).forEach((function(t5) {
                  Object.defineProperty(e4, t5, Object.getOwnPropertyDescriptor(n3, t5));
                }));
              }
              return e4;
            })({ method: "POST", headers: n2, mode: "cors", redirect: "follow" }, e3.abortSignal && { signal: e3.abortSignal });
            return (function(e4, t4) {
              const n3 = e4.bodyParameters;
              let r3;
              n3 && (Ye()(n3) ? r3 = Un(n3, t4) : M()(n3) && (r3 = n3), t4.body = r3);
            })(e3, r2), An(e3, t3, r2, Rn);
          }, Bn = function(e3, t3) {
            const n2 = jn(e3, t3, "text");
            return An(n2.options, n2.url, n2.requestOptions, kn);
          };
          let Wn = false;
          const Gn = () => Wn ? "http" : "https";
          var qn = (e3, t3) => {
            e3.protocol = e3 && e3.protocol || Gn();
            const n2 = e3.pathParameters;
            return n2 && "text" === n2.contentType ? Bn(e3, t3) : Fn(e3, t3);
          }, zn = (e3) => (e3.protocol = e3.protocol || Gn(), Nn(e3));
          function Hn(e3) {
            const t3 = e3[1];
            return !t3.application || t3.application === lt;
          }
          function Kn(e3) {
            return e3[1].application === ct;
          }
          function Qn(e3) {
            return e3[1].application === st;
          }
          function Zn(e3) {
            return e3[1].application === ut;
          }
          function $n(e3) {
            return e3[1].application === pt;
          }
          function Xn(e3) {
            return { name: e3[0], fieldName: e3[2] };
          }
          function Jn(e3, t3) {
            let n2 = Object.keys(e3).map((r2 = e3, (e4) => [r2[e4] && r2[e4].name || e4, r2[e4], e4]));
            var r2;
            return n2 = n2.filter(t3), n2 = n2.map(Xn), n2;
          }
          function Yn(e3) {
            return Jn(e3, Hn);
          }
          function er(e3) {
            return Jn(e3, Kn);
          }
          function tr(e3) {
            return Jn(e3, Qn);
          }
          function nr(e3) {
            return Jn(e3, Zn);
          }
          function rr(e3) {
            return Jn(e3, $n);
          }
          function or(e3, t3, n2) {
            const r2 = {};
            return t3(e3).forEach(((t4) => {
              if (t4.fieldName in n2) {
                const o2 = e3[t4.fieldName], i2 = n2[t4.fieldName];
                o2.cast ? o2.cast(i2, r2) : r2[t4.name] = i2;
              }
            })), r2;
          }
          function ir(e3, t3) {
            return { pathParams: or(e3, er, t3), queryParams: or(e3, Yn, t3), postParams: or(e3, tr, t3), otherParams: or(e3, nr, t3), headerParams: or(e3, rr, t3) };
          }
          var ar = n(81), sr = n.n(ar);
          const cr = "contentType";
          function lr(e3) {
            const t3 = Object.assign({}, e3);
            return t3[cr] = { application: ct }, t3;
          }
          function ur(e3) {
            return e3[cr] = e3[cr] || "json", e3;
          }
          const pr = (e3) => (t3, n2, r2) => {
            const { pathParams: o2, queryParams: i2, postParams: a2, headerParams: s2 } = ir(lr(t3), ur(n2)), c2 = { headers: s2, url: "{protocol}://" + e3, pathParameters: o2, queryParameters: i2, abortSignal: r2 };
            return sr()(a2) ? qn(c2) : (c2.bodyParameters = a2, zn(c2));
          };
          var dr = (e3, t3) => {
            if (null == e3) throw new TypeError(t3);
            return e3;
          };
          function fr(e3, t3) {
            return encodeURIComponent(e3) + "=" + encodeURIComponent(t3);
          }
          function hr(e3, t3) {
            if (!t3) return e3;
            return e3 + "?" + Object.keys(t3).map(((e4) => (function(e5, t4) {
              const n2 = t4[e5];
              let r2 = "";
              return r2 = Array.isArray(n2) ? n2.map((function(t5) {
                return fr(e5, t5);
              })).join("&") : fr(e5, t4[e5]), r2;
            })(e4, t3))).join("&");
          }
          var yr = (e3, t3, n2) => hr(En(e3, t3), n2);
          function vr(e3, t3) {
            var n2 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var r2 = Object.getOwnPropertySymbols(e3);
              t3 && (r2 = r2.filter((function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              }))), n2.push.apply(n2, r2);
            }
            return n2;
          }
          function gr(e3, t3, n2) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
          }
          function br(e3) {
            let t3;
            switch (e3.batchMode) {
              case "async":
                t3 = e3.endpoints.async;
                break;
              case "sync":
                t3 = e3.endpoints.sync;
                break;
              default:
                t3 = e3.endpoints.async, e3.queryParams.redirectMode = "manual";
            }
            return "sync" !== e3.batchMode && e3.waitTimeSeconds ? e3.queryParams.waitTimeSeconds = e3.waitTimeSeconds : e3.queryParams && e3.queryParams.waitTimeSeconds && delete e3.queryParams.waitTimeSeconds, zn((function(e4) {
              for (var t4 = 1; t4 < arguments.length; t4++) {
                var n2 = null != arguments[t4] ? arguments[t4] : {};
                t4 % 2 ? vr(Object(n2), true).forEach((function(t5) {
                  gr(e4, t5, n2[t5]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(n2)) : vr(Object(n2)).forEach((function(t5) {
                  Object.defineProperty(e4, t5, Object.getOwnPropertyDescriptor(n2, t5));
                }));
              }
              return e4;
            })({ url: "{protocol}://" + t3, queryParameters: e3.queryParams, bodyParameters: e3.bodyParams, headers: e3.headers, requestType: "batch" }, e3.abortSignal && { abortSignal: e3.abortSignal })).then(((t4) => "manual" === e3.queryParams.redirectMode ? qn({ url: "{protocol}://" + en + t4 }) : t4));
          }
          const mr = (e3, t3) => (n2, r2, o2) => {
            const i2 = {}, a2 = {};
            i2.key = r2.key;
            const s2 = {};
            r2.trackingId && (s2.trackingId = r2.trackingId);
            const c2 = dr(r2.batchItems);
            n2 = lr(n2), a2.batchItems = c2.map((function(e4) {
              const { pathParams: r3, queryParams: o3, postParams: i3 } = ir(n2, ur(e4)), a3 = { query: yr(t3.single, r3, o3) };
              return sr()(i3) || (a3.post = i3), a3;
            }));
            return br({ batchMode: r2.batchMode || (a2.batchItems.length <= e3 ? "sync" : "redirect"), waitTimeSeconds: r2.waitTimeSeconds, queryParams: i2, bodyParams: a2, headers: s2, endpoints: { sync: t3.batchSync, async: t3.batch }, abortSignal: o2 });
          }, wr = ["origins", "destinations"];
          function _r(e3) {
            const t3 = { origins: e3.origins, destinations: e3.destinations }, n2 = (function(e4) {
              const t4 = Object.keys(e4).filter(((e5) => -1 === wr.indexOf(e5)));
              return t4.length ? t4.reduce(((t5, n3) => (t5[n3] = e4[n3], t5)), {}) : null;
            })(e3);
            return n2 && (t3.options = { post: n2 }), t3;
          }
          const Er = { key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, geometries: { validators: [function(e3) {
            if (re(e3)) throw new TypeError("an array is expected, but " + e3 + "  [" + typeof e3 + "] given");
            return e3;
          }], required: true }, geometriesZoom: { validators: [function(e3) {
            return ve(0, 22, "a geometries zoom value <0, 22> is expected")(e3);
          }] } };
          function Sr(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("adpEndpoint")), o2 = mr(100, { single: n2.resolve("batchAdpQueryEndpoint"), batchSync: n2.resolve("batchSyncSearchEndpoint"), batch: n2.resolve("batchSearchEndpoint") });
            return mn(Er, g, "additionalData", (function(e4, t4) {
              return r2(Er, e4, t4).then(ht);
            }), (function(e4, t4) {
              return o2(Er, e4, t4).then(((e5) => ht(e5, at)));
            }))(e3, t3);
          }
          var Or = n(98), Pr = n.n(Or);
          function Tr(e3, t3) {
            if (e3) throw new TypeError(t3);
          }
          function xr(e3) {
            const t3 = parseFloat(e3);
            if (!isFinite(t3)) throw new TypeError("an number is expected, but " + e3 + " [" + typeof e3 + "] given");
            return t3 - 180 * Math.ceil((t3 - 90) / 180);
          }
          function Ir(e3) {
            const t3 = parseFloat(e3);
            if (!isFinite(t3)) throw new TypeError("an number is expected, but " + e3 + " [" + typeof e3 + "] given");
            return t3 - 360 * Math.ceil((t3 - 180) / 360);
          }
          function jr(e3) {
            if (Array.isArray(e3) && 2 === e3.length) return [...e3].reverse();
            if (M()(e3)) {
              const t4 = e3.match(k);
              return Tr(!t4 || !t4[1] || !t4[2], "A point is expected, but " + e3 + " [" + typeof e3 + "] given"), [t4[2], t4[1]];
            }
            if ((function(e4) {
              return D()(e4.lat) && D()(e4.lng);
            })(e3)) return [e3.lat(), e3.lng()];
            if (r2 = e3, Object.prototype.hasOwnProperty.call(r2, "lat") && (Object.prototype.hasOwnProperty.call(r2, "lon") || Object.prototype.hasOwnProperty.call(r2, "lng"))) return [e3.lat, (t3 = e3.lon, n2 = e3.lng, void 0 === t3 ? n2 : t3)];
            var t3, n2, r2, o2;
            if (o2 = e3, Object.prototype.hasOwnProperty.call(o2, "x") && Object.prototype.hasOwnProperty.call(o2, "y")) return [e3.y, e3.x];
            if ((function(e4) {
              return Object.prototype.hasOwnProperty.call(e4, "latitude") && Object.prototype.hasOwnProperty.call(e4, "longitude");
            })(e3)) return [e3.latitude, e3.longitude];
            throw new TypeError("A point is expected, but " + e3 + " [" + typeof e3 + "] given");
          }
          function Ar(e3) {
            let t3, n2;
            if ((function(e4) {
              return Object.prototype.hasOwnProperty.call(e4, "minLon") && Object.prototype.hasOwnProperty.call(e4, "minLat") && Object.prototype.hasOwnProperty.call(e4, "maxLon") && Object.prototype.hasOwnProperty.call(e4, "maxLat");
            })(e3)) return e3;
            if ((function(e4) {
              return Object.prototype.hasOwnProperty.call(e4, "left") && Object.prototype.hasOwnProperty.call(e4, "bottom") && Object.prototype.hasOwnProperty.call(e4, "right") && Object.prototype.hasOwnProperty.call(e4, "top");
            })(e3)) return { minLon: e3.left, minLat: e3.bottom, maxLon: e3.right, maxLat: e3.top };
            if ((function(e4) {
              return D()(e4.getWest) && D()(e4.getEast) && D()(e4.getSouth) && D()(e4.getNorth);
            })(e3)) return { minLon: e3.getWest(), minLat: e3.getSouth(), maxLon: e3.getEast(), maxLat: e3.getNorth() };
            if (D()(e3.getNorthEast) && D()(e3.getSouthWest)) return n2 = jr(e3.getNorthEast()), t3 = jr(e3.getSouthWest()), { minLon: t3[1], minLat: t3[0], maxLon: n2[1], maxLat: n2[0] };
            if (Array.isArray(e3) && 4 === e3.length) return { minLon: e3[0], minLat: e3[1], maxLon: e3[2], maxLat: e3[3] };
            if (Array.isArray(e3) && 2 === e3.length) return t3 = jr(e3[0]), n2 = jr(e3[1]), { minLon: t3[1], minLat: t3[0], maxLon: n2[1], maxLat: n2[0] };
            if (M()(e3) && 4 === (e3 = e3.trim().split(/\s*,\s*/)).length) return { minLon: parseFloat(e3[0]), minLat: parseFloat(e3[1]), maxLon: parseFloat(e3[2]), maxLat: parseFloat(e3[3]) };
            throw new TypeError("Unable to cast " + e3 + " [" + typeof e3 + "] to bounding box");
          }
          function kr(e3, t3) {
            if (F()(e3) || "" === e3) return "";
            if (t3[e3]) return e3;
            e3 = e3.toLowerCase();
            for (const n2 in t3) if (Object.prototype.hasOwnProperty.call(t3, n2) && "defaultValue" !== n2 && Object.prototype.hasOwnProperty.call(t3[n2].synonyms, e3)) return n2;
            return console.warn("Value provided is invalid (" + e3 + "). Default value (" + t3.defaultValue.value + ") will be used instead."), t3.defaultValue.value;
          }
          function Rr(e3) {
            const t3 = jr(e3);
            return xr(t3[0]) + "," + Ir(t3[1]);
          }
          function Cr(e3) {
            return M()(e3) && e3.indexOf("circle") > -1 ? (function(e4) {
              const t3 = e4.match(R);
              Tr(!(t3 && t3[1] && t3[2] && t3[3]), "Unable to cast " + e4 + " [" + typeof e4 + "] to circle");
              const n2 = parseFloat(t3[2]), r2 = parseFloat(t3[1]), o2 = parseFloat(t3[3]);
              return Tr(!isFinite(n2) || !isFinite(r2), "Unable to cast " + e4 + " [" + typeof e4 + "] to circle"), "circle(" + n2 + "," + r2 + "," + o2 + ")";
            })(e3) : Array.isArray(e3) && 3 === e3.length ? "circle(" + xr(e3[1]) + "," + Ir(e3[0]) + "," + e3[2] + ")" : Rr(e3);
          }
          function Lr(e3) {
            const t3 = [];
            for (const n2 in e3) Object.prototype.hasOwnProperty.call(e3, n2) && t3.push(Rr(e3[n2]));
            return t3;
          }
          function Dr(e3) {
            if (!M()(e3)) return e3;
            const t3 = e3.split(",");
            return { latitude: t3[0], longitude: t3[1] };
          }
          function Vr(e3) {
            return (function(e4) {
              let t3 = e4.minLon, n2 = e4.maxLon, r2 = e4.minLat, o2 = e4.maxLat;
              if (n2 - t3 > 360) n2 = 180, t3 = -180;
              else {
                if (n2 > 270) {
                  const e5 = Math.ceil(t3 / 360);
                  n2 -= 360 * e5, t3 -= 360 * e5;
                }
                if (t3 < -270) {
                  const e5 = Math.ceil(-n2 / 360);
                  n2 += 360 * e5, t3 += 360 * e5;
                }
              }
              return r2 = r2 < -90 ? -90 : r2, o2 = o2 > 90 ? 90 : o2, { minLon: t3, minLat: r2, maxLon: n2, maxLat: o2 };
            })(Ar(e3));
          }
          function Mr(e3) {
            return Rr(e3);
          }
          function Ur(e3) {
            if (e3 && e3 instanceof Date) return e3.toISOString();
            if (!e3 || !M()(e3)) throw new TypeError("Unable to cast " + e3 + " [" + typeof e3 + "] to datetime value.");
            return "now" !== e3 && (e3 = new Date(e3).toISOString()), e3;
          }
          function Fr(e3) {
            let t3;
            Tr(!e3 || !Array.isArray(e3), "Unable to cast " + e3 + " [" + typeof e3 + "] to geometry list (array)");
            for (const n2 in e3) Object.prototype.hasOwnProperty.call(e3, n2) && (t3 = e3[n2], "POLYGON" === t3.type ? t3.vertices = Lr(t3.vertices) : "CIRCLE" === t3.type && (t3.position = Rr(t3.position)));
            return e3;
          }
          function Nr(e3) {
            return kr(e3, q);
          }
          function Br(e3) {
            if (!e3) return [];
            if (M()(e3)) return (e3 = e3.trim().replace(/\s*[,;]\s*/g, ",")).split(/[,;]+/);
            if (Array.isArray(e3)) return e3;
            throw new TypeError("Unable to cast " + e3 + " [" + typeof e3 + "] to array of strings");
          }
          function Wr(e3) {
            if (M()(e3)) return e3;
            if (!Array.isArray(e3)) throw new TypeError("An array is required");
            return e3.join(":");
          }
          function Gr(e3) {
            if (Array.isArray(e3)) return e3.join();
            throw new TypeError("An array is required");
          }
          function qr(e3) {
            return Pr()(e3);
          }
          const zr = { key: { validators: [H] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, maxDetourTime: { validators: [Te(1, 3600)], required: true }, spreadingMode: { validators: [Q(["auto"], "spreading mode")] }, route: { required: true, converters: [function(e3) {
            return { points: e3.map(jr).map(((e4) => {
              let [t3, n2] = e4;
              return { lat: t3, lon: n2 };
            })) };
          }], validators: [function(e3) {
            let t3;
            if (void 0 === e3.points) throw new TypeError("Invalid structure of the route object");
            if (t3 = e3.points, t3 && !(Array.isArray(t3) && t3.length > 2)) throw new TypeError("Provided route array " + t3 + " is not valid. It should be an array with at least 2 points.");
            return t3.forEach(he), e3;
          }], application: st }, query: { required: true, validators: [xe], application: ct }, limit: { validators: [Te(1, 20)] }, type: { validators: [xe], defaultValue: "searchAlongRoute", application: ct }, brandSet: { validators: [xe] }, categorySet: { validators: [xe] }, connectorSet: { validators: [ke] }, minPowerKW: { validators: [K] }, maxPowerKW: { validators: [K] }, openingHours: { validators: [Q(["nextSevenDays"], "openingHours parameter")] }, timeZone: { validators: [Q(["iana"], "timeZone parameter")] }, sortBy: { validators: [Q(["detourTime", "detourOffset", "detourDistance"], "sortBy")] }, detourOffset: { validators: [_e] }, view: { validators: [xe] } };
          function Hr(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("searchEndpoint")), o2 = mr(100, { single: n2.resolve("batchSearchQueryEndpoint"), batchSync: n2.resolve("batchSyncSearchEndpoint"), batch: n2.resolve("batchSearchEndpoint") });
            return mn(zr, g, "alongRouteSearch", ((e4, t4) => r2(zr, e4, t4).then(((e5) => ht(e5, it)))), ((e4, t4) => o2(zr, e4, t4).then(((e5) => ht(e5, it)))))(e3, t3);
          }
          const Kr = "combustion", Qr = "electric", Zr = "any";
          function $r(e3) {
            if (isNaN(parseFloat(e3)) || !isFinite(e3)) throw new Error("A value parsable to float is expected, but " + e3 + " [" + typeof e3 + "] given");
          }
          function Xr(e3) {
            const t3 = {};
            e3.forEach((function(e4) {
              const n2 = e4.split(",");
              if (2 !== n2.length) throw new Error("Invalid number of parameters in the pair around " + e4);
              if (0 === n2[0].trim().length) throw new Error("Speed value must not be empty.");
              if (0 === n2[1].trim().length) throw new Error("Consumption value must not be empty.");
              if ($r(n2[0]), $r(n2[1]), Object.prototype.hasOwnProperty.call(t3, parseFloat(n2[0]))) throw new Error("Duplicate speed: " + n2[0]);
              t3[parseFloat(n2[0])] = parseFloat(n2[1]);
            })), Object.keys(t3).length > 1 && (function(e4) {
              const t4 = Object.keys(e4).sort((function(e5, t5) {
                return parseFloat(e5) > parseFloat(t5);
              })), n2 = t4.length;
              if (e4[t4[n2 - 2]] > e4[t4[n2 - 1]]) throw new Error("Consumption for two highest speeds should be increasing");
            })(t3);
          }
          function Jr(e3, t3) {
            if (e3.vehicleEngineType && e3.vehicleEngineType !== t3 && t3 !== Zr) throw new Error("Expecting vehicleEngineType set to " + t3);
          }
          function Yr(e3, t3, n2) {
            if (!e3[t3] || !e3[n2]) throw new Error("Missing dependant parameter. Expecting both defined: " + t3 + ", " + n2);
          }
          function eo(e3) {
            if ("bicycle" === e3.travelMode || "pedestrian" === e3.travelMode) throw new Error("Consumption model parameters cannot be set if travelMode is set to bicycle or pedestrian");
          }
          function to(e3) {
            if (!e3.constantSpeedConsumptionInLitersPerHundredkm && !e3.constantSpeedConsumptionInkWhPerHundredkm) throw new Error("Consumption model cannot be used without setting constant speed consumption parameter");
          }
          function no(e3) {
            return (t3, n2) => {
              if (null == t3) return;
              if (eo(n2), Jr(n2, e3), !M()(t3)) throw new TypeError('Expecting a String like "15.2,12.2:8.0,9.0"');
              const r2 = t3.split(":");
              if (r2.length < 1 || r2.length > 25) throw new Error("Incorrect amount of speed-consumption pairs provided. Expecting 1-25, but got " + t3.length);
              Xr(r2);
            };
          }
          function ro(e3, t3) {
            return function(n2, r2) {
              if (n2 && (eo(r2), to(r2), Jr(r2, e3), $r(n2), n2 < 0)) throw new Error(t3 + ": Expecting positive value");
            };
          }
          function oo(e3, t3) {
            return function(n2, r2) {
              n2 && (eo(r2), to(r2), Jr(r2, Zr), Yr(r2, e3, t3), Yr(r2, e3, "vehicleWeight"), r2.vehicleEngineType === Kr && Yr(r2, e3, "fuelEnergyDensityInMJoulesPerLiter"), (function(e4, t4, n3) {
                if (e4[t4] * e4[n3] > 1) throw new Error("Product of " + t4 + " and " + n3 + " cannot exceed 1");
              })(r2, e3, t3), $r(n2));
            };
          }
          function io(e3, t3) {
            return function(n2, r2) {
              n2 && (eo(r2), to(r2), Jr(r2, Qr), Yr(r2, e3, t3), $r(n2));
            };
          }
          function ao(e3, t3) {
            let n2, r2;
            if ("electric" === t3.vehicleEngineType) {
              if (n2 = t3.currentChargeInkWh, r2 = t3.energyBudgetInkWh, r2 > n2) throw new Error("Energy budget may not be greater than current energy.");
            } else if (n2 = t3.currentFuelInLiters, r2 = t3.fuelBudgetInLiters, r2 > n2) throw new Error("Fuel budget may not be greater than current fuel.");
            if (r2 < 0) throw new Error("Budget may not be negative.");
          }
          function so(e3, t3, n2) {
            const r2 = "constantSpeedConsumptionInLitersPerHundredkm" in t3, o2 = "constantSpeedConsumptionInkWhPerHundredkm" in t3, i2 = "electric" === t3.vehicleEngineType;
            if ("energyBudgetInkWh" === n2 && e3) {
              if (!i2) throw new Error('Engine type should be "electric" when energyBudgetInkWh is set');
              if (!o2) throw new Error("Missing constant speed consumption for electric engine.");
            } else if ("fuelBudgetInLiters" === n2 && e3) {
              if (i2) throw new Error('Engine type should be "combustion" or undefined when fuelBudgetInLiters is set');
              if (!r2) throw new Error("Missing constant speed consumption for combustion engine.");
            }
          }
          function co(e3, t3) {
            return function(n2, r2) {
              if (n2 && Object.prototype.hasOwnProperty.call(r2, t3) && O(r2[t3])) throw new Error(e3 + " parameter cannot be used in conjunction with " + t3);
            };
          }
          function lo(e3, t3) {
            return function(n2, r2) {
              if (n2 && !Object.prototype.hasOwnProperty.call(r2, t3)) throw new Error(t3 + " must be specified when using with " + e3);
            };
          }
          function uo(e3, t3) {
            const n2 = sr()(t3.query), r2 = sr()(t3.brandSet), o2 = sr()(t3.categorySet);
            if (n2 && r2 && o2) throw new Error("Empty query parameter is only allowed when used with brandSet or categorySet filters");
          }
          function po(e3, t3) {
            const n2 = t3.recuperationInkWhPerkmAltitudeLoss, r2 = t3.consumptionInkWhPerkmAltitudeGain;
            if ($r(n2), $r(r2), r2 < n2) throw new Error("consumptionInkWhPerkmAltitudeGain must be greater than recuperationInkWhPerkmAltitudeLoss");
            if (r2 > 500) throw new Error("recuperationInkWhPerkmAltitudeLoss and less than 500.0");
            if (n2 < 0) throw new Error("recuperationInkWhPerkmAltitudeLoss must be greater than 0.0");
          }
          var fo = () => ({ __all: { validators: [uo] }, key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, query: { validators: [xe], application: ct, defaultValue: "" }, typeahead: { validators: [_e] }, limit: { validators: [Me] }, offset: { validators: [Ue], name: "ofs" }, language: { validators: [je], converters: [Nr] }, countrySet: { validators: [Ae] }, radius: { validators: [Ee] }, center: { converters: [Mr], validators: [De], cast: (e3, t3) => {
            const n2 = e3.split(",");
            t3.lat = n2[0], t3.lon = n2[1];
          } }, type: { validators: [xe], defaultValue: "search", application: ct }, bestResult: { validators: [_e], cast: (e3, t3) => {
            e3 && (t3.limit = 1, t3.ofs = 0);
          } }, protocol: { validators: [Q(["http", "https"], "protocol")] }, extendedPostalCodesFor: { validators: [xe] }, view: { validators: [Q(["IL", "MA", "IN", "PK", "Unified", "RU", "TR", "AR", "CN"], "view")] }, brandSet: { validators: [xe] }, categorySet: { validators: [xe] }, connectorSet: { validators: [ke] }, minPowerKW: { validators: [K] }, maxPowerKW: { validators: [K] }, openingHours: { validators: [Q(["nextSevenDays"], "openingHours parameter")] }, timeZone: { validators: [Q(["iana"], "timeZone parameter")] }, mapcodes: { validators: [Ce] }, fuelSet: { validators: [Re] }, relatedPois: { validators: [Q(["off", "child", "parent", "all"], "relatedPois")] } });
          const ho = () => ({ validators: [Oe], converters: [Vr], cast: (e3, t3) => {
            t3.topLeft = "".concat(e3.maxLat, ",").concat(e3.minLon), t3.btmRight = "".concat(e3.minLat, ",").concat(e3.maxLon);
          } });
          class yo {
            constructor(e3, t3) {
              this.options = e3, this.additionalOptions = t3, this.defaultFields = A(fo()), this.fields = {};
            }
            _getRestService() {
              const e3 = new tn(this.additionalOptions);
              return { search: pr(e3.resolve("searchEndpoint")), batch: mr(100, { single: e3.resolve("batchSearchQueryEndpoint"), batchSync: e3.resolve("batchSyncSearchEndpoint"), batch: e3.resolve("batchSearchEndpoint") }) };
            }
            handleBatchServiceCall(e3, t3) {
              return this._getRestService().batch(this.fields, e3, t3).then(((e4) => ht(e4, at)));
            }
            handleServiceCall(e3, t3) {
              return this._getRestService().search(this.fields, e3, t3).then(((t4) => {
                let { data: n2, trackingId: r2 } = t4;
                return ht({ data: e3.bestResult ? n2.results[0] : n2, trackingId: r2 }, it);
              }));
            }
            construct(e3) {
              this.fields = C(this.fields, this.defaultFields);
              return mn(this.fields, g, e3 || "search", this.handleServiceCall.bind(this), this.handleBatchServiceCall.bind(this))(this.options, this.additionalOptions);
            }
          }
          class vo extends yo {
            constructor(e3, t3) {
              super(e3, t3), this.fields.type = { defaultValue: "categorySearch", visible: false }, this.fields.boundingBox = ho();
            }
          }
          function go(e3, t3) {
            return new vo(e3, t3).construct("categorySearch");
          }
          const bo = { key: { validators: [H] }, chargingAvailability: { validators: [xe], required: true }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, connectorSet: { validators: [ke] }, minPowerKW: { validators: [K] }, maxPowerKW: { validators: [K] } };
          function mo(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("chargingAvailabilityEndpoint")), o2 = mr(100, { single: n2.resolve("batchChargingAvailabilityQueryEndpoint"), batchSync: n2.resolve("batchSyncSearchEndpoint"), batch: n2.resolve("batchSearchEndpoint") });
            return mn(bo, h, "chargingAvailability", (function(e4, t4) {
              return r2(bo, e4, t4).then(ht);
            }), (function(e4, t4) {
              return o2(bo, e4, t4).then(((e5) => ht(e5, at)));
            }))(e3, t3);
          }
          class wo extends yo {
            constructor(e3, t3) {
              super(e3, t3), this.fields.minFuzzyLevel = { validators: [Ve], defaultValue: 1 }, this.fields.maxFuzzyLevel = { validators: [Ve], defaultValue: 2 }, this.fields.idxSet = { validators: [xe] }, this.fields.entityTypeSet = { converters: [qr, Gr], validators: [Fe] }, this.fields.sessionId = { validators: [xe] }, this.fields.clientTime = { validators: [Ge] }, this.fields.boundingBox = ho();
            }
          }
          function _o(e3, t3) {
            return new wo(e3, t3).construct("fuzzySearch");
          }
          class Eo extends yo {
            constructor(e3, t3) {
              super(e3, t3), this.fields.type = { defaultValue: "geometrySearch", visible: false, application: ct }, this.fields.key = { validators: [H] }, this.fields.limit = { validators: [Me] }, this.fields.language = { validators: [je] }, this.fields.geometryList = { validators: [Be], converters: [Fr], application: st }, this.fields.idxSet = { validators: [xe] }, this.fields.protocol = { validators: [Q(["http", "https"], "protocol")] }, this.fields.extendedPostalCodesFor = { validators: [xe] }, this.fields.entityTypeSet = { converters: [qr, Gr], validators: [Fe] }, this.fields.boundingBox = ho();
            }
          }
          function So(e3, t3) {
            return new Eo(e3, t3).construct("geometrySearch");
          }
          class Oo extends yo {
            constructor(e3, t3) {
              super(e3, t3), this.fields.__all = { validators: [] }, this.fields.type = { defaultValue: "nearbySearch", visible: false }, this.fields.query = { visible: false }, this.fields.center = { required: true }, this.fields.radius = { required: false, validators: [Pe(1, 5e4)] }, this.fields.typeahead = { visible: false };
            }
            _getRestService() {
              const e3 = new tn(this.additionalOptions);
              return { search: pr(e3.resolve("nearbySearchEndpoint")), batch: mr(100, { single: e3.resolve("batchNearbySearchQueryEndpoint"), batchSync: e3.resolve("batchSyncSearchEndpoint"), batch: e3.resolve("batchSearchEndpoint") }) };
            }
          }
          function Po(e3, t3) {
            return new Oo(e3, t3).construct("nearbySearch");
          }
          const To = { key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, entityId: { validators: [xe], required: true }, language: { validators: [je], converters: [Nr] }, relatedPois: { validators: [Q(["off", "child", "parent", "all"], "relatedPois")] }, mapcodes: { validators: [Ce] }, timeZone: { validators: [Q(["iana"], "timeZone parameter")] }, openingHours: { validators: [Q(["nextSevenDays"], "openingHours parameter")] }, view: { validators: [Q(["AR", "IL", "MA", "IN", "PK", "Unified", "RU", "TR", "CN"], "view")] } };
          function xo(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("placeByIdEndpoint"));
            return mn(To, g, "placeById", ((e4, t4) => r2(To, e4, t4).then(((e5) => ht(e5, it)))))(e3, t3);
          }
          const Io = { key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, language: { validators: [je] } };
          function jo(e3, t3) {
            return mn(Io, g, "poiCategories", ((e4, n2) => {
              const r2 = new tn(t3);
              return pr(r2.resolve("poiCategoriesEndpoint"))(Io, e4, n2).then(ht);
            }))(e3, t3);
          }
          class Ao extends yo {
            constructor(e3, t3) {
              super(e3, t3), this.fields.type = { defaultValue: "poiSearch", visible: false }, this.fields.boundingBox = ho();
            }
          }
          function ko(e3, t3) {
            return new Ao(e3, t3).construct("poiSearch");
          }
          const Ro = { key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, query: { validators: [xe], required: true, application: ct }, language: { validators: [je], converters: [Nr], required: true }, limit: { validators: [Me] }, countrySet: { validators: [Ae] }, radius: { validators: [Ee] }, resultSet: { validators: [xe] }, center: { converters: [Mr], validators: [De], cast: (e3, t3) => {
            const n2 = e3.split(",");
            t3.lat = n2[0], t3.lon = n2[1];
          } }, sessionId: { validators: [xe] }, clientTime: { validators: [Ge] } };
          function Co(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("autocompleteEndpoint"));
            return mn(Ro, g, "autocomplete", (function(e4, t4) {
              return r2(Ro, e4, t4).then(((e5) => ht(e5)));
            }))(e3, t3);
          }
          const Lo = new Xe({ isLatLon: true }), Do = (e3) => {
            e3.position && (e3.position = Lo.convert(e3.position)), e3.address && e3.address.boundingBox && (e3.address.boundingBox.northEast = Lo.convert(e3.address.boundingBox.northEast), e3.address.boundingBox.southWest = Lo.convert(e3.address.boundingBox.southWest));
          };
          function Vo(e3) {
            return e3.addresses.forEach(((e4) => {
              Array.isArray(e4) && e4.forEach(((e5) => {
                Do(e5);
              })), Do(e4);
            })), e3;
          }
          function Mo(e3) {
            return e3.batchItems instanceof Array ? (e3.batchItems = e3.batchItems.map(((e4) => e4.response.error ? { error: e4.response.error } : Vo(e4.response))), e3) : null;
          }
          function Uo(e3, t3) {
            this.options = e3, this.additionalOptions = t3, this.fields = {};
          }
          function Fo(e3) {
            return new Uo(e3).construct();
          }
          Uo.prototype.TYPE = { reverseGeocode: "reverseGeocode", crossStreetLookup: "reverseGeocode/crossStreet" }, Uo.prototype.construct = function(e3) {
            return mn(C(this.fields, this.defaultFields), g, e3 || "reverseGeocodeBase", this.handleServiceCall.bind(this), this.handleBatchServiceCall.bind(this))(this.options, this.additionalOptions);
          }, Uo.prototype.handleServiceCall = function(e3, t3) {
            const n2 = new tn(this.additionalOptions);
            return pr(n2.resolve("reverseGeocodeEndpoint"))(this.fields, e3, t3).then(((e4) => ht(e4, Vo)));
          }, Uo.prototype.handleBatchServiceCall = function(e3, t3) {
            const n2 = new tn(this.additionalOptions);
            return mr(100, { single: n2.resolve("batchReverseGeocodeQueryEndpoint"), batch: n2.resolve("batchSearchEndpoint"), batchSync: n2.resolve("batchSyncSearchEndpoint") })(this.fields, e3, t3).then(((e4) => ht(e4, Mo)));
          }, Fo.prototype.constructor = Uo;
          const No = "reverseGeocode", Bo = "reverseGeocode/crossStreet", Wo = { key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, language: { validators: [je] }, position: { converters: [Mr], validators: [De], required: true, application: ct }, heading: { validators: [K] }, radius: { validators: [Ee] }, protocol: { validators: [Q(["http", "https"], "protocol")] }, view: { validators: [Q(["AR", "IL", "MA", "IN", "PK", "Unified", "RU", "TR", "CN"], "view")] }, allowFreeformNewline: { validators: [_e] } }, Go = { type: { defaultValue: No, visible: false, application: ct }, entityType: { converters: [qr, Gr], validators: [Fe] }, returnSpeedLimit: { validators: [_e] }, number: { validators: [xe] }, returnRoadUse: { validators: [_e] }, roadUse: { converters: [function(e3) {
            if (M()(e3)) return '["' + e3.replace(/["']|^\s+|\s+$/g, "").split(/[\s,]+/).join('","') + '"]';
            if (Array.isArray(e3)) {
              for (let t3 = 0; t3 < e3.length; t3 += 1) e3[t3] = String(e3[t3]).replace(/["']|^\s+|\s+$/g, "");
              return '["' + e3.join('","') + '"]';
            }
            throw new TypeError("Unable to cast " + e3 + " [" + typeof e3 + "] to road use string");
          }], validators: [function(e3) {
            const t3 = ["LimitedAccess", "Arterial", "Terminal", "Ramp", "Rotary", "LocalStreet"];
            oe(!M()(e3) || !e3.match(/^\[("\w*",?)+\]$/), "Road use is expected, but " + e3 + "  [" + typeof e3 + "] given");
            const n2 = e3.replace(/["[\]]/g, "").split(",");
            for (let r2 = 0; r2 < n2.length; r2 += 1) oe(t3.indexOf(n2[r2]) < 0, "Road use (" + t3 + ") is expected, but " + e3 + "  [" + typeof e3 + "] given");
            return e3;
          }] }, streetNumber: { validators: [xe] }, returnMatchType: { validators: [_e] }, mapcodes: { validators: [Ce] }, dateTime: { validators: [function(e3) {
            return me(e3, "dateTime");
          }] } }, qo = { type: { defaultValue: Bo, visible: false, application: ct }, limit: { validators: [Me] } };
          function zo(e3) {
            if (e3 === No) return Object.assign({}, Wo, Go);
            if (e3 === Bo) return Object.assign({}, Wo, qo);
            throw new Error("Unsupported geocode type: " + e3);
          }
          function Ho(e3, t3) {
            const n2 = Fo.prototype.constructor;
            function r2(e4, t4) {
              n2.call(this, e4, t4), this.fields = zo(No);
            }
            return r2.prototype = new n2(), r2.prototype.constructor = r2, new r2(e3, t3).construct("reverseGeocode");
          }
          function Ko(e3) {
            return e3 ? (Array.isArray(e3.results) && e3.results.forEach(((e4) => {
              Array.isArray(e4) ? e4.forEach(((e5) => {
                tt(e5);
              })) : tt(e4);
            })), tt(e3), Object.assign(e3, { toGeoJson: () => rt(e3) })) : e3;
          }
          function Qo(e3) {
            return e3.batchItems instanceof Array ? (e3.batchItems = e3.batchItems.map(((e4) => e4.response.error ? { error: e4.response.error } : Ko(e4.response))), e3) : null;
          }
          var Zo = () => ({ extendedPostalCodesFor: { validators: [xe] }, type: { defaultValue: "geocode", application: ct }, key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, query: { validators: [xe], required: true, application: ct }, typeahead: { validators: [_e] }, limit: { validators: [Se] }, view: { validators: [Q(["AR", "IL", "MA", "IN", "PK", "Unified", "RU", "TR", "CN"], "view")] }, offset: { validators: [Ee], name: "ofs" }, language: { validators: [je] }, boundingBox: { validators: [Oe], converters: [Vr], cast: (e3, t3) => {
            t3.topLeft = "".concat(e3.maxLat, ",").concat(e3.minLon), t3.btmRight = "".concat(e3.minLat, ",").concat(e3.maxLon);
          } }, center: { converters: [Mr], validators: [De], cast: (e3, t3) => {
            const n2 = e3.split(",");
            t3.lat = n2[0], t3.lon = n2[1];
          } }, countrySet: { validators: [Ae] }, radius: { validators: [Ee] }, bestResult: { validators: [_e], cast: (e3, t3) => {
            e3 && (t3.limit = 1, t3.ofs = 0);
          } }, protocol: { validators: [Q(["http", "https"], "protocol")] }, timeZone: { validators: [Q(["iana"], "timeZone parameter")] }, entityTypeSet: { converters: [qr, Gr], validators: [Fe] } });
          const $o = Zo();
          function Xo(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("geocodeEndpoint")), o2 = mr(100, { single: n2.resolve("batchSearchQueryEndpoint"), batchSync: n2.resolve("batchSyncSearchEndpoint"), batch: n2.resolve("batchSearchEndpoint") });
            return mn($o, g, "geocode", (function(e4, t4) {
              return r2($o, e4, t4).then(((t5) => {
                let { data: n3, trackingId: r3 } = t5;
                return ht({ data: e4.bestResult ? n3.results[0] : n3, trackingId: r3 }, Ko);
              }));
            }), (function(e4, t4) {
              return o2($o, e4, t4).then(((e5) => ht(e5, Qo)));
            }))(e3, t3);
          }
          function Jo(e3, t3) {
            const n2 = Fo.prototype.constructor;
            function r2(e4, t4) {
              n2.call(this, e4, t4), this.fields = zo(Bo);
            }
            return r2.prototype = new n2(), r2.prototype.constructor = r2, new r2(e3, t3).construct("crossStreetLookup");
          }
          const Yo = { key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, countryCode: { validators: [Ie], required: true }, limit: { validators: [Me] }, view: { validators: [Q(["AR", "IL", "MA", "IN", "PK", "Unified", "RU", "TR", "CN"], "view")] }, offset: { validator: [Ee], name: "ofs" }, language: { validators: [je] }, streetNumber: { validators: [xe] }, streetName: { validators: [xe] }, crossStreet: { validators: [xe] }, municipality: { validators: [xe] }, municipalitySubdivision: { validators: [xe] }, countryTertiarySubdivision: { validators: [xe] }, countrySecondarySubdivision: { validators: [xe] }, countrySubdivision: { validators: [xe] }, postalCode: { validators: [xe] }, protocol: { validators: [Q(["http", "https"], "protocol")] }, bestResult: { validators: [_e] }, timeZone: { validators: [Q(["iana"], "timeZone parameter")] }, extendedPostalCodesFor: { validators: [xe] }, entityTypeSet: { converters: [qr, Gr], validators: [Fe] } };
          function ei(e3) {
            const t3 = (function(e4) {
              const t4 = Boolean(e4.bestResult);
              return delete e4.bestResult, t4;
            })(e3);
            t3 && (e3.limit = 1, e3.offset = 0);
          }
          function ti(e3, t3) {
            const n2 = new tn(t3), r2 = mr(100, { single: n2.resolve("batchStructuredGeocodeQueryEndpoint"), batch: n2.resolve("batchSearchEndpoint"), batchSync: n2.resolve("batchSyncSearchEndpoint") }), o2 = pr(n2.resolve("structuredGeocodeEndpoint"));
            return mn(Yo, g, "structuredGeocode", (function(e4, t4) {
              const n3 = Boolean(e4.bestResult);
              return ei(e4), o2(Yo, e4, t4).then(((e5) => {
                let { data: t5, trackingId: r3 } = e5;
                return ht({ data: n3 ? t5.results[0] : t5, trackingId: r3 }, Ko);
              }));
            }), (function(e4, t4) {
              return e4.batchItems.forEach(ei), r2(Yo, e4, t4).then(((e5) => ht(e5, Qo)));
            }))(e3, t3);
          }
          const ni = { key: { validators: [H] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, routeType: { validators: [Q(["fastest", "shortest", "eco", "thrilling"], "route type")] }, traffic: { validators: [_e] }, avoid: { validators: [Ne(["tollRoads", "motorways", "ferries", "unpavedRoads", "carpools", "alreadyUsedRoads"], "avoid")], converters: [Br] }, departAt: { validators: [function(e3) {
            if ("now" === e3 || te(e3) && Date.now() < Date.parse(e3)) return e3;
            throw new TypeError("Supported departAt is now or rfc3339 format and no earlier than now(), but " + e3 + " [" + typeof e3 + "] given");
          }], converters: [Ur] }, arriveAt: { validators: [function(e3) {
            if (te(e3) && Date.now() < Date.parse(e3)) return e3;
            throw new TypeError("Supported arriveAt is rfc3339 format, but and no earlier than now() " + e3 + " [" + typeof e3 + "] given");
          }], converters: [Ur] }, travelMode: { validators: [Q(["car", "truck", "taxi", "bus", "van", "motorcycle", "bicycle", "pedestrian"], "travel mode")] }, hilliness: { validators: [Q(["low", "normal", "high"], "hilliness")] }, windingness: { validators: [Q(["low", "normal", "high"], "windingness")] }, report: { validators: [Q(["effectiveSettings"], "report")] }, vehicleEngineType: { validators: [Q(["combustion", "electric"], "vehicle engine type")] }, vehicleMaxSpeed: { validators: [Ee] }, vehicleWeight: { validators: [Ee, function(e3, t3) {
            if ((function(e4) {
              return e4.accelerationEfficiency || e4.decelerationEfficiency || e4.uphillEfficiency || e4.downhillEfficiency;
            })(t3) && void 0 === e3) throw new Error("vehicleWeight parameter must be set if any efficiency parameters is present");
          }] }, vehicleAxleWeight: { validators: [Ee] }, vehicleLength: { validators: [Pe(0, Number.MAX_VALUE)] }, vehicleWidth: { validators: [Pe(0, Number.MAX_VALUE)] }, vehicleHeight: { validators: [Pe(0, Number.MAX_VALUE)] }, vehicleCommercial: { validators: [_e] }, vehicleLoadType: { validators: [Ne(["USHazmatClass1", "USHazmatClass2", "USHazmatClass3", "USHazmatClass4", "USHazmatClass5", "USHazmatClass6", "USHazmatClass7", "USHazmatClass8", "USHazmatClass9", "otherHazmatExplosive", "otherHazmatGeneral", "otherHazmatHarmfulToWater"], "vehicle load type")], converters: [Br] }, constantSpeedConsumptionInLitersPerHundredkm: { validators: [no("combustion")], converters: [Wr] }, currentFuelInLiters: { validators: [ro("combustion", "currentFuelInLiters")] }, auxiliaryPowerInLitersPerHour: { validators: [ro("combustion", "auxiliaryPowerInLitersPerHour")] }, fuelEnergyDensityInMJoulesPerLiter: { validators: [function(e3, t3) {
            e3 && (eo(t3), $r(e3), to(t3), Jr(t3, "combustion"), (function(e4, t4) {
              if (!(O(e4.accelerationEfficiency) && O(e4.decelerationEfficiency) && O(e4.uphillEfficiency) && O(e4.downhillEfficiency))) throw new Error("Efficiency parameters are required when using " + t4);
            })(t3, "fuelEnergyDensityInMJoulesPerLiter"));
          }] }, accelerationEfficiency: { validators: [oo("accelerationEfficiency", "decelerationEfficiency")] }, decelerationEfficiency: { validators: [oo("decelerationEfficiency", "accelerationEfficiency")] }, uphillEfficiency: { validators: [oo("uphillEfficiency", "downhillEfficiency")] }, downhillEfficiency: { validators: [oo("downhillEfficiency", "uphillEfficiency")] }, constantSpeedConsumptionInkWhPerHundredkm: { validators: [no("electric")], converters: [Wr] }, currentChargeInkWh: { validators: [io("currentChargeInkWh", "maxChargeInkWh")] }, maxChargeInkWh: { validators: [io("maxChargeInkWh", "currentChargeInkWh")] }, auxiliaryPowerInkW: { validators: [ro("electric", "auxiliaryPowerInkW")] }, protocol: { validators: [Q(["http", "https"], "protocol")] }, avoidAreas: { converters: [function(e3) {
            if (!Array.isArray(e3)) throw new TypeError("An array is required");
            return { rectangles: e3.map(((e4) => ({ southWestCorner: Dr(Rr(e4.southWestCorner)), northEastCorner: Dr(Rr(e4.northEastCorner)) }))) };
          }], application: st }, avoidVignette: { validators: [Le.bind(void 0, false), co("avoidVignette", "allowVignette")], converters: [Br], application: st }, allowVignette: { validators: [Le.bind(void 0, true), co("allowVignette", "avoidVignette")], converters: [Br], application: st }, recuperationInkWhPerkmAltitudeLoss: { validators: [lo("recuperationInkWhPerkmAltitudeLoss", "consumptionInkWhPerkmAltitudeGain"), po] }, consumptionInkWhPerkmAltitudeGain: { validators: [lo("consumptionInkWhPerkmAltitudeGain", "recuperationInkWhPerkmAltitudeLoss"), po] }, vehicleAdrTunnelRestrictionCode: { validators: [Q(["B", "C", "D", "E"], "vehicleAdrTunnelRestrictionCode")] } };
          let ri = { __all: { validators: [function(e3, t3) {
            const n2 = ["fuelBudgetInLiters" in t3, "energyBudgetInkWh" in t3, "timeBudgetInSec" in t3, "distanceBudgetInMeters" in t3].filter(((e4) => e4)).length;
            if (0 === n2 || n2 > 1) throw new Error("Exactly one of fuelBudgetInLiters, energyBudgetInkWh, timeBudgetInSec and distanceBudgetInMeters must be set.");
          }, function(e3, t3) {
            const n2 = "alreadyUsedRoads";
            if ("avoid" in t3 && t3.avoid.indexOf(n2) > -1) throw new Error(n2 + " is not allowed value for avoid parameter in Calculate Reachable Route request.");
            if ("travelMode" in t3 && ["bicycle", "pedestrian"].indexOf(t3.travelMode) > -1) throw new Error(t3.travelMode + " is not allowed value for travelMode parameter in Calculate Reachable Route request.");
            if ("arriveAt" in t3) throw new Error("arriveAt parameter is not allowed in Calculate Reachable Route request.");
          }] }, origin: { validators: [De], converters: [Mr], application: ct }, fuelBudgetInLiters: { validators: [so, ao] }, energyBudgetInkWh: { validators: [so, ao] }, distanceBudgetInMeters: { validators: [Pe(0, Number.MAX_VALUE)] }, timeBudgetInSec: { validators: [Pe(0, Number.MAX_VALUE)] } };
          ri = x(ri, ni);
          const oi = new Xe();
          var ii = (e3) => (e3.reachableRange && e3.reachableRange.boundary && Array.isArray(e3.reachableRange.boundary) && (e3.reachableRange.boundary = oi.convert(e3.reachableRange.boundary), e3.reachableRange.center = oi.convert(e3.reachableRange.center)), Object.assign(e3, { toGeoJson: () => ((e4) => ({ type: "Feature", geometry: { type: "Polygon", coordinates: [e4.reachableRange.boundary.map(((e5) => [e5.lng, e5.lat]))] } }))(e3) })), ai = (e3) => Array.isArray(e3.batchItems) ? (e3.batchItems = e3.batchItems.map(((e4) => e4.response.error ? { error: e4.response.error } : ii(e4.response))), e3) : null;
          const si = ((e3) => {
            const t3 = A(ri);
            return e3 instanceof Array && e3.forEach((function(e4) {
              delete t3[e4];
            })), t3;
          })();
          function ci(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("calculateReachableRangeEndpoint")), o2 = mr(100, { batchSync: n2.resolve("batchSyncRoutingEndpoint"), batch: n2.resolve("batchRoutingEndpoint"), single: n2.resolve("batchReachableRangeQueryEndpoint") });
            return mn(si, v, "calculateReachableRange", ((e4, t4) => r2(si, e4, t4).then(((e5) => ht(e5, ii)))), ((e4, t4) => o2(si, e4, t4).then(((e5) => ht(e5, ai)))))(e3, t3);
          }
          function li(e3) {
            const t3 = [];
            for (let n2 = 0; n2 < e3.length; n2 += 1) t3.push([e3[n2].lng, e3[n2].lat]);
            return t3;
          }
          function ui(e3) {
            const t3 = e3.legs.length > 1, n2 = (function(e4) {
              return { type: "Feature", properties: { summary: e4.summary, sections: e4.sections, segmentSummary: [] } };
            })(e3);
            for (let r2 = 0; r2 < e3.legs.length; r2 += 1) n2.properties.segmentSummary.push(e3.legs[r2].summary), e3.legs[r2].points && (n2.geometry = n2.geometry || { coordinates: [] }, t3 ? (n2.geometry.type = "MultiLineString", n2.geometry.coordinates.push(li(e3.legs[r2].points))) : (n2.geometry.type = "LineString", n2.geometry.coordinates = li(e3.legs[r2].points)));
            return e3.guidance && (n2.properties.guidance = e3.guidance), n2;
          }
          const pi = new Xe(), di = (e3, t3, n2) => {
            n2 && (e3[t3] = n2);
          };
          function fi(e3) {
            const t3 = e3.routes;
            return t3 && t3.length && t3.forEach(((e4) => {
              e4.legs.forEach(((e5) => {
                e5.points = pi.convert(e5.points);
              }));
            })), Object.assign(e3, { toGeoJson: () => ((e4) => {
              const t4 = { type: "FeatureCollection", features: [] };
              if (!e4 || !e4.routes) return t4;
              for (let n2 = 0; n2 < e4.routes.length; n2 += 1) t4.features.push(ui(e4.routes[n2]));
              return t4;
            })(e3), toRouteSectionsCollection: () => ((e4) => {
              const t4 = [];
              return e4 && e4.routes ? (e4.routes.forEach(((e5) => {
                const n2 = [];
                for (let t5 = 0; t5 < e5.legs.length; t5 += 1) n2.push(...e5.legs[t5].points);
                const r2 = { type: "FeatureCollection", features: [] };
                e5.sections.forEach(((e6) => {
                  let t5 = n2.slice(e6.startPointIndex, e6.endPointIndex + 1);
                  t5 = t5.map(((e7) => [e7.lng, e7.lat]));
                  const o2 = { type: "Feature", geometry: { type: "LineString" }, properties: {} };
                  o2.geometry.coordinates = t5, di(o2.properties, "sectionType", e6.sectionType), di(o2.properties, "travelMode", e6.travelMode), di(o2.properties, "countryCode", e6.countryCode), di(o2.properties, "simpleCategory", e6.simpleCategory), di(o2.properties, "effectiveSpeedInKmh", e6.effectiveSpeedInKmh), di(o2.properties, "delayInSeconds", e6.delayInSeconds), di(o2.properties, "magnitudeOfDelay", e6.delayInSeconds), di(o2.properties, "tec", e6.tec), r2.features.push(o2);
                })), t4.push(r2);
              })), t4) : t4;
            })(e3) });
          }
          function hi(e3) {
            return Array.isArray(e3.batchItems) ? (e3.batchItems = e3.batchItems.map(((e4) => e4.response.error ? { error: e4.response.error } : fi(e4.response))), e3) : null;
          }
          let yi = { alternativeType: { validators: [Q(["anyRoute", "betterRoute"], "alternativeType")] }, locations: { validators: [function(e3) {
            const t3 = k, n2 = R;
            e3.constructor.toString().indexOf("Array") > -1 && (e3 = e3.join(":"));
            const r2 = new RegExp("^" + t3.source + ":(?:(?:" + t3.source + "|" + n2.source + "):)*" + t3.source + "$");
            if (!e3.match(r2)) throw new TypeError("Routing location is expected. But " + e3 + " [" + typeof e3 + "] given");
            return e3;
          }], converters: [function(e3) {
            const t3 = [];
            if (M()(e3)) return e3.split(":").map(((e4) => e4.split(",").reverse().join(","))).join(":");
            if (Array.isArray(e3)) {
              Tr(e3.length < 2, "Unable to cast " + e3 + " [" + typeof e3 + "] to routing locations string"), t3.push(Rr(e3[0]));
              for (let n2 = 1; n2 < e3.length - 1; n2 += 1) t3.push(Cr(e3[n2]));
              return t3.push(Rr(e3[e3.length - 1])), t3.join(":");
            }
            throw new TypeError("Unable to cast " + e3 + " [" + typeof e3 + "] to routing locations string");
          }], required: true, application: ct }, maxAlternatives: { validators: [Pe(0, 5)] }, instructionsType: { validators: [Q(["coded", "text", "tagged"], "instructions type")] }, language: { validators: [function(e3) {
            const t3 = Object.keys(G);
            return I(e3, t3, "Supported routing guidance language is expected to be one of: " + t3 + "), but " + e3 + " [" + typeof e3 + "] given");
          }], converters: [function(e3) {
            return kr(e3, G);
          }] }, computeBestOrder: { validators: [_e] }, routeRepresentation: { validators: [Q(["polyline", "none"], "route representation")] }, computeTravelTimeFor: { validators: [Q(["none", "all"], "compute travel time for")] }, vehicleHeading: { validators: [Te(0, 359)] }, minDeviationDistance: { validators: [Ee, co("minDeviationDistance", "arriveAt"), lo("minDeviationDistance", "supportingPoints")] }, minDeviationTime: { validators: [Ee, co("minDeviationTime", "arriveAt"), lo("minDeviationTime", "supportingPoints")] }, supportingPoints: { validators: [function(e3) {
            if (!Array.isArray(e3)) throw new TypeError("Expecting array in supporting points validator");
            if (!e3.length || e3.length < 2) throw new TypeError("There should be at least two supporting points");
            return e3;
          }], converters: [function(e3) {
            const t3 = [];
            if (M()(e3) && (e3 = e3.split(":")), Array.isArray(e3)) for (let n2 = 0; n2 < e3.length; n2++) t3.push(Rr(e3[n2]));
            else t3.push(Rr(e3));
            return (function(e4) {
              return e4.map(Dr);
            })(t3);
          }], application: st }, sectionType: { validators: [Ne(["carTrain", "country", "ferry", "motorway", "pedestrian", "tollRoad", "tollVignette", "travelMode", "tunnel", "traffic", "carpool", "urban", "unpaved"], "sectionType")], converters: [Br] } };
          function vi(e3) {
            yi = x(yi, ni);
            const t3 = A(yi);
            return e3 instanceof Array && e3.forEach((function(e4) {
              delete t3[e4];
            })), t3;
          }
          function gi(e3, t3) {
            const n2 = vi(), r2 = new tn(t3), o2 = pr(r2.resolve("routingEndpoint")), i2 = mr(100, { batchSync: r2.resolve("batchSyncRoutingEndpoint"), batch: r2.resolve("batchRoutingEndpoint"), single: r2.resolve("batchRoutingQueryEndpoint") });
            return mn(n2, v, "calculateRoute", (function(e4, t4) {
              return o2(n2, e4, t4).then(((e5) => ht(e5, fi)));
            }), (function(e4, t4) {
              return i2(n2, e4, t4).then(((e5) => ht(e5, hi)));
            }))(e3, t3);
          }
          const bi = ["arriveAt", "travelMode", "computeTravelTimeFor", "alternativeType", "maxAlternatives", "instructionsType", "language", "computeBestOrder", "routeRepresentation", "supportingPoints", "minDeviationDistance", "minDeviationTime", "constantSpeedConsumptionInLitersPerHundredkm", "currentFuelInLiters", "fuelEnergyDensityInMJoulesPerLiter", "hilliness", "windingness", "routeType", "vehicleEngineType", "currentChargeInkWh", "maxChargeInkWh", "constantSpeedConsumptionInkWhPerHundredkm"], mi = { auxiliaryPowerInkW: { validators: [ro("electric", "auxiliaryPowerInkW")] }, constantSpeedConsumptionInkWhPerHundredkm: { validators: [no("electric")], converters: [Wr], required: true }, currentChargeInkWh: { validators: [io("currentChargeInkWh", "maxChargeInkWh")], required: true }, maxChargeInkWh: { validators: [io("maxChargeInkWh", "currentChargeInkWh")], required: true }, vehicleEngineType: { validators: [Q(["electric"], "vehicleEngineType")], required: true }, chargingModes: { validators: [function(e3) {
            if (e3.length > 10) throw new Error("Given chargingModes array contains more than 10 elements.");
            return e3.forEach(((e4) => {
              ae(e4);
            })), e3;
          }], required: true, application: st }, minChargeAtDestinationInkWh: { validators: [Pe(0, Number.MAX_VALUE)], required: true }, minChargeAtChargingStopsInkWh: { validators: [Pe(0, Number.MAX_VALUE)], required: true }, recuperationInkWhPerkmAltitudeLoss: { validators: [lo("recuperationInkWhPerkmAltitudeLoss", "consumptionInkWhPerkmAltitudeGain"), po] }, consumptionInkWhPerkmAltitudeGain: { validators: [lo("consumptionInkWhPerkmAltitudeGain", "recuperationInkWhPerkmAltitudeLoss"), po] }, vehicleAdrTunnelRestrictionCode: { validators: [Q(["B", "C", "D", "E"], "vehicleAdrTunnelRestrictionCode")] }, travelMode: { validators: [Q(["car"], "travel mode")] } };
          function wi(e3, t3) {
            const n2 = x(vi(bi), mi), r2 = new tn(t3), o2 = pr(r2.resolve("longDistanceEVRoutingEndpoint"));
            return mn(n2, v, "longDistanceEVRouting", ((e4, t4) => o2(n2, e4, t4).then(((e5) => ht(e5, fi)))))(e3, t3);
          }
          function _i(e3) {
            return e3.error ? { error: e3.error } : e3.matrix ? e3 : null;
          }
          const Ei = ["locations", "maxAlternatives", "instructionsType", "language", "computeBestOrder", "routeRepresentation", "vehicleHeading", "report", "callback", "minDeviationTime", "minDeviationDistance", "alternativeType", "sectionType", "supportingPoints", "allowVignette", "avoidAreas", "batchMode", "consumptionInkWhPerkmAltitudeGain", "recuperationInkWhPerkmAltitudeLoss"], Si = { validators: [/* @__PURE__ */ (function(e3) {
            return (t3) => (t3.forEach(((t4) => ye(e3, t4))), t3);
          })({ point: { validators: [(Oi = { latitude: { validators: [function(e3) {
            return fe(e3);
          }], required: true }, longitude: { validators: [function(e3) {
            return ie(e3);
          }], required: true } }, (e3) => (ye(Oi, e3), e3))] } })], converters: [/* @__PURE__ */ (function(e3) {
            return (t3) => (t3.forEach(((t4) => {
              for (const n2 in t4) Object.prototype.hasOwnProperty.call(t4, n2) && Object.prototype.hasOwnProperty.call(e3, n2) && Array.isArray(e3[n2].converters) && e3[n2].converters.forEach(((e4) => {
                D()(e4) && (t4[n2] = e4(t4[n2]));
              }));
            })), t3);
          })({ point: { converters: [/* @__PURE__ */ (function(e3) {
            return (t3) => {
              for (const n2 in t3) Object.prototype.hasOwnProperty.call(t3, n2) && Object.prototype.hasOwnProperty.call(e3, n2) && D()(e3[n2].converter) && (t3[n2] = e3[n2].converter(t3[n2]));
              return t3;
            };
          })({ latitude: { converters: [function(e3) {
            return xr(e3);
          }], required: true }, longitude: { converters: [function(e3) {
            return Ir(e3);
          }], required: true } })] } })], required: true, application: st };
          var Oi;
          function Pi(e3, t3) {
            const n2 = (function(e4) {
              const t4 = vi(Ei);
              t4.origins = Si, t4.destinations = Si, t4.batchMode = { application: ut }, t4.waitTimeSeconds = { application: lt, validators: [We] };
              const n3 = A(t4);
              return e4 instanceof Array && e4.forEach((function(e5) {
                delete n3[e5];
              })), n3;
            })(), r2 = new tn(t3), o2 = /* @__PURE__ */ (function(e4, t4) {
              return (n3, r3, o3) => {
                const i2 = ir(n3, r3), a2 = _r(i2.postParams), s2 = i2.queryParams, c2 = i2.headerParams;
                return br({ batchMode: r3.batchMode || (a2.origins.length * a2.destinations.length <= e4 ? "sync" : "redirect"), headers: c2, waitTimeSeconds: r3.waitTimeSeconds, queryParams: s2, bodyParams: a2, endpoints: { sync: t4.sync, async: t4.async }, abortSignal: o3 });
              };
            })(100, { sync: r2.resolve("matrixSyncRoutingEndpoint"), async: r2.resolve("matrixRoutingEndpoint") });
            return mn(n2, v, "matrixRouting", ((e4, t4) => (console.error("The Matrix Routing v1 will be discontinued since October 14th, 2023 and replaced with Matrix Routing v2.\n\nWeb SDK does not support Matrix Routing v2.\nPlease use the Routing API instead. \n For more information, see https://developer.tomtom.com/routing-api/documentation/matrix-routing-v2/matrix-routing-v2-service"), o2(n2, e4, t4).then(((e5) => ht(e5, _i))))))(e3, t3);
          }
          const Ti = { key: { validators: [H] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, protocol: { validators: [Q(["http", "https"], "protocol")] }, sessionId: { validators: [xe] } };
          function xi(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("incidentViewportEndpoint"));
            return mn(Ti, m, "incidentViewport", (function(e4, t4) {
              return r2(Ti, e4, t4).then(ht);
            }))(e3, t3);
          }
          function Ii(e3, t3) {
            var n2 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var r2 = Object.getOwnPropertySymbols(e3);
              t3 && (r2 = r2.filter((function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              }))), n2.push.apply(n2, r2);
            }
            return n2;
          }
          function ji(e3) {
            for (var t3 = 1; t3 < arguments.length; t3++) {
              var n2 = null != arguments[t3] ? arguments[t3] : {};
              t3 % 2 ? Ii(Object(n2), true).forEach((function(t4) {
                Ai(e3, t4, n2[t4]);
              })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Ii(Object(n2)).forEach((function(t4) {
                Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n2, t4));
              }));
            }
            return e3;
          }
          function Ai(e3, t3, n2) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
          }
          function ki(e3) {
            const t3 = e3.flowSegmentData.coordinates.coordinate.map(((e4) => ({ lat: e4.latitude, lng: e4.longitude })));
            return Object.assign(e3, { flowSegmentData: ji(ji({}, e3.flowSegmentData), {}, { coordinates: { coordinate: t3 } }) });
          }
          const Ri = { key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, zoom: { validators: [function(e3) {
            return ge(0, 22, "zoom level <0, 22> is expected")(e3);
          }], required: true, application: ct }, style: { validators: [Q(["absolute", "relative", "relative-delay", "relative0", "relative0-dark", "reduced-sensitivity"], "traffic flow style")], required: true, application: ct }, point: { converters: [Mr], validators: [De], required: true }, unit: { validators: [Q(["KMPH", "MPH"])] }, thickness: { validators: [Pe(1, 20)] }, openLr: { validators: [_e] } };
          function Ci(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("flowSegmentDataEndpoint"));
            return mn(Ri, b, "trafficFlowSegmentData", ((e4, t4) => r2(Ri, e4, t4).then(((e5) => ht(e5, ki)))))(e3, t3);
          }
          const Li = { key: { validators: [H] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 }, boundingBox: { required: true, validators: [Oe], converters: [Vr], cast: (e3, t3) => {
            t3.bbox = "".concat(e3.minLon, ",").concat(e3.minLat, ",").concat(e3.maxLon, ",").concat(e3.maxLat);
          } }, fields: { validators: [xe, function(e3) {
            const t3 = j(ee), n2 = j(e3), r2 = (e4, t4) => {
              Object.keys(e4).forEach((function(n3) {
                if (!t4.hasOwnProperty(n3) || typeof e4[n3] != typeof t4[n3]) throw new TypeError("Property ".concat(n3, " not matches available fields: ") + ee);
                "object" == typeof e4[n3] && r2(e4[n3], t4[n3]);
              }));
            };
            return r2(n2, t3), e3;
          }], converters: [function(e3) {
            if ("string" == typeof e3) return e3.replace(/\s/g, "");
            throw new TypeError("A string is required");
          }] }, t: { validators: [xe] }, language: { validators: [je], converters: [function(e3) {
            return kr(e3, z);
          }] } };
          function Di(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("incidentDetailsV5Endpoint"));
            return mn(Li, m, "incidentDetailsV5", (function(e4, t4) {
              return r2(Li, e4, t4).then(ht);
            }))(e3, t3);
          }
          const Vi = { basic: ["jpg", "jpeg", "png"], hybrid: ["png"], labels: ["png"] }, Mi = { layer: { validators: [Q(["basic", "hybrid", "labels"], "layers")], defaultValue: "basic" }, style: { validators: [Q(["main", "night"], "styles")], defaultValue: "main" }, format: { validators: [Q(["png", "jpg", "jpeg"], "formats")], defaultValue: "png" }, key: { validators: [H] }, zoom: { validators: [Te(0, 23)], converters: [function(e3) {
            return Math.round(Number(e3));
          }] }, center: { converters: [Mr], validators: [De] }, width: { validators: [Te(1, 8192)] }, height: { validators: [Te(1, 8192)] }, bbox: { validators: [Oe], converters: [Vr] }, view: { validators: [Q(["Unified", "IL", "IN", "MA", "PK", "AR", "Arabic", "TR", "RU", "CN"], "view")] }, language: { validators: [function(e3) {
            return I(e3, J, "Supported maps language is expected to be one of: " + J + "), but " + e3 + " [" + typeof e3 + "] given");
          }] } };
          function Ui(e3, t3) {
            return e3 + "?" + Object.keys(Mi).reduce((function(e4, n2) {
              let r2 = t3[n2];
              return void 0 !== r2 && (r2 = (function(e5, t4) {
                if ("bbox" === e5) t4 = (n3 = t4).minLon + "," + n3.minLat + "," + n3.maxLon + "," + n3.maxLat;
                else {
                  if ("zoom" === e5) return String(parseInt(t4, 10));
                  if ("center" === e5) {
                    const e6 = t4.split(","), n4 = [parseFloat(e6[1]), parseFloat(e6[0])];
                    return n4[0] + "," + n4[1];
                  }
                }
                var n3;
                return t4;
              })(n2, r2), e4.push(n2 + "=" + encodeURI(r2))), e4;
            }), []).join("&");
          }
          function Fi(e3, t3) {
            const n2 = new tn(t3);
            return mn(Mi, y, "staticImage", (function(e4) {
              return (function(e5) {
                if (!Vi[e5.layer] || -1 === Vi[e5.layer].indexOf(e5.format)) throw new Error("Unsupported layer. Please change to PNG or use basic layer.");
                if (e5.bbox && e5.center) throw new Error("The bbox and center properties cannot be used together");
                if (!e5.bbox && !e5.center) throw new Error("Either bbox or center property must be provided");
                if (e5.bbox && (S(e5.width) || S(e5.height))) throw new Error("The bbox, width and height properties cannot be used together");
              })(e4), Ui(n2.resolve("staticMapImageEndpoint"), e4);
            }))(e3, t3);
          }
          const Ni = { key: { validators: [xe] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 } };
          function Bi(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("copyrightsV2Endpoint"));
            return mn(Ni, y, "copyrights", (function(e4, t4) {
              return e4.contentType = "text", r2(Ni, e4, t4).then(ht);
            }))(e3, t3);
          }
          const Wi = { key: { validators: [H] }, trackingId: { validators: [we], application: pt, defaultValue: yt.v4 } };
          function Gi(e3, t3) {
            const n2 = new tn(t3), r2 = pr(n2.resolve("captionV2Endpoint"));
            return mn(Wi, y, "copyrightsCaptionV2", (function(e4, t4) {
              return r2(Wi, e4, t4).then(ht);
            }))(e3, t3);
          }
          function qi(e3, t3) {
            var n2 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var r2 = Object.getOwnPropertySymbols(e3);
              t3 && (r2 = r2.filter((function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              }))), n2.push.apply(n2, r2);
            }
            return n2;
          }
          function zi(e3) {
            for (var t3 = 1; t3 < arguments.length; t3++) {
              var n2 = null != arguments[t3] ? arguments[t3] : {};
              t3 % 2 ? qi(Object(n2), true).forEach((function(t4) {
                Hi(e3, t4, n2[t4]);
              })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : qi(Object(n2)).forEach((function(t4) {
                Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n2, t4));
              }));
            }
            return e3;
          }
          function Hi(e3, t3, n2) {
            return t3 in e3 ? Object.defineProperty(e3, t3, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t3] = n2, e3;
          }
          var Ki = { sdkInfo: { version: c()["sdk.version"] }, setProductInfo: (e3, t3) => {
            if (!e3) throw new Error("ProductId needs to be set");
            const n2 = t3 || 0 === t3 ? "/" + t3 : "";
            p().productInfo = e3 + n2;
          }, services: zi(zi(zi(zi(zi({}, t2), o), i), a), {}, { _endpoints: e2 }) };
        })(), r = r.default;
      })();
    }));
  }
});
export default require_services_min();
//# sourceMappingURL=@tomtom-international_web-sdk-services.js.map
