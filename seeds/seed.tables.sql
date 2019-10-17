BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Italian', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'gatto', 'cat', 2),
  (2, 1, 'cane', 'dog', 3),
  (3, 1, 'ucello', 'bird', 4),
  (4, 1, 'mucca', 'cow', 5),
  (5, 1, 'cavallo', 'horse', 6),
  (6, 1, 'colori', 'colors', 7),
  (7, 1, 'rosso', 'red', 8),
  (8, 1, 'giallo', 'yellow', 9),
  (9, 1, 'verde', 'green', 10),
  (10, 1, 'blu', 'blue', 11),
  (11, 1, 'viola', 'purple', 12),
  (12, 1, 'bianco', 'white', 13),
  (13, 1, 'nero', 'black', 14),
  (14, 1, 'pane', 'bread', 15),
  (15, 1, 'formaggio', 'cheese', 16),
  (16, 1, 'pollo', 'chicken', 17),
  (17, 1, 'pesce', 'fish', 18),
  (18, 1, 'frutta', 'fruit', 19),
  (19, 1, 'carne', 'meat', 20),
  (20, 1, 'insalata', 'salad', 21),
  (21, 1, 'mela', 'apple', 22),
  (22, 1, 'uva', 'grapes', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
