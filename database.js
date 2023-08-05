import * as SQLite from "expo-sqlite";
// import { SECTION_LIST_MOCK_DATA } from "./utils";

const db = SQLite.openDatabase("little_lemon2");

export async function createTable(name) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `create table if not exists ${name} (id integer primary key not null, email text, password text, name text);`
        );
      },
      reject,
      resolve
    );
  });
}

export async function createTable2() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems2 (id integer primary key not null, uuid text, title text, price text, category text);"
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems(email, password) {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from master_data_user2 where email="${email}" AND password="${password}";`,
        [],
        (_, { rows }) => {
          resolve(rows._array);
          console.log("hww", rows._array);
        }
      );
    });
  });
}

export async function getMenuItems2() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems2", [], (_, { rows }) => {
        resolve(rows._array);
        console.log("raiden", rows._array);
      });
    });
  });
}

export function saveMenuItems(email, password, name) {
  db.transaction((tx) => {
    var uuid = 12345;
    // tx.executeSql();
    let sql = `INSERT INTO master_data_user2(email,password,name) VALUES ("${email}","${password}","${name}"); `;

    // console.log(sql);
    tx.executeSql(sql);
    console.log("hello", sql);
    // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
    // Check the createTable() function above to see all the different columns the table has
    // Hint: You need a SQL statement to insert multiple rows at once.
  });
}

export function saveMenuItems2(menuItems) {
  db.transaction((tx) => {
    var uuid = 12345;
    // tx.executeSql();
    let sql = `INSERT INTO menuitems2 (${Object.keys(menuItems.menu[0]).join(
      ","
    )},uuid) VALUES `;
    let d = "";
    // alert(Object.keys(menuItems.menu[0]).join(","));
    for (let data of menuItems.menu) {
      uuid += 1;
      d =
        d +
        `(${data.id},"${data.title}","${data.price}","${data.category.title}","${uuid}"),`;
    }
    d = d.substring(0, d.lastIndexOf(","));
    sql = sql + d + ";";
    console.log(sql);
    tx.executeSql(sql);
    // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
    // Check the createTable() function above to see all the different columns the table has
    // Hint: You need a SQL statement to insert multiple rows at once.
  });
}

/**
 * 4. Implement a transaction that executes a SQL statement to filter the menu by 2 criteria:
 * a query string and a list of categories.
 *
 * The query string should be matched against the menu item titles to see if it's a substring.
 * For example, if there are 4 items in the database with titles: 'pizza, 'pasta', 'french fries' and 'salad'
 * the query 'a' should return 'pizza' 'pasta' and 'salad', but not 'french fries'
 * since the latter does not contain any 'a' substring anywhere in the sequence of characters.
 *
 * The activeCategories parameter represents an array of selected 'categories' from the filter component
 * All results should belong to an active category to be retrieved.
 * For instance, if 'pizza' and 'pasta' belong to the 'Main Dishes' category and 'french fries' and 'salad' to the 'Sides' category,
 * a value of ['Main Dishes'] for active categories should return  only'pizza' and 'pasta'
 *
 * Finally, the SQL statement must support filtering by both criteria at the same time.
 * That means if the query is 'a' and the active category 'Main Dishes', the SQL statement should return only 'pizza' and 'pasta'
 * 'french fries' is excluded because it's part of a different category and 'salad' is excluded due to the same reason,
 * even though the query 'a' it's a substring of 'salad', so the combination of the two filters should be linked with the AND keyword
 *
 */
export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    let a = "";
    for (let i = 0; i < activeCategories.length; i++) {
      if (i !== activeCategories.length - 1)
        a = a + `category="${activeCategories[i]}" OR `;
      else a = a + `category="${activeCategories[i]}" `;
    }
    let q = "";
    q = `select * from menuitems2 where title like "%${query}%" AND (${a})`;

    db.transaction((tx) => {
      tx.executeSql(q, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
    // resolve(SECTION_LIST_MOCK_DATA);
  });
}
