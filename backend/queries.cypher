// Create relation
MATCH 
  (a:User),
  (b:User) 
WHERE id(a) = 3 AND id(b) = 0 
CREATE (a)-[r:EXPENSE {aboutTransaction: 'paliwko', timestamp: '15 March 2021 at 23:38:37 UTC+1', value: '15'}]->(b) 
RETURN (r)

// Get all entities with certain relations
MATCH (a:User)<-[r:EXPENSE]-(b:User) WHERE id(a) = 0 RETURN r, b

MATCH
  (a:User),
  (b:User)
WHERE a.name = 'A' AND b.name = 'B'
CREATE (a)-[r:RELTYPE]->(b)
RETURN type(r)


////////
// Create DB
////////

CREATE (bob:User {name:'Robert Szczechura', email: 'r.szczechura.01@gmailcom'})
CREATE (pjot:User {name:'Piotr Ostrowski', email: 'pitercpo@gmail.com'})
CREATE (pawel:User {name:'Paweł Grzelak', email: 'pawelgrzelak106@gmail.com', photo: 'https://lh3.googleusercontent.com/a-/AOh14GjmmtGQnozx-jqzyCBozW4dkmZJ_J2gi6A1CUC0Kg=s96-c'})
CREATE (mazur:User {name:'Kacper Mazurek', email: 'mazurekk.off@gmail.com'})
CREATE (adi:User {name:'Adrian Szczechura', email: 'a.szczechura.98@gmail.com'})
RETURN bob, pjot, pawel, mazur, adi

////////
// Match
////////

MATCH 
  (bob:User),
  (pjot:User),
  (pawel:User),
  (mazur:User),
  (adi:User)
WHERE id(bob) = 0 AND id(pjot) = 1 AND id(pawel) = 2 AND id(mazur) = 3 AND id(adi) = 4
CREATE
  (bob)-[:EXPENSE {value:8, details: 'Kraft parapetówa', timestamp: '20/03/2021'}]->(adi),
  (bob)-[:EXPENSE {value:17.60, details: 'Mc donalds', timestamp: '21/03/2021'}]->(adi)
RETURN bob, pjot, pawel, mazur, adi

////////
// Get 
////////

////////
// Bob
////////

MATCH 
  (bob:User),
  (pjot:User),
  (pawel:User),
  (mazur:User),
  (adi:User)
WHERE id(bob) = 0 AND id(pjot) = 1 AND id(pawel) = 2 AND id(mazur) = 3 AND id(adi) = 4
CREATE
  (bob)-[:EXPENSE {value:8.0, details: 'Kraft parapetówa', timestamp: '20/03/2021'}]->(adi),
  (bob)-[:EXPENSE {value:17.60, details: 'Mc donalds', timestamp: '21/03/2021'}]->(adi)
RETURN bob, pjot, pawel, mazur, adi

////////
// Paweł
////////

MATCH 
  (bob:User),
  (pjot:User),
  (pawel:User),
  (mazur:User),
  (adi:User)
WHERE id(bob) = 0 AND id(pjot) = 1 AND id(pawel) = 2 AND id(mazur) = 3 AND id(adi) = 4
CREATE
  (adi)-[:EXPENSE {value: -5.0, timestamp: '21/03/2021', details: 'Prega 150'}]->(pawel),
  (pawel)-[:EXPENSE {value: 15.0, timestamp: '21/03/2021', details: 'Mc donalds'}]->(adi),
  (pawel)-[:EXPENSE {value: 12.5, timestamp: '17/03/2021', details: 'Backwoods'}]->(adi),
  (pawel)-[:EXPENSE {value: 325.0, timestamp: '15/03/2021', details: 'White runTz'}]->(adi),
  (adi)-[:EXPENSE {value: -30.0, timestamp: '15/03/2021', details: 'pregabelina 7szt'}]->(pawel),
  (pawel)-[:EXPENSE {value: 34.3, timestamp: '13/03/2021', details: 'Cali'}]->(adi),
  (pawel)-[:EXPENSE {value: 11.3.0, timestamp: '13/03/2021', details: 'Subway'}]->(adi),
  (pawel)-[:EXPENSE {value: 30.0, timestamp: '12/03/2021', details: 'Cali 0.35'}]->(adi),
  (pawel)-[:EXPENSE {value: 20.0, timestamp: '12/03/2021', details: 'Zabawka dla kota'}]->(adi),
  (pawel)-[:EXPENSE {value: 5.0, timestamp: '06/03/2021', details: 'Burger king parapetówa'}]->(adi),
  (adi)-[:EXPENSE {value: -28.0, timestamp: '21/02/2021', details: 'Max burgers'}]->(pawel),
  (adi)-[:EXPENSE {value: -150.0, timestamp: '19/02/2021', details: 'Cali 🔥'}]->(pawel),
  (pawel)-[:EXPENSE {value: 15.0, timestamp: '09/01/2021', details: 'Piwko Ancient Connection'}]->(adi),
  (adi)-[:EXPENSE {value: -110.0, timestamp: '05/01/2021', details: 'Dziadu'}]->(pawel),
  (adi)-[:EXPENSE {value: -10.0, timestamp: '22/12/2020', details: 'za paliwo an oglądanie gwiazdy xd'}]->(pawel),
  (pawel)-[:EXPENSE {value: 10.0, timestamp: '20/12/2020' }]->(adi),
  (adi)-[:EXPENSE {value: -10.0, timestamp: '02/11/2020'}]->(pawel),
  (pawel)-[:EXPENSE {value: 120.0, timestamp: '02/11/2020', details: 'za zipa okropnego'}]->(adi),
  (adi)-[:EXPENSE {value: -56.0, timestamp: '25/10/2020'}]->(pawel)

RETURN bob, pjot, pawel, mazur, adi

////////
// Mazur
////////

MATCH 
  (bob:User),
  (pjot:User),
  (pawel:User),
  (mazur:User),
  (adi:User)
WHERE id(bob) = 0 AND id(pjot) = 1 AND id(pawel) = 2 AND id(mazur) = 3 AND id(adi) = 4
CREATE
  (mazur)-[:EXPENSE {value: 325.0, timestamp: '24/03/2021', details: 'Cali 📦 whiteRuntz'}]->(adi),
  (mazur)-[:EXPENSE {value: 42.0, timestamp: '20/03/2021', details: 'Lont cali'}]->(adi),
  (mazur)-[:EXPENSE {value: 56.0, timestamp: '19/03/2021', details: 'Cali 📦 whiteRuntz backwod'}]->(adi),
  (mazur)-[:EXPENSE {value: 12.5, timestamp: '17/03/2021', details: 'Backwoods'}]->(adi),
  (adi)-[:EXPENSE {value: -15.0, timestamp: '15/03/2021', details: 'paliwko'}]->(mazur),
  (adi)-[:EXPENSE {value: -60.0, timestamp: '12/03/2021', details: 'Cali limelatti 0.35'}]->(mazur),
  (mazur)-[:EXPENSE {value: 10.0, timestamp: '13/02/2021', details: 'Thioco'}]->(adi),
  (adi)-[:EXPENSE {value: -75.0, timestamp: '04/02/2021', details: 'Przelew expresowy'}]->(mazur),
  (mazur)-[:EXPENSE {value: 18.0, timestamp: '30/01/2021', details: '2x tramoll'}]->(adi),
  (adi)-[:EXPENSE {value: -4.5.0, timestamp: '20/01/2021', details: 'Piwo żywiec biały 0'}]->(mazur),
  (mazur)-[:EXPENSE {value: 22.5, timestamp: '13/01/2021', details: 'Wegańskie curry zakupy'}]->(adi),
  (mazur)-[:EXPENSE {value: 39.0, timestamp: '20/12/2020'}]->(adi),
  (mazur)-[:EXPENSE {value: 72.0, timestamp: '16/12/2020'}]->(adi),
  (adi)-[:EXPENSE {value: -70.0, timestamp: '24/11/2020'}]->(mazur),
  (adi)-[:EXPENSE {value: -251.0, timestamp: '04/11/2020'}]->(mazur),
  (mazur)-[:EXPENSE {value: 249.0, timestamp: '26/10/2020'}]->(adi)

RETURN bob, pjot, pawel, mazur, adi

////////
// Pjot
////////

MATCH 
  (bob:User),
  (pjot:User),
  (pawel:User),
  (mazur:User),
  (adi:User)
WHERE id(bob) = 0 AND id(pjot) = 1 AND id(pawel) = 2 AND id(mazur) = 3 AND id(adi) = 4
CREATE
  (pjot)-[:EXPENSE {value: 56.0, timestamp: '19/03/2021', details: 'Cali 📦 whiteRuntz backwood'}]->(adi),
  (pjot)-[:EXPENSE {value: 12.5, timestamp: '17/03/2021', details: 'Backwoods'}]->(adi),
  (pjot)-[:EXPENSE {value: 180.0, timestamp: '12/03/2021', details: 'return mbank'}]->(adi),
  (adi)-[:EXPENSE {value: -120.0, timestamp: '06/03/2021', details: 'Cali 📦📦 (sorki ale no przeprowadzka i wiesz... Na parapetowe postaram sie zeby był rs'}]->(pjot),
  (adi)-[:EXPENSE {value: -30.0, timestamp: '28/02/2021', details: 'hajsik'}]->(pjot),
  (adi)-[:EXPENSE {value: -30.0, timestamp: '20/02/2021'}]->(pjot),
  (adi)-[:EXPENSE {value: -20.0, timestamp: '20/02/2021'}]->(pjot),
  (pjot)-[:EXPENSE {value: 200.0, timestamp: '01/02/2021', details: 'Częsciowy zwrot niedzielnej pozyczki mbak'}]->(adi),
  (adi)-[:EXPENSE {value: -300.0, timestamp: '31/01/2021', details: 'Niedzielna pożyczka mbąk'}]->(pjot),
  (pjot)-[:EXPENSE {value: 300.0, timestamp: '11/01/2021', details: 'Przelew Mbąk'}]->(adi),
  (pjot)-[:EXPENSE {value: 80.0, timestamp: '07/01/2021', details: 'Moda'}]->(adi),
  (adi)-[:EXPENSE {value: -100.0, timestamp: '05/01/2021', details: 'przelew na dziada'}]->(pjot),
  (adi)-[:EXPENSE {value: -5.0, timestamp: '04/01/2021', details: 'Zakupy w biedrze na burito'}]->(pjot),
  (adi)-[:EXPENSE {value: -50.0, timestamp: '04/01/2021', details: 'Sizzurp'}]->(pjot),
  (adi)-[:EXPENSE {value: -7.0, timestamp: '31/12/2020', details: '2 piwa w żabce zwoleńska'}]->(pjot),
  (adi)-[:EXPENSE {value: -4.0, timestamp: '30/12/2020', details: 'Piwo grodziskie mango ale'}]->(pjot),
  (pjot)-[:EXPENSE {value: 16.0, timestamp: '30/12/2020', details: 'Zakupy w lidlu na szamke'}]->(adi),
  (adi)-[:EXPENSE {value: -250.0, timestamp: '30/12/2020', details: 'Zany'}]->(pjot),
  (adi)-[:EXPENSE {value: -13.0, timestamp: '30/12/2020', details: 'Mc donalds'}]->(pjot),
  (adi)-[:EXPENSE {value: -24.0, timestamp: '25/12/2020', details: 'piwko + limbus'}]->(pjot),
  (adi)-[:EXPENSE {value: -23.0, timestamp: '25/12/2020', details: 'Drank in my cup'}]->(pjot),
  (pjot)-[:EXPENSE {value: 28.0, timestamp: '23/12/2020', details: 'Spłata zaległego siana za rzeczy z Irlandii'}]->(adi),
  (pjot)-[:EXPENSE {value: 300.0, timestamp: '20/12/2020'}]->(adi),
  (adi)-[:EXPENSE {value: -328.0, timestamp: '18/12/2020'}]->(pjot),
  (pjot)-[:EXPENSE {value: 30.0, timestamp: '16/12/2020'}]->(adi),
  (adi)-[:EXPENSE {value: -30.0, timestamp: '24/11/2020'}]->(pjot),
  (adi)-[:EXPENSE {value: -260.0, timestamp: '28/10/2020'}]->(pjot),
  (pjot)-[:EXPENSE {value: 20.0, timestamp: '25/10/2020'}]->(adi),
  (adi)-[:EXPENSE {value: -20.0, timestamp: '25/10/2020'}]->(pjot),
  (pjot)-[:EXPENSE {value: 260.0, timestamp: '25/10/2020'}]->(adi)

RETURN bob, pjot, pawel, mazur, adi



MATCH 
  (bob:User),
  (pjot:User),
  (pawel:User),
  (mazur:User),
  (adi:User)
WHERE id(bob) = 0 AND id(pjot) = 1 AND id(pawel) = 2 AND id(mazur) = 3 AND id(adi) = 4
CREATE
  (bob)-[:OWES]->(e1:Expense {value:8.0,  timestamp: '20/03/2021', details: 'Kraft parapetówa'})-[:IS_OWED]->(adi),
  (bob)-[:OWES]->(e2:Expense {value:17.60, timestamp: '21/03/2021', details: 'Mc donalds'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e3:Expense {value: -5.0, timestamp: '21/03/2021', details: 'Prega 150'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e4:Expense {value: 15.0, timestamp: '21/03/2021', details: 'Mc donalds'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e5:Expense {value: 12.5, timestamp: '17/03/2021', details: 'Backwoods'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e6:Expense {value: 325.0, timestamp: '15/03/2021', details: 'White runTz'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e7:Expense {value: -30.0, timestamp: '15/03/2021', details: 'pregabelina 7szt'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e8:Expense {value: 34.3, timestamp: '13/03/2021', details: 'Cali'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e9:Expense {value: 11.3, timestamp: '13/03/2021', details: 'Subway'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e10:Expense {value: 30.0, timestamp: '12/03/2021', details: 'Cali 0.35'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e11:Expense {value: 20.0, timestamp: '12/03/2021', details: 'Zabawka dla kota'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e12:Expense {value: 5.0, timestamp: '06/03/2021', details: 'Burger king parapetówa'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e13:Expense {value: -28.0, timestamp: '21/02/2021', details: 'Max burgers'})-[:IS_OWED]->(pawel),
  (adi)-[:OWES]->(e14:Expense {value: -150.0, timestamp: '19/02/2021', details: 'Cali 🔥'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e15:Expense {value: 15.0, timestamp: '09/01/2021', details: 'Piwko Ancient Connection'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e16:Expense {value: -110.0, timestamp: '05/01/2021', details: 'Dziadu'})-[:IS_OWED]->(pawel),
  (adi)-[:OWES]->(e17:Expense {value: -10.0, timestamp: '22/12/2020', details: 'za paliwo an oglądanie gwiazdy xd'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e18:Expense {value: 10.0, timestamp: '20/12/2020' })-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e19:Expense {value: -10.0, timestamp: '02/11/2020'})-[:IS_OWED]->(pawel),
  (adi)-[:OWES]->(e20:Expense {value: -56.0, timestamp: '25/10/2020'})-[:IS_OWED]->(pawel),
  (mazur)-[:OWES]->(e21:Expense {value: 39.0, timestamp: '20/12/2020'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e22:Expense {value: 72.0, timestamp: '16/12/2020'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e23:Expense {value: -70.0, timestamp: '24/11/2020'})-[:IS_OWED]->(mazur),
  (adi)-[:OWES]->(e24:Expense {value: -251.0, timestamp: '04/11/2020'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e25:Expense {value: 249.0, timestamp: '26/10/2020'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e26:Expense {value: -30.0, timestamp: '20/02/2021'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e27:Expense {value: -20.0, timestamp: '20/02/2021'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e28:Expense {value: 300.0, timestamp: '20/12/2020'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e29:Expense {value: -328.0, timestamp: '18/12/2020'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e30:Expense {value: 30.0, timestamp: '16/12/2020'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e31:Expense {value: -30.0, timestamp: '24/11/2020'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e32:Expense {value: -260.0, timestamp: '28/10/2020'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e33:Expense {value: 20.0, timestamp: '25/10/2020'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e34:Expense {value: -20.0, timestamp: '25/10/2020'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e35:Expense {value: 260.0, timestamp: '25/10/2020'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e36:Expense {value: 120.0, timestamp: '02/11/2020', details: 'za zipa okropnego'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e37:Expense {value: 325.0, timestamp: '24/03/2021', details: 'Cali 📦 whiteRuntz'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e38:Expense {value: 42.0, timestamp: '20/03/2021', details: 'Lont cali'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e39:Expense {value: 12.5, timestamp: '17/03/2021', details: 'Backwoods'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e40:Expense {value: -15.0, timestamp: '15/03/2021', details: 'paliwko'})-[:IS_OWED]->(mazur),
  (adi)-[:OWES]->(e41:Expense {value: -60.0, timestamp: '12/03/2021', details: 'Cali limelatti 0.35'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e42:Expense {value: 10.0, timestamp: '13/02/2021', details: 'Thioco'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e43:Expense {value: -75.0, timestamp: '04/02/2021', details: 'Przelew expresowy'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e44:Expense {value: 18.0, timestamp: '30/01/2021', details: '2x tramoll'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e45:Expense {value: -4.5, timestamp: '20/01/2021', details: 'Piwo żywiec biały 0'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e46:Expense {value: 22.5, timestamp: '13/01/2021', details: 'Wegańskie curry zakupy'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e47:Expense {value: 56.0, timestamp: '19/03/2021', details: 'Cali 📦 whiteRuntz backwood'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e48:Expense {value: 12.5, timestamp: '17/03/2021', details: 'Backwoods'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e49:Expense {value: 180.0, timestamp: '12/03/2021', details: 'return mbank'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e50:Expense {value: -120.0, timestamp: '06/03/2021', details: 'Cali 📦📦 (sorki ale no przeprowadzka i wiesz... Na parapetowe postaram sie zeby był rs'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e51:Expense {value: -30.0, timestamp: '28/02/2021', details: 'hajsik'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e52:Expense {value: 200.0, timestamp: '01/02/2021', details: 'Częsciowy zwrot niedzielnej pozyczki mbak'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e53:Expense {value: -300.0, timestamp: '31/01/2021', details: 'Niedzielna pożyczka mbąk'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e54:Expense {value: 300.0, timestamp: '11/01/2021', details: 'Przelew Mbąk'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e55:Expense {value: 80.0, timestamp: '07/01/2021', details: 'Moda'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e56:Expense {value: -100.0, timestamp: '05/01/2021', details: 'przelew na dziada'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e57:Expense {value: -5.0, timestamp: '04/01/2021', details: 'Zakupy w biedrze na burito'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e58:Expense {value: -50.0, timestamp: '04/01/2021', details: 'Sizzurp'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e59:Expense {value: -7.0, timestamp: '31/12/2020', details: '2 piwa w żabce zwoleńska'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e60:Expense {value: -4.0, timestamp: '30/12/2020', details: 'Piwo grodziskie mango ale'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e61:Expense {value: 16.0, timestamp: '30/12/2020', details: 'Zakupy w lidlu na szamke'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e62:Expense {value: -250.0, timestamp: '30/12/2020', details: 'Zany'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e63:Expense {value: -13.0, timestamp: '30/12/2020', details: 'Mc donalds'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e64:Expense {value: -24.0, timestamp: '25/12/2020', details: 'piwko + limbus'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e65:Expense {value: -23.0, timestamp: '25/12/2020', details: 'Drank in my cup'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e66:Expense {value: 28.0, timestamp: '23/12/2020', details: 'Spłata zaległego siana za rzeczy z Irlandii'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e67:Expense {value: 56.0, timestamp: '19/03/2021', details: 'Cali 📦 whiteRuntz backwod'})-[:IS_OWED]->(adi)

RETURN bob, pjot, pawel, mazur, adi