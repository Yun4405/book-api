const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "인터넷프로그래밍", author: "윤OO" },
  { id: 2, title: "자바스크립트 기초", author: "윤찬O" }
];

// 도서 목록 조회
app.get('/books', (req, res) => {
  res.json(books);
});

// 도서 추가
app.post('/books', (req, res) => {
  const book = req.body;
  book.id = books.length + 1;
  books.push(book);
  res.status(201).json(book);
});

// 도서 정보 수정
app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).send('도서를 찾을 수 없습니다.');
  }
  books[bookIndex] = { id, ...req.body };
  res.json(books[bookIndex]);
});

// 도서 삭제
app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  books = books.filter(b => b.id !== id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
