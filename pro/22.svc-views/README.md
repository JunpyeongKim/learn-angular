22. Services for Views
=======================
- URL routing
    - 뷰를 사용해 애플리케이션 내에서 복잡한 내비게이션을 구현하는 기법

# 22.1 뷰 서비스는 언제, 왜 사용하나
- 여러 컴포넌트에서 사용자가 보는 컨텐츠를 제어
- 작거나 간단한 애플리케이션에서는 굳이 필요 없다

# 22.2 예제 프로젝트 준비
- 21장 예제 이용
    - (*) Ajax 를 관리하는 초점을 맞춰서 다소 지저분한 편법 사용했다
- 문제 파악
    - 뷰 파일(tabView.html, editorView.html) 내용의 가시성 관리하는 방법
        - ng-show Directive 를 사용해 엘리먼트의 가시성을 제어
    - 애플리케이션의 레이아웃을 수정해야하는 컴포넌트에서 항상 컨트롤러 스코프에 정의된 displayMode 변수에 접근 가능해야 한다
        - ==> 컨틀로러로부터 뷰 선택 로직을 분리해야 한다
    
# 22.3 URL 라우팅 활용
- (*) AngularJS는 URL 라우팅 기능을 지원
- ngRoute 모듈 설치
    - angular-route.js
        - $route 서비스
    - product.html
- URL 라우트 정의
    - (*) URL 라우트 또는 라우트 : URL과 뷰 파일명 사이의 매핑
    - (*) $location.path() 가 반환하는 값은 매핑 중 하나와 일치
    - (*) 매핑은 $routeProvider 를 사용
    - products.js
        - Module.config()
            - $routeProvider
                - when()
                - otherwise()
                - (*) 항상 앞에 '/' 문자를 사용해야 한다 
                    - --> 미사용시 $location.path()의 반환값의 상대 경로로 URL이 해석되므로 "Not Found 에러" 발생
            - $locationProvider
                - (*) HTML5 URL 을 활성화하는데 사용
                    - <-- 사용할 브라우저에서 HTML5 히스토리 API를 지원하
                - html5Mode()
- 선택 뷰 표시
    - (*) $location 서비스에서 반환한 현재 URL 경로와 일치하는 라우트에서 지정한 뷰 파일의 내용을 <ng-view> 에 표시
- 코드 및 마크업 연결
    - products.js
        - $location.path()

# 22.4 라우트 파라미터 활용
- (*) Segment
    - 두 '/' 문자 사이에 있는 문자들
    - ex) http://localhost:5000/users/adam/details --> users, adam, details
- (*) Route Parameter 2가지
    - Conservative
        - 한 개의 segment 와 일치
    - Eager
        - 가능한 한 많은 segment 와 일치
    - (*) $routeParams 서비를 통해 접근 가능
- 라우트 및 라우트 파라미터 접근
    - tableView.html
        - <button> --> <a href="/edit/{{item.id}}">
    - products.js
        - $route
        - $routeParams
        - $on('$routeChangeSuccess', ...)
    - 라우트 변화에 반응
        - $route 서비스 메서드 / 속성
            - current
            - reload()
            - routes
        - $route 서비스 이벤트
            - $routeChangeStart
            - $routeChangeSuccess
            - $routeUpdate
            - $routeChangeError
    - 라우트 파라미터 가져오기
        - $routeParams

# 22.5 라우트 설정
- (*) 설정 옵션
    - controller
    - controllerAs
    - template
    - templateUrl
    - resolve
    - redirectTo
    - reloadOnSearch
    - caseInsensitiveMatch
- 라우트와 연계한 컨트롤러 활용
    - (*) Module.controller() 를 통해 등록한 컨트롤러를 지정 가능
        - 각 뷰 별로 고유 컨트롤러 로직을 사용하도록
    - products.js
        - (*) defaultCtrl 에서 editorView.html 뷰를 지원하기 위한 코드만 이동
        - editCtrl
            - editorView.html 이 보일 때마다 매번 생성된다 
        - 표준 상속 규칙에 따라 defaultCtrl 의 스코프에 정의된 데이터 및 동작에 접근 가능
- 라우트에 의존성 추가
    - (*) 라우트에서 의존성이 리졸브되기 전까지 컨트롤러를 인스턴스화하지 않는다
    - products.js
        - factory(productResource)
        - resolve --> data : productResource.query()
        - controller(tableCtrl)
        - $scope.listProducts() 제거
    - tableView.html
        - data.products
        - refreshProducts() --> $route.reload()
        
        