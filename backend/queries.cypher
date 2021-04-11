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

CREATE (bob:User {name:'Robert Szczechura', email: 'r.szczechura.01@gmailcom', password: '$2b$10$8QDQlbTzUPbg3KmLMr/zPu/0n2XUTvA0pNgetvWXGTjEU6Z9F0Ob.', photo: "https://scontent-frt3-2.xx.fbcdn.net/v/t1.18169-9/390845_153756544731496_1265530199_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=cdbe9c&_nc_ohc=1_3grCcj-b4AX_oBdlq&_nc_ht=scontent-frt3-2.xx&oh=1dafdb0ceeda97ebb115fe24b720ada3&oe=6099C312",})
CREATE (pjot:User {name:'Piotr Ostrowski', email: 'pitercpo@gmail.com', password: '$2b$10$8QDQlbTzUPbg3KmLMr/zPu/0n2XUTvA0pNgetvWXGTjEU6Z9F0Ob.', photo: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/74666333_2566701070064059_9103208283660877824_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=gbcG-2sCh1EAX-T4Wbj&_nc_ht=scontent-frt3-1.xx&oh=7224f17fb0c5d8e9bf597e43a7bd3c9f&oe=609939B5",})
CREATE (pawel:User {name:'Paweł Grzelak', email: 'pawelgrzelak106@gmail.com', password: '$2b$10$8QDQlbTzUPbg3KmLMr/zPu/0n2XUTvA0pNgetvWXGTjEU6Z9F0Ob.', photo: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.18169-9/22814054_1805596266178172_2445518881239445487_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=7_X8fanv8FcAX9MwXlF&_nc_ht=scontent-frt3-1.xx&oh=456bf1a3b3fc51509ab3079957afc50f&oe=60971629",})
CREATE (mazur:User {name:'Kacper Mazurek', email: 'mazurekk.off@gmail.com', password: '$2b$10$8QDQlbTzUPbg3KmLMr/zPu/0n2XUTvA0pNgetvWXGTjEU6Z9F0Ob.', photo: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/116671575_2812710695623640_5860611069918484227_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=0twPe3A4YioAX8LhcQV&_nc_ht=scontent-frt3-1.xx&oh=33286f779c6374169059269c5a98f971&oe=60974678",})
CREATE (adi:User {name:'Adrian Szczechura', email: 'a.szczechura.98@gmail.com', password: '$2b$10$8QDQlbTzUPbg3KmLMr/zPu/0n2XUTvA0pNgetvWXGTjEU6Z9F0Ob.', photo: "https://i.imgur.com/5NoP2Jb_d.webp?maxwidth=760&fidelity=grand",})
RETURN bob, pjot, pawel, mazur, adi

////////
// Add expenses
////////

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

  (adi)-[:OWES]->(e3:Expense {value: 56.0, timestamp: '25/10/2020'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e4:Expense {value: 120.0, timestamp: '02/11/2020', details: 'za zipa okropnego'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e5:Expense {value: 10.0, timestamp: '02/11/2020'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e6:Expense {value: 10.0, timestamp: '20/12/2020' })-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e7:Expense {value: 10.0, timestamp: '22/12/2020', details: 'za paliwo an oglądanie gwiazdy xd'})-[:IS_OWED]->(pawel),
  (adi)-[:OWES]->(e8:Expense {value: 110.0, timestamp: '05/01/2021', details: 'Dziadu'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e9:Expense {value: 15.0, timestamp: '09/01/2021', details: 'Piwko Ancient Connection'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e10:Expense {value: 150.0, timestamp: '19/02/2021', details: 'Cali 🔥'})-[:IS_OWED]->(pawel),
  (adi)-[:OWES]->(e11:Expense {value: 28.0, timestamp: '21/02/2021', details: 'Max burgers'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e12:Expense {value: 5.0, timestamp: '06/03/2021', details: 'Burger king parapetówa'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e13:Expense {value: 20.0, timestamp: '12/03/2021', details: 'Zabawka dla kota'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e14:Expense {value: 30.0, timestamp: '12/03/2021', details: 'Cali 0.35'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e15:Expense {value: 11.3, timestamp: '13/03/2021', details: 'Subway'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e16:Expense {value: 34.3, timestamp: '13/03/2021', details: 'Cali'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e17:Expense {value: 30.0, timestamp: '15/03/2021', details: 'pregabelina 7szt'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e18:Expense {value: 325.0, timestamp: '15/03/2021', details: 'White runTz'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e19:Expense {value: 12.5, timestamp: '17/03/2021', details: 'Backwoods'})-[:IS_OWED]->(adi),
  (pawel)-[:OWES]->(e20:Expense {value: 15.0, timestamp: '21/03/2021', details: 'Mc donalds'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e21:Expense {value: 5.0, timestamp: '21/03/2021', details: 'Prega 150'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e20:Expense {value: 31.0, timestamp: '31/03/2021', details: 'Cali mary'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e21:Expense {value: 41.0, timestamp: '01/04/2021', details: 'To pho to + gastro + kraft'})-[:IS_OWED]->(pawel),
  (adi)-[:OWES]->(e21:Expense {value: 155.0, timestamp: '06/04/2021', details: 'Blik allegro'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e20:Expense {value: 245.0, timestamp: '10/04/2021', details: 'Spain 📦'})-[:IS_OWED]->(adi),

  (mazur)-[:OWES]->(e22:Expense {value: 249.0, timestamp: '26/10/2020'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e23:Expense {value: 251.0, timestamp: '04/11/2020'})-[:IS_OWED]->(mazur),
  (adi)-[:OWES]->(e24:Expense {value: 70.0, timestamp: '24/11/2020'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e25:Expense {value: 72.0, timestamp: '16/12/2020'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e26:Expense {value: 39.0, timestamp: '20/12/2020'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e27:Expense {value: 22.5, timestamp: '13/01/2021', details: 'Wegańskie curry zakupy'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e28:Expense {value: 4.5, timestamp: '20/01/2021', details: 'Piwo żywiec biały 0'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e29:Expense {value: 18.0, timestamp: '30/01/2021', details: '2x tramoll'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e30:Expense {value: 75.0, timestamp: '04/02/2021', details: 'Przelew expresowy'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e31:Expense {value: 10.0, timestamp: '13/02/2021', details: 'Thioco'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e32:Expense {value: 60.0, timestamp: '12/03/2021', details: 'Cali limelatti 0.35'})-[:IS_OWED]->(mazur),
  (adi)-[:OWES]->(e33:Expense {value: 15.0, timestamp: '15/03/2021', details: 'paliwko'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e34:Expense {value: 12.5, timestamp: '17/03/2021', details: 'Backwoods'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e35:Expense {value: 56.0, timestamp: '19/03/2021', details: 'Cali 📦 whiteRuntz backwod'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e36:Expense {value: 42.0, timestamp: '20/03/2021', details: 'Lont cali'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e37:Expense {value: 325.0, timestamp: '24/03/2021', details: 'Cali 📦 whiteRuntz'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e38:Expense {value: 39.0, timestamp: '05/04/2021', details: '0.21 pozyczylem cali runtz'})-[:IS_OWED]->(mazur),
  (adi)-[:OWES]->(e39:Expense {value: 44.6, timestamp: '07/04/2021', details: 'Pożyczka cali runtz'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e40:Expense {value: 26.42, timestamp: '09/04/2021', details: 'Lidl 3 krafty + piwa'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e41:Expense {value: 2.5, timestamp: '10/04/2021', details: 'Cwiara zana'})-[:IS_OWED]->(adi),
  (mazur)-[:OWES]->(e42:Expense {value: 70.0, timestamp: '10/04/2021', details: 'Spain 📦'})-[:IS_OWED]->(adi),

  (pjot)-[:OWES]->(e43:Expense {value: 260.0, timestamp: '25/10/2020'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e44:Expense {value: 20.0, timestamp: '25/10/2020'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e45:Expense {value: 20.0, timestamp: '25/10/2020'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e46:Expense {value: 260.0, timestamp: '28/10/2020'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e47:Expense {value: 30.0, timestamp: '24/11/2020'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e48:Expense {value: 30.0, timestamp: '16/12/2020'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e49:Expense {value: 328.0, timestamp: '18/12/2020'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e50:Expense {value: 300.0, timestamp: '20/12/2020'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e51:Expense {value: 28.0, timestamp: '23/12/2020', details: 'Spłata zaległego siana za rzeczy z Irlandii'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e52:Expense {value: 23.0, timestamp: '25/12/2020', details: 'Drank in my cup'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e53:Expense {value: 24.0, timestamp: '25/12/2020', details: 'piwko + limbus'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e54:Expense {value: 13.0, timestamp: '30/12/2020', details: 'Mc donalds'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e55:Expense {value: 250.0, timestamp: '30/12/2020', details: 'Zany'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e56:Expense {value: 16.0, timestamp: '30/12/2020', details: 'Zakupy w lidlu na szamke'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e57:Expense {value: 4.0, timestamp: '30/12/2020', details: 'Piwo grodziskie mango ale'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e58:Expense {value: 7.0, timestamp: '31/12/2020', details: '2 piwa w żabce zwoleńska'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e59:Expense {value: 50.0, timestamp: '04/01/2021', details: 'Sizzurp'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e60:Expense {value: 5.0, timestamp: '04/01/2021', details: 'Zakupy w biedrze na burito'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e61:Expense {value: 100.0, timestamp: '05/01/2021', details: 'przelew na dziada'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e62:Expense {value: 80.0, timestamp: '07/01/2021', details: 'Moda'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e63:Expense {value: 300.0, timestamp: '11/01/2021', details: 'Przelew Mbąk'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e64:Expense {value: 300.0, timestamp: '31/01/2021', details: 'Niedzielna pożyczka mbąk'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e65:Expense {value: 200.0, timestamp: '01/02/2021', details: 'Częsciowy zwrot niedzielnej pozyczki mbak'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e66:Expense {value: 20.0, timestamp: '20/02/2021'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e67:Expense {value: 30.0, timestamp: '20/02/2021'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e68:Expense {value: 30.0, timestamp: '28/02/2021', details: 'hajsik'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e69:Expense {value: 120.0, timestamp: '06/03/2021', details: 'Cali 📦📦 (sorki ale no przeprowadzka i wiesz... Na parapetowe postaram sie zeby był rs'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e70:Expense {value: 180.0, timestamp: '12/03/2021', details: 'return mbank'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e71:Expense {value: 12.5, timestamp: '17/03/2021', details: 'Backwoods'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e72:Expense {value: 56.0, timestamp: '19/03/2021', details: 'Cali 📦 whiteRuntz backwood'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e73:Expense {value: 31.0, timestamp: '31/03/2021', details: 'Cali mary'})-[:IS_OWED]->(adi),
  (adi)-[:OWES]->(e74:Expense {value: 100.0, timestamp: '03/04/2021', details: 'stuwka'})-[:IS_OWED]->(pjot),
  (adi)-[:OWES]->(e75:Expense {value: 50.0, timestamp: '07/04/2021', details: 'pisiont mbąk'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e76:Expense {value: 150.0, timestamp: '09/04/2021', details: 'Spłata siana'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e77:Expense {value: 2.5, timestamp: '10/04/2021', details: 'Cwiara zana'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e78:Expense {value: 2.5, timestamp: '10/04/2021', details: 'Kolejna cwiara xd'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e79:Expense {value: 140.0, timestamp: '10/04/2021', details: 'Spain 📦'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e80:Expense {value: 12.5, timestamp: '10/04/2021', details: '1 1/4 bara'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e81:Expense {value: 5.0, timestamp: '10/04/2021', details: 'Pol bara'})-[:IS_OWED]->(adi),
  (pjot)-[:OWES]->(e82:Expense {value: 2.5, timestamp: '10/04/2021', details: 'Cwiara rano na odmułke'})-[:IS_OWED]->(adi),

  (mazur)-[:OWES]->(e83:Expense {value: 9.0, timestamp: '21/03/2021', details: 'Uber'})-[:IS_OWED]->(pawel),
  (mazur)-[:OWES]->(e84:Expense {value: 20.0, timestamp: '21/03/2021', details: 'Prega 900'})-[:IS_OWED]->(pawel),
  (pawel)-[:OWES]->(e85:Expense {value: 9.0, timestamp: '29/03/2021', details: 'oddalem ci juz za ubera'})-[:IS_OWED]->(mazur),
  (pawel)-[:OWES]->(e86:Expense {value: 28.0, timestamp: '05/04/2021', details: '0.15 Runtz'})-[:IS_OWED]->(mazur),

  (pjot)-[:OWES]->(e87:Expense {value: 10.0, timestamp: '21/03/2021', details: 'Prega 300'})-[:IS_OWED]->(pawel),
  (pjot)-[:OWES]->(e88:Expense {value: 12.0, timestamp: '05/04/2021', details: 'Zakupy'})-[:IS_OWED]->(pawel),
  
  (pjot)-[:OWES]->(e89:Expense {value: 155.0, timestamp: '20/02/2021', details: 'narkotyki'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e90:Expense {value: 28.0, timestamp: '05/03/2021', details: 'nachosy'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e91:Expense {value: 10.0, timestamp: '05/03/2021', details: 'thioco'})-[:IS_OWED]->(mazur),
  (mazur)-[:OWES]->(e92:Expense {value: 137.0, timestamp: '15/03/2021', details: 'spłata'})-[:IS_OWED]->(pjot),
  (pjot)-[:OWES]->(e93:Expense {value: 20.0, timestamp: '29/03/2021', details: 'maczan'})-[:IS_OWED]->(mazur),
  (pjot)-[:OWES]->(e94:Expense {value: 380.0, timestamp: '07/04/2021', details: 'PC'})-[:IS_OWED]->(mazur),
  (pjot)-[:OWES]->(e95:Expense {value: 20.0, timestamp: '10/04/2021', details: '0.1 cali'})-[:IS_OWED]->(mazur)
  
RETURN bob, pjot, pawel, mazur, adi