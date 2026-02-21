CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT  NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES (
  'M. Luukkainen', 'https://example.com/mluuk', 'Mergehelvetistä Itään'
);

INSERT INTO blogs (author, url, title) VALUES (
  'A. Hellas', 'https://example.com/hellas', 'Jotain jotain TKT jotain'
);
