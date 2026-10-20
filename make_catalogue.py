import json
from pathlib import Path
rows=[
(2,'ABC & Numbers Learning Adventure','Early Learning','3–6','Trace, count, match, and color. Explore A–Z and numbers 1–10 with friendly pictures and space to practice.'),
(3,'Build Your Own Fantasy World','Creative Activities','8–12','Invent creatures, plan maps, and connect imaginative habitats in a guided drawing and story-making workbook.'),
(4,'Little Detective Academy','Puzzles & Brain Games','6–10','Join Zara, Ollie, and Pip for 24 friendly mysteries with picture clues, codes, maps, and logic.'),
(5,'Little Brain Builders','Puzzles & Brain Games','4–8','Look, think, and play with 44 puzzles, including mazes, differences, shadows, and patterns.'),
(6,'ABC, Numbers and First Words','Early Learning','3–6','A little learning book for tracing letters, discovering first words, counting, and matching.'),
(7,'Little Brain Builders: Mystery Adventures','Puzzles & Brain Games','4–8','Follow Nia, Olli, and Bea through cheerful places. Find pictures, crack codes, and save clues for a final mystery.'),
(8,'Reading Adventure Missions','Reading & Stories','6–9','Read short stories, find clues, and deliver a little wonder through comprehension games.','Title-page preview'),
(9,'100 Days of Brain Challenges','Puzzles & Brain Games','7–12','Explore ten puzzle planets through logic, numbers, word games, mazes, codes, and observation. A day is a session, not a deadline.'),
(10,'The Little Animal Kingdom','Coloring Books','3–7','Meet animal friends in 40 coloring adventures through gardens, cozy kitchens, woodland trails, and picnic days.'),
(11,'The Magical Ocean','Color by Number','3–7','Bring 40 underwater adventures to life with dolphins, turtles, reef fish, and simple numbered color guides.'),
(12,'Amazing Wheels','Color by Number','3–8','Discover 40 vehicle adventures with cars, trucks, trains, and easy numbered color guides.'),
(13,'Dino World','Color by Number','4–8','Color 40 friendly dinosaur adventures with bold lines and easy numbered color guides.'),
(14,'Little Astronauts','Coloring Books','4–8','Explore 40 out-of-this-world coloring adventures with cheerful astronauts and space discoveries.'),
(15,'Rainbow Kingdom','Color by Number','4–8','Meet unicorns, dragons, and flower fairies in 40 magical scenes with numbered color keys.'),
(16,'Fantasy Adventure Worlds','Coloring Books','6–10','Wander through enchanted gardens, hidden tree villages, and friendly dragon worlds in 40 coloring scenes.'),
(17,'Block Builders','Color by Number','7–13','Join an explorer, a builder, and a cube robot in 40 original geometric adventures with numbered color guides.'),
(18,'Kitecrag Quests','Coloring Books','7–13','Discover floating islands, crystal caves, dragons, and curious machines in 40 original gaming-inspired coloring scenes.'),
(19,'Sky Island Riders','Comics & Adventures',None,'The islands are sinking and the wind bells are still. Mira, Sami, Ember, and Pip must follow hidden air paths to save their home.'),
(20,'The Door Beneath the School','Comics & Adventures',None,'A glowing door leads Lina, Ben, and Jo to a kingdom of lost things. A colorful adventure about listening, helping, and belonging.'),
(21,'The Last Mapmaker','Comics & Adventures',None,'Nilo draws paths that become real. When a new road sends the river away, he and Fold, a tiny paper dragon, must find a way to bring it home.'),
(22,'The Smallest Knight of Briarwood','Comics & Adventures',None,'A stopped stream puts the Lantern Picnic in trouble. Pip, Brum, and Moss set off on an adventure with room for kindness.'),
(23,'The Meadow Train Math Picnic','Math Workbooks','4–6','All aboard! Join Nibo, Delpi, and Bunvo for playful counting, shapes, patterns, and early math across six railway stops.'),
(24,'Math Adventure Quest','Math Workbooks','5–8','Help repair the Foldlight Map through numbers, addition, subtraction, patterns, shapes, measurement, and friendly challenges.'),
(25,'Math Mission: Ocean City','Math Workbooks','7–10','Help an underwater city prepare for its Festival of Lights through 104 math missions, worked examples, and three readiness levels.')]
books=[]
for r in rows:
 n,title,cat,age,desc,*note=r
 books.append(dict(id=n,title=title,category=cat,ages=age,description=desc,price=None,currency='IQD',image=f'assets/book-{n:02}.webp',previewNote=note[0] if note else None))
Path('dist/catalogue.json').write_text(json.dumps(books,ensure_ascii=False,indent=2))
