15. Custom Directive
=====================

# 커스텀 디렉티브 구현
- products 배열에 들어있는 각 객체별로 <li> 가 들어있는 <ul> 을 생성하려고 한다

# jqLite 활용
- DOM 탐색
    - children()
    - eq(index)
    - find(tag)
    - next()
    - parent()
- Element 수정
    - addClass(name)
    - attr(name), attr(name, value)
    - css(name), css(name, value)
    - hasClass(name)
    - prop(name), prop(name, value)
    - removeAttr(name)
    - removeClass(name)
    - text(), text(value)
    - toggleClass(name)
    - val(), val(value)
- Element 생성 및 제거
    - angular.element(html)
    - after(elements)
    - append(elements)
    - clone()
    - prepend(elements)
    - remove()
    - replaceWith(elements)
    - wrap(elements)
- Event 처리
    - on(events, handler)
    - off(events, handler)
    - triggerHandler(event)
- 기타 jqLite 메서드
    - data(key, value), data(key)
    - removeData(key)
    - html()
    - ready(handler)
- jqList를 통한 AngularJS 기능 접근
    - controller(), controller(name)
    - injector()
    - isolatedScope()
    - scope()
    - inheritedData(key)

