4. HTML and Bootstrap CSS Primer
=================================

# 4.1 HTML 이해
- HTML 문서의 기본 구조를 정의하는 핵심 엘리먼트
    - DOCTYPE
        - <!DOCTYPE html> : HTML5 문서임을 알려준다
        - (*) HTML4
            - <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3c.org/TR/html4/strict.dtc">
    - html
    - head
    - body
- DOM
    - 자바스크립트 객체를 사용해 문서 내 각 엘리먼트를 나타내는 모델


# 4.2 Bootstrap 이해
- (*) jQuery 를 기반으로 개발
- bootstrap01.html
    - Button
    - class
        - panel : 둥근 모서리를 적용한 패널. 헤더/푸터를 가질 수 있다 
        - well : indentation, 엘리먼트를 그룹으로 지정
        - panel-heading : 패널의 제목 
        - btn : 버튼
        - btn-block : 가로 공간을 모두 채우게끔 한다 
    - h1~h6 : class를 사용할 필요없이, 자동으로 스타일이 적용된다
    - context class는 기본 class와 함께 적용해야 한다
        - ex) class="btn btn-primary" <-- btn-primary 가 context class
    - 크기 변경 : btn-lg/sm
- bootstrap02.html
    - Table
    - class
        - table
            - table-striped
            - table-border
            - table-hover
        - success
        - danger
    - 주의할 점 : <thead> 가 없다면 헤더행이 브라우저가 자동으로 생성하는 <tbody>에 추가된다
- bootstrap03.html
    - Form
    - class
        - form-group
        - form-control
        - radio
        - checkbox
- bootstrap04.htmlj
    - Grid Layout
    - class
        - row, grid-row
        - col-xs-* : 칼럼 갯수를 지정해 각 자식 엘리먼트가 차지할 칼럼 개수를 정할수 있다
    - <style>
        - Bootstrap에서는 행 안에 있는 엘리먼트에 아무 스타일도 적용하지 않는다 --> 그래서, Custom CSS 스타일을 생성했다
            - ex) "#gridContainer, .grid-row > div"
- bootstrap05.html
    - Responsive Grid
    - <meta>
        - 모바일 브라우저에게 컨텐츠를 실제 크기로 표시하도록 지시한다 
    - class
        - col-sm-* : 화면 크기가 768 픽셀보다 크면 그리드 셀이 가로로 표시 
        - col-md-* : 화면 크기가 940 픽셀보다 크면 그리드 셀이 가로로 표시
        - col-lg-* : 화면 크기가 1170 픽셀보다 크면 그리드 셀이 가로로 표시
