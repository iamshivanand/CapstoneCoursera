import { useRef, useEffect } from "react";

export const SECTION_LIST_MOCK_DATA = [
  {
    title: "Appetizers",
    data: [
      {
        id: "1",
        title: "Pasta",
        price: "10",
      },
      {
        id: "3",
        title: "Pizza",
        price: "8",
      },
    ],
  },
  {
    title: "Salads",
    data: [
      {
        id: "2",
        title: "Caesar",
        price: "2",
      },
      {
        id: "4",
        title: "Greek",
        price: "3",
      },
    ],
  },
];

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getSectionListData(data) {
  let SECTION_LIST_MOCK_DATA = [];
  let app = [];
  let sal = [];
  let bev = [];

  data.map((key, index) => {
    // console.log(key);
    if (key.category === "Appetizers") {
      app.push({ id: key.id, title: key.title, price: key.price });
    } else if (key.category === "Salads") {
      sal.push({ id: key.id, title: key.title, price: key.price });
    } else if (key.category === "Beverages") {
      bev.push({ id: key.id, title: key.title, price: key.price });
    }
    // console.log("raiden", sal);
  });

  SECTION_LIST_MOCK_DATA.push({ title: "Appetizers", data: app });
  SECTION_LIST_MOCK_DATA.push({ title: "Salads", data: sal });
  SECTION_LIST_MOCK_DATA.push({ title: "Beverages", data: bev });

  // console.log("raiden", JSON.stringify(SECTION_LIST_MOCK_DATA));
  // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
  // The title of each section should be the category.
  // The data property should contain an array of menu items.
  // Each item has the following properties: "id", "title" and "price"
  return SECTION_LIST_MOCK_DATA;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
