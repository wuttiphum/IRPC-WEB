import { decryptHashData } from "./encypt";


export const saveArrayToLocalStorage = (key: string, myObjectArray: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(myObjectArray));
  }
};

export const getArrayFromLocalStorage = (key: string): any => {
  if (key == "user_data") {
    if (typeof window !== 'undefined') {


      const token = localStorage.getItem(key) || "";
      const storedArray = decryptHashData(token);
      return storedArray ? JSON.parse(storedArray) : null;
    }
  }
  if (typeof window !== 'undefined') {
    const storedArray = localStorage.getItem(key);
    return storedArray ? JSON.parse(storedArray) : null;
  }
  return null;
};


export const isObjectInArray = (myObjectArray: object[], myObject: object): boolean => {
  return myObjectArray.some((item) => isObjectEqual(item, myObject));
};

export const isObjectEqual = (obj1: object, obj2: object): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};


export async function favouriteAction(data: any, type: 'air' | 'sound' | 'flare' | 'water' | 'env' | 'eqms', isChecked: any) {
  const tempData = await getArrayFromLocalStorage("favData");
  const newData = [...tempData, { ...data, type }];

  if (!isChecked) {
    console.log("add");
    saveArrayToLocalStorage("favData", newData);
  } else {
    console.log("REMOVE", data.stationID);
    saveArrayToLocalStorage("favData", tempData.filter((item: any) => item.stationID !== data.stationID));
  }
}

