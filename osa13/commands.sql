CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT  NULL,
  likes INTEGER DEFAULT 0,
);

INSERT INTO blogs (author, url, title) VALUES (
  'Dan Abramov', 'https://example.com/abramov', 'Writing Resilient Components'
);

INSERT INTO blogs (author, url, title) VALUES (
  'Martin Fowler', 'https://example.com/fowler', 'Is High Quality Software Worth the Cost?'
);
