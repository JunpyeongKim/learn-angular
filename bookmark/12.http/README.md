12. $http 서비스를 이용한 서버 통신
==============================
- Ajax(Asynchronous JavaScript and XML) 처리를 위해 제공
- XMLHttpRequest 를 추상화 

# 12.1 $http 서비스
- 설정 객체 하나만 인자로 받는 함수
    - method
    - url
    - params : query string
    - data
    - headers
    - xsrfHeaderName : XSRF 토큰으로 사용될 HTTP 헤더 이름
    - xsrfCookieNem
    - transformRequest : 요청 데이터 변환 함수
    - transformResponse
    - cache
        - true --> $http 캐시가 GET 요청을 캐시 처리
    - timeout
    - withCredentials : XHR 객체에 Credential 플래그 설정 여부 
    - responseType
- promise 객체를 반환
    - success(), error()
- Response Object
    - data : HTTP body
    - status : HTTP status code
    - headers : HTTP header의 getter
        - ex) headers('헤더이름')
    - config
        - Request Config Object


# 12.2 단축 메서드 제공
- $http.get(url, configObject)
- $http.post(url, data, configObject)
- $http.put(url, data, configObject)
- $http.delete(url, configObject)
- $http.head(url, configObject)
- $http.jsonp(url, configObject)
