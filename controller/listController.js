const { v4: uuid } = require('uuid');

const { todoList } = require("../repository/todolist");
let listData = todoList;

const listController = {
  findAll: (req, res) => {
    res.status(200).send(listData);
  },

  findById: (req, res) => {

    const { uuid } = req.params;
    if (uuid) {
      const uuidFiltered = listData.find((el) => // 하나만 찾을 때는 find로. 찾은 요소를 리턴
        el.id === Number(uuid)
      )
      if(!uuidFiltered) return res.status(404).send();
      return res.status(200).send(uuidFiltered);
    }
  },

  create: (req, res) => {
    const list_uuid = uuid();
    const { title } = req.body;

    const newList = {
      "id": list_uuid,
      "title": title,
      "picUrl": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc4ktCh%2Fbtr2UnsXLs1%2FMBvWvY2LxKU1QCnPxOycKK%2Fimg.jpg",
    }

    todoList.unshift(newList);
    listData = todoList;  // 여기서 최신화를 안해줘서 move 요청이 'listData'를 몰랐음.
    
    res.status(201).json(todoList);
  },

  update: (req, res) => {
    console.log(req.body);

    const { uuid } = req.params;
    const bodyData = req.body;
    const index = todoList.findIndex((el) => String(el.id) === uuid);
    const updatedList = { ...todoList[index], ...bodyData };
    todoList.splice(index, 1, updatedList)

    return res.status(200).json(todoList);
  },

  deleteById: (req, res) => {
    
    const { id } = req.params;
    const index = todoList.findIndex((el) => String(el.id) === id);
    todoList.splice(index, 1);
    return res.status(200).json(todoList);
  },

  move: (req, res) => {
    
    const { id } = req.params;
    const { targetIndex } = req.body;

    // 이동시키려고 하는 요소를 찾아서 movedPost에 할당
    const movedPost = listData.find((el) => el.id === id);

    // 없으면 404
    if (!movedPost) return res.status(404).send();

    // 찾은 요소를 listData에서 제거
    listData.splice(listData.indexOf(movedPost), 1);

    // 넣고자 하는 위치에 postToMove 집어넣기
    listData.splice(targetIndex, 0, movedPost);
  
    return res.status(200).send(listData);
  },

  check: (req, res) => {

    const { id } = req.params;
    const finishedPost = listData.find((el) => el.id === id);

    if (!finishedPost) return res.status(404).send();

    listData.splice(listData.indexOf(finishedPost), 1);
    listData.push(finishedPost);

    return res.status(200).send(listData);
  }


};

module.exports = {
  listController,
};
