
const authors = [
  ['Audre Lorde', 'Hunter College', '1934-02-18', 10, 'f', 2],
  ['James Baldwin', 'University of Toronto', '1924-08-02', 20, 'm', 1],
  ['Octavia Butler', 'California State University', '1947-06-22', 15, 'f', 5],
  ['Chimamanda Ngozi Adichie', 'Massachusetts Institute of Technology', '1977-09-15', 12, 'f', 8],
  ['Bell Hooks', 'Stanford University', '1952-09-25', 8, 'f', 2],
  ['Roxane Gay', 'Yale University', '1974-10-15', 18, 'f', 1],
  ['Junot Diaz', 'Massachusetts Institute of Technology', '1968-12-31', 14, 'm', 4],
  ['Angela Davis', 'University of California', '1944-01-26', 16, 'f', 3],
  ['N.K. Jemisin', 'University of Maryland, College Park', '1972-09-19', 13, 'non-binary', 1],
  ['Salman Rushdie', 'Emory University', '1947-06-19', 17, 'm', 5],
  ['Ocean Vuong', 'University of California', '1988-10-14', 11, 'non-binary', 4],
  ['Marlon James', 'Macalester College', '1970-11-24', 9, 'm', 11],
  ['Margaret Atwood', 'University of Toronto', '1939-11-18', 22, 'f', 10],
  ['Jun\'ichirō Tanizaki', 'California State University', '1986-07-24', 7, 'm', 13],
  ['Toni Morrison', 'Howard University', '1931-02-18', 21, 'f', 1]
];

// random list of books instead of papers :D
// also not sure what to put under conference - since we aren't using any queries to base it on that info I will just go with 'none' 
const papers = [
  ['Sister Outsider', 'none', '1984-06-02'],
  ['The Bluest Eye', 'none', '1970-11-01'],
  ['Beloved', 'none', '1987-09-02'],
  ['Between the World and Me', 'none', '2015-07-14'],
  ['Their Eyes Were Watching God', 'none', '1937-09-18'],
  ['The Color Purple', 'none', '1982-02-25'],
  ['The Souls of Black Folk', 'none', '1903-04-27'],
  ['I Know Why the Caged Bird Sings', 'none', '1969-04-21'],
  ['Invisible Man', 'none', '1952-04-14'],
  ['Kindred', 'none', '1979-06-25'],
  ['Go Tell It on the Mountain', 'none', '1953-10-29'],
  ['The Hate U Give', 'none', '2017-02-28'],
  ['Homegoing', 'none', '2016-06-07'],
  ['Americanah', 'none', '2013-05-14'],
  ['The Underground Railroad', 'none', '2016-08-02'],
  ['The Warmth of Other Suns', 'none', '2010-09-07'],
  ['Queenie', 'none', '2019-03-19'],
  ['Salvage the Bones', 'none', '2011-09-08'],
  ['An American Marriage', 'none', '2018-02-06'],
  ['Giovannis Room', 'none', '1956-03-13'],
  ['The Nickel Boys', 'none', '2019-07-16'],
  ['How We Fight for Our Lives', 'none', '2019-10-08'],
  ['The Fire Next Time', 'none', '1963-11-19'],
  ['Barracoon', 'none', '2018-05-08'],
  ['Sing, Unburied, Sing', 'none', '2017-09-05'],
  ['Such a Fun Age', 'none', '2019-12-31'],
  ['The Water Dancer', 'none', '2019-09-24'],
  ['Red at the Bone', 'none', '2019-09-17'],
  ['Black Leopard, Red Wolf', 'none', '2019-02-05'],
  ['The Mothers', 'none', '2016-10-11'],
  ['A Brief History of Seven Killings', 'none', '2014-10-02']
];

const authorPapers = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
  [6, 6],
  [7, 7],
  [8, 8],
  [9, 9],
  [10, 10],
  [11, 11],
  [12, 12],
  [13, 13],
  [14, 14],
  [15, 15],
  [2, 16],
  [4, 17],
  [8, 18],
  [1, 19],
  [3, 20],
  [7, 21],
  [9, 22],
  [10, 23],
  [11, 24],
  [5, 25],
  [6, 26],
  [2, 27],
  [3, 28],
  [5, 29],
  [7, 30] 
]

module.exports = {
  authors,
  papers,
  authorPapers
};