const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

module.exports.todoList = [
  // {
  //   id: 45,
  //   title: "물 2L 마시기",
  //   picUrl:
  //     "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc4ktCh%2Fbtr2UnsXLs1%2FMBvWvY2LxKU1QCnPxOycKK%2Fimg.jpg",
  // },

]