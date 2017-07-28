9. 필터를 사용하고 만들어 보자
========================
- Formatting & Filtering 에 사용

# 9.1 AngularJS에서 제공하는 필터
- (*) 템플릿에서는 '|' 와 함께 사용
    - Formatting
        - filter01.html
        - currency 
        - date
        - json : 객체 --> json 문자열로 변환
        - lowercase
        - number : 세자리 숫자마다 ',' & 소수점 자리 표현
        - uppercase
    - Filtering
        - filter02.html
        - filter : 주어진 조건에 따라 배열의 부분집합을 반환
        - limitTo : 주어진 인덱스까지만
        - orderBy
- (*) controller, service, directive 에서는 $filter 서비스를 이용
    - filter03.html

# 9.2 필터를 만들어 보자
- filter04.html
- $filterProvider.register() 를 이용하여 정의 
- Module.config()
- (*) string
    - chatAt(index)
    - toUpperCase()
    - slice(start, end) : start ~ end-1
        - (*) array.slice(start, end)
