(function() {
    var utils = {};
    //获取元素的点击位置
    utils.getPosOfEvent = function(ev) {
        if (this.hasTouch) {
            var posi = [];
            var src = null;

            for (var t = 0, len = ev.touches.length; t < len; t++) {
                src = ev.touches[t];
                posi.push({
                    x: src.pageX,
                    y: src.pageY
                });
            }
            return posi;
        } else {
            return [{
                x: ev.pageX,
                y: ev.pageY
            }];
        }
    }
    utils.hasTouch = ('ontouchstart' in window);
    utils.PCevts = {
        'touchstart': 'mousedown',
        'touchmove': 'mousemove',
        'touchend': 'mouseup',
        'touchcancel': 'mouseout'
    };
    utils.getPCevts = function(evt) {
        return this.PCevts[evt] || evt;
    };
    utils.getType = function(obj) {
        return Object.prototype.toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    };
    //获取点击的手指数量
    utils.getFingers = function(ev) {
        return ev.touches ? ev.touches.length : 1;
    };
    utils.isTouchMove = function(ev) {
        return (ev.type === 'touchmove' || ev.type === 'mousemove');
    };
    //是否已经结束了手势
    utils.isTouchEnd = function(ev) {
        return (ev.type === 'touchend' || ev.type === 'mouseup' || ev.type === 'touchcancel');
    };
    //算2点之间的距离
    utils.getDistance = function(pos1, pos2) {
        var x = pos2.x - pos1.x,
            y = pos2.y - pos1.y;
        return Math.sqrt((x * x) + (y * y));
    };
    //算角度
    utils.getAngle = function(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    };
    //根据角度 返回up down left right
    utils.getDirectionFromAngle = function(agl) {
        var directions = {
            up: agl < -45 && agl > -135,
            down: agl >= 45 && agl < 135,
            left: agl >= 135 || agl <= -135,
            right: agl >= -45 && agl <= 45
        };
        for (var key in directions) {
            if (directions[key]) return key;
        }
        return null;
    };
    utils.reset = function() {
        startEvent = moveEvent = endEvent = null;
        __tapped = __touchStart = startSwiping = false;
        pos = {
            start: null,
            move: null,
            end: null
        };
    };

    //ua
    utils.env = (function() {
        var os = {},
            ua = navigator.userAgent,
            android = ua.match(/(Android)[\s\/]+([\d\.]+)/),
            ios = ua.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
            wp = ua.match(/(Windows\s+Phone)\s([\d\.]+)/),
            isWebkit = /WebKit\/[\d.]+/i.test(ua),
            isSafari = ios ? (navigator.standalone ? isWebkit : (/Safari/i.test(ua) && !/CriOS/i.test(ua) && !/MQQBrowser/i.test(ua))) : false;
        if (android) {
            os.android = true;
            os.version = android[2];
        }
        if (ios) {
            os.ios = true;
            os.version = ios[2].replace(/_/g, '.');
            os.ios7 = /^7/.test(os.version);
            if (ios[1] === 'iPad') {
                os.ipad = true;
            } else if (ios[1] === 'iPhone') {
                os.iphone = true;
                os.iphone5 = screen.height == 568;
            } else if (ios[1] === 'iPod') {
                os.ipod = true;
            }
        }
        if (isWebkit) {
            os.webkit = true;
        }
        if (isSafari) {
            os.safari = true;
        }
        return os;
    })();

    //已配置  tap hold swipe表示是否开启手势
    //tapTime tap事件延迟触发的时间
    //holdTime  hold事件多少秒后触发
    //tapMaxDistance 触发tap的时候 最小的移动范围
    //swipeMinDistance 触发swipe的时候 最小的移动范围
    //swipeTime  touchstart 到touchend之前的时间 如果小于swipeTime  才会触发swipe手势
    var config = {
        tap: true,
        tapMaxDistance: 10,
        hold: true,
        tapTime: 200,
        holdTime: 650,
        swipe: true,
        swipeTime: 300,
        swipeMinDistance: 18
    };
    var smrEventList = {
        TOUCH_START: 'touchstart',
        TOUCH_MOVE: 'touchmove',
        TOUCH_END: 'touchend',
        TOUCH_CANCEL: 'touchcancel',
        MOUSE_DOWN: 'mousedown',
        MOUSE_MOVE: 'mousemove',
        MOUSE_UP: 'mouseup',
        CLICK: 'click',
        PINCH_START: 'pinchstart',
        PINCH_END: 'pinchend',
        PINCH: 'pinch',
        PINCH_IN: 'pinchin',
        PINCH_OUT: 'pinchout',
        ROTATION_LEFT: 'rotateleft',
        ROTATION_RIGHT: 'rotateright',
        ROTATION: 'rotate',
        SWIPE_START: 'swipestart',
        SWIPING: 'swiping',
        SWIPE_END: 'swipeend',
        SWIPE_LEFT: 'swipeleft',
        SWIPE_RIGHT: 'swiperight',
        SWIPE_UP: 'swipeup',
        SWIPE_DOWN: 'swipedown',
        SWIPE: 'swipe',
        DRAG: 'drag',
        DRAGSTART: 'dragstart',
        DRAGEND: 'dragend',
        HOLD: 'hold',
        TAP: 'tap',
        DOUBLE_TAP: 'doubletap'
    };
    /** 手势识别 */
    //记录 开始 移动 结束时候的位置
    var pos = {
        start: null,
        move: null,
        end: null
    };
    var __touchStart = false;
    var __tapped;
    var __prev_tapped_end_time;
    var __prev_tapped_pos;
    var __holdTimer = null;
    var startTime = 0;
    var startEvent;
    var moveEvent;
    var endEvent;
    var startSwiping;


    var gestures = {
        swipe: function(ev) {
            var el = ev.target;

            if (!__touchStart || !pos.move || utils.getFingers(ev) > 1) {
                return;
            }

            //计算 时间  距离  角度
            var now = Date.now();
            var touchTime = now - startTime;
            var distance = utils.getDistance(pos.start[0], pos.move[0]);
            var angle = utils.getAngle(pos.start[0], pos.move[0]);
            var direction = utils.getDirectionFromAngle(angle);
            var touchSecond = touchTime / 1000;
            var eventObj = {
                type: smrEventList.SWIPE,
                originEvent: ev,
                direction: direction,
                distance: distance,
                distanceX: pos.move[0].x - pos.start[0].x,
                distanceY: pos.move[0].y - pos.start[0].y,
                x: pos.move[0].x - pos.start[0].x,
                y: pos.move[0].y - pos.start[0].y,
                angle: angle,
                duration: touchTime,
                fingersCount: utils.getFingers(ev)
            };
            if (config.swipe) {
                var swipeTo = function() {
                    var elt = smrEventList;
                    switch (direction) {
                        case 'up':
                            engine.trigger(el, elt.SWIPE_UP, eventObj);
                            break;
                        case 'down':
                            engine.trigger(el, elt.SWIPE_DOWN, eventObj);
                            break;
                        case 'left':
                            engine.trigger(el, elt.SWIPE_LEFT, eventObj);
                            break;
                        case 'right':
                            engine.trigger(el, elt.SWIPE_RIGHT, eventObj);
                            break;
                    }
                };
                if (!startSwiping) {
                    eventObj.fingerStatus = eventObj.swipe = 'start';
                    //大于tap的最小距离 才算进入swipe手势
                    if (distance > config.tapMaxDistance) {
                        startSwiping = true;
                    }
                } else if (utils.isTouchMove(ev)) {
                    eventObj.fingerStatus = eventObj.swipe = 'move';
                    engine.trigger(el, smrEventList.SWIPING, eventObj);
                } else if (utils.isTouchEnd(ev) || ev.type === 'mouseout') {

                    eventObj.fingerStatus = eventObj.swipe = 'end';
                    //事件要短  距离要有点远
                    if (config.swipeTime > touchTime && distance > config.swipeMinDistance) {

                        swipeTo();
                        engine.trigger(el, smrEventList.SWIPE, eventObj, false);
                    }
                }
            }
        },
        tap: function(ev) {
            var el = ev.target;
            //如果设置了tap为true  才会触发该手势
            if (config.tap) {
                var now = Date.now();
                var touchTime = now - startTime;
                var distance = utils.getDistance(pos.start[0], pos.move ? pos.move[0] : pos.start[0]);
                clearTimeout(__holdTimer);
                //如果移动的距离比设置的距离大(10)  就不算是tap    
                if (config.tapMaxDistance < distance) return;

                __tapped = true;
                __prev_tapped_end_time = now;
                __prev_tapped_pos = pos.start[0];
                __tapTimer = setTimeout(function() {
                        engine.trigger(el, smrEventList.TAP, {
                            type: smrEventList.TAP,
                            originEvent: ev
                        });
                    },
                    config.tapTime);
            }
        },
        hold: function(ev) {
            var el = ev.target;
            //如果设置了hold为true  才会触发该手势
            if (config.hold) {
                clearTimeout(__holdTimer);
                __holdTimer = setTimeout(function() {
                        if (!pos.start) return;
                        var distance = utils.getDistance(pos.start[0], pos.move ? pos.move[0] : pos.start[0]);
                        //如果移动的距离大于配置的距离(10)  就不触发hold
                        if (config.tapMaxDistance < distance) return;

                        if (!__tapped) {
                            engine.trigger(el, "hold", {
                                type: 'hold',
                                originEvent: ev,
                                fingersCount: utils.getFingers(ev),
                                position: pos.start[0]
                            });
                        }
                    },
                    config.holdTime);
            }
        }
    }

    /** 底层事件绑定/代理支持  */
    var engine = {
        proxyid: 0,
        proxies: [],
        trigger: function(el, evt, detail) {
            detail = detail || {};
            var e, opt = {
                bubbles: true,
                cancelable: true,
                detail: detail
            };
            try {
                //这里是触发 自定义事件
                if (typeof CustomEvent !== 'undefined') {
                    e = new CustomEvent(evt, opt);
                    if (el) {
                        el.dispatchEvent(e);
                    }
                } else {
                    e = document.createEvent("CustomEvent");
                    e.initCustomEvent(evt, true, true, detail);
                    if (el) {
                        el.dispatchEvent(e);
                    }
                }
            } catch (ex) {
                console.warn("Touch.js is not supported by environment.");
            }
        },
        bind: function(el, evt, handler) {
            el.listeners = el.listeners || {};
            //proxy才是真正元素绑定的事件
            var proxy = function(e) {
                //对ios7的一个兼容  也不知道是什么原理

                if (utils.env.ios7) {
                    utils.forceReflow();
                }

                e.originEvent = e;
                for (var p in e.detail) {
                    if (p !== 'type') {
                        e[p] = e.detail[p];
                    }
                }
                var returnValue = handler.call(e.target, e);
                if (typeof returnValue !== "undefined" && !returnValue) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            };

            if (!el.listeners[evt]) {
                el.listeners[evt] = [proxy];
            } else {
                el.listeners[evt].push(proxy);
            }

            handler.proxy = handler.proxy || {};
            if (!handler.proxy[evt]) {
                handler.proxy[evt] = [this.proxyid++];
            } else {
                handler.proxy[evt].push(this.proxyid++);
            }
            this.proxies.push(proxy);
            if (el.addEventListener) {
                el.addEventListener(evt, proxy, false);
            }
        },
        unbind: function(el, evt) {
            var handlers = el.listeners[evt];
            if (handlers && handlers.length) {
                handlers.forEach(function(handler) {
                    el.removeEventListener(evt, handler, false);
                });
            }
        }
    }

    var _on = function(el, evt, handler) {
        //绑定事件  支持多元素 多事件绑定噢
        var evts = evt.split(" ");
        var els = utils.getType(el) === 'string' ? document.querySelectorAll(el) : [el];

        evts.forEach(function(evt) {
            if (!utils.hasTouch) {
                evt = utils.getPCevts(evt);
            }
            for (var i = 0, len = els.length; i < len; i++) {
                engine.bind(els[i], evt, handler);
            }
        });
    };

    var _off = function(els, evts, handler) {
        //删除绑定事件  支持多元素 多事件删除绑定噢
        var els = utils.getType(els) === 'string' ? document.querySelectorAll(els) : els;
        els = els.length ? Array.prototype.slice.call(els) : [els];
        els.forEach(function(el) {
            evts = evts.split(" ");
            evts.forEach(function(evt) {
                if (!utils.hasTouch) {
                    evt = utils.getPCevts(evt);
                }
                engine.unbind(el, evt, handler);
            });
        });
        return;
    };

    //这个函数很重要
    // doucment的触屏事件全部在这个里面
    var handlerOriginEvent = function(ev) {
        var el = ev.target;

        switch (ev.type) {
            case 'mousedown':
            case 'touchstart':
                //记录下刚开始点击的事件和位置
                __touchStart = true;
                if (!pos.start || pos.start.length < 2) {
                    pos.start = utils.getPosOfEvent(ev);
                }
                startTime = Date.now();
                startEvent = ev;
                gestures.hold(ev);
                break;
            case 'touchmove':
            case 'mousemove':
                if (!__touchStart || !pos.start) return;
                //记录滑动过程中的位置
                pos.move = utils.getPosOfEvent(ev);
                gestures.swipe(ev);
                break;
            case 'touchend':
            case 'touchcancel':
            case 'mouseup':
            case 'moudeout':
                if (!__touchStart) return;
                endEvent = ev;
                //.......
                if (startSwiping) {
                    gestures.swipe(ev);
                } else {
                    gestures.tap(ev);
                }

                utils.reset();
                if (ev.touches && ev.touches.length === 1) {
                    __touchStart = false;
                }
                break;
        }
    }

    var init = function() {
        //给 document 绑定 下面这些事件
        var mouseEvents = 'mouseup mousedown mousemove',
            touchEvents = 'touchstart touchmove touchend touchcancel';
        var bindingEvents = utils.hasTouch ? touchEvents : mouseEvents;

        bindingEvents.split(" ").forEach(function(evt) {
            document.addEventListener(evt, handlerOriginEvent, false);
        });
    }
    init();
    window.touch = {
        on: _on,
        off: _off
    };
})();